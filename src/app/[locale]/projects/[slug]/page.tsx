import type { Metadata } from "next";
import { ProjectDetailContent } from "@/components/pages/project-detail-content";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { getProjectPageBySlug } from "@/lib/projects/page";
import { getProjectSeoBySlug } from "@/lib/projects/seo";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const seo = await getProjectSeoBySlug(slug, locale);
  if (!seo) {
    return { title: "Project Not Found" };
  }

  return buildPageMetadata({
    locale: locale as AppLocale,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.length > 0 ? seo.keywords : undefined,
    path: { projectSlug: slug },
    ogImage: seo.ogImage ?? undefined,
    heroImage: seo.heroImage,
  });
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({ select: { slug: true } });
    if (projects.length > 0) {
      return projects.flatMap((p) => [
        { locale: "en", slug: p.slug },
        { locale: "ar", slug: p.slug },
      ]);
    }
  } catch {
    // fallback
  }
  return [
    { locale: "en", slug: "sea-point" },
    { locale: "ar", slug: "sea-point" },
  ];
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isRtl = locale === "ar";
  const activeLocale = await getLocale();
  const page = await getProjectPageBySlug(slug, activeLocale);
  if (!page) {
    notFound();
  }

  return <ProjectDetailContent page={page} isRtl={isRtl} />;
}
