import Image from "next/image";
import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTiktok,
  IconX,
  IconYoutube,
} from "@/components/icons/social-icons";
import { Link } from "@/i18n/navigation";
import { img } from "@/lib/content/images";
import { cn } from "@/lib/utils";

const social = [
  { Icon: IconFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: IconLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: IconTiktok, href: "https://tiktok.com", label: "TikTok" },
  { Icon: IconYoutube, href: "https://youtube.com", label: "YouTube" },
  { Icon: IconX, href: "https://x.com", label: "X" },
] as const;

const quickLinks = [
  { key: "aboutL" as const, href: "/about" as const },
  { key: "projects" as const, href: "/projects" as const },
  { key: "team" as const, href: null },
  { key: "careers" as const, href: null },
  { key: "blogs" as const, href: null },
  { key: "contact" as const, href: "/contact" as const },
];

function FooterColumn({
  children,
  className,
  withDivider = true,
}: {
  children: React.ReactNode;
  className?: string;
  withDivider?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-0 md:px-8 lg:px-10",
        withDivider &&
          "md:border-e md:border-white/10 md:last:border-e-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-white">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={img.footerBg}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0 "
          style={{backgroundImage:"linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.25))"}}
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <FooterColumn withDivider className="md:ps-0">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-mkn.png"
                alt="MKN Developments"
                width={250}
                height={250}
                className=""
              />
            </Link>
          </FooterColumn>

          <FooterColumn>
            <p className="max-w-sm text-sm leading-relaxed text-white/90">
              {t("about")}
            </p>
          </FooterColumn>

          <FooterColumn>
            <h3 className="text-sm font-semibold text-brand-gold">
              {t("quick")}
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map(({ key, href }) => {
                const label = t(key);
                const row = (
                  <>
                    <Chevron
                      className="size-3.5 shrink-0 text-brand-gold"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span>{label}</span>
                  </>
                );

                return (
                  <li key={key}>
                    {href ? (
                      <Link
                        href={href}
                        className="flex items-center gap-2.5 text-sm text-white/90 transition-colors hover:text-white"
                      >
                        {row}
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2.5 text-sm text-white/55">
                        {row}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </FooterColumn>

          <FooterColumn withDivider={false} className="md:pe-0">
            <h3 className="text-sm font-semibold text-brand-gold">
              {t("office")}
            </h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/90">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-brand-gold"
                  strokeWidth={1.75}
                />
                <span>{t("address")}</span>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-brand-gold"
                  strokeWidth={1.75}
                />
                <a
                  href={`mailto:${t("email")}`}
                  className="transition-colors hover:text-white"
                  dir="ltr"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-brand-gold"
                  strokeWidth={1.75}
                />
                <span dir="ltr">{t("phones")}</span>
              </li>
            </ul>

            <div className="mt-8 border-t border-brand-gold/45 pt-8">
              <div className="flex flex-wrap items-center gap-4">
                {social.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold transition-opacity hover:opacity-80"
                    aria-label={label}
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </FooterColumn>
        </div>
      </div>

      <div className="relative z-10 bg-black py-4 text-center text-xs text-white/70">
        <p>
          ©{year}. {t("rights")} | {t("designedBy")}
        </p>
      </div>
    </footer>
  );
}
