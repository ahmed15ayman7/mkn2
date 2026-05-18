"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onDark?: boolean;
};

export function LocaleSwitcher({ className, onDark = true }: Props) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs font-medium tracking-wide",
        onDark
          ? "border-white/25 text-white/90"
          : "border-primary/20 text-primary/80",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            className={cn(
              "rounded-full px-2 py-0.5 transition-colors",
              active
                ? onDark
                  ? "bg-white/20 text-white"
                  : "bg-primary/10 text-primary"
                : onDark
                  ? "text-white/65 hover:text-white"
                  : "text-primary/55 hover:text-primary",
            )}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
