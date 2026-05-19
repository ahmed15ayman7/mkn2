import type { Project } from "@prisma/client";
import type { ProjectContactCtaView } from "@/lib/projects/types";

function pick(
  locale: string,
  en: string | null | undefined,
  ar: string | null | undefined,
) {
  const value = locale === "ar" ? ar : en;
  return value?.trim() ? value : null;
}

function normalizeWhatsappHref(url: string | null | undefined, locale: string): string {
  const raw = url?.trim();
  if (!raw) return `/${locale}/contact`;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("wa.me/")) return `https://${raw}`;
  const digits = raw.replace(/\D/g, "");
  if (digits.length > 0) return `https://wa.me/${digits}`;
  return `/${locale}/contact`;
}

function hasContactCtaFields(project: Project): boolean {
  return [
    project.ctaEyebrowEn,
    project.ctaEyebrowAr,
    project.ctaTitleEn,
    project.ctaTitleAr,
    project.ctaBodyEn,
    project.ctaBodyAr,
    project.ctaButtonEn,
    project.ctaButtonAr,
    project.ctaWhatsappUrl,
  ].some((v) => v?.trim());
}

export function buildProjectContactCta(
  project: Project,
  locale: string,
): ProjectContactCtaView | null {
  if (!hasContactCtaFields(project)) return null;

  return {
    eyebrow:
      pick(locale, project.ctaEyebrowEn, project.ctaEyebrowAr) ??
      (locale === "ar" ? "يسعدنا سماعك" : "WE WOULD LOVE TO HEAR FROM YOU"),
    title:
      pick(locale, project.ctaTitleEn, project.ctaTitleAr) ??
      (locale === "ar" ? "قل مرحباً" : "SAY HI"),
    body:
      pick(locale, project.ctaBodyEn, project.ctaBodyAr) ??
      (locale === "ar"
        ? "أخبرنا عن مشروعك. لنتعاون ونصنع شيئاً رائعاً معاً."
        : "Tell us about your project. Let's collaborate and make some great stuff together."),
    buttonLabel:
      pick(locale, project.ctaButtonEn, project.ctaButtonAr) ??
      (locale === "ar" ? "تواصل واتساب" : "DROP US A LINE"),
    href: normalizeWhatsappHref(project.ctaWhatsappUrl, locale),
  };
}
