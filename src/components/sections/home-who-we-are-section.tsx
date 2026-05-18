"use client";

import { ArrowUpRight, FileText } from "lucide-react";
// import { HomeDiamondCollage } from "@/components/sections/home-diamond-collage";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { TransitionLink } from "@/components/motion/transition-link";
import { companyProfileUrl } from "@/lib/content/home";
import { cn } from "@/lib/utils";

type Thumb = { src: string; caption: string };

type Props = {
  kicker: string;
  title: string;
  body: string;
  aboutCta: string;
  companyProfileCta: string;
  thumbs: readonly Thumb[];
  isRtl?: boolean;
};

export function HomeWhoWeAreSection({
  kicker,
  title,
  body,
  aboutCta,
  companyProfileCta,
  thumbs,
  isRtl = false,
}: Props) {
  return (
    <ScrollSection
      preset="home-who-we-are"
      className="relative border-t border-brand-navy/20 bg-[#b8a278] text-brand-navy"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <StaggerChildren
          preset="home-who-we-are"
          className={cn("lg:pe-8", isRtl && "lg:order-2")}
        >
          <ScrollReveal preset="home-who-we-are" variantKey="kicker">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-navy/70 sm:text-sm">
              {kicker}
            </p>
          </ScrollReveal>
          <ScrollReveal preset="home-who-we-are" variantKey="title">
            <h2 className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h2>
          </ScrollReveal>
          <ScrollReveal preset="home-who-we-are" variantKey="body">
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-navy/90 md:text-lg">
              {body}
            </p>
          </ScrollReveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <ScrollReveal preset="home-who-we-are" variantKey="cta">
              <TransitionLink
                href="/about"
                className="inline-flex h-12 items-center gap-3 rounded-md bg-black px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-black/90"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/25">
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                </span>
                {aboutCta}
              </TransitionLink>
            </ScrollReveal>
            <ScrollReveal preset="home-who-we-are" variantKey="cta" delay={0.08}>
              <a
                href={companyProfileUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-3 rounded-md bg-brand-sage px-5 text-sm font-semibold uppercase tracking-[0.08em] text-brand-navy transition hover:bg-brand-sage/90"
              >
                <FileText className="size-4 shrink-0" strokeWidth={1.75} />
                {companyProfileCta}
              </a>
            </ScrollReveal>
          </div>
        </StaggerChildren>

        <ScrollReveal
          preset="home-who-we-are"
          variantKey="media"
          custom={0}
          className={cn(isRtl && "lg:order-1")}
        >
          {/* <HomeDiamondCollage thumbs={thumbs} variant="triangle" /> */}
          <Image src={thumbs[0].src} alt={thumbs[0].caption} width={500} height={400} />
        </ScrollReveal>
      </div>
    </ScrollSection>
  );
}
