"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollSection } from "@/components/motion/scroll-section";
import { ProjectPanoramicBackgroundVideo } from "@/components/media/project-panoramic-background-video";
import { ProjectVideoModal } from "@/components/media/project-video-modal";
import { ProjectVideoPlayButton } from "@/components/media/project-video-play-button";
import { ProjectDetailHero } from "@/components/sections/project-detail-hero";
import { ProjectApproachColumns } from "@/components/sections/project-approach-columns";
import { ProjectContactCta } from "@/components/sections/project-contact-cta";
import { ProjectCreditsSection } from "@/components/sections/project-credits-section";
import { ProjectMaterialColors } from "@/components/sections/project-material-colors";
import { buttonVariants } from "@/components/ui/button";
import { gallerySlots } from "@/lib/projects/gallery";
import type {
  ProjectPageView,
  ProjectAmenityVariant,
} from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = { page: ProjectPageView };

const amenitySurface: Record<ProjectAmenityVariant, string> = {
  default: "bg-white",
  accent: "bg-brand-gold/25",
  muted: "bg-surface",
  image: "bg-white",
};



export function ProjectDetailContent({ page }: Props) {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const gallery = gallerySlots(page.gallery.all, page.coverImage);
  const extraGallery = page.gallery.all.slice(5);
  const splitDelivery = page.delivery.title.split(" ");
  const showLuxuryIntro = Boolean(page.luxury.col1 || page.luxury.col2);
  const showFeatureSection =
    Boolean(page.luxury.title) || showLuxuryIntro || page.amenities.length > 0;

  const openHeroVideo = () => {
    if (page.videos.heroModal) setActiveVideoUrl(page.videos.heroModal);
  };
  const openDeliveryVideo = () => {
    if (page.videos.deliveryModal) setActiveVideoUrl(page.videos.deliveryModal);
  };

  return (
    <>
      <ProjectVideoModal
        open={activeVideoUrl !== null}
        videoUrl={activeVideoUrl}
        title={page.title}
        onClose={() => setActiveVideoUrl(null)}
      />
      <ProjectDetailHero page={page} onPlayVideo={openHeroVideo} />

      <ScrollSection
        preset="project-delivery"
        as="section"
        className="bg-section-sage py-20 text-white md:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-6">
            {page.videos.deliveryModal && (
              <ProjectVideoPlayButton
                variant="delivery"
                onClick={openDeliveryVideo}
                className="self-start"
              />
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
              {splitDelivery[0]}
              {splitDelivery[1] && (
                <span className="block text-5xl md:text-7xl">
                  {splitDelivery[1]}
                </span>
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

      {page.videos.background && (
        <ProjectPanoramicBackgroundVideo
          videoSrc={page.videos.background}
          posterSrc={page.videos.backgroundPoster}
        />
      )}

      <ScrollSection
        preset="project-gallery"
        as="section"
        className="bg-white py-20 md:py-28"
      >
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

          <div className="mt-16 flex flex-wrap gap-4 md:gap-3">
            {/* الصورة الأولى */}
            <div className="relative h-[250px] w-auto overflow-hidden rounded-sm">
              <Image
                src={gallery[0]}
                alt=""
                height={250}
                width={400} // الـ width هنا بيكون تقريبي كـ fallback والـ w-auto في الـ css هي اللي هتتحكم
                className="h-full w-auto object-contain"
              />
            </div>

            {/* الصورة الثانية */}
            <div className="relative h-[250px] w-auto overflow-hidden rounded-sm">
              <Image
                src={gallery[1]}
                alt=""
                height={250}
                width={180}
                className="h-full w-auto object-contain"
              />
            </div>

            {/* الصورة الثالثة */}
            <div className="relative h-[250px] w-full md:w-auto overflow-hidden rounded-sm">
              <Image
                src={gallery[2]}
                alt=""
                height={250}
                width={600}
                className="h-full w-auto object-contain"
              />
            </div>

            {/* الصورة الرابعة */}
            <div className="relative h-[250px] w-auto overflow-hidden rounded-sm">
              <Image
                src={gallery[3]}
                alt=""
                height={250}
                width={180}
                className="h-full w-auto object-contain"
              />
            </div>

            {/* الصورة الخامسة */}
            <div className="relative h-[250px] w-auto overflow-hidden rounded-sm">
              <Image
                src={gallery[4]}
                alt=""
                height={250}
                width={400}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* {extraGallery.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extraGallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          )} */}

          {/* {(page.coastal.col3 || page.coastal.highlight) && (
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
          )} */}
        </div>
      </ScrollSection>
      <ProjectApproachColumns columns={page.approach.columns} />
      {page.map.image && (
        <ScrollSection
          preset="project-closing"
          as="section"
          className="relative min-h-[420px]"
        >
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
                    <p className="font-semibold text-brand-navy">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm text-brand-navy/65">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollSection>
      )}
      <ProjectMaterialColors
        introImage={page.materialColors.introImage}
        items={page.materialColors.items}
      />

      <ProjectCreditsSection credits={page.credits} />

      {page.facilities.items.length > 0 && (
        <ScrollSection
          preset="project-amenities"
          as="section"
          className="bg-white py-16 text-brand-navy md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {page.facilities.title && (
              <h2 className="text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
                {page.facilities.title}
              </h2>
            )}
            <ul className="mt-10 columns-1 gap-x-12 text-sm text-brand-navy/85 sm:columns-2 lg:columns-4">
              {page.facilities.items.map((item) => (
                <li
                  key={item}
                  className="mb-3 break-inside-avoid leading-relaxed"
                >
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

      {page.contactCta && <ProjectContactCta cta={page.contactCta} />}
    </>
  );
}
