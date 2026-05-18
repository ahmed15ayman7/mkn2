import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { DiamondMedia } from "@/components/sections/diamond-media";
import { OurNumbersSection } from "@/components/sections/our-numbers-section";
import { heroVideoSrc } from "@/lib/content/home";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

export async function AboutPageContent() {
  const t = await getTranslations("About");
  const values = [t("v1"), t("v2"), t("v3"), t("v4"), t("v5")];

  return (
    <>
      <VideoHeroBackdrop
        videoSrc={heroVideoSrc()}
        overlay="hero"
        heightClass="min-h-[52vh] md:min-h-[58vh]"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            {t("title")}
          </h1>
        </div>
      </VideoHeroBackdrop>

      <div className="bg-black py-3.5">
        <p className="text-center text-[11px] font-medium italic uppercase tracking-[0.38em] text-white sm:text-xs">
          {t("banner")}
        </p>
      </div>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-navy/55">
              {t("aboutLabel")}
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl">
              {t("whoHeading")}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-brand-navy/80 md:text-lg">
            {t("intro")}
          </p>
        </div>
        <hr className="mx-auto mt-14 max-w-7xl border-brand-navy/10 px-4 lg:px-8" />
      </section>

      <OurNumbersSection variant="about" />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <DiamondMedia src={img.eye} alt="" size="lg" />
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
            <DiamondMedia src={img.target} alt="" size="lg" />
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
          <DiamondMedia src={img.hands} alt="" size="lg" />
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

      <section className="bg-footer-grid py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="text-5xl font-bold uppercase tracking-tight md:text-7xl">
            {t("why")}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            {t("whyText")}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src={img.chairman}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              className={cn(
                "text-3xl text-brand-navy md:text-4xl",
                "font-[family-name:var(--font-quote)]",
              )}
            >
              {t("chairTitle")}
            </h2>
            <blockquote className="mt-8 text-xl leading-relaxed text-brand-navy/85 md:text-2xl">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>
            <p className="mt-8 text-lg font-semibold text-brand-navy">
              {t("chairName")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
