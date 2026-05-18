"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export function MotionProvider({ children }: Props) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
