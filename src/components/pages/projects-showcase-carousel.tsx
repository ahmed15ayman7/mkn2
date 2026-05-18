"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ScrollSection } from "@/components/motion/scroll-section";
import { Link } from "@/i18n/navigation";
import type { PublicProjectCard } from "@/lib/projects/public";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;

type Props = { projects: PublicProjectCard[] };

function watermarkWord(title: string): string {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return title;
  return parts[parts.length - 1] ?? title;
}

export function ProjectsShowcaseCarousel({ projects }: Props) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = projects.length;
  const current = projects[active % count]!;

  const goNext = useCallback(() => {
    setActive((a) => (a + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setActive((a) => (a - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count, goNext, active]);

  if (count === 0) {
    return null;
  }

  const mark = watermarkWord(current.title);

  return (
    <ScrollSection preset="projects-carousel" as="section" className="relative bg-white" isRtl={isRtl}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(0 45 50 / 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-6 lg:px-8 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-navy/55">
              {t("portfolio")}
            </p>
            <h2 className="mt-4 text-2xl font-bold uppercase leading-tight tracking-tight text-brand-navy md:text-3xl lg:text-4xl">
              {t("heading")}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-brand-navy/75 md:text-base lg:pt-8">
            {t("body")}
          </p>
        </div>
      </div>

      <div
        className="relative mx-auto max-w-7xl px-4 pb-16 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="flex overflow-hidden border border-brand-navy/10 bg-white shadow-sm">
          <div className="relative min-h-[300px] flex-1 sm:min-h-[360px] lg:min-h-[440px]">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  index === active ? "z-10 opacity-100" : "z-0 opacity-0",
                )}
                aria-hidden={index !== active}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority={index === 0}
                />
              </div>
            ))}

            <div
              className="absolute inset-0 z-20 bg-gradient-to-r from-brand-navy/15 via-brand-navy/25 to-brand-navy/80"
              aria-hidden
            />

            <p
              className="pointer-events-none absolute end-8 top-1/2 z-[15] -translate-y-1/2 select-none text-[clamp(4rem,14vw,11rem)] font-bold leading-none text-white/[0.07]"
              aria-hidden
            >
              {mark}
            </p>

            <div className="absolute inset-y-0 end-0 z-30 flex w-full max-w-md flex-col justify-center px-6 py-8 sm:max-w-lg sm:px-10 md:max-w-xl">
              {current.dateLabel && (
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/65">
                  {current.dateLabel}
                </p>
              )}
              <h3 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {current.title}
              </h3>
              <p className="mt-2 text-sm text-white/85 md:text-base">
                {current.metaLine}
              </p>
              <Link
                href={`/projects/${current.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:gap-3"
              >
                {t("show")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          <nav
            className="flex w-12 shrink-0 flex-col border-s border-brand-navy/10 bg-surface/90 sm:w-14"
            aria-label={t("carouselNav")}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "flex min-h-11 flex-1 items-center justify-center border-b border-brand-navy/8 text-xs font-medium tabular-nums transition last:border-b-0 sm:min-h-12 sm:text-sm",
                  index === active
                    ? "bg-brand-navy/10 font-semibold text-brand-navy"
                    : "text-brand-navy/35 hover:bg-brand-navy/5 hover:text-brand-navy/70",
                )}
                aria-current={index === active ? "true" : undefined}
                aria-label={`${project.title} (${String(index + 1).padStart(2, "0")})`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full border border-brand-navy/15 bg-white p-2.5 text-brand-navy transition hover:bg-surface"
            aria-label={t("prev")}
          >
            <ChevronLeft className="size-5 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full border border-brand-navy/15 bg-white p-2.5 text-brand-navy transition hover:bg-surface"
            aria-label={t("next")}
          >
            <ChevronRight className="size-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </ScrollSection>
  );
}
