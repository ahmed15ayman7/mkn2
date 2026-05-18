import type { Variants } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  scaleIn,
  slideFromEnd,
  slideFromStart,
  springs,
  staggerContainer,
} from "@/lib/motion/tokens";
import type { SectionPreset } from "./types";

export function baseSection(): Variants {
  return { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
}

export function preset(partial: Partial<SectionPreset>): SectionPreset {
  return {
    container: staggerContainer(0.1),
    item: fadeUp,
    ...partial,
    section: partial.section ?? baseSection(),
  };
}

export function splitPreset(isRtl: boolean): SectionPreset {
  return preset({
    media: slideFromStart(isRtl),
    title: slideFromEnd(isRtl),
    body: fadeUp,
    item: fadeUp,
  });
}

export { fadeIn, fadeUp, scaleIn, slideFromEnd, slideFromStart, springs, staggerContainer };
