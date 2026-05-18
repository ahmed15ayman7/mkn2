"use client";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  isRtl?: boolean;
  tone?: "light" | "dark";
};

export function ScrollToTopRail({
  label,
  isRtl = false,
  tone = "light",
}: Props) {
  const onImage = tone === "light";

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "absolute top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] transition-colors lg:flex",
        onImage
          ? "text-white/25 hover:text-white/50"
          : "text-brand-navy/25 hover:text-brand-navy/50",
        isRtl ? "end-6" : "start-6",
      )}
      aria-label={label}
    >
      <span style={{ writingMode: "vertical-rl" }}>{label}</span>
      <span
        className={cn(
          "h-16 w-px",
          onImage ? "bg-white/20" : "bg-brand-navy/20",
        )}
        aria-hidden
      />
    </button>
  );
}
