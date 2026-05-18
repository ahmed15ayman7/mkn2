"use client";

import Image from "next/image";
import { ScrollSection } from "@/components/motion/scroll-section";
import { buttonVariants } from "@/components/ui/button";
import { gallerySlots } from "@/lib/projects/gallery";
import type { ProjectPageView, ProjectAmenityVariant } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = { page: ProjectPageView };

const amenitySurface: Record<ProjectAmenityVariant, string> = {
  default: "bg-white",
  accent: "bg-brand-gold/25",
  muted: "bg-surface",
  image: "bg-white",
};

function splitDeliveryTitle(title: string) {
  if (title.length <= 1) return { head: title, tail: "" };
  return { head: title.slice(0, -1), tail: title.slice(-1) };
}

export function ProjectDetailContent({ page }: Props) {
  const gallery = gallerySlots(page.galleryImages, page.heroImage);
  const splitDelivery = splitDeliveryTitle(page.delivery.title);
  const showLuxuryIntro = Boolean(page.luxury.col1 || page.luxury.col2);
  const showFeatureSection =
    Boolean(page.luxury.title) || showLuxuryIntro || page.amenities.length > 0;

  return (
    <>
      <ScrollSection preset="project-hero" as="section" className="relative min-h-[70vh]">
        <Image
          src={page.heroImage}
          alt={page.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/35" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-4 pb-16 lg:px-8">
          <div className="max-w-md rounded-sm border border-white/15 bg-brand-navy/85 p-8 text-white shadow-2xl backdrop-blur-md">
            <Image
              src="/logo-mkn.png"
              alt="MKN"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <h1 className="mt-6 font-serif text-4xl font-bold md:text-5xl">
              {page.title}
            </h1>
            {(page.heroSubtitle || page.summary) && (
              <p className="mt-2 text-lg text-white/85">
                {page.heroSubtitle ?? page.summary}
              </p>
            )}
            <p className="mt-1 text-sm text-white/60">{page.location}</p>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection
        preset="project-delivery"
        as="section"
        className="bg-section-sage py-20 text-white md:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-6">
            {page.delivery.videoUrl && (
              <a
                href={page.delivery.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-14 items-center justify-center self-start rounded-full border-2 border-white/60 text-white transition hover:bg-white/10"
                aria-label="Play video"
              >
                ▶
              </a>
            )}
            {page.delivery.body1 && (
              <p className="max-w-prose leading-relaxed text-white/90">
                {page.delivery.body1}
              </p>
            )}
            {page.delivery.body2 && (
              <p className="max-w-prose text-sm leading-relaxed text-white/75">
                {page.delivery.body2}
              </p>
            )}
          </div>
          <div className="text-center lg:text-start">
            <p className="text-6xl font-black uppercase leading-none tracking-tighter md:text-8xl">
              {splitDelivery.head}
              {splitDelivery.tail && (
                <span className="block text-5xl md:text-7xl">{splitDelivery.tail}</span>
              )}
            </p>
            {page.completionYear && (
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                {page.completionYear}
              </p>
            )}
            {page.delivery.ctaLabel && page.delivery.ctaUrl && (
              <a
                href={page.delivery.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 inline-flex bg-brand-navy text-white hover:bg-brand-navy/90",
                )}
              >
                {page.delivery.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </ScrollSection>

      {page.panoramicImage && (
        <div className="relative h-72 w-full md:h-96">
          <Image
            src={page.panoramicImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <ScrollSection preset="project-gallery" as="section" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {page.coastal.title && (
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-brand-navy md:text-5xl">
              {page.coastal.title}
            </h2>
          )}
          {(page.coastal.col1 || page.coastal.col2) && (
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {page.coastal.col1 && (
                <p className="text-sm leading-relaxed text-brand-navy/75 md:text-base">
                  {page.coastal.col1}
                </p>
              )}
              {page.coastal.col2 && (
                <p className="text-sm leading-relaxed text-brand-navy/75 md:text-base">
                  {page.coastal.col2}
                </p>
              )}
            </div>
          )}

          <div className="mt-16 grid gap-4 md:grid-cols-4 md:grid-rows-3 md:gap-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-2 md:row-span-1">
              <Image src={gallery[0]} alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1">
              <Image src={gallery[1]} alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm md:col-span-4 md:row-span-1">
              <Image src={gallery[2]} alt="" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm md:col-span-2">
              <Image src={gallery[3]} alt="" fill className="object-cover" sizes="40vw" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-2">
              <Image src={gallery[4]} alt="" fill className="object-cover" sizes="40vw" />
            </div>
          </div>

          {(page.coastal.col3 || page.coastal.highlight) && (
            <div className="mt-16 grid gap-10 border-t border-brand-navy/10 pt-12 md:grid-cols-2">
              {page.coastal.col3 && (
                <p className="text-sm leading-relaxed text-brand-navy/70">
                  {page.coastal.col3}
                </p>
              )}
              {page.coastal.highlight && (
                <p
                  className={cn(
                    "text-2xl font-semibold leading-snug text-brand-navy md:text-3xl",
                    "font-[family-name:var(--font-quote)] italic",
                  )}
                >
                  &ldquo;{page.coastal.highlight}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>
      </ScrollSection>

      {page.map.image && (
        <ScrollSection preset="project-closing" as="section" className="relative min-h-[420px]">
          <Image
            src={page.map.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/35" />
          <div className="absolute bottom-8 end-8 max-w-sm rounded-sm border border-white/20 bg-white/95 p-6 text-brand-navy shadow-xl backdrop-blur-sm">
            {page.map.logoUrl && (
              <Image
                src={page.map.logoUrl}
                alt=""
                width={120}
                height={48}
                className="mb-4 h-10 w-auto object-contain"
              />
            )}
            {page.map.label && (
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                {page.map.label}
              </p>
            )}
            <p className="mt-2 font-semibold">{page.title}</p>
            <p className="mt-1 text-sm text-brand-navy/70">
              {page.map.blurb ?? page.location}
            </p>
          </div>
        </ScrollSection>
      )}

      {showFeatureSection && (
        <ScrollSection
          preset="project-amenities"
          as="section"
          className="bg-surface py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {page.luxury.title && (
              <h2 className="max-w-xl text-3xl font-bold text-brand-navy md:text-4xl">
                {page.luxury.title}
              </h2>
            )}
            {showLuxuryIntro && (
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                {page.luxury.col1 && (
                  <p className="text-sm leading-relaxed text-brand-navy/75 md:text-base">
                    {page.luxury.col1}
                  </p>
                )}
                {page.luxury.col2 && (
                  <p className="text-sm leading-relaxed text-brand-navy/75 md:text-base">
                    {page.luxury.col2}
                  </p>
                )}
              </div>
            )}
            {page.amenities.length > 0 && (
              <div
                className={cn(
                  "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                  (page.luxury.title || showLuxuryIntro) && "mt-10",
                )}
              >
                {page.amenities.map((item, i) => (
                  <div
                    key={`${item.title}-${i}`}
                    className={cn(
                      "flex flex-col justify-between rounded-sm border border-brand-navy/10 p-6",
                      amenitySurface[item.variant],
                    )}
                  >
                    {item.variant === "image" && item.imageUrl && (
                      <div className="relative mb-4 aspect-video overflow-hidden rounded-sm">
                        <Image
                          src={item.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-brand-navy">{item.title}</p>
                    <p className="mt-3 text-sm text-brand-navy/65">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollSection>
      )}

      {page.facilities.items.length > 0 && (
        <ScrollSection
          preset="project-amenities"
          as="section"
          className="border-t border-brand-navy/8 bg-white py-16 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {page.facilities.title && (
              <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-navy">
                {page.facilities.title}
              </h2>
            )}
            <ul className="mt-8 columns-1 gap-x-10 text-sm text-brand-navy/80 sm:columns-2 lg:columns-3">
              {page.facilities.items.map((item) => (
                <li key={item} className="mb-3 break-inside-avoid leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollSection>
      )}

      {page.closingImage && (
        <div className="relative h-80 w-full md:h-96">
          <Image
            src={page.closingImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </>
  );
}
