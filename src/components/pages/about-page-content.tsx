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
      <VideoHeroBackdrop videoSrc={heroVideoSrc()} heightClass="min-h-[55vh]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              {t("crumb")}
            </p>
            <h1 className="mt-6 text-5xl font-bold text-white md:text-7xl">
              {t("title")}
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {t("intro")}
          </p>
        </div>
      </VideoHeroBackdrop>

      <div className="bg-primary py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white">
        {t("banner")}
      </div>

      <OurNumbersSection />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <DiamondMedia src={img.eye} alt="" size="lg" />
          <div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              {t("vision")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary/75">
              {t("visionText")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="lg:order-1">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              {t("mission")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary/75">
              {t("missionText")}
            </p>
          </div>
          <div className="lg:order-2">
            <DiamondMedia src={img.target} alt="" size="lg" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <DiamondMedia src={img.hands} alt="" size="lg" />
          <div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              {t("values")}
            </h2>
            <ul className="mt-8 space-y-4">
              {values.map((v) => (
                <li
                  key={v}
                  className="flex items-start gap-3 text-lg text-primary/85"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-footer-grid py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
            {t("why")}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            {t("whyText")}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface">
            <Image
              src={img.chairman}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("chairTitle")}
            </p>
            <blockquote
              className={cn(
                "mt-6 text-2xl leading-relaxed text-primary md:text-3xl",
                "font-[family-name:var(--font-quote)] italic",
              )}
            >
              “{t("quote")}”
            </blockquote>
            <p className="mt-8 text-lg font-semibold text-primary">
              {t("chairName")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
