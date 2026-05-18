import { DEFAULT_HERO_VIDEO_URL } from "@/lib/constants/media";
import { cn } from "@/lib/utils";

type Props = {
  videoSrc?: string;
  heightClass?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Full-bleed muted looping video with gradient overlay for headline legibility.
 */
export function VideoHeroBackdrop({
  videoSrc = DEFAULT_HERO_VIDEO_URL,
  heightClass = "min-h-[85vh] sm:min-h-[90vh]",
  className,
  children,
}: Props) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col justify-end overflow-hidden",
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
        preload="metadata"
        aria-hidden
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-primary via-primary/55 to-primary/25"
        aria-hidden
      />
      <div className="relative z-[2] flex w-full flex-1 flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
