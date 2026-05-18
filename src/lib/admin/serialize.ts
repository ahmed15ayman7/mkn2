import type { Inquiry, Partner, Project, SeoMetadata } from "@prisma/client";

export type SerializedProject = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  locationAr: string;
  locationEn: string;
  areaSqm: string | null;
  completionDate: string | null;
  investmentValue: string | null;
  videoUrl: string | null;
  coverImage: string;
  images: string[];
  featured: boolean;
  seo: {
    metaTitleAr: string;
    metaTitleEn: string;
    metaDescAr: string;
    metaDescEn: string;
    keywordsAr: string[];
    keywordsEn: string[];
    ogImage: string | null;
  } | null;
};

export function serializeProject(
  project: Project & { seo: SeoMetadata | null },
): SerializedProject {
  return {
    id: project.id,
    slug: project.slug,
    titleAr: project.titleAr,
    titleEn: project.titleEn,
    descAr: project.descAr,
    descEn: project.descEn,
    locationAr: project.locationAr,
    locationEn: project.locationEn,
    areaSqm: project.areaSqm?.toString() ?? null,
    completionDate: project.completionDate
      ? project.completionDate.toISOString().slice(0, 10)
      : null,
    investmentValue: project.investmentValue?.toString() ?? null,
    videoUrl: project.videoUrl,
    coverImage: project.coverImage,
    images: project.images,
    featured: project.featured,
    seo: project.seo
      ? {
          metaTitleAr: project.seo.metaTitleAr,
          metaTitleEn: project.seo.metaTitleEn,
          metaDescAr: project.seo.metaDescAr,
          metaDescEn: project.seo.metaDescEn,
          keywordsAr: project.seo.keywordsAr,
          keywordsEn: project.seo.keywordsEn,
          ogImage: project.seo.ogImage,
        }
      : null,
  };
}

export type SerializedPartner = Omit<Partner, "createdAt"> & {
  createdAt: string;
};

export function serializePartner(partner: Partner): SerializedPartner {
  return {
    ...partner,
    createdAt: partner.createdAt.toISOString(),
  };
}

export type SerializedInquiry = Omit<Inquiry, "createdAt"> & {
  createdAt: string;
};

export function serializeInquiry(inquiry: Inquiry): SerializedInquiry {
  return {
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
  };
}
