export type ProjectAmenityVariant = "default" | "accent" | "muted" | "image";

export type ProjectMaterialColorCategory = "primary" | "secondary";

/** Stored in DB (`Project.materialColors` JSON) — bilingual */
export type ProjectMaterialColor = {
  category: ProjectMaterialColorCategory;
  nameEn: string;
  nameAr: string;
  hex: string;
  ralCode?: string | null;
  ncsCode?: string | null;
};

/** Resolved swatch for the public detail page */
export type ProjectMaterialColorView = {
  category: ProjectMaterialColorCategory;
  categoryLabel: string;
  name: string;
  hex: string;
  ralCode: string | null;
  ncsCode: string | null;
};

/** Stored in DB (`Project.amenities` JSON) — bilingual */
export type ProjectAmenity = {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  imageUrl?: string | null;
  variant?: ProjectAmenityVariant;
};

/** Resolved amenity card for the public detail page */
export type ProjectAmenityView = {
  title: string;
  desc: string;
  imageUrl: string | null;
  variant: ProjectAmenityVariant;
};

/**
 * Public project detail page — locale-resolved mirror of `Project` page sections.
 *
 * Prisma column → view path:
 * - titleEn/Ar, descEn/Ar, locationEn/Ar → title, description, location
 * - coverImage → coverImage (hero background)
 * - heroSubtitleEn/Ar → hero.subtitle
 * - panoramicVideoUrl → videos.heroModal
 * - deliveryVideoUrl → videos.deliveryModal
 * - panoramicBackgroundVideoUrl → videos.background
 * - panoramicImageUrl → videos.backgroundPoster
 * - delivery* + brochureUrl → delivery.*
 * - designGalleryImages + galleryImages + images → gallery.all
 * - coastal* → coastal.*
 * - map* + location* → map.*
 * - luxury* → luxury.*
 * - facilities* → facilities.*
 * - amenities JSON → amenities[]
 * - materialColorsIntroImageUrl + materialColors JSON → materialColors.*
 * - closingImageUrl → closingImage
 */
export type ProjectPageView = {
  slug: string;
  title: string;
  description: string;
  location: string;
  areaSqm: number | null;
  investmentValue: number | null;
  completionYear: string | null;
  completionLabel: string | null;
  coverImage: string;
  images: string[];
  featured: boolean;

  hero: {
    subtitle: string | null;
  };

  videos: {
    /** `panoramicVideoUrl` — Hero ▶ → YouTube modal */
    heroModal: string | null;
    /** `deliveryVideoUrl` — Delivery ▶ → modal */
    deliveryModal: string | null;
    /** `panoramicBackgroundVideoUrl` — full-width autoplay (no button) */
    background: string | null;
    /** `panoramicImageUrl` — poster for background MP4 */
    backgroundPoster: string | null;
  };

  delivery: {
    title: string;
    body1: string | null;
    body2: string | null;
    ctaLabel: string | null;
    /** `brochureUrl` */
    ctaUrl: string | null;
  };

  gallery: {
    designImages: string[];
    galleryImages: string[];
    /** Merged display order: design → gallery → images → cover fallback */
    all: string[];
  };

  coastal: {
    title: string | null;
    col1: string | null;
    col2: string | null;
    col3: string | null;
    highlight: string | null;
  };

  map: {
    image: string | null;
    logoUrl: string | null;
    label: string | null;
    blurb: string | null;
  };

  materialColors: {
    introImage: string | null;
    items: ProjectMaterialColorView[];
  };

  luxury: {
    title: string | null;
    col1: string | null;
    col2: string | null;
  };

  facilities: {
    title: string | null;
    items: string[];
  };

  closingImage: string | null;
  amenities: ProjectAmenityView[];
};
