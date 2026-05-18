"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { getNavIndex, getSlideDirection } from "@/lib/motion/nav-order";
import { usePageTransitionOptional } from "./page-transition-context";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, className, children, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const ctx = usePageTransitionOptional();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const target =
      typeof href === "string"
        ? href
        : typeof href === "object" && href.pathname
          ? href.pathname
          : null;

    if (!target || target.startsWith("http")) return;

    const from = pathname;
    const to = target.startsWith("/") ? target : `/${target}`;

    if (getNavIndex(from) >= 0 && getNavIndex(to) >= 0 && from !== to) {
      e.preventDefault();
      const dir = getSlideDirection(from, to, isRtl);
      ctx?.setDirection(dir);
      ctx?.setPending(true);
      startTransition(() => {
        router.push(to);
      });
    }
  };

  return (
    <Link
      href={href}
      className={cn(className, (isPending || ctx?.isPending) && "opacity-80")}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
