import type { Prisma } from "@prisma/client";
import type { ProjectCreditGroup } from "@/lib/projects/types";

export function parseProjectCreditsJson(value: Prisma.JsonValue): ProjectCreditGroup[] {
  if (!Array.isArray(value)) return [];
  const groups: ProjectCreditGroup[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const o = item as Record<string, unknown>;
    const titleEn = typeof o.titleEn === "string" ? o.titleEn.trim() : "";
    const titleAr = typeof o.titleAr === "string" ? o.titleAr.trim() : "";
    if (!titleEn && !titleAr) continue;

    const rawItems = Array.isArray(o.items) ? o.items : [];
    const entries: ProjectCreditGroup["items"] = [];

    for (const entry of rawItems) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
      const e = entry as Record<string, unknown>;
      const roleEn = typeof e.roleEn === "string" ? e.roleEn.trim() : "";
      const roleAr = typeof e.roleAr === "string" ? e.roleAr.trim() : "";
      const nameEn = typeof e.nameEn === "string" ? e.nameEn.trim() : "";
      const nameAr = typeof e.nameAr === "string" ? e.nameAr.trim() : "";
      if (!roleEn && !roleAr && !nameEn && !nameAr) continue;
      entries.push({
        roleEn: roleEn || roleAr,
        roleAr: roleAr || roleEn,
        nameEn: nameEn || nameAr,
        nameAr: nameAr || nameEn,
      });
    }

    if (entries.length === 0) continue;
    groups.push({
      titleEn: titleEn || titleAr,
      titleAr: titleAr || titleEn,
      items: entries,
    });
  }

  return groups;
}
