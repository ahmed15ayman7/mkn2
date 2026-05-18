import type { Prisma } from "@prisma/client";
import type { z } from "zod";
import type { projectBodySchema } from "@/lib/validation/admin";

type ProjectInput = z.infer<typeof projectBodySchema>;

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
