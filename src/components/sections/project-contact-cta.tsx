"use client";

import { ScrollSection } from "@/components/motion/scroll-section";
import { IconWhatsapp } from "@/components/icons/social-icons";
import type { ProjectContactCtaView } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
  cta: ProjectContactCtaView;
};

export function ProjectContactCta({ cta }: Props) {
  const isExternal = cta.href.startsWith("http");

  return (
    <ScrollSection
      preset="project-gallery"
      as="section"
      className="border-t border-brand-navy/10 bg-white py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-4">
          {cta.eyebrow && (
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand-navy/50">
              {cta.eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-5xl font-bold tracking-tight text-brand-navy md:text-6xl lg:text-7xl">
            {cta.title}
          </h2>
        </div>

        {cta.body && (
          <p className="text-base leading-relaxed text-brand-navy/80 md:text-lg lg:col-span-4">
            {cta.body}
          </p>
        )}

        <div
          className={cn(
            "flex lg:col-span-4",
            cta.body ? "lg:justify-end" : "lg:col-span-8 lg:justify-end",
          )}
        >
          <a
            href={cta.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-navy px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-brand-navy/90"
          >
            <IconWhatsapp className="size-5 shrink-0" />
            {cta.buttonLabel}
          </a>
        </div>
      </div>
    </ScrollSection>
  );
}
