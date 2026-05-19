import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import type { AppLocale } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { setRequestLocale } from "next-intl/server";
import { img } from "@/lib/content/images";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as AppLocale, "contact", img.contactHero);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageContent />;
}
