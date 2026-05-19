import { getTranslations, getLocale } from "next-intl/server";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { HomeFeaturedSection } from "@/components/sections/home-featured-section";
import { HomeLifestyleSection } from "@/components/sections/home-lifestyle-section";
import { HomeProjectsGridSection } from "@/components/sections/home-projects-grid-section";
import { HomeWhoWeAreSection } from "@/components/sections/home-who-we-are-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { SectionMarquee } from "@/components/sections/section-marquee";
import {
  getHomeProjectThumbs,
  heroVideoSrc,
  lifestyleImage,
} from "@/lib/content/home";
import {
  getFeaturedHomeSectionData,
  getPublicProjects,
} from "@/lib/projects/public";
import { cn } from "@/lib/utils";

const btnNavy =
  "inline-flex h-11 items-center justify-center rounded-sm bg-brand-navy px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-navy/90";

const btnSage =
  "inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-brand-sage px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-brand-sage/90";

export async function HomePageContent() {
  const t = await getTranslations("Home");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const thumbs = getHomeProjectThumbs();
  const grid = await getPublicProjects(locale);
  const featured = await getFeaturedHomeSectionData(locale);

  return (
    <>
      <VideoHeroBackdrop
        videoSrc={heroVideoSrc()}
        overlay="hero"
        heightClass="min-h-[98vh] sm:min-h-[95vh]"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl" />
        </div>
      </VideoHeroBackdrop>

      <HomeWhoWeAreSection
        kicker={t("whoKicker")}
        title={t("whoTitle")}
        body={t("whoBody")}
        aboutCta={t("aboutCta")}
        companyProfileCta={t("companyProfile")}
        thumbs={thumbs}
        isRtl={isRtl}
      />

      <HomeProjectsGridSection
        title={t("projectsTitle")}
        subtitle={t("projectsSub")}
        viewAll={t("viewAll")}
        projects={grid}
        btnClass={btnNavy}
      />

      <SectionMarquee items={grid.map((p) => p.title)} />

      <HomeFeaturedSection
        isRtl={isRtl}
        projectSlug={featured.slug}
        featuredTitle={featured.title}
        featuredBody={featured.description}
        viewProject={t("viewProject")}
        viewAll={t("viewAll")}
        metaLocation={featured.location}
        metaYear={featured.dateLabel || t("metaYear")}
        btnSage={cn(btnSage)}
        slides={featured.slides}
      />

      <HomeLifestyleSection
        imageSrc={lifestyleImage()}
        text={t("lifestyleTop")}
        cta={t("contactCta")}
        btnClass={btnNavy}
      />

      <PartnersSection
        kicker={t("partnersKicker")}
        title={t("partnersTitle")}
        isRtl={isRtl}
      />
    </>
  );
}
