import { getTranslations } from "next-intl/server";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { OurNumbersSection } from "@/components/sections/our-numbers-section";
import { ProjectsShowcaseSlider } from "@/components/pages/projects-showcase-slider";
import { heroVideoSrc } from "@/lib/content/home";

export async function ProjectsPageContent() {
  const t = await getTranslations("Projects");

  return (
    <>
      <VideoHeroBackdrop videoSrc={heroVideoSrc()} heightClass="min-h-[48vh]">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{t("sub")}</p>
        </div>
      </VideoHeroBackdrop>
      <ProjectsShowcaseSlider />
      <OurNumbersSection variant="projects" />
    </>
  );
}
