"use client";

import { HelpCircle } from "lucide-react";
import {
  PROJECT_FIELD_HELP,
  type ProjectFieldHelpKey,
} from "@/lib/admin/project-field-help";
import { cn } from "@/lib/utils";

type Props = {
  helpKey: ProjectFieldHelpKey;
  className?: string;
};

export function AdminFieldHelp({ helpKey, className }: Props) {
  const entry = PROJECT_FIELD_HELP[helpKey];

  return (
    <span className={cn("group relative inline-flex", className)}>
      <button
        type="button"
        className="inline-flex size-5 items-center justify-center rounded-full text-primary/45 transition hover:bg-primary/10 hover:text-primary"
        aria-label={`مساعدة: ${entry.sectionAr}`}
      >
        <HelpCircle className="size-3.5" strokeWidth={2} />
      </button>
      <span
        role="tooltip"
        lang="ar"
        dir="rtl"
        className="pointer-events-none absolute start-6 top-1/2 z-50 hidden w-72 -translate-y-1/2 rounded-lg border border-primary/15 bg-white p-3 text-start text-xs leading-relaxed text-primary shadow-lg group-hover:pointer-events-auto group-hover:block group-focus-within:block"
      >
        <span className="mb-1 block font-semibold text-brand-gold">
          {entry.sectionAr}
        </span>
        {entry.helpAr}
      </span>
    </span>
  );
}
