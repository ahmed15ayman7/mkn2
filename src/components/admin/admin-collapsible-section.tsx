"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function AdminCollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
}: Props) {
  return (
    <details
      className="group rounded-lg border border-primary/10 bg-white"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6 [&::-webkit-details-marker]:hidden">
        <div>
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-primary/60">{description}</p>
          )}
        </div>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-primary/50 transition group-open:rotate-180",
          )}
        />
      </summary>
      <div className="space-y-4 border-t border-primary/10 p-6 pt-4">{children}</div>
    </details>
  );
}
