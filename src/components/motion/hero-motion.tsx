"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

type Props = { children: React.ReactNode };

export function HeroMotion({ children }: Props) {
  const reduced = useReducedMotion();

  return (
    <m.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48, filter: "blur(8px)" }}
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </m.div>
  );
}
