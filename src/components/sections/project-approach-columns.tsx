"use client";

import { ScrollSection } from "@/components/motion/scroll-section";
import type { ProjectApproachColumnView } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
  columns: ProjectApproachColumnView[];
};

function ApproachColumn({ column }: { column: ProjectApproachColumnView }) {
  if (column.kind === "paragraph") {
    return (
      <p className="text-sm leading-relaxed text-brand-navy/80 md:text-[15px] md:leading-7">
        {column.body}
      </p>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between gap-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/55">
        {column.index}. {column.label}
      </p>
      <p className="text-2xl font-bold leading-snug text-brand-navy md:text-[1.75rem] md:leading-tight lg:text-3xl">
        {column.headline}
      </p>
    </div>
  );
}

export function ProjectApproachColumns({ columns }: Props) {
  if (columns.length === 0) return null;

  return (
    <ScrollSection preset="project-gallery" as="section" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          className={cn(
            "grid border-t border-brand-navy/10",
            columns.length === 1 && "md:grid-cols-1",
            columns.length === 2 && "md:grid-cols-2",
            columns.length >= 3 && "md:grid-cols-3",
          )}
        >
          {columns.map((column, i) => (
            <div
              key={i}
              className={cn(
                "border-b border-brand-navy/10 px-0 py-10 md:border-b-0 md:px-8 md:py-12",
                i > 0 && "md:border-s md:border-brand-navy/10",
                i === 0 && "md:ps-0",
                i === columns.length - 1 && "md:pe-0",
              )}
            >
              <ApproachColumn column={column} />
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
