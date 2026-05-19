"use client";

import { ScrollSection } from "@/components/motion/scroll-section";
import type { ProjectCreditsView } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
  credits: ProjectCreditsView;
};

export function ProjectCreditsSection({ credits }: Props) {
  if (credits.groups.length === 0) return null;

  const colCount = credits.groups.length + 1;

  return (
    <ScrollSection
      preset="project-amenities"
      as="section"
      className="border-t border-brand-navy/10 bg-section-sage py-16 text-brand-navy md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          className={cn(
            "grid border-brand-navy/10",
            colCount === 2 && "md:grid-cols-2",
            colCount === 3 && "md:grid-cols-3",
            colCount >= 4 && "lg:grid-cols-4",
          )}
        >
          <div
            className={cn(
              "border-b border-brand-navy/10 py-10 md:py-12",
              colCount >= 4 ? "lg:border-e lg:pe-8" : "md:border-e",
            )}
          >
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              {credits.title}
            </h2>
          </div>

          {credits.groups.map((group, i) => (
            <div
              key={`${group.title}-${i}`}
              className={cn(
                "border-b border-brand-navy/10 px-0 py-10 md:px-8 md:py-12",
                i < credits.groups.length - 1 && "md:border-e md:border-brand-navy/10",
                i === credits.groups.length - 1 && "md:pe-0",
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-navy/55">
                {group.title}
              </p>
              <ul className="mt-8 space-y-6">
                {group.items.map((item, j) => (
                  <li key={`${item.role}-${j}`}>
                    <p className="text-sm text-brand-navy/80">{item.role}</p>
                    <p className="mt-1 text-sm font-bold text-brand-navy">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
