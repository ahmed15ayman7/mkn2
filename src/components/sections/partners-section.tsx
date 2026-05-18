import { PartnersSwiper } from "@/components/sections/partners-swiper";

type Props = {
  kicker: string;
  title: string;
  isRtl?: boolean;
};

export function PartnersSection({ kicker, title, isRtl = false }: Props) {
  return (
    <section className="border-b border-brand-navy/10 bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-12 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-navy/55 sm:text-sm">
            {kicker}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>

        <PartnersSwiper isRtl={isRtl} />
      </div>
    </section>
  );
}
