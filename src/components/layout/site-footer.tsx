import { getLocale, getTranslations } from "next-intl/server";
import { SiteFooterView } from "@/components/layout/site-footer-view";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const year = new Date().getFullYear();

  return (
    <SiteFooterView
      isRtl={isRtl}
      year={year}
      labels={{
        about: t("about"),
        quick: t("quick"),
        office: t("office"),
        address: t("address"),
        email: t("email"),
        phones: t("phones"),
        rights: t("rights"),
        designedBy: t("designedBy"),
        aboutL: t("aboutL"),
        projects: t("projects"),
        team: t("team"),
        careers: t("careers"),
        blogs: t("blogs"),
        contact: t("contact"),
      }}
    />
  );
}
