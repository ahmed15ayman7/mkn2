import type { Prisma, Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProjectAmenity, ProjectPageView } from "@/lib/projects/types";

export { gallerySlots } from "@/lib/projects/gallery";

function pick(locale: string, en: string | null | undefined, ar: string | null | undefined) {
  const value = locale === "ar" ? ar : en;
  return value?.trim() ? value : null;
}

function pickRequired(locale: string, en: string, ar: string) {
  return locale === "ar" ? ar : en;
}

export function parseAmenitiesJson(value: Prisma.JsonValue): ProjectAmenity[] {
  if (!Array.isArray(value)) return [];
  const items: ProjectAmenity[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const o = item as Record<string, unknown>;
    const titleEn = typeof o.titleEn === "string" ? o.titleEn : "";
    const titleAr = typeof o.titleAr === "string" ? o.titleAr : "";
    const descEn = typeof o.descEn === "string" ? o.descEn : "";
    const descAr = typeof o.descAr === "string" ? o.descAr : "";
    if (!titleEn && !titleAr) continue;
    const variant = o.variant;
    const imageUrl = typeof o.imageUrl === "string" ? o.imageUrl : null;
    items.push({
      titleEn,
      titleAr,
      descEn,
      descAr,
      imageUrl,
      variant:
        variant === "accent" ||
        variant === "muted" ||
        variant === "image" ||
        variant === "default"
          ? variant
          : "default",
    });
  }
  return items;
}

export function toProjectPageView(
  project: Project,
  locale: string,
): ProjectPageView {
  const amenities = parseAmenitiesJson(project.amenities).map((a) => ({
    title: pickRequired(locale, a.titleEn, a.titleAr),
    desc: pickRequired(locale, a.descEn, a.descAr),
    imageUrl: a.imageUrl ?? null,
    variant: a.variant ?? "default",
  }));

  const gallery =
    project.galleryImages.length > 0
      ? project.galleryImages
      : project.images.length > 0
        ? project.images
        : [project.coverImage];

  return {
    slug: project.slug,
    title: pickRequired(locale, project.titleEn, project.titleAr),
    location: pickRequired(locale, project.locationEn, project.locationAr),
    heroImage: project.coverImage,
    heroSubtitle: pick(locale, project.heroSubtitleEn, project.heroSubtitleAr),
    delivery: {
      title:
        pick(locale, project.deliveryTitleEn, project.deliveryTitleAr) ??
        (locale === "ar" ? "التسليم" : "DELIVERY"),
      body1: pick(locale, project.deliveryBody1En, project.deliveryBody1Ar),
      body2: pick(locale, project.deliveryBody2En, project.deliveryBody2Ar),
      videoUrl: project.deliveryVideoUrl,
      ctaLabel: pick(locale, project.deliveryCtaEn, project.deliveryCtaAr),
    },
    panoramicImage: project.panoramicImageUrl,
    coastal: {
      title: pick(locale, project.coastalTitleEn, project.coastalTitleAr),
      col1: pick(locale, project.coastalCol1En, project.coastalCol1Ar),
      col2: pick(locale, project.coastalCol2En, project.coastalCol2Ar),
      col3: pick(locale, project.coastalCol3En, project.coastalCol3Ar),
      highlight: pick(
        locale,
        project.coastalHighlightEn,
        project.coastalHighlightAr,
      ),
    },
    galleryImages: gallery,
    map: {
      image: project.mapImageUrl,
      label: pick(locale, project.locationLabelEn, project.locationLabelAr),
      blurb: pick(locale, project.locationBlurbEn, project.locationBlurbAr),
    },
    luxury: {
      title: pick(locale, project.luxuryTitleEn, project.luxuryTitleAr),
      col1: pick(locale, project.luxuryCol1En, project.luxuryCol1Ar),
      col2: pick(locale, project.luxuryCol2En, project.luxuryCol2Ar),
    },
    closingImage: project.closingImageUrl,
    amenities,
  };
}

export async function getProjectPageBySlug(
  slug: string,
  locale: string,
): Promise<ProjectPageView | null> {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return null;
  return toProjectPageView(project, locale);
}
