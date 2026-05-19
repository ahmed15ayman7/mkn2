import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import type { StaticSeoPath } from "@/lib/seo/paths";

type StaticPageKey = "home" | "about" | "projects" | "contact";

const PATH_MAP: Record<StaticPageKey, StaticSeoPath> = {
  home: "",
  about: "about",
  projects: "projects",
  contact: "contact",
};

export async function buildStaticPageMetadata(
  locale: AppLocale,
  page: StaticPageKey,
  image: string
) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale,
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    keywords: t(`${page}.keywords`),
    path: PATH_MAP[page],
    ogImage: image,
  });
}
