import type { Prisma } from "@prisma/client";
import type { z } from "zod";
import { PROJECT_PAGE_CONTENT_FIELDS } from "@/lib/projects/fields";
import type { projectBodySchema } from "@/lib/validation/admin";

type ProjectInput = z.infer<typeof projectBodySchema>;

type PageContentField = (typeof PROJECT_PAGE_CONTENT_FIELDS)[number];

function pageFields(
  data: ProjectInput,
): Pick<Prisma.ProjectCreateInput, PageContentField> {
  return {
    heroSubtitleEn: data.heroSubtitleEn ?? undefined,
    heroSubtitleAr: data.heroSubtitleAr ?? undefined,
    deliveryTitleEn: data.deliveryTitleEn ?? undefined,
    deliveryTitleAr: data.deliveryTitleAr ?? undefined,
    deliveryBody1En: data.deliveryBody1En ?? undefined,
    deliveryBody1Ar: data.deliveryBody1Ar ?? undefined,
    deliveryBody2En: data.deliveryBody2En ?? undefined,
    deliveryBody2Ar: data.deliveryBody2Ar ?? undefined,
    deliveryVideoUrl: data.deliveryVideoUrl ?? undefined,
    deliveryCtaEn: data.deliveryCtaEn ?? undefined,
    deliveryCtaAr: data.deliveryCtaAr ?? undefined,
    brochureUrl: data.brochureUrl ?? undefined,
    panoramicImageUrl: data.panoramicImageUrl ?? undefined,
    panoramicVideoUrl: data.panoramicVideoUrl ?? undefined,
    panoramicBackgroundVideoUrl: data.panoramicBackgroundVideoUrl ?? undefined,
    designGalleryImages: data.designGalleryImages ?? [],
    coastalTitleEn: data.coastalTitleEn ?? undefined,
    coastalTitleAr: data.coastalTitleAr ?? undefined,
    coastalCol1En: data.coastalCol1En ?? undefined,
    coastalCol1Ar: data.coastalCol1Ar ?? undefined,
    coastalCol2En: data.coastalCol2En ?? undefined,
    coastalCol2Ar: data.coastalCol2Ar ?? undefined,
    coastalCol3En: data.coastalCol3En ?? undefined,
    coastalCol3Ar: data.coastalCol3Ar ?? undefined,
    coastalHighlightEn: data.coastalHighlightEn ?? undefined,
    coastalHighlightAr: data.coastalHighlightAr ?? undefined,
    galleryImages: data.galleryImages ?? [],
    mapImageUrl: data.mapImageUrl ?? undefined,
    mapLogoUrl: data.mapLogoUrl ?? undefined,
    locationBlurbEn: data.locationBlurbEn ?? undefined,
    locationBlurbAr: data.locationBlurbAr ?? undefined,
    locationLabelEn: data.locationLabelEn ?? undefined,
    locationLabelAr: data.locationLabelAr ?? undefined,
    materialColorsIntroImageUrl: data.materialColorsIntroImageUrl ?? undefined,
    materialColors: (data.materialColors ?? []) as Prisma.InputJsonValue,
    luxuryTitleEn: data.luxuryTitleEn ?? undefined,
    luxuryTitleAr: data.luxuryTitleAr ?? undefined,
    luxuryCol1En: data.luxuryCol1En ?? undefined,
    luxuryCol1Ar: data.luxuryCol1Ar ?? undefined,
    luxuryCol2En: data.luxuryCol2En ?? undefined,
    luxuryCol2Ar: data.luxuryCol2Ar ?? undefined,
    closingImageUrl: data.closingImageUrl ?? undefined,
    facilitiesTitleEn: data.facilitiesTitleEn ?? undefined,
    facilitiesTitleAr: data.facilitiesTitleAr ?? undefined,
    facilitiesEn: data.facilitiesEn ?? [],
    facilitiesAr: data.facilitiesAr ?? [],
    amenities: (data.amenities ?? []) as Prisma.InputJsonValue,
  };
}

export function toProjectCreateData(
  data: ProjectInput,
): Prisma.ProjectCreateInput {
  const base: Prisma.ProjectCreateInput = {
    slug: data.slug,
    titleAr: data.titleAr,
    titleEn: data.titleEn,
    descAr: data.descAr,
    descEn: data.descEn,
    locationAr: data.locationAr,
    locationEn: data.locationEn,
    areaSqm: data.areaSqm ?? undefined,
    completionDate: data.completionDate ?? undefined,
    investmentValue: data.investmentValue ?? undefined,
    videoUrl: data.videoUrl ?? undefined,
    coverImage: data.coverImage,
    images: data.images ?? [],
    featured: data.featured ?? false,
    ...pageFields(data),
  };

  if (data.seo) {
    base.seo = {
      create: {
        metaTitleAr: data.seo.metaTitleAr,
        metaTitleEn: data.seo.metaTitleEn,
        metaDescAr: data.seo.metaDescAr,
        metaDescEn: data.seo.metaDescEn,
        keywordsAr: data.seo.keywordsAr ?? [],
        keywordsEn: data.seo.keywordsEn ?? [],
        ogImage: data.seo.ogImage ?? undefined,
      },
    };
  }

  return base;
}

export function toProjectUpdateData(
  data: ProjectInput,
): Prisma.ProjectUpdateInput {
  const base: Prisma.ProjectUpdateInput = {
    slug: data.slug,
    titleAr: data.titleAr,
    titleEn: data.titleEn,
    descAr: data.descAr,
    descEn: data.descEn,
    locationAr: data.locationAr,
    locationEn: data.locationEn,
    areaSqm: data.areaSqm,
    completionDate: data.completionDate,
    investmentValue: data.investmentValue,
    videoUrl: data.videoUrl,
    coverImage: data.coverImage,
    images: data.images ?? [],
    featured: data.featured ?? false,
    ...pageFields(data),
  };

  if (data.seo) {
    base.seo = {
      upsert: {
        create: {
          metaTitleAr: data.seo.metaTitleAr,
          metaTitleEn: data.seo.metaTitleEn,
          metaDescAr: data.seo.metaDescAr,
          metaDescEn: data.seo.metaDescEn,
          keywordsAr: data.seo.keywordsAr ?? [],
          keywordsEn: data.seo.keywordsEn ?? [],
          ogImage: data.seo.ogImage ?? undefined,
        },
        update: {
          metaTitleAr: data.seo.metaTitleAr,
          metaTitleEn: data.seo.metaTitleEn,
          metaDescAr: data.seo.metaDescAr,
          metaDescEn: data.seo.metaDescEn,
          keywordsAr: data.seo.keywordsAr ?? [],
          keywordsEn: data.seo.keywordsEn ?? [],
          ogImage: data.seo.ogImage ?? undefined,
        },
      },
    };
  }

  return base;
}
