"use client";

import Image from "next/image";
import { useState } from "react";
import { AdminFieldHelp } from "@/components/admin/admin-field-help";
import { adminFieldClass } from "@/components/admin/admin-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ProjectFieldHelpKey } from "@/lib/admin/project-field-help";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  helpKey: ProjectFieldHelpKey;
  value: string[];
  onChange: (urls: string[]) => void;
};

export function AdminGalleryUrlsField({ label, helpKey, value, onChange }: Props) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  function addUrl() {
    const url = draft.trim();
    if (!url) return;
    try {
      new URL(url);
    } catch {
      setError("أدخل رابطاً صالحاً يبدأ بـ https://");
      return;
    }
    if (value.includes(url)) {
      setError("هذا الرابط مضاف مسبقاً.");
      return;
    }
    onChange([...value, url]);
    setDraft("");
    setError(null);
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-primary">{label}</Label>
        <AdminFieldHelp helpKey={helpKey} />
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          type="url"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
          placeholder="https://…"
          className={cn(adminFieldClass, "h-10 min-w-[min(100%,280px)] flex-1")}
        />
        <Button type="button" variant="outline" size="sm" onClick={addUrl}>
          إضافة
        </Button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {value.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-md border border-primary/10 bg-surface"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute end-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100"
                aria-label="حذف الصورة"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
