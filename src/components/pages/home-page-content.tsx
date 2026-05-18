import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ImageSlider } from "@/components/media/image-slider";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { HomeDiamondCollage } from "@/components/sections/home-diamond-collage";
import { SectionMarquee } from "@/components/sections/section-marquee";
import {
  featuredSliderImages,
  getHomeProjectThumbs,
  heroVideoSrc,
  lifestyleImage,
} from "@/lib/content/home";
import { getPublicProjects } from "@/lib/projects/public";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const btnNavy =
  "inline-flex h-11 items-center justify-center rounded-sm bg-brand-navy px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-navy/90";

const btnSage =
  "inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-brand-sage px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-brand-sage/90";

export async function HomePageContent() {
  const t = await getTranslations("Home");
  const locale = await getLocale();
  const thumbs = getHomeProjectThumbs();
  const grid = await getPublicProjects(locale);
  const slides = featuredSliderImages().map((src, i) => ({
    src,
    alt: `${t("featuredTitle")} ${i + 1}`,
  }));

  return (
    <>
      <VideoHeroBackdrop
        videoSrc={heroVideoSrc()}
        overlay="hero"
        heightClass="min-h-[92vh] sm:min-h-[95vh]"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(3.5rem,12vw,7.5rem)] font-bold leading-[0.95] uppercase tracking-[0.14em] text-white">
              {t("heroWord")}
            </h1>
            <div className="mt-5 h-px w-28 bg-white/90" />
          </div>
        </div>
      </VideoHeroBackdrop>

      <section className="bg-brand-gold py-20 text-brand-navy md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-[0.28em] md:text-3xl">
              {t("whoTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-navy/90 md:text-lg">
              {t("whoBody")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className={btnNavy}>
                {t("aboutCta")}
              </Link>
              <button type="button" className={btnSage}>
                <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/40 text-xs">
                  ▶
                </span>
                {t("watchVideo")}
              </button>
            </div>
          </div>
          <HomeDiamondCollage thumbs={thumbs} />
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tight text-brand-navy md:text-5xl">
                {t("projectsTitle")}
              </h2>
              <p className="mt-3 max-w-xl text-brand-navy/65">{t("projectsSub")}</p>
            </div>
            <Link href="/projects" className={btnNavy}>
              {t("viewAll")}
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="group relative aspect-[4/5] overflow-hidden bg-surface"
              >
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent px-4 pb-4 pt-16">
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionMarquee items={grid.map((p) => p.title)} />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="font-serif text-4xl text-brand-navy md:text-5xl">
                {t("featuredTitle")}
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-navy/75 md:text-lg">
                {t("featuredBody")}
              </p>
              <Link href="/projects/sea-point" className={cn(btnSage, "mt-10")}>
                {t("viewProject")} →
              </Link>
              <div className="mt-12 flex flex-wrap gap-6 border-t border-brand-navy/10 pt-8 text-sm text-brand-navy/60">
                <span className="font-semibold uppercase tracking-wide">
                  {t("featuredTitle").toUpperCase()} — {t("metaLocation")}
                </span>
                <span>{t("metaYear")}</span>
              </div>
            </div>
            <ImageSlider slides={slides} />
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy/10 pt-6 text-sm text-brand-navy/70">
            <span className="font-semibold uppercase tracking-[0.15em]">
              {t("featuredTitle").toUpperCase()} — {t("metaLocation").split("·")[0]?.trim()}
            </span>
            <Link
              href="/projects"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy hover:underline"
            >
              {t("viewAll")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative min-h-[520px]">
        <Image
          src={lifestyleImage()}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-brand-navy/40" />
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-between px-4 py-14 lg:px-8">
          <p className="max-w-lg text-lg font-medium leading-relaxed text-white md:text-xl">
            {t("lifestyleTop")}
          </p>
          <div>
            <Link href="/contact" className={btnNavy}>
              {t("contactCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-navy/10 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <h2 className="shrink-0 text-lg font-bold text-brand-navy">
              {t("partnersTitle")}
            </h2>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-10 md:justify-start md:gap-16">
              <span className="text-xl font-bold tracking-[0.35em] text-brand-navy/40">
                GROHE
              </span>
              <span className="text-lg font-bold text-brand-navy/50" lang="ar">
                حديد اليمامة
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
