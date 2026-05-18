import type { Prisma } from "@prisma/client";
import type { ProjectAmenity } from "@/lib/projects/types";

export function parseAmenitiesJson(value: Prisma.JsonValue): ProjectAmenity[] {
  if (!Array.isArray(value)) return [];
  const items: ProjectAmenity[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const o = item as Record<string, unknown>;
    const titleEn = typeof o.titleEn === "string" ? o.titleEn : "";
    const titleAr = typeof o.titleAr === "string" ? o.titleAr : "";
    const descEn = typeof o.descEn === "string" ? o.descEn : "";
    const descAr = typeof o.descAr === "string" ? o.descAr : "";
    if (!titleEn && !titleAr) continue;
    const variant = o.variant;
    const imageUrl = typeof o.imageUrl === "string" ? o.imageUrl : null;
    items.push({
      titleEn,
      titleAr,
      descEn,
      descAr,
      imageUrl,
      variant:
        variant === "accent" ||
        variant === "muted" ||
        variant === "image" ||
        variant === "default"
          ? variant
          : "default",
    });
  }
  return items;
}
