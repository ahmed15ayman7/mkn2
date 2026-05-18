import { getLocale, getTranslations } from "next-intl/server";
import { AboutHeroMasked } from "@/components/sections/about-hero-masked";
import { DiamondMedia } from "@/components/sections/diamond-media";
import { OurNumbersSection } from "@/components/sections/our-numbers-section";
import { ChairmanMessageSection } from "@/components/sections/chairman-message-section";
import { WhyMknSection } from "@/components/sections/why-mkn-section";
import { img } from "@/lib/content/images";
import Image from "next/image";
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

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Image src={img.eye} alt="" width={300} height={400} />
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl">
              {t("vision")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
              {t("visionText")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="lg:order-2">
            <Image src={img.target} alt="" width={300} height={400} />
          </div>
          <div className="lg:order-1">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl">
              {t("mission")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
              {t("missionText")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Image src={img.hands} alt="" width={300} height={400} />
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl">
              {t("values")}
            </h2>
            <ul className="mt-8 space-y-4">
              {values.map((v) => (
                <li
                  key={v}
                  className="flex items-start gap-3 text-lg text-brand-navy/85"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WhyMknSection
        kicker={t("whyKicker")}
        heading={t("why")}
        paragraph1={t("whyP1")}
        paragraph2={t("whyP2")}
        scrollLabel={t("scrollToTop")}
        isRtl={isRtl}
      />

      <ChairmanMessageSection
        leadershipLabel={t("chairLeadership")}
        title={t("chairTitle")}
        quote={t("quote")}
        signature={t("chairName")}
        scrollLabel={t("scrollToTop")}
        isRtl={isRtl}
      />
    </>
  );
}
