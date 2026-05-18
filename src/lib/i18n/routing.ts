import { defaultLocale, isLocale, locales, type Locale } from "./config";

const LOCALE_PREFIX = /^\/(en|ar)(\/|$)/;

/**
 * Strips the `/{locale}` prefix for pattern matching in the proxy when needed.
 */
export function pathnameWithoutLocale(pathname: string): string {
  if (pathname === `/${defaultLocale}`) {
    return "/";
  }
  const stripped = pathname.replace(LOCALE_PREFIX, "/");
  return stripped === "" ? "/" : stripped;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && isLocale(seg)) {
    return seg;
  }
  return null;
}

export { defaultLocale, isLocale, locales };
export type { Locale };
