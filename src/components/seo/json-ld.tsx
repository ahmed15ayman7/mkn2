import { getTranslations } from "next-intl/server";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo/config";

export async function OrganizationJsonLd() {
  const t = await getTranslations("Footer");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    email: t("email"),
    telephone: t("phones"),
    address: {
      "@type": "PostalAddress",
      streetAddress: t("address"),
      addressLocality: "Al Khobar",
      addressRegion: "Eastern Province",
      addressCountry: "SA",
    },
    sameAs: [] as string[],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
