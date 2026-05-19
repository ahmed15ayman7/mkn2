/**
 * Project detail page fields — mirrors `model Project` in prisma/schema.prisma.
 * Admin/API use bilingual columns; public pages use `ProjectPageView` (locale-resolved).
 */

/** Core project identity & listing (Prisma root fields) */
export const PROJECT_CORE_FIELDS = [
  "slug",
  "titleAr",
  "titleEn",
  "descAr",
  "descEn",
  "locationAr",
  "locationEn",
  "areaSqm",
  "completionDate",
  "investmentValue",
  "videoUrl",
  "coverImage",
  "images",
  "featured",
] as const;

/** Hero overlay on detail page */
export const PROJECT_HERO_FIELDS = ["heroSubtitleEn", "heroSubtitleAr"] as const;

/** Three videos — hero modal, delivery modal, autoplay background */
export const PROJECT_VIDEO_FIELDS = [
  "panoramicVideoUrl",
  "deliveryVideoUrl",
  "panoramicBackgroundVideoUrl",
  "panoramicImageUrl",
] as const;

/** Sage delivery block */
export const PROJECT_DELIVERY_FIELDS = [
  "deliveryTitleEn",
  "deliveryTitleAr",
  "deliveryBody1En",
  "deliveryBody1Ar",
  "deliveryBody2En",
  "deliveryBody2Ar",
  "deliveryCtaEn",
  "deliveryCtaAr",
  "brochureUrl",
] as const;

/** Coastal section + masonry gallery sources */
export const PROJECT_COASTAL_FIELDS = [
  "coastalTitleEn",
  "coastalTitleAr",
  "coastalCol1En",
  "coastalCol1Ar",
  "coastalCol2En",
  "coastalCol2Ar",
  "coastalCol3En",
  "coastalCol3Ar",
  "coastalHighlightEn",
  "coastalHighlightAr",
  "designGalleryImages",
  "galleryImages",
] as const;

export const PROJECT_APPROACH_FIELDS = ["approachColumns"] as const;

export const PROJECT_MAP_FIELDS = [
  "mapImageUrl",
  "mapLogoUrl",
  "locationLabelEn",
  "locationLabelAr",
  "locationBlurbEn",
  "locationBlurbAr",
] as const;

export const PROJECT_MATERIAL_COLORS_FIELDS = [
  "materialColorsIntroImageUrl",
  "materialColors",
] as const;

export const PROJECT_CREDITS_FIELDS = [
  "creditsTitleEn",
  "creditsTitleAr",
  "projectCredits",
] as const;

export const PROJECT_LUXURY_FIELDS = [
  "luxuryTitleEn",
  "luxuryTitleAr",
  "luxuryCol1En",
  "luxuryCol1Ar",
  "luxuryCol2En",
  "luxuryCol2Ar",
] as const;

export const PROJECT_FACILITIES_FIELDS = [
  "facilitiesTitleEn",
  "facilitiesTitleAr",
  "facilitiesEn",
  "facilitiesAr",
] as const;

export const PROJECT_CLOSING_FIELDS = ["closingImageUrl"] as const;

export const PROJECT_CONTACT_CTA_FIELDS = [
  "ctaEyebrowEn",
  "ctaEyebrowAr",
  "ctaTitleEn",
  "ctaTitleAr",
  "ctaBodyEn",
  "ctaBodyAr",
  "ctaButtonEn",
  "ctaButtonAr",
  "ctaWhatsappUrl",
] as const;

export const PROJECT_AMENITIES_FIELD = "amenities" as const;

/** All bilingual page-content columns (for admin create/update Pick) */
export const PROJECT_PAGE_CONTENT_FIELDS = [
  ...PROJECT_HERO_FIELDS,
  ...PROJECT_VIDEO_FIELDS,
  ...PROJECT_DELIVERY_FIELDS,
  ...PROJECT_COASTAL_FIELDS,
  ...PROJECT_APPROACH_FIELDS,
  ...PROJECT_MAP_FIELDS,
  ...PROJECT_MATERIAL_COLORS_FIELDS,
  ...PROJECT_CREDITS_FIELDS,
  ...PROJECT_LUXURY_FIELDS,
  ...PROJECT_FACILITIES_FIELDS,
  ...PROJECT_CLOSING_FIELDS,
  ...PROJECT_CONTACT_CTA_FIELDS,
  PROJECT_AMENITIES_FIELD,
] as const;
