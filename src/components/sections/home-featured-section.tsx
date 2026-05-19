"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { TransitionLink } from "@/components/motion/transition-link";
import { ImageSlider } from "@/components/media/image-slider";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string };

type Props = {
  isRtl?: boolean;
  projectSlug: string;
  featuredTitle: string;
  featuredBody: string;
  viewProject: string;
  viewAll: string;
  metaLocation: string;
  metaYear: string;
  btnSage: string;
  slides: Slide[];
};

export function HomeFeaturedSection({
  isRtl = false,
  projectSlug,
  featuredTitle,
  featuredBody,
  viewProject,
  viewAll,
  metaLocation,
  metaYear,
  btnSage,
  slides,
}: Props) {
  return (
    <ScrollSection preset="home-featured" isRtl={isRtl} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <ScrollReveal preset="home-featured" isRtl={isRtl} variantKey="title">
              <p className="font-serif text-4xl text-brand-navy md:text-5xl">
                {featuredTitle}
              </p>
            </ScrollReveal>
            <ScrollReveal preset="home-featured" isRtl={isRtl} variantKey="body">
              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-navy/75 md:text-lg">
                {featuredBody}
              </p>
            </ScrollReveal>
            <ScrollReveal preset="home-featured" isRtl={isRtl} variantKey="cta">
              <TransitionLink
                href={`/projects/${projectSlug}`}
                className={cn(btnSage, "mt-10 inline-flex")}
              >
                {viewProject} →
              </TransitionLink>
            </ScrollReveal>
            <div className="mt-12 flex flex-wrap gap-6 border-t border-brand-navy/10 pt-8 text-sm text-brand-navy/60">
              <span className="font-semibold uppercase tracking-wide">
                {featuredTitle.toUpperCase()} — {metaLocation}
              </span>
              <span>{metaYear}</span>
            </div>
          </div>
          <ScrollReveal preset="home-featured" isRtl={isRtl} variantKey="media">
            <ImageSlider slides={slides} />
          </ScrollReveal>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy/10 pt-6 text-sm text-brand-navy/70">
          <span className="font-semibold uppercase tracking-[0.15em]">
            {featuredTitle.toUpperCase()} — {metaLocation.split("·")[0]?.trim()}
          </span>
          <TransitionLink
            href="/projects"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy hover:underline"
          >
            {viewAll} →
          </TransitionLink>
        </div>
      </div>
    </ScrollSection>
  );
}
