"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { cn } from "@/lib/utils";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  body: string;
  imageEnd?: boolean;
  surface?: boolean;
  isRtl?: boolean;
};

export function AboutSplitSection({
  imageSrc,
  imageAlt = "",
  title,
  body,
  imageEnd = false,
  surface = false,
  isRtl = false,
}: Props) {
  return (
    <ScrollSection
      preset="about-split"
      isRtl={isRtl}
      className={cn(surface ? "bg-surface py-20 md:py-28" : "bg-white py-20 md:py-28")}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <ScrollReveal
          preset="about-split"
          variantKey="media"
          isRtl={isRtl}
          className={cn(imageEnd && "lg:order-2")}
        >
          <Image src={imageSrc} alt={imageAlt} width={300} height={400} className="mx-auto" />
        </ScrollReveal>
        <div className={cn(imageEnd && "lg:order-1")}>
          <ScrollReveal preset="about-split" variantKey="title" isRtl={isRtl}>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl">
              {title}
            </h2>
          </ScrollReveal>
          <ScrollReveal preset="about-split" variantKey="body" isRtl={isRtl}>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">{body}</p>
          </ScrollReveal>
        </div>
      </div>
    </ScrollSection>
  );
}
