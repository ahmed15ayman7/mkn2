import { img } from "@/lib/content/images";
import { DEFAULT_HERO_VIDEO_URL } from "@/lib/constants/media";
import type { Locale } from "@/lib/i18n/config";

export function getHomeCopy(locale: Locale) {
  if (locale === "ar") {
    return {
      heroWord: "الجودة",
      whoTitle: "من نحن",
      whoBody:
        "نطوّر مشاريع عقارية تجمع بين التصميم المعاصر والجودة والمواقع الاستراتيجية لبناء مجتمعات راقية.",
      aboutCta: "من نحن",
      watchVideo: "شاهد الفيديو",
      projectsTitle: "المشاريع",
      projectsSub:
        "اكتشف مشاريعنا التي تشكّل مجتمعات عصرية.",
      viewAll: "عرض الكل",
      projectNames: [
        "Sea Point",
        "Al Khobar Residences",
        "MKN 3",
        "Palm View",
        "Sea View",
        "MKN Residence",
        "Residences",
        "Waterfront",
      ],
      featuredSlug: "sea-point",
      featuredTitle: "Sea Point",
      featuredBody:
        "وجهة ساحلية راقية تجمع بين الإطلالات البحرية والتصميم المعاصر في قلب الخبر.",
      viewProject: "عرض المشروع",
      lifestyleTop:
        "في MKN، نطوّر مشاريع تجمع بين التصميم الحديث والجودة والمواقع المدروسة.",
      lifestyleBottom:
        "هدفنا تقديم مشاريع تلبي تطلعات عملائنا وتتجاوز توقعاتهم.",
      contactCta: "اتصل بنا",
      partnersTitle: "شركاؤنا",
      metaLocation: "الخبر — سكني",
      metaYear: "2024",
    };
  }
  return {
    heroWord: "QUALITY",
    whoTitle: "WHO WE ARE",
    whoBody:
      "We develop real estate projects that combine contemporary design, build quality, and strategic locations for elevated communities.",
    aboutCta: "ABOUT US",
    watchVideo: "WATCH VIDEO",
    projectsTitle: "PROJECTS",
    projectsSub: "Discover our projects shaping modern communities.",
    viewAll: "VIEW ALL",
    projectNames: [
      "Sea Point",
      "Al Khobar Residences",
      "MKN 3",
      "Palm View",
      "Sea View",
      "MKN Residence",
      "Residences",
      "Waterfront",
    ],
    featuredSlug: "sea-point",
    featuredTitle: "Sea Point",
    featuredBody:
      "A refined coastal destination pairing sea views with contemporary design in the heart of Al Khobar.",
    viewProject: "VIEW PROJECT",
    lifestyleTop:
      "At MKN, we develop projects that combine modern design, quality, and strategic locations.",
    lifestyleBottom:
      "Our goal is to deliver developments that meet client needs and exceed expectations.",
    contactCta: "CONTACT US",
    partnersTitle: "Our Partner",
    metaLocation: "Al Khobar · Residential",
    metaYear: "2024",
  };
}

export function getHomeProjectThumbs() {
  return [
    { src: img.interior1, caption: "Sea Point" },
    { src: img.interior2, caption: "Al Khobar Residences" },
    { src: img.interior3, caption: "MKN 3" },
  ] as const;
}

export function getHomeGridProjects() {
  return [
    { src: img.residence, name: "Sea Point" },
    { src: img.interior1, name: "Al Khobar Residences" },
    { src: img.exterior, name: "MKN 3" },
    { src: img.living, name: "Palm View" },
    { src: img.bedroom, name: "Sea View" },
    { src: img.bathroom, name: "MKN Residence" },
    { src: img.kitchen, name: "Residences" },
    { src: img.interior2, name: "Waterfront" },
  ] as const;
}

export function heroVideoSrc() {
  return DEFAULT_HERO_VIDEO_URL;
}

export function featuredSliderImages() {
  return [img.exterior, img.living] as const;
}

export function lifestyleImage() {
  return img.patio;
}
