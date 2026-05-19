import type { Inquiry, Partner, Project, SeoMetadata } from "@prisma/client";
import { parseAmenitiesJson } from "@/lib/projects/parse-amenities";
import { parseMaterialColorsJson } from "@/lib/projects/parse-material-colors";
import { parseApproachColumnsJson } from "@/lib/projects/parse-approach-columns";
import { parseProjectCreditsJson } from "@/lib/projects/parse-project-credits";
import type {
  ProjectAmenity,
  ProjectApproachColumn,
  ProjectCreditGroup,
  ProjectMaterialColor,
} from "@/lib/projects/types";

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
  heroSubtitleEn: string | null;
  heroSubtitleAr: string | null;
  deliveryTitleEn: string | null;
  deliveryTitleAr: string | null;
  deliveryBody1En: string | null;
  deliveryBody1Ar: string | null;
  deliveryBody2En: string | null;
  deliveryBody2Ar: string | null;
  deliveryVideoUrl: string | null;
  deliveryCtaEn: string | null;
  deliveryCtaAr: string | null;
  brochureUrl: string | null;
  panoramicImageUrl: string | null;
  panoramicVideoUrl: string | null;
  panoramicBackgroundVideoUrl: string | null;
  designGalleryImages: string[];
  coastalTitleEn: string | null;
  coastalTitleAr: string | null;
  coastalCol1En: string | null;
  coastalCol1Ar: string | null;
  coastalCol2En: string | null;
  coastalCol2Ar: string | null;
  coastalCol3En: string | null;
  coastalCol3Ar: string | null;
  coastalHighlightEn: string | null;
  coastalHighlightAr: string | null;
  galleryImages: string[];
  approachColumns: ProjectApproachColumn[];
  mapImageUrl: string | null;
  mapLogoUrl: string | null;
  locationBlurbEn: string | null;
  locationBlurbAr: string | null;
  locationLabelEn: string | null;
  locationLabelAr: string | null;
  materialColorsIntroImageUrl: string | null;
  materialColors: ProjectMaterialColor[];
  creditsTitleEn: string | null;
  creditsTitleAr: string | null;
  projectCredits: ProjectCreditGroup[];
  luxuryTitleEn: string | null;
  luxuryTitleAr: string | null;
  luxuryCol1En: string | null;
  luxuryCol1Ar: string | null;
  luxuryCol2En: string | null;
  luxuryCol2Ar: string | null;
  closingImageUrl: string | null;
  ctaEyebrowEn: string | null;
  ctaEyebrowAr: string | null;
  ctaTitleEn: string | null;
  ctaTitleAr: string | null;
  ctaBodyEn: string | null;
  ctaBodyAr: string | null;
  ctaButtonEn: string | null;
  ctaButtonAr: string | null;
  ctaWhatsappUrl: string | null;
  facilitiesTitleEn: string | null;
  facilitiesTitleAr: string | null;
  facilitiesEn: string[];
  facilitiesAr: string[];
  amenities: ProjectAmenity[];
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
    heroSubtitleEn: project.heroSubtitleEn,
    heroSubtitleAr: project.heroSubtitleAr,
    deliveryTitleEn: project.deliveryTitleEn,
    deliveryTitleAr: project.deliveryTitleAr,
    deliveryBody1En: project.deliveryBody1En,
    deliveryBody1Ar: project.deliveryBody1Ar,
    deliveryBody2En: project.deliveryBody2En,
    deliveryBody2Ar: project.deliveryBody2Ar,
    deliveryVideoUrl: project.deliveryVideoUrl,
    deliveryCtaEn: project.deliveryCtaEn,
    deliveryCtaAr: project.deliveryCtaAr,
    brochureUrl: project.brochureUrl,
    panoramicImageUrl: project.panoramicImageUrl,
    panoramicVideoUrl: project.panoramicVideoUrl,
    panoramicBackgroundVideoUrl: project.panoramicBackgroundVideoUrl,
    designGalleryImages: project.designGalleryImages,
    coastalTitleEn: project.coastalTitleEn,
    coastalTitleAr: project.coastalTitleAr,
    coastalCol1En: project.coastalCol1En,
    coastalCol1Ar: project.coastalCol1Ar,
    coastalCol2En: project.coastalCol2En,
    coastalCol2Ar: project.coastalCol2Ar,
    coastalCol3En: project.coastalCol3En,
    coastalCol3Ar: project.coastalCol3Ar,
    coastalHighlightEn: project.coastalHighlightEn,
    coastalHighlightAr: project.coastalHighlightAr,
    galleryImages: project.galleryImages,
    approachColumns: parseApproachColumnsJson(project.approachColumns),
    mapImageUrl: project.mapImageUrl,
    mapLogoUrl: project.mapLogoUrl,
    locationBlurbEn: project.locationBlurbEn,
    locationBlurbAr: project.locationBlurbAr,
    locationLabelEn: project.locationLabelEn,
    locationLabelAr: project.locationLabelAr,
    materialColorsIntroImageUrl: project.materialColorsIntroImageUrl,
    materialColors: parseMaterialColorsJson(project.materialColors),
    creditsTitleEn: project.creditsTitleEn,
    creditsTitleAr: project.creditsTitleAr,
    projectCredits: parseProjectCreditsJson(project.projectCredits),
    luxuryTitleEn: project.luxuryTitleEn,
    luxuryTitleAr: project.luxuryTitleAr,
    luxuryCol1En: project.luxuryCol1En,
    luxuryCol1Ar: project.luxuryCol1Ar,
    luxuryCol2En: project.luxuryCol2En,
    luxuryCol2Ar: project.luxuryCol2Ar,
    closingImageUrl: project.closingImageUrl,
    ctaEyebrowEn: project.ctaEyebrowEn,
    ctaEyebrowAr: project.ctaEyebrowAr,
    ctaTitleEn: project.ctaTitleEn,
    ctaTitleAr: project.ctaTitleAr,
    ctaBodyEn: project.ctaBodyEn,
    ctaBodyAr: project.ctaBodyAr,
    ctaButtonEn: project.ctaButtonEn,
    ctaButtonAr: project.ctaButtonAr,
    ctaWhatsappUrl: project.ctaWhatsappUrl,
    facilitiesTitleEn: project.facilitiesTitleEn,
    facilitiesTitleAr: project.facilitiesTitleAr,
    facilitiesEn: project.facilitiesEn,
    facilitiesAr: project.facilitiesAr,
    amenities: parseAmenitiesJson(project.amenities),
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
