"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AdminField,
  AdminInput,
  AdminTextarea,
  adminFieldClass,
} from "@/components/admin/admin-field";
import type { SerializedProject } from "@/lib/admin/serialize";
import {
  parseImageLines,
  parseKeywordLines,
} from "@/lib/validation/admin";

type ProjectFormProps = {
  project?: SerializedProject;
};

function buildPayload(form: FormData, includeSeo: boolean) {
  const imagesText = String(form.get("images") ?? "");
  const payload: Record<string, unknown> = {
    slug: String(form.get("slug") ?? "")
      .toLowerCase()
      .trim(),
    titleAr: String(form.get("titleAr") ?? ""),
    titleEn: String(form.get("titleEn") ?? ""),
    descAr: String(form.get("descAr") ?? ""),
    descEn: String(form.get("descEn") ?? ""),
    locationAr: String(form.get("locationAr") ?? ""),
    locationEn: String(form.get("locationEn") ?? ""),
    areaSqm: form.get("areaSqm")
      ? Number(form.get("areaSqm"))
      : null,
    completionDate: String(form.get("completionDate") ?? ""),
    investmentValue: form.get("investmentValue")
      ? Number(form.get("investmentValue"))
      : null,
    videoUrl: String(form.get("videoUrl") ?? ""),
    coverImage: String(form.get("coverImage") ?? ""),
    images: parseImageLines(imagesText),
    featured: form.get("featured") === "on",
  };

  if (includeSeo) {
    payload.seo = {
      metaTitleAr: String(form.get("metaTitleAr") ?? ""),
      metaTitleEn: String(form.get("metaTitleEn") ?? ""),
      metaDescAr: String(form.get("metaDescAr") ?? ""),
      metaDescEn: String(form.get("metaDescEn") ?? ""),
      keywordsAr: parseKeywordLines(String(form.get("keywordsAr") ?? "")),
      keywordsEn: parseKeywordLines(String(form.get("keywordsEn") ?? "")),
      ogImage: String(form.get("ogImage") ?? ""),
    };
  }

  return payload;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [includeSeo, setIncludeSeo] = useState(Boolean(project?.seo));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = buildPayload(form, includeSeo);

    try {
      const url = project
        ? `/api/admin/projects/${project.id}`
        : "/api/admin/projects";
      const res = await fetch(url, {
        method: project ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="space-y-4 rounded-lg border border-primary/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Basics</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Slug"
            name="slug"
            required
            defaultValue={project?.slug}
            placeholder="sea-point"
          />
          <AdminField label="Featured">
            <label className="flex items-center gap-2 text-sm text-primary">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured}
                className="size-4 rounded border-primary/30"
              />
              Show on homepage
            </label>
          </AdminField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Title (EN)"
            name="titleEn"
            required
            defaultValue={project?.titleEn}
          />
          <AdminInput
            label="Title (AR)"
            name="titleAr"
            required
            defaultValue={project?.titleAr}
          />
        </div>
        <AdminTextarea
          label="Description (EN)"
          name="descEn"
          required
          defaultValue={project?.descEn}
        />
        <AdminTextarea
          label="Description (AR)"
          name="descAr"
          required
          defaultValue={project?.descAr}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Location (EN)"
            name="locationEn"
            required
            defaultValue={project?.locationEn}
          />
          <AdminInput
            label="Location (AR)"
            name="locationAr"
            required
            defaultValue={project?.locationAr}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-lg border border-primary/10 bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Details & media</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminInput
            label="Area (sqm)"
            name="areaSqm"
            type="number"
            step="0.01"
            defaultValue={project?.areaSqm ?? ""}
          />
          <AdminInput
            label="Completion date"
            name="completionDate"
            type="date"
            defaultValue={project?.completionDate ?? ""}
          />
          <AdminInput
            label="Investment value"
            name="investmentValue"
            type="number"
            step="0.01"
            defaultValue={project?.investmentValue ?? ""}
          />
        </div>
        <AdminInput
          label="Cover image URL"
          name="coverImage"
          type="url"
          required
          defaultValue={project?.coverImage}
        />
        <AdminInput
          label="Video URL"
          name="videoUrl"
          type="url"
          defaultValue={project?.videoUrl ?? ""}
        />
        <AdminTextarea
          label="Gallery image URLs (one per line)"
          name="images"
          defaultValue={project?.images.join("\n") ?? ""}
        />
      </section>

      <section className="space-y-4 rounded-lg border border-primary/10 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-primary">SEO (optional)</h2>
          <label className="flex items-center gap-2 text-sm text-primary">
            <input
              type="checkbox"
              checked={includeSeo}
              onChange={(e) => setIncludeSeo(e.target.checked)}
              className="size-4 rounded border-primary/30"
            />
            Include SEO fields
          </label>
        </div>
        {includeSeo && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminInput
                label="Meta title (EN)"
                name="metaTitleEn"
                required={includeSeo}
                defaultValue={project?.seo?.metaTitleEn}
              />
              <AdminInput
                label="Meta title (AR)"
                name="metaTitleAr"
                required={includeSeo}
                defaultValue={project?.seo?.metaTitleAr}
              />
            </div>
            <AdminTextarea
              label="Meta description (EN)"
              name="metaDescEn"
              required={includeSeo}
              defaultValue={project?.seo?.metaDescEn}
            />
            <AdminTextarea
              label="Meta description (AR)"
              name="metaDescAr"
              required={includeSeo}
              defaultValue={project?.seo?.metaDescAr}
            />
            <AdminTextarea
              label="Keywords (EN) — comma or newline separated"
              name="keywordsEn"
              defaultValue={project?.seo?.keywordsEn.join(", ")}
            />
            <AdminTextarea
              label="Keywords (AR)"
              name="keywordsAr"
              defaultValue={project?.seo?.keywordsAr.join(", ")}
            />
            <AdminInput
              label="OG image URL"
              name="ogImage"
              type="url"
              defaultValue={project?.seo?.ogImage ?? ""}
            />
          </>
        )}
      </section>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : project ? "Update project" : "Create project"}
        </Button>
        <Link
          href="/admin/projects"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
