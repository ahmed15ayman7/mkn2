"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { partnerLogos } from "@/lib/content/partners";
import "swiper/css";
import "swiper/css/navigation";

const AUTOPLAY_MS = 3500;

type Props = {
  isRtl?: boolean;
};

export function PartnersSwiper({ isRtl = false }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="relative flex min-w-0 max-w-xs md:max-w-4xl flex-1 items-center gap-3 sm:gap-5">
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="flex size-9 shrink-0 items-center justify-center text-brand-gold transition-opacity hover:opacity-70 sm:size-10"
        aria-label="Previous partners"
      >
        <PrevIcon className="size-7 stroke-[1.25]" />
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop
        speed={600}
        autoplay={{
          delay: AUTOPLAY_MS,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={2}
        spaceBetween={28}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 32 },
          640: { slidesPerView: 3, spaceBetween: 36 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
          1280: { slidesPerView: 5, spaceBetween: 44 },
        }}
        className="min-w-0 flex-1"
      >
        {partnerLogos.map((partner) => (
          <SwiperSlide key={partner.name}>
            <div className="flex h-20 items-center justify-center px-2 sm:h-24">
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={80}
                className="max-h-16 w-auto max-w-[140px] object-contain object-center sm:max-h-20 sm:max-w-[160px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="flex size-9 shrink-0 items-center justify-center text-brand-gold transition-opacity hover:opacity-70 sm:size-10"
        aria-label="Next partners"
      >
        <NextIcon className="size-7 stroke-[1.25]" />
      </button>
    </div>
  );
}
