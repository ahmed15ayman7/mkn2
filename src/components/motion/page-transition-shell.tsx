"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { stripLocale } from "@/lib/motion/nav-order";
import { pageSlideVariants } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { usePageTransition } from "./page-transition-context";

type Props = { children: React.ReactNode };

export function PageTransitionShell({ children }: Props) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { direction, isPending, setPending, pathnameRef } = usePageTransition();
  const prevPath = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = stripLocale(pathname);
    setPending(false);
    prevPath.current = pathname;
  }, [pathname, pathnameRef, setPending]);

  const key = stripLocale(pathname);
  const slide = pageSlideVariants(direction, reduced);

  return (
    <>
      <AnimatePresence>
        {isPending ? (
          <m.div
            key="progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-gold"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <m.main
          key={key}
          initial={slide.initial}
          animate={slide.animate}
          exit={slide.exit}
          className="flex flex-1 flex-col"
        >
          {children}
        </m.main>
      </AnimatePresence>
    </>
  );
}
