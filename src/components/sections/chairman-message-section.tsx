import Image from "next/image";
import { Search } from "lucide-react";
import { ScrollToTopRail } from "@/components/ui/scroll-to-top-rail";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

type Props = {
  leadershipLabel: string;
  title: string;
  quote: string;
  signature: string;
  scrollLabel: string;
  portraitImage?: string;
  isRtl?: boolean;
};

export function ChairmanMessageSection({
  leadershipLabel,
  title,
  quote,
  signature,
  scrollLabel,
  portraitImage = img.chairman,
  isRtl = false,
}: Props) {
  return (
    <section className="relative isolate bg-white">
      {/* <ScrollToTopRail label={scrollLabel} isRtl={isRtl} /> */}

      <div className="grid min-h-[80vh] max-h-[90vh] lg:grid-cols-2">
        <div
          className={cn(
            "relative min-h-[min(52vh,480px)] lg:min-h-[80vh] p-5",
            isRtl ? "lg:order-2" : "lg:order-1",
          )}
        >
          <Image
            src={portraitImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div
          className={cn(
            "flex items-center justify-center bg-white px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24",
            isRtl ? "lg:order-1" : "lg:order-2",
          )}
        >
          <div className="mx-auto max-w-md text-center lg:max-w-lg">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-navy/65 sm:text-sm">
              {leadershipLabel}
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl md:text-[3.25rem] md:leading-tight">
              {title}
            </h2>
            <p
              className={cn(
                "mt-10 text-lg leading-[1.85] text-brand-navy/80 sm:text-xl md:mt-12",
                "font-[family-name:var(--font-quote)]",
              )}
            >
              {quote}
            </p>
            <p
              className={cn(
                "mt-12 text-4xl leading-none text-brand-navy md:mt-14 md:text-5xl",
                isRtl
                  ? "font-[family-name:var(--font-quote)] italic"
                  : "font-[family-name:var(--font-signature)]",
              )}
            >
              {signature}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
