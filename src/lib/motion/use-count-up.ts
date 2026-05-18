"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motionViewport } from "./tokens";

export function useCountUp(
  target: number,
  durationMs = 1400,
): { ref: React.RefObject<HTMLSpanElement | null>; value: number } {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, motionViewport);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    let frame: number;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, durationMs]);

  return { ref, value };
}
