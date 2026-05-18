import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  size?: "md" | "lg";
};

export function DiamondMedia({
  src,
  alt,
  className,
  size = "lg",
}: Props) {
  const box = size === "lg" ? "aspect-square max-w-md" : "aspect-square max-w-xs";
  return (
    <div
      className={cn(
        "relative mx-auto bg-white p-3 shadow-lg",
        box,
        className,
      )}
    >
      <div className="relative size-full clip-diamond overflow-hidden bg-surface">
        <Image src={src} alt={alt} fill className="object-cover" sizes="400px" />
      </div>
    </div>
  );
}
