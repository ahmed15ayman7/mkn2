import Image from "next/image";
import { Search } from "lucide-react";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  tagline: string;
  kicker: string;
  whoHeading: string;
  intro: string;
  bannerText: string;
  heroImage?: string;
};

/**
 * About hero: full-height background image with a white sheet on top.
 * The bottom strip reuses the same image (masked window) for "// WHERE … //".
 */
export function AboutHeroMasked({
  title,
  tagline,
  kicker,
  whoHeading,
  intro,
  bannerText,
  heroImage = img.heroArchitecture,
}: Props) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col">
      {/* Full-height background */}
      <div className="pointer-events-none absolute inset-0 h-full min-h-[100dvh]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy/92 via-brand-navy/75 to-brand-navy/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 8h4v4H8V8zm12 0h4v4h-4V8zm12 0h4v4h-4V8zM8 20h4v4H8v-4zm12 0h4v4h-4v-4zm12 0h4v4h-4v-4zM8 32h4v4H8v-4zm12 0h4v4h-4v-4zm12 0h4v4h-4v-4z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
      </div>

      {/* Title on the background (above the white sheet) */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-base text-white/80 md:text-lg">
            {tagline}
          </p>
        </div>
      </div>

      {/* White sheet overlapping the background */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pb-0 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-[0_-8px_40px_rgba(0,45,50,0.12)]">
          <div className="grid gap-10 px-6 py-14 md:grid-cols-2 md:items-start md:gap-16 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div>
              <p className="text-sm font-medium tracking-wide text-brand-navy/45">
                {kicker}
              </p>
              <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl lg:text-5xl">
                {whoHeading}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-brand-navy/75 md:text-lg md:pt-6">
              {intro}
            </p>
          </div>

          {/* Masked banner: same hero image visible through this strip */}
          <div className="relative isolate min-h-[88px] overflow-hidden md:min-h-[100px]">
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt=""
                fill
                className="object-cover object-[70%_55%] brightness-[0.38] saturate-[0.85]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-brand-navy/45" aria-hidden />
            </div>
            <p
              className={cn(
                "relative z-10 flex min-h-[88px] items-center justify-center px-4",
                "text-center text-sm font-bold uppercase tracking-[0.22em] text-white",
                "md:min-h-[100px] md:text-base md:tracking-[0.28em]",
              )}
            >
              <span>// {bannerText} //</span>
            </p>
          </div>

          <button
            type="button"
            className="absolute -bottom-5 start-6 flex size-11 items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-md md:start-10"
            aria-label="Search"
          >
            <Search className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
