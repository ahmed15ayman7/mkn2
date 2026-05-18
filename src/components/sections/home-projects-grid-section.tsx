"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { TransitionLink } from "@/components/motion/transition-link";
import type { PublicProjectCard } from "@/lib/projects/public";

type Props = {
  title: string;
  subtitle: string;
  viewAll: string;
  projects: PublicProjectCard[];
  btnClass: string;
};

export function HomeProjectsGridSection({
  title,
  subtitle,
  viewAll,
  projects,
  btnClass,
}: Props) {
  return (
    <ScrollSection preset="home-projects-grid" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <ScrollReveal preset="home-projects-grid" variantKey="title">
              <h2 className="text-4xl font-bold uppercase tracking-tight text-brand-navy md:text-5xl">
                {title}
              </h2>
            </ScrollReveal>
            <ScrollReveal preset="home-projects-grid" variantKey="body">
              <p className="mt-3 max-w-xl text-brand-navy/65">{subtitle}</p>
            </ScrollReveal>
          </div>
          <ScrollReveal preset="home-projects-grid" variantKey="cta">
            <TransitionLink href="/projects" className={btnClass}>
              {viewAll}
            </TransitionLink>
          </ScrollReveal>
        </div>
        <StaggerChildren
          preset="home-projects-grid"
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p, i) => (
            <ScrollReveal
              key={p.id}
              preset="home-projects-grid"
              variantKey="card"
              custom={i}
            >
              <TransitionLink
                href={`/projects/${p.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-surface"
              >
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent px-4 pb-4 pt-16">
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                </div>
              </TransitionLink>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </div>
    </ScrollSection>
  );
}
