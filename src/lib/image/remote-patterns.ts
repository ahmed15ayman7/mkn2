/**
 * Hostnames allowed for `next/image` optimization.
 * Default includes real.com.eg; extend via NEXT_PUBLIC_IMAGE_ALLOWLIST (comma-separated hostnames).
 */
export function buildImageRemotePatterns(): {
  protocol: "https";
  hostname: string;
  pathname: string;
}[] {
  const extra = (process.env.NEXT_PUBLIC_IMAGE_ALLOWLIST ?? "")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);

  const hostSet = new Set<string>([
    "real.com.eg",
    "images.unsplash.com",
    "plus.unsplash.com",
    ...extra,
  ]);

  return [...hostSet].map((hostname) => ({
    protocol: "https" as const,
    hostname,
    pathname: "/**",
  }));
}
