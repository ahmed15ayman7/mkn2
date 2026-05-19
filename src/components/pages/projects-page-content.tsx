import { getTranslations, getLocale } from "next-intl/server";
import { OurNumbersSection } from "@/components/sections/our-numbers-section";
import { ProjectsShowcaseCarousel } from "@/components/pages/projects-showcase-carousel";
import { getPublicProjects } from "@/lib/projects/public";
import { ImageHero } from "@/components/sections/image-hero";
import { img } from "@/lib/content/images";

export async function ProjectsPageContent() {
  const t = await getTranslations("Projects");
  const locale = await getLocale();
  const projects = await getPublicProjects(locale);

  return (
    <>
      <ImageHero 
        image={img.projectsHero}
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
      </ImageHero>
      <ProjectsShowcaseCarousel projects={projects} />
      <OurNumbersSection variant="projects" />
    </>
  );
}
