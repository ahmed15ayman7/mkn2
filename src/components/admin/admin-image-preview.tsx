"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  className?: string;
};

export function AdminImagePreview({ url, className }: Props) {
  const [failed, setFailed] = useState(false);
  const trimmed = url.trim();

  if (!trimmed) return null;

  return (
    <div
      className={cn(
        "relative mt-2 overflow-hidden rounded-lg border border-primary/10 bg-surface/40",
        className,
      )}
    >
      {!failed ? (
        <div className="relative aspect-video w-full max-w-md">
          <Image
            src={trimmed}
            alt=""
            fill
            className="object-cover"
            sizes="400px"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <p className="px-3 py-4 text-xs text-red-600">
          تعذّر تحميل الصورة. تحقق من الرابط.
        </p>
      )}
    </div>
  );
}
