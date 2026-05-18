import type { Variants } from "framer-motion";

export type SectionPresetId =
  | "page-hero"
  | "home-who-we-are"
  | "home-projects-grid"
  | "home-marquee"
  | "home-featured"
  | "home-lifestyle"
  | "home-partners"
  | "about-hero"
  | "about-numbers"
  | "about-split"
  | "about-why-mkn"
  | "about-chairman"
  | "projects-carousel"
  | "projects-numbers"
  | "contact-hero"
  | "contact-info"
  | "contact-form"
  | "contact-careers"
  | "project-hero"
  | "project-delivery"
  | "project-gallery"
  | "project-amenities"
  | "project-closing"
  | "site-footer";

export type SectionVariantKey =
  | "section"
  | "container"
  | "item"
  | "kicker"
  | "title"
  | "body"
  | "media"
  | "cta"
  | "card"
  | "column";

export type SectionPreset = {
  section: Variants;
  container?: Variants;
  item?: Variants | ((i: number) => Variants);
  kicker?: Variants;
  title?: Variants;
  body?: Variants;
  media?: Variants | ((i: number) => Variants);
  cta?: Variants;
  card?: Variants | ((i: number) => Variants);
  column?: Variants | ((i: number) => Variants);
};
