export function mergeProjectGalleryImages(
  designImages: string[],
  galleryImages: string[],
  extraImages: string[],
  fallback: string,
): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const url of [...designImages, ...galleryImages, ...extraImages]) {
    const trimmed = url?.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    merged.push(trimmed);
  }
  return merged.length > 0 ? merged : [fallback];
}

export function gallerySlots(images: string[], fallback: string): string[] {
  const base = images.length > 0 ? images : [fallback];
  return Array.from({ length: 5 }, (_, i) => base[i % base.length]!);
}
