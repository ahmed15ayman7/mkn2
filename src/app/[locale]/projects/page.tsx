import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import type { AppLocale } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { setRequestLocale } from "next-intl/server";
import { img } from "@/lib/content/images";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as AppLocale, "projects", img.projectsHero);
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsPageContent />;
}
