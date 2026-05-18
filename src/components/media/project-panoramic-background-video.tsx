"use client";

import { useEffect, useRef } from "react";
import {
  isDirectVideoFile,
  resolveVideoEmbed,
  youtubeBackgroundEmbedUrl,
} from "@/lib/media/video-embed";
import { cn } from "@/lib/utils";

type Props = {
  videoSrc: string;
  posterSrc?: string | null;
  className?: string;
};

export function ProjectPanoramicBackgroundVideo({
  videoSrc,
  posterSrc,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const embed = resolveVideoEmbed(videoSrc);
  const youtubeEmbed =
    embed?.kind === "youtube" ? youtubeBackgroundEmbedUrl(videoSrc) : null;
  const fileSrc =
    embed?.kind === "file"
      ? embed.src
      : isDirectVideoFile(videoSrc)
        ? videoSrc.trim()
        : null;

  useEffect(() => {
    if (youtubeEmbed || !fileSrc) return;
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [youtubeEmbed, fileSrc]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-black",
        "min-h-[min(56vh,640px)] md:min-h-[min(64vh,760px)]",
        className,
      )}
    >
      {youtubeEmbed ? (
        <iframe
          src={youtubeEmbed}
          title=""
          className="pointer-events-none absolute inset-0 size-full scale-[1.02] object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex={-1}
          aria-hidden
        />
      ) : fileSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={fileSrc}
          poster={posterSrc ?? undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
