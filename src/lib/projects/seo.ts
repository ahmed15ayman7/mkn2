import type { SeoMetadata } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { AppLocale } from "@/i18n/routing";

export type ProjectSeoView = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string | null;
  heroImage: string;
  updatedAt: Date;
};

function pick(locale: string, en: string | null | undefined, ar: string | null | undefined) {
  const value = locale === "ar" ? ar : en;
  return value?.trim() ? value : null;
}

function pickRequired(locale: string, en: string, ar: string) {
  return locale === "ar" ? ar : en;
}

function buildDescriptionFallback(
  locale: string,
  project: {
    heroSubtitleEn: string | null;
    heroSubtitleAr: string | null;
    coastalCol1En: string | null;
    coastalCol1Ar: string | null;
    locationEn: string;
    locationAr: string;
    titleEn: string;
    titleAr: string;
  },
): string {
  const subtitle = pick(locale, project.heroSubtitleEn, project.heroSubtitleAr);
  if (subtitle) return subtitle;

  const coastal = pick(locale, project.coastalCol1En, project.coastalCol1Ar);
  if (coastal) {
    return coastal.length > 160 ? `${coastal.slice(0, 157)}…` : coastal;
  }

  const location = pickRequired(locale, project.locationEn, project.locationAr);
  const title = pickRequired(locale, project.titleEn, project.titleAr);
  return `${title} — ${location}`;
}

function keywordsFromSeo(seo: SeoMetadata | null, locale: string): string[] {
  if (!seo) return [];
  return locale === "ar" ? seo.keywordsAr : seo.keywordsEn;
}

export async function getProjectSeoBySlug(
  slug: string,
  locale: string,
): Promise<ProjectSeoView | null> {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { seo: true },
  });
  if (!project) return null;

  const title =
    pick(locale, project.seo?.metaTitleEn, project.seo?.metaTitleAr) ??
    pickRequired(locale, project.titleEn, project.titleAr);

  const description =
    pick(locale, project.seo?.metaDescEn, project.seo?.metaDescAr) ??
    buildDescriptionFallback(locale, project);

  return {
    slug: project.slug,
    title,
    description,
    keywords: keywordsFromSeo(project.seo, locale),
    ogImage: project.seo?.ogImage ?? null,
    heroImage: project.coverImage,
    updatedAt: project.updatedAt,
  };
}
