import type { Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mergeProjectGalleryImages } from "@/lib/projects/gallery";
import type { ProjectAmenity, ProjectPageView } from "@/lib/projects/types";

export { gallerySlots, mergeProjectGalleryImages } from "@/lib/projects/gallery";
export { parseAmenitiesJson } from "@/lib/projects/parse-amenities";

import { parseAmenitiesJson } from "@/lib/projects/parse-amenities";
import { parseApproachColumnsJson } from "@/lib/projects/parse-approach-columns";
import { parseMaterialColorsJson } from "@/lib/projects/parse-material-colors";
import { buildProjectContactCta } from "@/lib/projects/contact-cta";
import {
  formatHeroDelivery,
  formatHeroStartPrice,
  formatHeroStartSpace,
  heroStatLabels,
} from "@/lib/projects/format-hero-stats";
import { parseProjectCreditsJson } from "@/lib/projects/parse-project-credits";

function pick(
  locale: string,
  en: string | null | undefined,
  ar: string | null | undefined,
) {
  const value = locale === "ar" ? ar : en;
  return value?.trim() ? value : null;
}

function pickRequired(locale: string, en: string, ar: string) {
  return locale === "ar" ? ar : en;
}

function trimUrl(url: string | null | undefined): string | null {
  const t = url?.trim();
  return t || null;
}

function decimalToNumber(value: Project["areaSqm"]): number | null {
  if (value === null || value === undefined) return null;
  return Number(value);
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

  const designImages = project.designGalleryImages;
  const galleryImages = project.galleryImages;
  const galleryAll = mergeProjectGalleryImages(
    designImages,
    galleryImages,
    project.images,
    project.coverImage,
  );

  const completionYear = project.completionDate
    ? String(project.completionDate.getFullYear())
    : null;

  const facilitiesItems =
    locale === "ar" ? project.facilitiesAr : project.facilitiesEn;

  const approachColumns = parseApproachColumnsJson(project.approachColumns).map(
    (col) => {
      if (col.kind === "paragraph") {
        return {
          kind: "paragraph" as const,
          body: pickRequired(locale, col.bodyEn, col.bodyAr),
        };
      }
      return {
        kind: "highlight" as const,
        index: col.index,
        label: pickRequired(locale, col.labelEn, col.labelAr),
        headline: pickRequired(locale, col.headlineEn, col.headlineAr),
      };
    },
  );

  const materialColorItems = parseMaterialColorsJson(project.materialColors).map(
    (c) => ({
      category: c.category,
      categoryLabel:
        c.category === "secondary"
          ? locale === "ar"
            ? "اللون الثانوي"
            : "SECONDARY COLOR"
          : locale === "ar"
            ? "اللون الأساسي"
            : "PRIMARY COLOR",
      name: pickRequired(locale, c.nameEn, c.nameAr),
      hex: c.hex,
      ralCode: c.ralCode ?? null,
      ncsCode: c.ncsCode ?? null,
    }),
  );

  return {
    slug: project.slug,
    title: pickRequired(locale, project.titleEn, project.titleAr),
    description: pickRequired(locale, project.descEn, project.descAr),
    location: pickRequired(locale, project.locationEn, project.locationAr),
    areaSqm: decimalToNumber(project.areaSqm),
    investmentValue: decimalToNumber(project.investmentValue),
    completionYear,
    completionLabel: project.completionDate
      ? project.completionDate.toLocaleDateString(
          locale === "ar" ? "ar-SA" : "en-US",
          { month: "long", day: "numeric", year: "numeric" },
        )
      : null,
    coverImage: project.coverImage,
    images: project.images,
    featured: project.featured,

    hero: {
      subtitle: pick(locale, project.heroSubtitleEn, project.heroSubtitleAr),
      stats: {
        labels: heroStatLabels(locale),
        startPrice: formatHeroStartPrice(
          decimalToNumber(project.investmentValue),
          locale,
        ),
        startSpace: formatHeroStartSpace(
          decimalToNumber(project.areaSqm),
          locale,
        ),
        delivery: formatHeroDelivery(
          project.completionDate,
          project.completionDate
            ? project.completionDate.toLocaleDateString(
                locale === "ar" ? "ar-SA" : "en-US",
                { month: "long", day: "numeric", year: "numeric" },
              )
            : null,
          locale,
        ),
        location: pickRequired(locale, project.locationEn, project.locationAr),
      },
    },

    videos: {
      heroModal: trimUrl(project.panoramicVideoUrl),
      deliveryModal: trimUrl(project.deliveryVideoUrl),
      background: trimUrl(project.panoramicBackgroundVideoUrl),
      backgroundPoster:
        trimUrl(project.panoramicImageUrl) ?? project.coverImage,
    },

    delivery: {
      title:
        pick(locale, project.deliveryTitleEn, project.deliveryTitleAr) ??
        (locale === "ar" ? "التسليم" : "DELIVERY"),
      body1: pick(locale, project.deliveryBody1En, project.deliveryBody1Ar),
      body2: pick(locale, project.deliveryBody2En, project.deliveryBody2Ar),
      ctaLabel:
        pick(locale, project.deliveryCtaEn, project.deliveryCtaAr) ??
        (locale === "ar" ? "تحميل الكتيب" : "Download Brochure"),
      ctaUrl: trimUrl(project.brochureUrl),
    },

    gallery: {
      designImages,
      galleryImages,
      all: galleryAll,
    },

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

    approach: {
      columns: approachColumns,
    },

    map: {
      image: project.mapImageUrl,
      logoUrl: project.mapLogoUrl,
      label:
        pick(locale, project.locationLabelEn, project.locationLabelAr) ??
        (locale === "ar" ? "الموقع" : "Location"),
      blurb: pick(locale, project.locationBlurbEn, project.locationBlurbAr),
    },

    materialColors: {
      introImage: trimUrl(project.materialColorsIntroImageUrl),
      items: materialColorItems,
    },

    credits: {
      title:
        pick(locale, project.creditsTitleEn, project.creditsTitleAr) ??
        (locale === "ar" ? "الاعتمادات" : "Credits"),
      groups: parseProjectCreditsJson(project.projectCredits).map((g) => ({
        title: pickRequired(locale, g.titleEn, g.titleAr),
        items: g.items.map((item) => ({
          role: pickRequired(locale, item.roleEn, item.roleAr),
          name: pickRequired(locale, item.nameEn, item.nameAr),
        })),
      })),
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
    contactCta: buildProjectContactCta(project, locale),
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
