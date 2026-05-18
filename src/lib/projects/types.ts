export type ProjectAmenityVariant = "default" | "accent" | "muted" | "image";

export type ProjectAmenity = {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  imageUrl?: string | null;
  variant?: ProjectAmenityVariant;
};

export type ProjectPageView = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  heroImage: string;
  heroSubtitle: string | null;
  completionYear: string | null;
  completionLabel: string | null;
  delivery: {
    title: string;
    body1: string | null;
    body2: string | null;
    videoUrl: string | null;
    ctaLabel: string | null;
    ctaUrl: string | null;
  };
  /** YouTube — hero play button → modal */
  panoramicVideo: string | null;
  /** MP4 / YouTube — autoplay background strip (no play button) */
  panoramicBackgroundVideo: string | null;
  panoramicPoster: string | null;
  designGalleryImages: string[];
  coastal: {
    title: string | null;
    col1: string | null;
    col2: string | null;
    col3: string | null;
    highlight: string | null;
  };
  galleryImages: string[];
  map: {
    image: string | null;
    logoUrl: string | null;
    label: string | null;
    blurb: string | null;
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
  amenities: {
    title: string;
    desc: string;
    imageUrl: string | null;
    variant: ProjectAmenityVariant;
  }[];
};
