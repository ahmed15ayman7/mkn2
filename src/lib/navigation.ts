import { getTranslations } from "next-intl/server";

export async function getMainNav() {
  const t = await getTranslations("Nav");
  return [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ] as const;
}
