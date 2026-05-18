"use client";

import { Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { TransitionLink } from "@/components/motion/transition-link";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "home" | "projects" | "about";
};

export function OurNumbersSection({
  className,
  variant = "home",
}: Props) {
  const t = useTranslations("Numbers");
  const locale = useLocale();

  const isAbout = variant === "about";
  const isProjects = variant === "projects";

  if (isProjects) {
    return (
      <ScrollSection
        preset="projects-numbers"
        className={cn(
          "relative overflow-hidden bg-brand-gold py-16 text-brand-navy md:py-24",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute bottom-0 end-0 size-24 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #002d32 0, #002d32 1px, transparent 0, transparent 50%)",
            backgroundSize: "8px 8px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="space-y-12">
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-navy text-brand-navy transition hover:bg-brand-navy hover:text-white"
                  aria-label={t("play")}
                >
                  <Play className="ms-0.5 size-6 fill-current" />
                </button>
                <p className="max-w-[12rem] pt-3 text-sm font-medium uppercase leading-snug tracking-wide text-brand-navy/85">
                  {t("play")}
                </p>
              </div>

              <StaggerChildren preset="projects-numbers" className="grid gap-10 border-t border-brand-navy/15 pt-10 md:grid-cols-3">
                <Stat preset="projects-numbers" index={0} value={t("stat1")} label={t("stat1b")} desc={t("desc1")} />
                <Stat preset="projects-numbers" index={1} value={t("stat2")} label={t("stat2b")} desc={t("desc2")} />
                <Stat preset="projects-numbers" index={2} value={t("stat3")} label={t("stat3b")} desc={t("desc3")} />
              </StaggerChildren>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex h-11 items-center rounded-sm bg-white px-6 text-xs font-semibold uppercase tracking-wide text-brand-navy shadow-sm">
                  {t("services")}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-sm bg-brand-navy px-6 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-brand-navy/90"
                >
                  {t("whatsapp")}
                </Link>
              </div>
            </div>

            <h2 className="hidden shrink-0 flex-col items-end text-end font-bold leading-[0.88] tracking-tight text-brand-navy lg:flex">
              {locale === "ar" ? (
                <span className="text-5xl xl:text-6xl">{t("title")}</span>
              ) : (
                <>
                  <span className="text-5xl xl:text-7xl">OUR</span>
                  <span className="text-5xl xl:text-7xl">NUMBER</span>
                  <span className="text-5xl xl:text-7xl">S</span>
                </>
              )}
            </h2>
          </div>
        </div>
      </ScrollSection>
    );
  }

  return (
    <ScrollSection
      preset="about-numbers"
      className={cn(
        "relative overflow-hidden bg-brand-gold py-16 text-brand-navy md:py-24",
        className,
      )}
    >
      <div className="pointer-events-none absolute end-0 top-6 select-none opacity-[0.12]">
        <span className="text-[9rem] font-light leading-none md:text-[12rem]">
          $
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isAbout && (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-navy/55">
            {t("legacy")}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-navy text-brand-navy transition hover:bg-brand-navy hover:text-white"
              aria-label={t("play")}
            >
              <Play className="ms-0.5 size-6 fill-current" />
            </button>
            <p className="max-w-[11rem] pt-3 text-sm font-medium leading-snug text-brand-navy/85">
              {isAbout ? t("journey") : t("play")}
            </p>
          </div>

          <h2
            className={cn(
              "font-bold leading-[0.9] tracking-tight text-brand-navy",
              isAbout
                ? "text-5xl sm:text-6xl md:text-7xl"
                : "text-4xl sm:text-5xl md:text-6xl",
            )}
          >
            {locale === "ar" ? (
              t("title")
            ) : (
              <span className="block">
                OUR NUMBER
                <span className="mt-1 block text-[0.92em]">S</span>
              </span>
            )}
          </h2>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {variant === "about" ? (
              <>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-navy shadow-sm transition hover:bg-white/90"
                >
                  <Play className="size-3.5 fill-current" />
                  {t("projectsCta")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-brand-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-brand-navy/90"
                >
                  {t("contactCta")}
                </Link>
              </>
            ) : (
              <>
                <span className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-navy shadow-sm">
                  {t("mission")}
                </span>
                <span className="rounded-full bg-brand-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                  {t("vision")}
                </span>
              </>
            )}
          </div>
        </div>

        <div
          className="mt-12 flex justify-center gap-3 overflow-hidden text-brand-navy/25"
          aria-hidden
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="text-lg font-light">
              $
            </span>
          ))}
        </div>

        <StaggerChildren preset="about-numbers" className="mt-12 grid gap-12 border-t border-brand-navy/15 pt-12 md:grid-cols-3">
          <Stat preset="about-numbers" index={0} value={t("stat1")} label={t("stat1b")} desc={t("desc1")} />
          <Stat preset="about-numbers" index={1} value={t("stat2")} label={t("stat2b")} desc={t("desc2")} />
          <Stat preset="about-numbers" index={2} value={t("stat3")} label={t("stat3b")} desc={t("desc3")} />
        </StaggerChildren>
      </div>
    </ScrollSection>
  );
}

function Stat({
  preset,
  index,
  value,
  label,
  desc,
}: {
  preset: "about-numbers" | "projects-numbers";
  index: number;
  value: string;
  label: string;
  desc: string;
}) {
  return (
    <ScrollReveal preset={preset} variantKey="card" custom={index}>
      <div>
        <p className="text-5xl font-bold md:text-6xl">{value}</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-navy/65">
          {label}
        </p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-navy/80">
          {desc}
        </p>
      </div>
    </ScrollReveal>
  );
}
