import { prisma } from "@/lib/prisma";

/** No users yet — used before creating the first account via register API. */
export async function isFirstUser(): Promise<boolean> {
  const count = await prisma.user.count();
  return count === 0;
}

/** During OAuth `createUser`, the new row already exists (count === 1). */
export async function shouldAutoActivateOnOAuthCreate(): Promise<boolean> {
  const count = await prisma.user.count();
  return count === 1;
}

export async function shouldAutoActivateOnRegister(): Promise<boolean> {
  return isFirstUser();
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}
