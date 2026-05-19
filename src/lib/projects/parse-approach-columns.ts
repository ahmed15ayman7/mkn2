import type { Prisma } from "@prisma/client";
import type { ProjectApproachColumn } from "@/lib/projects/types";

export function parseApproachColumnsJson(
  value: Prisma.JsonValue,
): ProjectApproachColumn[] {
  if (!Array.isArray(value)) return [];
  const items: ProjectApproachColumn[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const o = item as Record<string, unknown>;
    const kind = o.kind === "highlight" ? "highlight" : "paragraph";

    if (kind === "paragraph") {
      const bodyEn = typeof o.bodyEn === "string" ? o.bodyEn.trim() : "";
      const bodyAr = typeof o.bodyAr === "string" ? o.bodyAr.trim() : "";
      if (!bodyEn && !bodyAr) continue;
      items.push({
        kind: "paragraph",
        bodyEn: bodyEn || bodyAr,
        bodyAr: bodyAr || bodyEn,
      });
      continue;
    }

    const index = typeof o.index === "string" ? o.index.trim() : "";
    const labelEn = typeof o.labelEn === "string" ? o.labelEn.trim() : "";
    const labelAr = typeof o.labelAr === "string" ? o.labelAr.trim() : "";
    const headlineEn = typeof o.headlineEn === "string" ? o.headlineEn.trim() : "";
    const headlineAr = typeof o.headlineAr === "string" ? o.headlineAr.trim() : "";
    if (!labelEn && !labelAr && !headlineEn && !headlineAr) continue;

    items.push({
      kind: "highlight",
      index: index || "01",
      labelEn: labelEn || labelAr,
      labelAr: labelAr || labelEn,
      headlineEn: headlineEn || headlineAr,
      headlineAr: headlineAr || headlineEn,
    });
  }

  return items;
}
