import type { Prisma, Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProjectAmenity, ProjectPageView } from "@/lib/projects/types";

import { mergeProjectGalleryImages } from "@/lib/projects/gallery";

export { gallerySlots, mergeProjectGalleryImages } from "@/lib/projects/gallery";

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

  const gallery = mergeProjectGalleryImages(
    project.designGalleryImages,
    project.galleryImages,
    project.images,
    project.coverImage,
  );

  const panoramicVideo = project.panoramicVideoUrl?.trim() || null;
  const panoramicBackgroundVideo =
    project.panoramicBackgroundVideoUrl?.trim() || null;
  const deliveryVideo = project.deliveryVideoUrl?.trim() || null;

  const completionYear = project.completionDate
    ? String(project.completionDate.getFullYear())
    : null;

  const facilitiesItems =
    locale === "ar" ? project.facilitiesAr : project.facilitiesEn;

  return {
    slug: project.slug,
    title: pickRequired(locale, project.titleEn, project.titleAr),
    summary: pickRequired(locale, project.descEn, project.descAr),
    location: pickRequired(locale, project.locationEn, project.locationAr),
    heroImage: project.coverImage,
    heroSubtitle: pick(locale, project.heroSubtitleEn, project.heroSubtitleAr),
    completionYear,
    delivery: {
      title:
        pick(locale, project.deliveryTitleEn, project.deliveryTitleAr) ??
        (locale === "ar" ? "التسليم" : "DELIVERY"),
      body1: pick(locale, project.deliveryBody1En, project.deliveryBody1Ar),
      body2: pick(locale, project.deliveryBody2En, project.deliveryBody2Ar),
      videoUrl: deliveryVideo,
      ctaLabel:
        pick(locale, project.deliveryCtaEn, project.deliveryCtaAr) ??
        (locale === "ar" ? "تحميل الكتيب" : "Download Brochure"),
      ctaUrl: project.brochureUrl,
    },
    panoramicVideo,
    panoramicBackgroundVideo,
    completionLabel: project.completionDate
      ? project.completionDate.toLocaleDateString(
          locale === "ar" ? "ar-SA" : "en-US",
          { month: "long", day: "numeric", year: "numeric" },
        )
      : null,
    panoramicPoster: project.panoramicImageUrl ?? project.coverImage,
    designGalleryImages: project.designGalleryImages,
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
      logoUrl: project.mapLogoUrl,
      label:
        pick(locale, project.locationLabelEn, project.locationLabelAr) ??
        (locale === "ar" ? "الموقع" : "Location"),
      blurb: pick(locale, project.locationBlurbEn, project.locationBlurbAr),
    },
    luxury: {
      title: pick(locale, project.luxuryTitleEn, project.luxuryTitleAr),
      col1: pick(locale, project.luxuryCol1En, project.luxuryCol1Ar),
      col2: pick(locale, project.luxuryCol2En, project.luxuryCol2Ar),
    },
    facilities: {
      title:
        pick(locale, project.facilitiesTitleEn, project.facilitiesTitleAr) ??
        (locale === "ar" ? "التفاصيل" : "Details"),
      items: facilitiesItems.filter(Boolean),
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
