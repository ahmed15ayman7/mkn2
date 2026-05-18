import { AuthSessionProvider } from "@/components/providers/session-provider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <div className="min-h-screen bg-surface text-primary">{children}</div>
    </AuthSessionProvider>
  );
}
