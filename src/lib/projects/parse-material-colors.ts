import type { Prisma } from "@prisma/client";
import type { ProjectMaterialColor } from "@/lib/projects/types";

export function parseMaterialColorsJson(
  value: Prisma.JsonValue,
): ProjectMaterialColor[] {
  if (!Array.isArray(value)) return [];
  const items: ProjectMaterialColor[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const o = item as Record<string, unknown>;
    const category = o.category;
    const nameEn = typeof o.nameEn === "string" ? o.nameEn.trim() : "";
    const nameAr = typeof o.nameAr === "string" ? o.nameAr.trim() : "";
    const hex = normalizeHex(typeof o.hex === "string" ? o.hex : "");
    if (!nameEn && !nameAr) continue;
    if (!hex) continue;

    items.push({
      category: category === "secondary" ? "secondary" : "primary",
      nameEn: nameEn || nameAr,
      nameAr: nameAr || nameEn,
      hex,
      ralCode: typeof o.ralCode === "string" && o.ralCode.trim() ? o.ralCode.trim() : null,
      ncsCode: typeof o.ncsCode === "string" && o.ncsCode.trim() ? o.ncsCode.trim() : null,
    });
  }

  return items;
}

function normalizeHex(value: string): string | null {
  const raw = value.trim();
  if (!raw) return null;
  const withHash = raw.startsWith("#") ? raw : `#${raw}`;
  if (!/^#[0-9A-Fa-f]{6}$/.test(withHash) && !/^#[0-9A-Fa-f]{3}$/.test(withHash)) {
    return null;
  }
  if (withHash.length === 4) {
    const r = withHash[1]!;
    const g = withHash[2]!;
    const b = withHash[3]!;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return withHash.toUpperCase();
}
