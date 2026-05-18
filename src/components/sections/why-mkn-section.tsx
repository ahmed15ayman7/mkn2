import Image from "next/image";
import { ScrollToTopRail } from "@/components/ui/scroll-to-top-rail";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

type Props = {
  kicker: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  scrollLabel: string;
  backgroundImage?: string;
  isRtl?: boolean;
};

export function WhyMknSection({
  kicker,
  heading,
  paragraph1,
  paragraph2,
  scrollLabel,
  backgroundImage = img.whyBg,
  isRtl = false,
}: Props) {
  const overlayClip = isRtl
    ? "polygon(100% 0, 38% 0, 62% 100%, 100% 100%)"
    : "polygon(0 0, 62% 0, 38% 100%, 0 100%)";

  return (
    <section className="relative isolate min-h-[min(92vh,720px)] overflow-hidden md:min-h-[min(88vh,820px)]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-brand-navy/70"
        style={{ clipPath: overlayClip }}
        aria-hidden
      />

      <ScrollToTopRail label={scrollLabel} isRtl={isRtl} />

      <div
        className={cn(
          "relative z-10 flex min-h-[min(92vh,720px)] items-center md:min-h-[min(88vh,820px)]",
          isRtl ? "justify-end" : "justify-start",
        )}
      >
        <div
          className={cn(
            "max-w-xl px-6 py-20 text-white sm:max-w-2xl sm:px-12 md:px-16 lg:max-w-3xl lg:px-20 lg:py-28",
            isRtl ? "text-right" : "text-left",
          )}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 sm:text-sm sm:tracking-[0.24em]">
            {kicker}
          </p>
          <h2 className="mt-6 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/80 sm:text-lg md:mt-10">
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
