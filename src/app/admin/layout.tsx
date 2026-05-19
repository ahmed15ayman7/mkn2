import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { fontAr, fontEn, fontQuote, fontSignature } from "@/lib/fonts";
import { cn } from "@/lib/utils";

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
      <div
        className={cn(
          "min-h-screen bg-surface font-sans text-primary antialiased",
          fontEn.variable,
          fontAr.variable,
          fontQuote.variable,
          fontSignature.variable,
        )}
      >
        {children}
      </div>
    </AuthSessionProvider>
  );
}
