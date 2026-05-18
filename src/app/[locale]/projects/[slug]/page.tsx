import { ProjectDetailContent } from "@/components/pages/project-detail-content";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { getProjectPageBySlug } from "@/lib/projects/page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

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

  const activeLocale = await getLocale();
  const page = await getProjectPageBySlug(slug, activeLocale);
  if (!page) {
    notFound();
  }

  return <ProjectDetailContent page={page} />;
}
