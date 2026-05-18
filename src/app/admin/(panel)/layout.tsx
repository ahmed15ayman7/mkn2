import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  if (!session.user.active) {
    redirect("/admin/pending");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/10 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-primary">
              MKN Admin
            </Link>
            <nav className="flex flex-wrap gap-4 text-sm">
              <Link href="/admin" className="text-primary/80 hover:text-primary">
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className="text-primary/80 hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="/admin/users"
                className="text-primary/80 hover:text-primary"
              >
                Users
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-primary/60">{session.user.email}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
