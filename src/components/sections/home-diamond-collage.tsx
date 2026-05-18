import Image from "next/image";
import { cn } from "@/lib/utils";

type Thumb = { src: string; caption: string };

export function HomeDiamondCollage({
  thumbs,
  className,
  variant = "stacked",
}: {
  thumbs: readonly Thumb[];
  className?: string;
  variant?: "stacked" | "cross";
}) {
  if (variant === "cross") {
    const items = thumbs.slice(0, 4);
    return (
      <div
        className={cn(
          "relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:max-w-lg",
          className,
        )}
      >
        {items[0] && (
          <DiamondFrame
            src={items[0].src}
            alt={items[0].caption}
            framed
            className="absolute start-1/2 top-[2%] z-10 w-[38%] -translate-x-1/2"
          />
        )}
        {items[1] && (
          <DiamondFrame
            src={items[1].src}
            alt={items[1].caption}
            framed
            className="absolute start-[4%] top-1/2 z-20 w-[38%] -translate-y-1/2"
          />
        )}
        {items[2] && (
          <DiamondFrame
            src={items[2].src}
            alt={items[2].caption}
            framed
            className="absolute end-[4%] top-1/2 z-20 w-[38%] -translate-y-1/2"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-md lg:max-w-lg",
        className,
      )}
    >
      <DiamondFrame
        src={thumbs[0].src}
        alt={thumbs[0].caption}
        className="absolute start-[8%] top-[6%] z-10 w-[42%] rotate-[-6deg]"
      />
      <DiamondFrame
        src={thumbs[1].src}
        alt={thumbs[1].caption}
        className="absolute end-[4%] top-[22%] z-20 w-[46%] rotate-[4deg]"
      />
      <DiamondFrame
        src={thumbs[2].src}
        alt={thumbs[2].caption}
        className="absolute bottom-[6%] start-[28%] z-30 w-[44%] rotate-[-2deg]"
      />
    </div>
  );
}

function DiamondFrame({
  src,
  alt,
  className,
  framed = false,
}: {
  src: string;
  alt: string;
  className?: string;
  framed?: boolean;
}) {
  if (framed) {
    return (
      <div className={cn("relative aspect-square w-full", className)}>
        <div className="relative size-full clip-diamond bg-[#b8a278] p-[3px]">
          <div className="relative size-full clip-diamond overflow-hidden">
            <Image src={src} alt={alt} fill className="object-cover" sizes="240px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden bg-white p-2 shadow-[0_12px_40px_rgba(0,45,50,0.18)]",
        className,
      )}
    >
      <div className="relative aspect-square w-full clip-diamond overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" sizes="220px" />
      </div>
    </div>
  );
}
