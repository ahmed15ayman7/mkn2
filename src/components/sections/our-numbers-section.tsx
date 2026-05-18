"use client";

import { Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "home" | "projects";
};

export function OurNumbersSection({
  className,
  variant = "home",
}: Props) {
  const t = useTranslations("Numbers");
  const locale = useLocale();

  const btnA = variant === "projects" ? t("services") : t("mission");
  const btnB = variant === "projects" ? t("whatsapp") : t("vision");

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-accent py-16 text-primary md:py-24",
        className,
      )}
    >
      <div className="pointer-events-none absolute end-0 top-8 opacity-20 select-none">
        <span className="text-[10rem] font-light leading-none text-primary/20 md:text-[14rem]">
          $
        </span>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex size-14 items-center justify-center rounded-full border-2 border-primary text-primary transition hover:bg-primary hover:text-white"
              aria-label={t("play")}
            >
              <Play className="size-6 fill-current ms-1" />
            </button>
            <p className="max-w-[14rem] text-sm font-medium leading-snug">
              {t("play")}
            </p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {locale === "ar" ? (
              t("title")
            ) : (
              <>
                OUR NUMBER
                <span className="inline-block translate-y-2 text-5xl sm:text-6xl md:text-7xl">
                  S
                </span>
              </>
            )}
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <span className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm">
            {btnA}
          </span>
          <span className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            {btnB}
          </span>
        </div>

        <div className="mt-16 grid gap-12 border-t border-primary/15 pt-12 md:grid-cols-3">
          <Stat value={t("stat1")} label={t("stat1b")} desc={t("desc1")} />
          <Stat value={t("stat2")} label={t("stat2b")} desc={t("desc2")} />
          <Stat value={t("stat3")} label={t("stat3b")} desc={t("desc3")} />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  desc,
}: {
  value: string;
  label: string;
  desc: string;
}) {
  return (
    <div>
      <p className="text-5xl font-bold md:text-6xl">{value}</p>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-primary/70">
        {label}
      </p>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary/80">
        {desc}
      </p>
    </div>
  );
}
