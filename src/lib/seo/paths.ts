import { routing, type AppLocale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo/config";

export type StaticSeoPath = "" | "about" | "projects" | "contact";

export function localePath(locale: AppLocale, path: StaticSeoPath): string {
  const segment = path ? `/${path}` : "";
  return `/${locale}${segment}`;
}

export function projectPath(locale: AppLocale, slug: string): string {
  return `/${locale}/projects/${slug}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** hreflang map for a route that exists in every locale */
export function languageAlternates(
  pathBuilder: (locale: AppLocale) => string,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(pathBuilder(locale as AppLocale));
  }
  languages["x-default"] = absoluteUrl(
    pathBuilder(routing.defaultLocale as AppLocale),
  );
  return languages;
}
