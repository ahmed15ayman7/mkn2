import { getTranslations, getLocale } from "next-intl/server";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { OurNumbersSection } from "@/components/sections/our-numbers-section";
import { ProjectsShowcaseCarousel } from "@/components/pages/projects-showcase-carousel";
import { heroVideoSrc } from "@/lib/content/home";
import { getPublicProjects } from "@/lib/projects/public";

export async function ProjectsPageContent() {
  const t = await getTranslations("Projects");
  const locale = await getLocale();
  const projects = await getPublicProjects(locale);

  return (
    <>
      <VideoHeroBackdrop
        videoSrc={heroVideoSrc()}
        overlay="hero"
        heightClass="min-h-[50vh] md:min-h-[56vh]"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            {t("sub")}
          </p>
        </div>
      </VideoHeroBackdrop>
      <ProjectsShowcaseCarousel projects={projects} />
      <OurNumbersSection variant="projects" />
    </>
  );
}
