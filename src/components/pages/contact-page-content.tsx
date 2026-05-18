import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Clock, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import { VideoHeroBackdrop } from "@/components/media/video-hero-backdrop";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
} from "@/components/icons/social-icons";
import { heroVideoSrc } from "@/lib/content/home";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

export async function ContactPageContent() {
  const t = await getTranslations("Contact");

  return (
    <>
      <VideoHeroBackdrop videoSrc={heroVideoSrc()} heightClass="min-h-[52vh]">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{t("sub")}</p>
        </div>
      </VideoHeroBackdrop>

      <section className="relative border-b border-border bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-3 lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {t("touch")}
            </h2>
            <div className="mt-6 flex gap-3 text-primary">
              <Phone className="mt-1 size-5 shrink-0 text-accent" />
              <div className="space-y-1 text-sm" dir="ltr">
                <p className="font-semibold">+966 00 000 0000</p>
                <p className="text-primary/70">+966 00 000 0001</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3 text-primary">
              <Clock className="mt-1 size-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-primary/80">
                {t("hours")}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {t("head")}
            </h2>
            <div className="mt-6 flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-primary/80">
                {t("addr")}
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-6 inline-flex rounded-full border-primary px-4",
              )}
            >
              {t("dir")} →
            </a>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {t("social")}
            </h2>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { Icon: IconFacebook, label: "Facebook" },
                { Icon: IconInstagram, label: "Instagram" },
                { Icon: IconLinkedin, label: "LinkedIn" },
                { Icon: IconYoutube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-primary/80 hover:text-primary"
                  >
                    <Icon className="size-4 text-accent" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="relative min-h-[320px]">
        <Image
          src={img.resumeDesk}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-center lg:px-8">
          <p className="max-w-lg text-3xl font-bold text-white md:text-4xl">
            {t("join")}
          </p>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-sm border-2 border-white bg-transparent px-8 text-white hover:bg-white/10",
            )}
          >
            {t("careers")} →
          </a>
        </div>
      </section>
    </>
  );
}
