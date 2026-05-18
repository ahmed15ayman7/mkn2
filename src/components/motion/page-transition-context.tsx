"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type PageTransitionContextValue = {
  direction: 1 | -1;
  setDirection: (dir: 1 | -1) => void;
  isPending: boolean;
  setPending: (pending: boolean) => void;
  pathnameRef: React.MutableRefObject<string>;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPending, setPending] = useState(false);
  const pathnameRef = useRef("/");

  const value = useMemo(
    () => ({
      direction,
      setDirection,
      isPending,
      setPending,
      pathnameRef,
    }),
    [direction, isPending],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}

export function usePageTransitionOptional() {
  return useContext(PageTransitionContext);
}
