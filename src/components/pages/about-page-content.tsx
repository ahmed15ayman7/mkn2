import { getLocale, getTranslations } from "next-intl/server";
import { AboutHeroMasked } from "@/components/sections/about-hero-masked";
import { AboutSplitSection } from "@/components/sections/about-split-section";
import { AboutValuesSection } from "@/components/sections/about-values-section";
import { OurNumbersSection } from "@/components/sections/our-numbers-section";
import { ChairmanMessageSection } from "@/components/sections/chairman-message-section";
import { WhyMknSection } from "@/components/sections/why-mkn-section";
import { img } from "@/lib/content/images";

export async function AboutPageContent() {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const values = [t("v1"), t("v2"), t("v3"), t("v4"), t("v5")];

  return (
    <>
      <AboutHeroMasked
        title={t("title")}
        tagline={t("heroTagline")}
        kicker={t("aboutKicker")}
        whoHeading={t("whoHeading")}
        intro={t("intro")}
        bannerText={t("banner")}
      />

      <OurNumbersSection variant="about" />

      <AboutSplitSection
        imageSrc={img.eye}
        title={t("vision")}
        body={t("visionText")}
        isRtl={isRtl}
      />

      <AboutSplitSection
        imageSrc={img.target}
        title={t("mission")}
        body={t("missionText")}
        imageEnd
        surface
        isRtl={isRtl}
      />

      <AboutValuesSection values={values} title={t("values")} isRtl={isRtl} />

      <WhyMknSection
        kicker={t("whyKicker")}
        heading={t("why")}
        paragraph1={t("whyP1")}
        paragraph2={t("whyP2")}
        isRtl={isRtl}
      />

      <ChairmanMessageSection
        leadershipLabel={t("chairLeadership")}
        title={t("chairTitle")}
        quote={t("quote")}
        signature={t("chairName")}
        isRtl={isRtl}
      />
    </>
  );
}
