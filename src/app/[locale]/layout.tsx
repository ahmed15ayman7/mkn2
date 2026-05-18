import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { PageTransitionProvider } from "@/components/motion/page-transition-context";
import { PageTransitionShell } from "@/components/motion/page-transition-shell";
import { fontAr, fontEn, fontQuote, fontSignature } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "MKN Developments",
    template: "%s | MKN Developments",
  },
  description: "MKN Developments — premium real estate.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={cn(
        "h-full",
        fontEn.variable,
        fontAr.variable,
        fontQuote.variable,
        fontSignature.variable,
      )}
    >
      <body
        className={`min-h-full flex flex-col antialiased ${
          locale === "ar" ? fontAr.className : fontEn.className
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <PageTransitionProvider>
              <div className="flex min-h-screen flex-col">
                <SiteHeader />
                <PageTransitionShell>{children}</PageTransitionShell>
                <SiteFooter />
              </div>
            </PageTransitionProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
