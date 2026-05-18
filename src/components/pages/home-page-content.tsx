import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { ImageSlider } from "@/components/media/image-slider";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { SectionMarquee } from "@/components/sections/section-marquee";
import {
  featuredSliderImages,
  getHomeGridProjects,
  getHomeProjectThumbs,
  heroVideoSrc,
  lifestyleImage,
} from "@/lib/content/home";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function HomePageContent() {
  const t = await getTranslations("Home");
  const thumbs = getHomeProjectThumbs();
  const grid = getHomeGridProjects();
  const slides = featuredSliderImages().map((src, i) => ({
    src,
    alt: `${t("featuredTitle")} ${i + 1}`,
  }));

  return (
    <>
      <VideoHeroBackdrop videoSrc={heroVideoSrc()}>
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold uppercase tracking-[0.12em] text-white md:text-8xl">
              {t("heroWord")}
            </h1>
            <div className="mt-4 h-0.5 w-24 bg-white" />
          </div>
        </div>
      </VideoHeroBackdrop>

      <section className="bg-accent py-20 text-primary md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em]">
              {t("whoTitle")}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-primary/90 md:text-xl">
              {t("whoBody")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full px-8 shadow-sm",
                )}
              >
                {t("aboutCta")}
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary hover:bg-primary hover:text-white"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-current">
                  ▶
                </span>
                {t("watchVideo")}
              </button>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
            <div className="absolute inset-0 rotate-6 overflow-hidden rounded-lg shadow-xl">
              <Image
                src={thumbs[0].src}
                alt={thumbs[0].caption}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
            <div className="absolute inset-0 -translate-x-6 translate-y-8 -rotate-3 overflow-hidden rounded-lg shadow-xl sm:-translate-x-10">
              <Image
                src={thumbs[1].src}
                alt={thumbs[1].caption}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
            <div className="absolute inset-0 translate-x-10 translate-y-4 rotate-[-8deg] overflow-hidden rounded-lg shadow-xl">
              <Image
                src={thumbs[2].src}
                alt={thumbs[2].caption}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
                {t("projectsTitle")}
              </h2>
              <p className="mt-3 max-w-xl text-primary/70">{t("projectsSub")}</p>
            </div>
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-primary px-8 text-primary",
              )}
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {grid.map((p) => (
              <Link
                key={p.name}
                href="/projects"
                className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-surface"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionMarquee items={grid.map((p) => p.name)} />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div>
            <p className="font-serif text-4xl italic text-primary md:text-5xl">
              {t("featuredTitle")}
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-primary/75 md:text-lg">
              {t("featuredBody")}
            </p>
            <Link
              href="/projects/sea-point"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-10 h-11 rounded-full px-8",
              )}
            >
              {t("viewProject")} →
            </Link>
            <div className="mt-12 flex flex-wrap gap-6 border-t border-primary/10 pt-8 text-sm text-primary/70">
              <span className="font-semibold uppercase tracking-wide">
                {t("featuredTitle").toUpperCase()} — {t("metaLocation")}
              </span>
              <span>{t("metaYear")}</span>
            </div>
          </div>
          <ImageSlider slides={slides} />
        </div>
      </section>

      <section className="relative min-h-[480px]">
        <Image
          src={lifestyleImage()}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/45" />
        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl flex-col justify-between gap-10 px-4 py-16 text-white lg:flex-row lg:px-8">
          <p className="max-w-md text-lg font-medium leading-relaxed">
            {t("lifestyleTop")}
          </p>
          <div className="max-w-md self-end">
            <p className="text-lg leading-relaxed text-white/90">
              {t("lifestyleBottom")}
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-11 rounded-full px-10",
              )}
            >
              {t("contactCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-primary">{t("partnersTitle")}</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:justify-between">
            {["GROHE", "STRABAG", "OFFICES", "HAMAD"].map((name) => (
              <div
                key={name}
                className="flex h-14 min-w-[120px] items-center justify-center rounded border border-primary/10 px-6 text-sm font-semibold uppercase tracking-widest text-primary/50"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
