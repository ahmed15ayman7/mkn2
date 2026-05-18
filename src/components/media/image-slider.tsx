"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string };

type Props = {
  slides: readonly Slide[];
  className?: string;
};

export function ImageSlider({ slides, className }: Props) {
  const [i, setI] = useState(0);
  const prev = () =>
    setI((x) => (x === 0 ? slides.length - 1 : x - 1));
  const next = () =>
    setI((x) => (x === slides.length - 1 ? 0 : x + 1));

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black/5 sm:aspect-[3/4]">
        <Image
          src={slides[i].src}
          alt={slides[i].alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority={i === 0}
        />
      </div>
      <button
        type="button"
        onClick={prev}
        className="absolute start-0 top-1/2 z-10 -translate-x-2 -translate-y-1/2 rounded-full border border-white/40 bg-primary/90 p-2 text-white shadow-md hover:bg-primary md:-translate-x-4"
        aria-label="Previous"
      >
        <ChevronLeft className="size-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute end-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 rounded-full border border-white/40 bg-primary/90 p-2 text-white shadow-md hover:bg-primary md:translate-x-4"
        aria-label="Next"
      >
        <ChevronRight className="size-5 rtl:rotate-180" />
      </button>
    </div>
  );
}
