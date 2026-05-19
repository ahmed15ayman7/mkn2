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

export type ProjectApproachColumnKind = "paragraph" | "highlight";

/** Stored in DB (`Project.approachColumns` JSON) — bilingual */
export type ProjectApproachColumn =
  | {
      kind: "paragraph";
      bodyEn: string;
      bodyAr: string;
    }
  | {
      kind: "highlight";
      index: string;
      labelEn: string;
      labelAr: string;
      headlineEn: string;
      headlineAr: string;
    };

export type ProjectApproachColumnView =
  | { kind: "paragraph"; body: string }
  | { kind: "highlight"; index: string; label: string; headline: string };

/** Single credit line — stored inside a group */
export type ProjectCreditItem = {
  roleEn: string;
  roleAr: string;
  nameEn: string;
  nameAr: string;
};

/** Category column — stored in `Project.projectCredits` JSON */
export type ProjectCreditGroup = {
  titleEn: string;
  titleAr: string;
  items: ProjectCreditItem[];
};

export type ProjectCreditEntryView = {
  role: string;
  name: string;
};

export type ProjectCreditGroupView = {
  title: string;
  items: ProjectCreditEntryView[];
};

export type ProjectCreditsView = {
  title: string;
  groups: ProjectCreditGroupView[];
};

export type ProjectContactCtaView = {
  eyebrow: string | null;
  title: string;
  body: string | null;
  buttonLabel: string;
  href: string;
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
 * - approachColumns JSON → approach.columns[]
 * - map* + location* → map.*
 * - luxury* → luxury.*
 * - facilities* → facilities.*
 * - amenities JSON → amenities[]
 * - materialColorsIntroImageUrl + materialColors JSON → materialColors.*
 * - creditsTitleEn/Ar + projectCredits JSON → credits.*
 * - closingImageUrl → closingImage
 * - cta* → contactCta
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
    /** `heroSubtitleEn/Ar` */
    subtitle: string | null;
    stats: {
      labels: {
        startPrice: string;
        startSpace: string;
        delivery: string;
        location: string;
      };
      startPrice: string | null;
      startSpace: string | null;
      delivery: string | null;
      location: string;
    };
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

  approach: {
    columns: ProjectApproachColumnView[];
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

  credits: ProjectCreditsView;

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

  /** Say Hi CTA — after closing image */
  contactCta: ProjectContactCtaView | null;

  amenities: ProjectAmenityView[];
};
