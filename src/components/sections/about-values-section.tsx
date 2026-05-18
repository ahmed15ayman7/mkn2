"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { img } from "@/lib/content/images";

type Props = {
  title: string;
  values: string[];
  isRtl?: boolean;
};

export function AboutValuesSection({ title, values, isRtl = false }: Props) {
  return (
    <ScrollSection preset="about-split" isRtl={isRtl} className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <ScrollReveal preset="about-split" variantKey="media" isRtl={isRtl}>
          <Image src={img.hands} alt="" width={300} height={400} className="mx-auto" />
        </ScrollReveal>
        <div>
          <ScrollReveal preset="about-split" variantKey="title" isRtl={isRtl}>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl">
              {title}
            </h2>
          </ScrollReveal>
          <StaggerChildren preset="about-split" isRtl={isRtl} className="mt-8 space-y-4">
            <ul className="space-y-4">
              {values.map((v, i) => (
                <ScrollReveal
                  key={v}
                  preset="about-split"
                  variantKey="item"
                  custom={i}
                  isRtl={isRtl}
                >
                  <li className="flex items-start gap-3 text-lg text-brand-navy/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                    <span>{v}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </StaggerChildren>
        </div>
      </div>
    </ScrollSection>
  );
}
