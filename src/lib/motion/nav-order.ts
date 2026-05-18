const NAV_ROUTES = ["/", "/about", "/projects", "/contact"] as const;

/** Strip locale prefix (/en, /ar) from pathname. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|ar)(\/.*)?$/);
  if (!match) return pathname || "/";
  return match[2] || "/";
}

export function getNavIndex(pathname: string): number {
  const path = stripLocale(pathname);

  if (path === "/") return 0;
  if (path.startsWith("/about")) return 1;
  if (path.startsWith("/projects")) return 2;
  if (path.startsWith("/contact")) return 3;

  return -1;
}

/**
 * Direction for page slide: 1 = enter from right (forward in nav), -1 = enter from left.
 */
export function getSlideDirection(
  fromPath: string,
  toPath: string,
  isRtl: boolean,
): 1 | -1 {
  const from = getNavIndex(fromPath);
  const to = getNavIndex(toPath);

  if (from < 0 || to < 0 || from === to) return 1;

  const forward = to > from;
  if (isRtl) return forward ? -1 : 1;
  return forward ? 1 : -1;
}

export { NAV_ROUTES };
