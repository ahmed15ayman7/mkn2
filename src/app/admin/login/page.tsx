import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminAuthForm } from "@/components/admin/auth-form";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user?.active) {
    redirect("/admin");
  }
  if (session?.user && !session.user.active) {
    redirect("/admin/pending");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <AdminAuthForm mode="login" />
    </div>
  );
}
