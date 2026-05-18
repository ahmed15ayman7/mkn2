import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminAuthForm } from "@/components/admin/auth-form";

export default async function AdminRegisterPage() {
  const session = await auth();
  if (session?.user?.active) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <AdminAuthForm mode="register" />
    </div>
  );
}
