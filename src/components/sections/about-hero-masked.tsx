"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollSection } from "@/components/motion/scroll-section";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

type Props = {
  title: string;
  tagline: string;
  kicker: string;
  whoHeading: string;
  intro: string;
  bannerText: string;
  heroImage?: string;
};

export function AboutHeroMasked({
  title,
  tagline,
  kicker,
  whoHeading,
  intro,
  bannerText,
  heroImage = img.heroArchitecture,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] flex-col">
      <div className="pointer-events-none absolute inset-0 h-full min-h-[100dvh]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy/92 via-brand-navy/75 to-brand-navy/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <m.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-base text-white/80 md:text-lg">{tagline}</p>
        </m.div>
      </div>

      <ScrollSection preset="about-hero" as="div" className="relative z-20 mx-auto w-full pb-0">
        <m.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white shadow-[0_-8px_40px_rgba(0,45,50,0.12)]"
        >
          <StaggerChildren preset="about-hero" className="grid gap-10 px-6 py-14 md:grid-cols-2 md:items-start md:gap-16 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <ScrollReveal preset="about-hero" variantKey="kicker">
              <div>
                <p className="text-sm font-medium tracking-wide text-brand-navy/45">{kicker}</p>
                <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-brand-navy md:text-4xl lg:text-5xl">
                  {whoHeading}
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal preset="about-hero" variantKey="body">
              <p className="text-base leading-relaxed text-brand-navy/75 md:text-lg md:pt-6">
                {intro}
              </p>
            </ScrollReveal>
          </StaggerChildren>

          <m.div
            className="relative isolate min-h-[88px] overflow-hidden md:min-h-[100px]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt=""
                fill
                className="object-cover object-[70%_55%] brightness-[0.38] saturate-[0.85]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-brand-navy/45" aria-hidden />
            </div>
            <p
              className={cn(
                "relative z-10 flex min-h-[88px] items-center justify-center px-4",
                "text-center text-sm font-bold uppercase tracking-[0.22em] text-white",
                "md:min-h-[100px] md:text-base md:tracking-[0.28em]",
              )}
            >
              <span>// {bannerText} //</span>
            </p>
          </m.div>
        </m.div>
      </ScrollSection>
    </section>
  );
}
