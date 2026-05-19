"use client";

import Image from "next/image";
import { ScrollSection } from "@/components/motion/scroll-section";
import { ProjectVideoPlayButton } from "@/components/media/project-video-play-button";
import type { ProjectPageView } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
  page: ProjectPageView;
  onPlayVideo: () => void;
};

export function ProjectDetailHero({ page, onPlayVideo }: Props) {
  const { hero, videos } = page;
  const stats = [
    {
      key: "startPrice",
      label: hero.stats.labels.startPrice,
      value: hero.stats.startPrice,
    },
    {
      key: "startSpace",
      label: hero.stats.labels.startSpace,
      value: hero.stats.startSpace,
    },
    {
      key: "delivery",
      label: hero.stats.labels.delivery,
      value: hero.stats.delivery,
    },
    {
      key: "location",
      label: hero.stats.labels.location,
      value: hero.stats.location,
    },
  ];

  return (
    <ScrollSection
      preset="project-hero"
      as="section"
      className="relative min-h-[min(92vh,900px)] w-full"
    >
      <Image
        src={page.coverImage}
        alt={page.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div
        className="absolute inset-y-0 start-0 z-10 flex w-full flex-col justify-between bg-brand-navy/80 px-6 py-10 sm:w-1/2 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        aria-label={page.title}
        style={{    height: "50vh",
          bottom: 0,
          top: "auto",
        }}
      >
        <div>
          {videos.heroModal && (
            <ProjectVideoPlayButton variant="hero" onClick={onPlayVideo} />
          )}
          {hero.subtitle && (
            <p
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.28em] text-white/70",
                videos.heroModal && "mt-8",
              )}
            >
              {hero.subtitle}
            </p>
          )}
          <h1
            className={cn(
              "max-w-xl font-sans text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl",
              hero.subtitle ? "mt-5" : videos.heroModal ? "mt-8" : "mt-0",
            )}
          >
            {page.title}
          </h1>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 sm:mt-0">
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className={cn(
                  "min-w-0 sm:px-5",
                  index === 0 && "sm:ps-0",
                  index > 0 && "sm:border-s sm:border-white/25",
                  index === stats.length - 1 && "sm:pe-0",
                )}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-white sm:text-[15px]">
                  {stat.value ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
