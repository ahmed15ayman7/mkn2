"use client";

import {
  motion,
  useInView,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useRef, type ElementType } from "react";
import { getSectionPreset, getSectionPresetRtl } from "@/lib/motion/sections";
import type { SectionPresetId } from "@/lib/motion/sections/types";
import { motionViewport } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"section"> & {
  preset: SectionPresetId;
  as?: "section" | "div";
  isRtl?: boolean;
  children: React.ReactNode;
};

export function ScrollSection({
  preset,
  as = "section",
  isRtl = false,
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, motionViewport);
  const reduced = useReducedMotion();
  const config = isRtl ? getSectionPresetRtl(preset, isRtl) : getSectionPreset(preset);
  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : config.section;

  const Component = (as === "div" ? motion.div : motion.section) as ElementType;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
