import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  OG_LOCALE_MAP,
  SITE_NAME,
  TWITTER_HANDLE,
  type SeoLocale,
} from "@/lib/seo/config";
import { absoluteUrl, languageAlternates, type StaticSeoPath } from "@/lib/seo/paths";
import type { AppLocale } from "@/i18n/routing";

export type BuildPageMetadataInput = {
  locale: AppLocale;
  title: string;
  description: string;
  keywords?: string | string[];
  /** Static segment or project slug */
  path: StaticSeoPath | { projectSlug: string };
  ogImage?: string;
  heroImage?: string;
  noIndex?: boolean;
};

function parseKeywords(keywords?: string | string[]): string[] | undefined {
  if (!keywords) return undefined;
  if (Array.isArray(keywords)) return keywords.filter(Boolean);
  return keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

export function resolveOgImage(options: {
  customOg?: string | null;
  heroImage?: string | null;
}): string {
  const candidate = options.customOg ?? options.heroImage;
  if (!candidate) return DEFAULT_OG_IMAGE;
  if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
    return candidate;
  }
  return absoluteUrl(candidate.startsWith("/") ? candidate : `/${candidate}`);
}

function pathForLocale(locale: AppLocale, path: BuildPageMetadataInput["path"]): string {
  if (typeof path === "object" && "projectSlug" in path) {
    return `/${locale}/projects/${path.projectSlug}`;
  }
  const segment = path as StaticSeoPath;
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const { locale, title, description, keywords, path, ogImage, heroImage, noIndex } =
    input;
  const seoLocale = locale as SeoLocale;
  const ogLocale = OG_LOCALE_MAP[seoLocale] ?? OG_LOCALE_MAP.en;
  const alternateLocale = Object.values(OG_LOCALE_MAP).filter(
    (l) => l !== ogLocale,
  );
  const canonicalPath = pathForLocale(locale, path);
  const canonical = absoluteUrl(canonicalPath);
  const imageUrl = resolveOgImage({ customOg: ogImage, heroImage });
  const keywordList = parseKeywords(keywords);

  const languages = languageAlternates((loc) => pathForLocale(loc, path));

  return {
    title,
    description,
    keywords: keywordList,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE, creator: TWITTER_HANDLE } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** Default site-wide metadata for the locale layout */
export function buildDefaultLayoutMetadata(locale: AppLocale): Metadata {
  const seoLocale = locale as SeoLocale;
  const ogLocale = OG_LOCALE_MAP[seoLocale] ?? OG_LOCALE_MAP.en;

  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 1200,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [DEFAULT_OG_IMAGE],
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE } : {}),
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/logo-mkn.png", sizes: "180x180", type: "image/png" }],
    },
  };
}
