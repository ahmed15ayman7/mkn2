"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";
import { m } from "framer-motion";

type Props = {
  kicker: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  backgroundImage?: string;
  isRtl?: boolean;
};

export function WhyMknSection({
  kicker,
  heading,
  paragraph1,
  paragraph2,
  backgroundImage = img.whyBg,
  isRtl = false,
}: Props) {
  const overlayClip = isRtl
    ? "polygon(100% 0, 8% 0, 67% 100%, 100% 100%)"
    : "polygon(0 0, 84% 0, 49% 100%, 0 100%)";

  return (
    <ScrollSection
      preset="about-why-mkn"
      isRtl={isRtl}
      className="relative isolate min-h-[min(50vh,720px)] overflow-hidden md:min-h-[min(50vh,820px)]"
    >
      <Image src={backgroundImage} alt="" fill className="object-cover object-center" sizes="100vw" />
      <m.div
        className="absolute inset-0 bg-brand-navy/70"
        style={{ clipPath: overlayClip }}
        initial={{ clipPath: overlayClip, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        aria-hidden
      />
      <div
        className={cn(
          "relative z-10 flex min-h-[min(50vh,420px)] items-center md:min-h-[min(50vh,820px)]",
          "justify-start",
        )}
      >
        <StaggerChildren
          preset="about-why-mkn"
          isRtl={isRtl}
          className={cn(
            "max-w-xl px-6 py-20 text-white sm:max-w-2xl sm:px-12 md:px-16 lg:max-w-3xl lg:px-20 lg:py-28",
            isRtl ? "text-right" : "text-left",
          )}
        >
          <ScrollReveal preset="about-why-mkn" variantKey="kicker" isRtl={isRtl}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 sm:text-sm sm:tracking-[0.24em]">
              {kicker}
            </p>
          </ScrollReveal>
          <ScrollReveal preset="about-why-mkn" variantKey="title" isRtl={isRtl}>
            <h2 className="mt-6 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal preset="about-why-mkn" variantKey="body" isRtl={isRtl}>
            <p className="mt-8 text-base leading-relaxed text-white/80 sm:text-lg md:mt-10">
              {paragraph1}
            </p>
          </ScrollReveal>
          <ScrollReveal preset="about-why-mkn" variantKey="body" isRtl={isRtl}>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              {paragraph2}
            </p>
          </ScrollReveal>
        </StaggerChildren>
      </div>
    </ScrollSection>
  );
}
