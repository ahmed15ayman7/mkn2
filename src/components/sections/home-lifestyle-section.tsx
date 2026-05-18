"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { TransitionLink } from "@/components/motion/transition-link";
import { m } from "framer-motion";

type Props = {
  imageSrc: string;
  text: string;
  cta: string;
  btnClass: string;
};

export function HomeLifestyleSection({ imageSrc, text, cta, btnClass }: Props) {
  return (
    <ScrollSection preset="home-lifestyle" as="section" className="relative min-h-[520px]">
      <m.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={imageSrc} alt="" fill className="object-cover" sizes="100vw" />
      </m.div>
      <div className="absolute inset-0 bg-brand-navy/40" />
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-between px-4 py-14 lg:px-8">
        <ScrollReveal preset="home-lifestyle" variantKey="body">
          <p className="max-w-lg text-lg font-medium leading-relaxed text-white md:text-xl">
            {text}
          </p>
        </ScrollReveal>
        <ScrollReveal preset="home-lifestyle" variantKey="cta">
          <TransitionLink href="/contact" className={btnClass}>
            {cta}
          </TransitionLink>
        </ScrollReveal>
      </div>
    </ScrollSection>
  );
}
