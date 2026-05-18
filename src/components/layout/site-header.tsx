"use client";

import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { TransitionLink } from "@/components/motion/transition-link";
import { m } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onDark = !scrolled;

  const nav = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-white/95 text-primary shadow-sm backdrop-blur-md"
            : "border-transparent bg-transparent text-white",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
          <TransitionLink
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Image src="/logo-mkn.png" alt="MKN Logo" width={32} height={32} className="w-20 h-20" />
            
          </TransitionLink>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-opacity",
                  scrolled
                    ? "text-primary/80 hover:text-primary"
                    : "text-white/90 hover:text-white",
                )}
              >
                {item.label}
              </TransitionLink>
            ))}
            <LocaleSwitcher onDark={onDark} />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LocaleSwitcher onDark={onDark} />
            <button
              type="button"
              className={cn(
                "rounded-md p-2",
                scrolled ? "hover:bg-primary/5" : "hover:bg-white/10",
              )}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? (
                <X
                  className={cn("size-6", scrolled ? "text-primary" : "text-white")}
                />
              ) : (
                <Menu
                  className={cn("size-6", scrolled ? "text-primary" : "text-white")}
                />
              )}
            </button>
          </div>
        </div>
      </m.header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-primary md:hidden">
          <div className="flex h-full flex-col pt-20">
            {nav.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                className="border-b border-white/10 px-6 py-4 text-lg font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </TransitionLink>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
