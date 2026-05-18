import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MknLogo } from "@/components/brand/mkn-logo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
} from "@/components/icons/social-icons";
import { Link } from "@/i18n/navigation";

const social = [
  { Icon: IconFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: IconLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: IconYoutube, href: "https://youtube.com", label: "YouTube" },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-footer-grid text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <MknLogo variant="gold" className="h-12 w-12" />
            <p className="max-w-xs text-sm leading-relaxed text-white/75">
              {t("about")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t("quick")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {t("aboutL")}
                </Link>
              </li>
              <li>
                <span className="text-white/40">{t("careers")}</span>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t("office")}
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-white/75">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>Al Khobar, Eastern Province, Saudi Arabia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-accent" />
                <span dir="ltr">{t("phone1")}</span>
              </li>
              <li className="flex items-center gap-2" dir="ltr">
                <Phone className="size-4 shrink-0 text-accent" />
                <span>{t("phone2")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-accent" />
                <a href={`mailto:${t("email")}`} className="hover:text-white">
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-accent/50 p-2 text-accent transition-colors hover:bg-accent/10"
                  aria-label={label}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()}. {t("rights")}
      </div>
    </footer>
  );
}
