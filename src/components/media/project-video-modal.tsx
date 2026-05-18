"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { resolveVideoEmbed } from "@/lib/media/video-embed";

type Props = {
  open: boolean;
  videoUrl: string | null;
  title: string;
  onClose: () => void;
};

export function ProjectVideoModal({ open, videoUrl, title, onClose }: Props) {
  const embed = videoUrl ? resolveVideoEmbed(videoUrl) : null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !embed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute start-4 top-4 z-[110] flex size-11 items-center justify-center text-white transition hover:opacity-70"
        aria-label="Close video"
      >
        <X className="size-8" strokeWidth={1.25} />
      </button>

      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        {embed.kind === "youtube" ? (
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              src={embed.embedUrl}
              title={title}
              className="absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            src={embed.src}
            className="max-h-[85vh] w-full rounded-sm bg-black"
            controls
            autoPlay
            playsInline
          />
        )}
      </div>
    </div>
  );
}
