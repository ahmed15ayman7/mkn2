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
  location: string;
  heroImage: string;
  heroSubtitle: string | null;
  delivery: {
    title: string;
    body1: string | null;
    body2: string | null;
    videoUrl: string | null;
    ctaLabel: string | null;
  };
  panoramicImage: string | null;
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
    label: string | null;
    blurb: string | null;
  };
  luxury: {
    title: string | null;
    col1: string | null;
    col2: string | null;
  };
  closingImage: string | null;
  amenities: {
    title: string;
    desc: string;
    imageUrl: string | null;
    variant: ProjectAmenityVariant;
  }[];
};
