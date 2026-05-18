import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import { heroVideoSrc } from "@/lib/content/home";
import { img } from "@/lib/content/images";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function SeaPointProjectContent() {
  const t = await getTranslations("SeaPoint");
  const locale = await getLocale();
  const cards = [
    t("card1"),
    t("card2"),
    t("card3"),
    t("card4"),
    t("card5"),
    t("card6"),
  ];

  return (
    <>
      <VideoHeroBackdrop videoSrc={heroVideoSrc()} heightClass="min-h-[70vh]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2 lg:items-end">
          <div className="max-w-md rounded-sm border border-white/15 bg-primary/85 p-8 text-white shadow-2xl backdrop-blur-md">
            <MknMiniLogo />
            <h1 className="mt-6 text-4xl font-bold md:text-5xl">{t("hero")}</h1>
            <p className="mt-2 text-lg text-white/85">{t("heroAr")}</p>
          </div>
        </div>
      </VideoHeroBackdrop>

      <section className="bg-section-sage py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-6">
            <button
              type="button"
              className="flex size-14 items-center justify-center self-start rounded-full border-2 border-white/60 text-white"
              aria-label="Play"
            >
              ▶
            </button>
            <p className="max-w-prose leading-relaxed text-white/90">
              {t("deliveryP1")}
            </p>
            <p className="max-w-prose text-sm leading-relaxed text-white/75">
              {t("deliveryP2")}
            </p>
          </div>
          <div className="text-center lg:text-start">
            {locale === "ar" ? (
              <p className="text-5xl font-black leading-tight md:text-7xl">
                {t("deliverWord")}
              </p>
            ) : (
              <p className="text-6xl font-black uppercase leading-none tracking-tighter md:text-8xl">
                {t("deliverWord").slice(0, -1)}
                <span className="block text-5xl md:text-7xl">
                  {t("deliverWord").slice(-1)}
                </span>
              </p>
            )}
            <Link
              href="#"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 inline-flex bg-primary text-white hover:bg-primary/90",
              )}
            >
              {t("brochure")}
            </Link>
          </div>
        </div>
      </section>

      <div className="relative h-72 w-full md:h-96">
        <Image
          src={img.coastal}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-primary md:text-5xl">
            {t("coastal")}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-primary/75 md:text-base">
              {t("coastalP1")}
            </p>
            <p className="text-sm leading-relaxed text-primary/75 md:text-base">
              {t("coastalP2")}
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-4 md:grid-rows-3 md:gap-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-2 md:row-span-1">
              <Image src={img.bedroom} alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm md:col-span-2 md:row-span-2 md:row-start-1 md:col-start-3">
              <Image src={img.exterior} alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm md:col-span-4 md:row-span-1">
              <Image src={img.living} alt="" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm md:col-span-2 md:row-span-1">
              <Image src={img.exterior} alt="" fill className="object-cover" sizes="40vw" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-2 md:row-span-1">
              <Image src={img.bathroom} alt="" fill className="object-cover" sizes="40vw" />
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-primary/10 pt-12 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-primary/70">
              {t("coastalP3")}
            </p>
            <p
              className={cn(
                "text-2xl font-semibold leading-snug text-primary md:text-3xl",
                "font-[family-name:var(--font-quote)] italic",
              )}
            >
              “{t("quote")}”
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-[420px]">
        <Image
          src={img.mapAbstract}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/35" />
        <div className="absolute bottom-8 end-8 max-w-sm rounded-sm border border-white/20 bg-white/95 p-6 text-primary shadow-xl backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            {t("mapTitle")}
          </p>
          <p className="mt-2 font-semibold">Sea Point</p>
          <p className="mt-1 text-sm text-primary/70">Al Khobar waterfront</p>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="max-w-xl text-3xl font-bold text-primary md:text-4xl">
            {t("features")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((title, i) => (
              <div
                key={title}
                className={cn(
                  "flex flex-col justify-between rounded-sm border border-primary/10 p-6",
                  i % 3 === 1 ? "bg-accent/25" : i === 4 ? "bg-white" : "bg-white",
                )}
              >
                {i === 2 ? (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-sm">
                    <Image src={img.kitchen} alt="" fill className="object-cover" />
                  </div>
                ) : null}
                <p className="font-semibold text-primary">{title}</p>
                <p className="mt-3 text-sm text-primary/65">
                  {t("cardDesc")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-80 w-full">
        <Image
          src={img.patio}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </>
  );
}

function MknMiniLogo() {
  return (
    <div className="flex size-10 items-center justify-center rounded-sm border border-white/40 text-xs font-bold">
      M
    </div>
  );
}
