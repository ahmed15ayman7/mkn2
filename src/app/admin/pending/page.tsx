import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default async function AdminPendingPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  if (session.user.active) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account pending activation</CardTitle>
          <CardDescription>
            Your admin account ({session.user.email}) is waiting for an active
            administrator to approve it.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Link
            href="/admin/login"
            className={cn(buttonVariants(), "text-center")}
          >
            Back to sign in
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full",
              )}
            >
              Sign out
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
