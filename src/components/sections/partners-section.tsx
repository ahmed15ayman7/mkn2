"use client";

import { PartnersSwiper } from "@/components/sections/partners-swiper";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";

type Props = {
  kicker: string;
  title: string;
  isRtl?: boolean;
};

export function PartnersSection({ kicker, title, isRtl = false }: Props) {
  return (
    <ScrollSection
      preset="home-partners"
      isRtl={isRtl}
      className="relative border-b border-brand-navy/10 bg-white py-14 md:py-20"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-2 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-12 lg:px-8">
        <div className="relative">
          <ScrollReveal preset="home-partners" variantKey="kicker" isRtl={isRtl}>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-navy/55 sm:text-sm">
              {kicker}
            </p>
          </ScrollReveal>
          <ScrollReveal preset="home-partners" variantKey="title" isRtl={isRtl}>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </ScrollReveal>
        </div>
        <ScrollReveal preset="home-partners" variantKey="media" isRtl={isRtl}>
          <PartnersSwiper isRtl={isRtl} />
        </ScrollReveal>
      </div>
    </ScrollSection>
  );
}
