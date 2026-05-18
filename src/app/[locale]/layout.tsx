import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { PageTransitionProvider } from "@/components/motion/page-transition-context";
import { PageTransitionShell } from "@/components/motion/page-transition-shell";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { fontAr, fontEn, fontQuote, fontSignature } from "@/lib/fonts";
import { buildDefaultLayoutMetadata } from "@/lib/seo/build-metadata";
import { SITE_NAME, SITE_URL } from "@/lib/seo/config";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: isAr
      ? "MKN Developments — تطوير عقاري فاخر في المملكة العربية السعودية."
      : "MKN Developments — premium real estate development in Saudi Arabia.",
    ...buildDefaultLayoutMetadata(locale as AppLocale),
  };
}

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
