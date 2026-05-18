"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

type Props = {
  leadershipLabel: string;
  title: string;
  quote: string;
  signature: string;
  portraitImage?: string;
  isRtl?: boolean;
};

export function ChairmanMessageSection({
  leadershipLabel,
  title,
  quote,
  signature,
  portraitImage = img.chairman,
  isRtl = false,
}: Props) {
  return (
    <ScrollSection preset="about-chairman" isRtl={isRtl} className="relative isolate bg-white">
      <div className="grid min-h-[80vh] max-h-[90vh] lg:grid-cols-2">
        <ScrollReveal
          preset="about-chairman"
          variantKey="media"
          isRtl={isRtl}
          className={cn(
            "relative min-h-[min(52vh,480px)] p-5 lg:min-h-[80vh]",
            isRtl ? "lg:order-2" : "lg:order-1",
          )}
        >
          <Image
            src={portraitImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </ScrollReveal>

        <div
          className={cn(
            "flex items-center justify-center bg-white px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24",
            isRtl ? "lg:order-1" : "lg:order-2",
          )}
        >
          <StaggerChildren
            preset="about-chairman"
            isRtl={isRtl}
            className="mx-auto max-w-md text-center lg:max-w-lg"
          >
            <ScrollReveal preset="about-chairman" variantKey="kicker" isRtl={isRtl}>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-navy/65 sm:text-sm">
                {leadershipLabel}
              </p>
            </ScrollReveal>
            <ScrollReveal preset="about-chairman" variantKey="title" isRtl={isRtl}>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl md:text-[3.25rem] md:leading-tight">
                {title}
              </h2>
            </ScrollReveal>
            <ScrollReveal preset="about-chairman" variantKey="body" isRtl={isRtl}>
              <p
                className={cn(
                  "mt-10 text-lg leading-[1.85] text-brand-navy/80 sm:text-xl md:mt-12",
                  "font-[family-name:var(--font-quote)]",
                )}
              >
                {quote}
              </p>
            </ScrollReveal>
            <ScrollReveal preset="about-chairman" variantKey="cta" isRtl={isRtl}>
              <p
                className={cn(
                  "mt-12 text-4xl leading-none text-brand-navy md:mt-14 md:text-5xl",
                  isRtl
                    ? "font-[family-name:var(--font-quote)] italic"
                    : "font-[family-name:var(--font-signature)]",
                )}
              >
                {signature}
              </p>
            </ScrollReveal>
          </StaggerChildren>
        </div>
      </div>
    </ScrollSection>
  );
}
