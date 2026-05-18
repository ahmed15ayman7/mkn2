"use client";

import { ScrollSection } from "@/components/motion/scroll-section";
import { m } from "framer-motion";

type Props = {
  items: readonly string[];
  className?: string;
};

export function SectionMarquee({ items, className }: Props) {
  const track = [...items, ...items];

  return (
    <ScrollSection
      preset="home-marquee"
      as="div"
      className={`overflow-hidden border-y border-white/10 bg-brand-navy py-4 text-white ${className ?? ""}`}
      aria-hidden
    >
      <m.div
        className="flex w-max animate-marquee"
        initial={{ opacity: 0, scaleX: 0.85 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {track.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-6 px-6 text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm"
          >
            <span className="text-brand-gold">•</span>
            <span>{label}</span>
          </span>
        ))}
      </m.div>
    </ScrollSection>
  );
}
