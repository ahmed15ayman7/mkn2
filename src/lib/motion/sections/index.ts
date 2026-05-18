import { aboutChairmanMotion } from "./about-chairman";
import { aboutHeroMotion } from "./about-hero";
import { aboutNumbersMotion } from "./about-numbers";
import { aboutSplitMotion } from "./about-split";
import { aboutWhyMknMotion } from "./about-why-mkn";
import { contactCareersMotion } from "./contact-careers";
import { contactFormMotion } from "./contact-form";
import { contactHeroMotion } from "./contact-hero";
import { contactInfoMotion } from "./contact-info";
import { homeFeaturedMotion } from "./home-featured";
import { homeLifestyleMotion } from "./home-lifestyle";
import { homeMarqueeMotion } from "./home-marquee";
import { homePartnersMotion } from "./home-partners";
import { homeProjectsGridMotion } from "./home-projects-grid";
import { homeWhoWeAreMotion } from "./home-who-we-are";
import { pageHeroMotion } from "./page-hero";
import { projectAmenitiesMotion } from "./project-amenities";
import { projectClosingMotion } from "./project-closing";
import { projectDeliveryMotion } from "./project-delivery";
import { projectGalleryMotion } from "./project-gallery";
import { projectHeroMotion } from "./project-hero";
import { projectsCarouselMotion } from "./projects-carousel";
import { projectsNumbersMotion } from "./projects-numbers";
import { siteFooterMotion } from "./site-footer";
import type { SectionPreset, SectionPresetId } from "./types";

export type { SectionPreset, SectionPresetId, SectionVariantKey } from "./types";

const staticPresets: Record<string, SectionPreset> = {
  "page-hero": pageHeroMotion,
  "home-who-we-are": homeWhoWeAreMotion,
  "home-projects-grid": homeProjectsGridMotion,
  "home-marquee": homeMarqueeMotion,
  "home-lifestyle": homeLifestyleMotion,
  "home-partners": homePartnersMotion,
  "about-hero": aboutHeroMotion,
  "about-numbers": aboutNumbersMotion,
  "about-why-mkn": aboutWhyMknMotion,
  "about-chairman": aboutChairmanMotion(false),
  "projects-numbers": projectsNumbersMotion,
  "contact-hero": contactHeroMotion,
  "contact-info": contactInfoMotion,
  "contact-form": contactFormMotion,
  "project-hero": projectHeroMotion,
  "project-delivery": projectDeliveryMotion,
  "project-gallery": projectGalleryMotion,
  "project-amenities": projectAmenitiesMotion,
  "project-closing": projectClosingMotion,
  "site-footer": siteFooterMotion,
};

export function getSectionPreset(id: SectionPresetId): SectionPreset {
  if (id === "home-featured") return homeFeaturedMotion(false);
  if (id === "about-split") return aboutSplitMotion(false);
  if (id === "projects-carousel") return projectsCarouselMotion(false);
  if (id === "contact-careers") return contactCareersMotion(false);
  return staticPresets[id] ?? pageHeroMotion;
}

export function getSectionPresetRtl(
  id: SectionPresetId,
  isRtl: boolean,
): SectionPreset {
  if (id === "home-featured") return homeFeaturedMotion(isRtl);
  if (id === "about-split") return aboutSplitMotion(isRtl);
  if (id === "about-chairman") return aboutChairmanMotion(isRtl);
  if (id === "projects-carousel") return projectsCarouselMotion(isRtl);
  if (id === "contact-careers") return contactCareersMotion(isRtl);
  return getSectionPreset(id);
}
