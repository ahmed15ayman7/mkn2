import type { Transition, Variants } from "framer-motion";

export const motionViewport = {
  once: true,
  amount: 0.2,
  margin: "-12% 0px -8% 0px",
} as const;

export const springs = {
  luxury: { type: "spring", stiffness: 70, damping: 22, mass: 0.9 } satisfies Transition,
  snappy: { type: "spring", stiffness: 120, damping: 18, mass: 0.7 } satisfies Transition,
  soft: { type: "spring", stiffness: 50, damping: 20, mass: 1 } satisfies Transition,
} as const;

export const durations = {
  fast: 0.35,
  base: 0.55,
  slow: 0.85,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.luxury,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.base },
  },
};

export const slideFromStart = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? 48 : -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.luxury,
  },
});

export const slideFromEnd = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? -48 : 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.luxury,
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.snappy,
  },
};

export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export function pageSlideVariants(direction: 1 | -1, reduced: boolean) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    };
  }
  const x = direction * 40;
  return {
    initial: { opacity: 0, x },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      x: -x,
      transition: { duration: durations.fast },
    },
  };
}
