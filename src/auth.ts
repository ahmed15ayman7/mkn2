import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Provider } from "next-auth/providers";
import { prisma } from "@/lib/prisma";
import {
  findUserByEmail,
  shouldAutoActivateOnOAuthCreate,
} from "@/lib/auth/user";
import { verifyPassword } from "@/lib/auth/password";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email =
        typeof credentials?.email === "string"
          ? credentials.email.toLowerCase().trim()
          : "";
      const password =
        typeof credentials?.password === "string"
          ? credentials.password
          : "";

      if (!email || !password) {
        return null;
      }

      const user = await findUserByEmail(email);
      if (!user?.passwordHash) {
        return null;
      }

      const valid = await verifyPassword(password, user.passwordHash);
      if (!valid) {
        return null;
      }

      if (!user.active) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        active: user.active,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  providers,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }
      const dbUser = await findUserByEmail(user.email);
      if (dbUser && !dbUser.active) {
        return "/admin/pending";
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await findUserByEmail(user.email);
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.active = dbUser.active;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as typeof session.user.role;
        session.user.active = Boolean(token.active);
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const autoActive = await shouldAutoActivateOnOAuthCreate();
      await prisma.user.update({
        where: { id: user.id! },
        data: {
          active: autoActive,
          role: "ADMIN",
        },
      });
    },
  },
});
