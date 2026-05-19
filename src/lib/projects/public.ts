import {
  featuredSliderImages,
  getHomeCopy,
  getHomeGridProjects,
} from "@/lib/content/home";
import { mergeProjectGalleryImages } from "@/lib/projects/gallery";
import { prisma } from "@/lib/prisma";

export type PublicProjectCard = {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  images: string[];
  featured: boolean;
  areaSqm: string | null;
  completionDate: string | null;
  dateLabel: string;
  metaLine: string;
};

function formatDateLabel(date: Date | null, locale: string): string {
  if (!date) return "";
  return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

function toCard(
  project: {
    id: string;
    slug: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    locationAr: string;
    locationEn: string;
    coverImage: string;
    images: string[];
    featured: boolean;
    areaSqm: { toString(): string } | null;
    completionDate: Date | null;
    updatedAt: Date;
  },
  locale: string,
): PublicProjectCard {
  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const location = locale === "ar" ? project.locationAr : project.locationEn;
  const description = locale === "ar" ? project.descAr : project.descEn;
  const areaSqm = project.areaSqm?.toString() ?? null;
  const date = project.completionDate ?? project.updatedAt;
  const areaSuffix =
    areaSqm && locale === "ar"
      ? ` — ${areaSqm} م²`
      : areaSqm
        ? ` — ${areaSqm} m²`
        : "";

  return {
    id: project.id,
    slug: project.slug,
    title,
    location,
    description,
    coverImage: project.coverImage,
    images: project.images.length > 0 ? project.images : [project.coverImage],
    featured: project.featured,
    areaSqm,
    completionDate: project.completionDate
      ? project.completionDate.toISOString().slice(0, 10)
      : null,
    dateLabel: formatDateLabel(date, locale),
    metaLine: `${location}${areaSuffix}`,
  };
}

export async function getPublicProjects(
  locale: string,
): Promise<PublicProjectCard[]> {
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    });
    if (rows.length > 0) {
      return rows.map((p) => toCard(p, locale));
    }
  } catch {
    // DB unavailable at build — use static fallback
  }

  return getHomeGridProjects().map((p, i) => ({
    id: `static-${i}`,
    slug: p.name.toLowerCase().replace(/\s+/g, "-"),
    title: p.name,
    location: locale === "ar" ? "الخبر" : "Al Khobar",
    description: "",
    coverImage: p.src,
    images: [p.src],
    featured: i === 0,
    areaSqm: null,
    completionDate: null,
    dateLabel: "",
    metaLine: locale === "ar" ? "الخبر" : "Al Khobar",
  }));
}

export async function getPublicProjectBySlug(
  slug: string,
  locale: string,
): Promise<PublicProjectCard | null> {
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (project) return toCard(project, locale);
  } catch {
    return null;
  }
  return null;
}

export async function getFeaturedPublicProject(
  locale: string,
): Promise<PublicProjectCard | null> {
  const projects = await getPublicProjects(locale);
  return projects.find((p) => p.featured) ?? projects[0] ?? null;
}

export type FeaturedHomeSectionData = {
  slug: string;
  title: string;
  description: string;
  location: string;
  dateLabel: string;
  slides: { src: string; alt: string }[];
};

export async function getFeaturedHomeSectionData(
  locale: string,
): Promise<FeaturedHomeSectionData> {
  const fallbackCopy = getHomeCopy(locale as "en" | "ar");

  try {
    const project = await prisma.project.findFirst({
      where: { featured: true },
      orderBy: { updatedAt: "desc" },
    });

    if (project) {
      const card = toCard(project, locale);
      const gallery = mergeProjectGalleryImages(
        project.designGalleryImages,
        project.galleryImages,
        project.images,
        project.coverImage,
      );
      const slides =
        gallery.length > 0
          ? gallery.map((src, i) => ({
              src,
              alt: `${card.title} ${i + 1}`,
            }))
          : [{ src: project.coverImage, alt: card.title }];

      return {
        slug: project.slug,
        title: card.title,
        description: card.description,
        location: card.location,
        dateLabel: card.dateLabel,
        slides,
      };
    }
  } catch {
    // DB unavailable — static fallback below
  }

  const staticSlides = featuredSliderImages().map((src, i) => ({
    src,
    alt: `${fallbackCopy.featuredTitle} ${i + 1}`,
  }));

  return {
    slug: fallbackCopy.featuredSlug,
    title: fallbackCopy.featuredTitle,
    description: fallbackCopy.featuredBody,
    location: fallbackCopy.metaLocation.split("—")[0]?.trim() ?? fallbackCopy.metaLocation,
    dateLabel: fallbackCopy.metaYear,
    slides: staticSlides,
  };
}
