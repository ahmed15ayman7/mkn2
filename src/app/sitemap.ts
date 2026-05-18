import type { MetadataRoute } from "next";
import { routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/paths";
import { prisma } from "@/lib/prisma";

const STATIC_PATHS = ["", "about", "projects", "contact"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  let projects: { slug: string; updatedAt: Date }[] = [];
  try {
    projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch {
    projects = [];
  }

  for (const locale of routing.locales) {
    const loc = locale as AppLocale;

    for (const path of STATIC_PATHS) {
      const urlPath = path ? `/${loc}/${path}` : `/${loc}`;
      entries.push({
        url: absoluteUrl(urlPath),
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const project of projects) {
      entries.push({
        url: absoluteUrl(`/${loc}/projects/${project.slug}`),
        lastModified: project.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
