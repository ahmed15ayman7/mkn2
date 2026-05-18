import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { fontAr, fontEn, fontQuote } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import "../globals.css";

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
      className={cn("h-full", fontEn.variable, fontAr.variable, fontQuote.variable)}
    >
      <body
        className={`min-h-full flex flex-col antialiased ${
          locale === "ar" ? fontAr.className : fontEn.className
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
