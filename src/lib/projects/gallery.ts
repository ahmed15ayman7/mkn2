export function gallerySlots(images: string[], fallback: string): string[] {
  const base = images.length > 0 ? images : [fallback];
  return Array.from({ length: 5 }, (_, i) => base[i % base.length]!);
}
