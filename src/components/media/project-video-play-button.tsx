"use client";

import { cn } from "@/lib/utils";

type Variant = "hero" | "delivery";

type Props = {
  variant: Variant;
  onClick: () => void;
  label?: string;
  className?: string;
};

export function ProjectVideoPlayButton({
  variant,
  onClick,
  label = "Play video",
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full transition",
        variant === "hero" &&
          "size-14 border-2 border-white/70 bg-black/30 text-white backdrop-blur-sm hover:bg-black/45",
        variant === "delivery" &&
          "size-14 bg-black text-white hover:bg-black/85",
        className,
      )}
    >
      <span className="ms-0.5 text-lg leading-none" aria-hidden>
        ▶
      </span>
    </button>
  );
}
