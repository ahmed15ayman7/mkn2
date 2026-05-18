import { DEFAULT_HERO_VIDEO_URL } from "@/lib/constants/media";
import { cn } from "@/lib/utils";

type OverlayVariant = "hero" | "page";

type Props = {
  videoSrc?: string;
  heightClass?: string;
  overlay?: OverlayVariant;
  className?: string;
  children: React.ReactNode;
};

const overlayClasses: Record<OverlayVariant, string> = {
  /** Home hero: keep video visible, subtle navy tint */
  hero: "bg-gradient-to-t from-brand-navy/85 via-brand-navy/35 to-brand-navy/15",
  /** Inner pages: stronger legibility */
  page: "bg-gradient-to-t from-primary via-primary/55 to-primary/25",
};

/**
 * Full-bleed muted looping video with gradient overlay for headline legibility.
 */
export function VideoHeroBackdrop({
  videoSrc = DEFAULT_HERO_VIDEO_URL,
  heightClass = "min-h-[85vh] sm:min-h-[90vh]",
  overlay = "page",
  className,
  children,
}: Props) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col overflow-hidden",
        heightClass,
        className,
      )}
    >
      <video
        className="absolute inset-0 z-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className={cn("absolute inset-0 z-[1]", overlayClasses[overlay])}
        aria-hidden
      />
      <div
        className={cn(
          "relative z-[2] flex w-full flex-1 flex-col px-4 sm:px-6 lg:px-8",
          overlay === "hero"
            ? "justify-end pb-28 pt-28 md:pb-36"
            : "justify-center pb-24 pt-28",
        )}
      >
        {children}
      </div>
    </section>
  );
}
