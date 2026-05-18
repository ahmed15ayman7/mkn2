"use client";

import Image from "next/image";
import { ProjectVideoPlayButton } from "@/components/media/project-video-play-button";

type Props = {
  posterSrc: string;
  title: string;
  onPlay: () => void;
};

export function ProjectPanoramicPoster({ posterSrc, title, onPlay }: Props) {
  return (
    <div className="relative min-h-[min(56vh,640px)] w-full md:min-h-[min(64vh,760px)]">
      <Image src={posterSrc} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/25" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center">
        <ProjectVideoPlayButton
          variant="hero"
          onClick={onPlay}
          label={`Play ${title} video`}
          className="size-16 border-2 border-white/80"
        />
      </div>
    </div>
  );
}
