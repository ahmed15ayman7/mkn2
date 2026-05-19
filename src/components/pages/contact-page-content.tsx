import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Clock, MapPin, Phone, Search } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import {
  ContactCareersSection,
  ContactInfoSection,
} from "@/components/pages/contact-motion-sections";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
} from "@/components/icons/social-icons";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";
import { ImageHero } from "@/components/sections/image-hero";

const sectionHeading =
  "text-xs font-bold uppercase tracking-[0.22em] text-brand-navy";

export async function ContactPageContent() {
  const t = await getTranslations("Contact");
  const locale = await getLocale();
  const isRtl = locale === "ar";

  return (
    <>
      <ImageHero
        image={img.contactHero}
        heightClass="min-h-[50vh] md:min-h-[56vh]"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
            {t("sub")}
          </p>
        </div>
      </ImageHero>

      <ContactInfoSection>
        <button
          type="button"
          className="absolute start-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-navy/15 bg-white text-brand-navy shadow-md lg:flex xl:start-8"
          aria-label={t("search")}
        >
          <Search className="size-5" />
        </button>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-3 lg:gap-14 lg:px-8">
          <div>
            <h2 className={sectionHeading}>{t("touch")}</h2>
            <div className="mt-6 flex gap-3 text-brand-navy">
              <Phone className="mt-0.5 size-5 shrink-0 stroke-[1.5]" />
              <div className="space-y-1.5 text-sm" dir="ltr">
                <p className="font-semibold">{t("phone1")}</p>
                <p className="text-brand-navy/65">{t("phone2")}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3 text-brand-navy">
              <Clock className="mt-0.5 size-5 shrink-0 stroke-[1.5]" />
              <p className="text-sm leading-relaxed text-brand-navy/75">
                {t("hours")}
              </p>
            </div>
          </div>

          <div>
            <h2 className={sectionHeading}>{t("head")}</h2>
            <div className="mt-6 flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 stroke-[1.5] text-brand-navy" />
              <p className="text-sm leading-relaxed text-brand-navy/75">
                {t("addr")}
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy hover:underline"
            >
              {t("dir")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </a>
          </div>

          <div>
            <h2 className={sectionHeading}>{t("social")}</h2>
            <ul className="mt-6 space-y-3.5 text-sm">
              {[
                { Icon: IconFacebook, label: "Facebook", href: "#" },
                { Icon: IconInstagram, label: "Instagram", href: "#" },
                { Icon: IconLinkedin, label: "LinkedIn", href: "#" },
                { Icon: IconYoutube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-3 text-brand-navy/80 transition hover:text-brand-navy"
                  >
                    <Icon className="size-4 shrink-0 text-brand-navy" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ContactInfoSection>

      <ContactForm />

      <ContactCareersSection isRtl={isRtl}>
        <Image
          src={img.resumeDesk}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 md:flex-row md:items-center lg:px-8">
          <p className="max-w-lg text-3xl font-bold leading-tight text-white md:text-4xl">
            {t("join")}
          </p>
          <a
            href="#"
            className={cn(
              "inline-flex h-12 items-center gap-2 bg-black px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-black/85",
            )}
          >
            {t("careers")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </a>
        </div>
      </ContactCareersSection>
    </>
  );
}
