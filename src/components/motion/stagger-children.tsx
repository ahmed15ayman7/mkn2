"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { getSectionPreset, getSectionPresetRtl } from "@/lib/motion/sections";
import type { SectionPresetId } from "@/lib/motion/sections/types";
import { staggerContainer } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  preset: SectionPresetId;
  stagger?: number;
  delay?: number;
  isRtl?: boolean;
  children: ReactNode;
};

export function StaggerChildren({
  preset,
  stagger = 0.1,
  delay = 0,
  isRtl = false,
  className,
  children,
  ...rest
}: Props) {
  const reduced = useReducedMotion();
  const config = isRtl ? getSectionPresetRtl(preset, isRtl) : getSectionPreset(preset);

  return (
    <motion.div
      variants={
        reduced
          ? { hidden: {}, visible: {} }
          : config.container ?? staggerContainer(stagger, delay)
      }
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
