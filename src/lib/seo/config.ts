const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mkn.ahmed15ayman7.com";

export const SITE_URL = rawSiteUrl.replace(/\/$/, "");

export const SITE_NAME = "MKN Developments";

export const DEFAULT_OG_IMAGE =
  process.env.NEXT_PUBLIC_OG_IMAGE_URL ?? `${SITE_URL}/logo-mkn-dark.png`;

export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim() || undefined;

export const OG_LOCALE_MAP = {
  en: "en_US",
  ar: "ar_SA",
} as const;

export type SeoLocale = keyof typeof OG_LOCALE_MAP;
