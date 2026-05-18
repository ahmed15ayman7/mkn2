import Image from "next/image";
import { cn } from "@/lib/utils";

type Thumb = { src: string; caption: string };

export function HomeDiamondCollage({
  thumbs,
  className,
}: {
  thumbs: readonly Thumb[];
  className?: string;
}) {
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
}: {
  src: string;
  alt: string;
  className?: string;
}) {
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
