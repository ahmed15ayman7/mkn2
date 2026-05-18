"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { getSectionPreset, getSectionPresetRtl } from "@/lib/motion/sections";
import type { SectionPresetId, SectionVariantKey } from "@/lib/motion/sections/types";
import { fadeUp } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  preset: SectionPresetId;
  variantKey?: SectionVariantKey;
  custom?: number;
  delay?: number;
  isRtl?: boolean;
};

export function ScrollReveal({
  preset,
  variantKey = "item",
  custom,
  delay = 0,
  isRtl = false,
  className,
  children,
  ...rest
}: Props) {
  const reduced = useReducedMotion();
  const config = isRtl ? getSectionPresetRtl(preset, isRtl) : getSectionPreset(preset);
  const raw = config[variantKey];
  const variants: Variants =
    typeof raw === "function"
      ? raw(custom ?? 0)
      : raw ?? fadeUp;

  const resolved: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : variants;

  return (
    <motion.div
      variants={resolved}
      custom={custom}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
