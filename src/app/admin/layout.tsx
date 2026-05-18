import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

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
