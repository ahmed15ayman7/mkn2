import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import type { AppLocale } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as AppLocale, "home");
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <OrganizationJsonLd />
      <HomePageContent />
    </>
  );
}
