"use client";

import Image from "next/image";
import { ScrollSection } from "@/components/motion/scroll-section";
import { isLightHex } from "@/lib/projects/color-contrast";
import type { ProjectMaterialColorView } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
  introImage: string | null;
  items: ProjectMaterialColorView[];
};

function ColorSwatchCard({ item }: { item: ProjectMaterialColorView }) {
  const light = isLightHex(item.hex);

  return (
    <article
      className="relative flex h-[min(420px,70vh)] min-w-[min(280px,78vw)] shrink-0 flex-col justify-between overflow-hidden rounded-sm p-6 sm:min-w-[300px] lg:min-w-0"
      style={{ backgroundColor: item.hex }}
    >
      <div>
        <p
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.28em]",
            light ? "text-brand-navy/55" : "text-white/60",
          )}
        >
          {item.categoryLabel}
        </p>
        <h3
          className={cn(
            "mt-3 font-serif text-2xl font-bold leading-tight md:text-3xl",
            light ? "text-brand-navy" : "text-white",
          )}
        >
          {item.name}
        </h3>
      </div>
      {(item.ralCode || item.ncsCode) && (
        <div
          className={cn(
            "space-y-0.5 text-[11px] font-medium tracking-wide",
            light ? "text-brand-navy/70" : "text-white/75",
          )}
        >
          {item.ralCode && <p>{item.ralCode}</p>}
          {item.ncsCode && <p>{item.ncsCode}</p>}
        </div>
      )}
    </article>
  );
}

export function ProjectMaterialColors({ introImage, items }: Props) {
  if (!introImage && items.length === 0) return null;

  return (
    <ScrollSection
      preset="project-amenities"
      as="section"
      className="bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none md:gap-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {introImage && (
            <div className="relative h-[min(420px,70vh)] min-w-[min(280px,78vw)] shrink-0 overflow-hidden rounded-sm sm:min-w-[300px] lg:min-w-0">
              <Image
                src={introImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 78vw, 33vw"
              />
            </div>
          )}
          {items.map((item) => (
            <ColorSwatchCard key={`${item.hex}-${item.name}`} item={item} />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
