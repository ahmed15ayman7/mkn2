"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Al Rahbah Residences",
    date: "JUNE 9, 2023",
    meta: "Bristol, England — 23,500 m²",
    image: img.residence,
  },
  {
    title: "Sea Point",
    date: "MARCH 12, 2024",
    meta: "Al Khobar — Coastal residential",
    image: img.exterior,
  },
  {
    title: "Palm View",
    date: "AUG 2, 2022",
    meta: "Waterfront — 18,200 m²",
    image: img.living,
  },
  {
    title: "MKN 3",
    date: "NOV 18, 2023",
    meta: "Urban core — mixed use",
    image: img.interior1,
  },
  {
    title: "Sea View",
    date: "JAN 5, 2024",
    meta: "Coastal — 12,400 m²",
    image: img.bedroom,
  },
] as const;

const NAV_COUNT = 8;

export function ProjectsShowcaseSlider() {
  const t = useTranslations("Projects");
  const [active, setActive] = useState(2);

  const current = slides[active % slides.length];

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(0 45 50 / 0.12) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">
            {t("portfolio")}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-primary md:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-primary/70 md:text-base">
            {t("body")}
          </p>
        </div>
        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row">
            <nav
              className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:justify-center"
              aria-label="Project index"
            >
              {Array.from({ length: NAV_COUNT }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex items-center gap-3 py-1 text-sm font-medium tabular-nums transition-colors",
                    active === i
                      ? "text-primary"
                      : "text-primary/35 hover:text-primary/60",
                  )}
                >
                  <span
                    className={cn(
                      "h-px w-6 bg-primary transition-opacity",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </nav>
            <div className="relative min-h-[280px] flex-1 lg:min-h-[360px]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="rounded-sm object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 start-0 max-w-lg p-6 text-white md:p-10">
                <p className="text-xs uppercase tracking-widest text-white/70">
                  {current.date}
                </p>
                <h3 className="mt-3 text-3xl font-bold md:text-4xl">{current.title}</h3>
                <p className="mt-2 text-sm text-white/85">{current.meta}</p>
                <Link
                  href="/projects/sea-point"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "mt-6 h-11 rounded-full border-0 bg-white text-primary hover:bg-white/90",
                  )}
                >
                  {t("show")} →
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full border border-primary/20 p-2 text-primary hover:bg-surface"
              aria-label="Previous"
              onClick={() =>
                setActive((a) => (a - 1 + NAV_COUNT) % NAV_COUNT)
              }
            >
              <ChevronLeft className="size-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              className="rounded-full border border-primary/20 p-2 text-primary hover:bg-surface"
              aria-label="Next"
              onClick={() => setActive((a) => (a + 1) % NAV_COUNT)}
            >
              <ChevronRight className="size-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
