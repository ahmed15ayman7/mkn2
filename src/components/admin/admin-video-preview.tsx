"use client";

import { resolveVideoEmbed } from "@/lib/media/video-embed";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  className?: string;
};

export function AdminVideoPreview({ url, className }: Props) {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const embed = resolveVideoEmbed(trimmed);

  if (!embed) {
    return (
      <p className={cn("mt-2 text-xs text-amber-700", className)}>
        الرابط غير معروف. استخدم يوتيوب أو رابط MP4/WebM مباشر.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "mt-2 max-w-lg overflow-hidden rounded-lg border border-primary/10 bg-black",
        className,
      )}
    >
      {embed.kind === "youtube" ? (
        <div className="relative aspect-video w-full">
          <iframe
            src={embed.embedUrl.replace("autoplay=1", "autoplay=0")}
            title="معاينة الفيديو"
            className="absolute inset-0 size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <video
          src={embed.src}
          controls
          playsInline
          className="aspect-video w-full bg-black object-contain"
        />
      )}
    </div>
  );
}
