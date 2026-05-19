"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProjectAmenitiesEditor } from "@/components/admin/project-amenities-editor";
import { ProjectApproachColumnsEditor } from "@/components/admin/project-approach-columns-editor";
import { ProjectCreditsEditor } from "@/components/admin/project-credits-editor";
import { ProjectMaterialColorsEditor } from "@/components/admin/project-material-colors-editor";
import {
  AdminField,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/admin-field";
import type { SerializedProject } from "@/lib/admin/serialize";
import type {
  ProjectAmenity,
  ProjectApproachColumn,
  ProjectCreditGroup,
  ProjectMaterialColor,
} from "@/lib/projects/types";
import { parseFacilityLines, parseImageLines } from "@/lib/validation/admin";
import { cn } from "@/lib/utils";

type ProjectFormProps = {
  project?: SerializedProject;
};

function buildPayload(
  form: FormData,
  amenities: ProjectAmenity[],
  approachColumns: ProjectApproachColumn[],
  materialColors: ProjectMaterialColor[],
  projectCredits: ProjectCreditGroup[],
) {
  const filteredAmenities = amenities.filter(
    (a) => a.titleEn.trim() || a.titleAr.trim(),
  );
  const filteredApproach = approachColumns.filter((col) => {
    if (col.kind === "paragraph") return col.bodyEn.trim() || col.bodyAr.trim();
    return (
      col.labelEn.trim() ||
      col.labelAr.trim() ||
      col.headlineEn.trim() ||
      col.headlineAr.trim()
    );
  });
  const filteredColors = materialColors.filter(
    (c) => c.nameEn.trim() || c.nameAr.trim(),
  );
  const filteredCredits = projectCredits.filter(
    (g) =>
      (g.titleEn.trim() || g.titleAr.trim()) &&
      g.items.some((item) => item.roleEn.trim() || item.roleAr.trim()),
  );

  return {
    slug: String(form.get("slug") ?? "")
      .toLowerCase()
      .trim(),
    titleAr: String(form.get("titleAr") ?? ""),
    titleEn: String(form.get("titleEn") ?? ""),
    descAr: String(form.get("descAr") ?? ""),
    descEn: String(form.get("descEn") ?? ""),
    locationAr: String(form.get("locationAr") ?? ""),
    locationEn: String(form.get("locationEn") ?? ""),
    areaSqm: form.get("areaSqm") ? Number(form.get("areaSqm")) : null,
    completionDate: String(form.get("completionDate") ?? ""),
    investmentValue: form.get("investmentValue")
      ? Number(form.get("investmentValue"))
      : null,
    videoUrl: String(form.get("videoUrl") ?? ""),
    coverImage: String(form.get("coverImage") ?? ""),
    images: parseImageLines(String(form.get("images") ?? "")),
    featured: form.get("featured") === "on",
    heroSubtitleEn: String(form.get("heroSubtitleEn") ?? ""),
    heroSubtitleAr: String(form.get("heroSubtitleAr") ?? ""),
    deliveryTitleEn: String(form.get("deliveryTitleEn") ?? ""),
    deliveryTitleAr: String(form.get("deliveryTitleAr") ?? ""),
    deliveryBody1En: String(form.get("deliveryBody1En") ?? ""),
    deliveryBody1Ar: String(form.get("deliveryBody1Ar") ?? ""),
    deliveryBody2En: String(form.get("deliveryBody2En") ?? ""),
    deliveryBody2Ar: String(form.get("deliveryBody2Ar") ?? ""),
    deliveryVideoUrl: String(form.get("deliveryVideoUrl") ?? ""),
    deliveryCtaEn: String(form.get("deliveryCtaEn") ?? ""),
    deliveryCtaAr: String(form.get("deliveryCtaAr") ?? ""),
    brochureUrl: String(form.get("brochureUrl") ?? ""),
    panoramicImageUrl: String(form.get("panoramicImageUrl") ?? ""),
    panoramicVideoUrl: String(form.get("panoramicVideoUrl") ?? ""),
    panoramicBackgroundVideoUrl: String(
      form.get("panoramicBackgroundVideoUrl") ?? "",
    ),
    designGalleryImages: parseImageLines(String(form.get("designGalleryImages") ?? "")),
    coastalTitleEn: String(form.get("coastalTitleEn") ?? ""),
    coastalTitleAr: String(form.get("coastalTitleAr") ?? ""),
    coastalCol1En: String(form.get("coastalCol1En") ?? ""),
    coastalCol1Ar: String(form.get("coastalCol1Ar") ?? ""),
    coastalCol2En: String(form.get("coastalCol2En") ?? ""),
    coastalCol2Ar: String(form.get("coastalCol2Ar") ?? ""),
    coastalCol3En: String(form.get("coastalCol3En") ?? ""),
    coastalCol3Ar: String(form.get("coastalCol3Ar") ?? ""),
    coastalHighlightEn: String(form.get("coastalHighlightEn") ?? ""),
    coastalHighlightAr: String(form.get("coastalHighlightAr") ?? ""),
    galleryImages: parseImageLines(String(form.get("galleryImages") ?? "")),
    approachColumns: filteredApproach,
    mapImageUrl: String(form.get("mapImageUrl") ?? ""),
    mapLogoUrl: String(form.get("mapLogoUrl") ?? ""),
    locationBlurbEn: String(form.get("locationBlurbEn") ?? ""),
    locationBlurbAr: String(form.get("locationBlurbAr") ?? ""),
    locationLabelEn: String(form.get("locationLabelEn") ?? ""),
    locationLabelAr: String(form.get("locationLabelAr") ?? ""),
    materialColorsIntroImageUrl: String(form.get("materialColorsIntroImageUrl") ?? ""),
    materialColors: filteredColors,
    creditsTitleEn: String(form.get("creditsTitleEn") ?? ""),
    creditsTitleAr: String(form.get("creditsTitleAr") ?? ""),
    projectCredits: filteredCredits,
    luxuryTitleEn: String(form.get("luxuryTitleEn") ?? ""),
    luxuryTitleAr: String(form.get("luxuryTitleAr") ?? ""),
    luxuryCol1En: String(form.get("luxuryCol1En") ?? ""),
    luxuryCol1Ar: String(form.get("luxuryCol1Ar") ?? ""),
    luxuryCol2En: String(form.get("luxuryCol2En") ?? ""),
    luxuryCol2Ar: String(form.get("luxuryCol2Ar") ?? ""),
    closingImageUrl: String(form.get("closingImageUrl") ?? ""),
    ctaEyebrowEn: String(form.get("ctaEyebrowEn") ?? ""),
    ctaEyebrowAr: String(form.get("ctaEyebrowAr") ?? ""),
    ctaTitleEn: String(form.get("ctaTitleEn") ?? ""),
    ctaTitleAr: String(form.get("ctaTitleAr") ?? ""),
    ctaBodyEn: String(form.get("ctaBodyEn") ?? ""),
    ctaBodyAr: String(form.get("ctaBodyAr") ?? ""),
    ctaButtonEn: String(form.get("ctaButtonEn") ?? ""),
    ctaButtonAr: String(form.get("ctaButtonAr") ?? ""),
    ctaWhatsappUrl: String(form.get("ctaWhatsappUrl") ?? ""),
    facilitiesTitleEn: String(form.get("facilitiesTitleEn") ?? ""),
    facilitiesTitleAr: String(form.get("facilitiesTitleAr") ?? ""),
    facilitiesEn: parseFacilityLines(String(form.get("facilitiesEn") ?? "")),
    facilitiesAr: parseFacilityLines(String(form.get("facilitiesAr") ?? "")),
    amenities: filteredAmenities,
  };
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-lg border border-primary/10 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-primary/60">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState<ProjectAmenity[]>(
    project?.amenities ?? [],
  );
  const [approachColumns, setApproachColumns] = useState<ProjectApproachColumn[]>(
    project?.approachColumns ?? [],
  );
  const [materialColors, setMaterialColors] = useState<ProjectMaterialColor[]>(
    project?.materialColors ?? [],
  );
  const [projectCredits, setProjectCredits] = useState<ProjectCreditGroup[]>(
    project?.projectCredits ?? [],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = buildPayload(
      form,
      amenities,
      approachColumns,
      materialColors,
      projectCredits,
    );

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
      <Section
        title="Listing & URL"
        description="Used on homepage grid, projects carousel, and SEO listing cards."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Slug (URL)"
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
              Featured on homepage
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
          label="Short description (EN) — carousel / cards"
          name="descEn"
          required
          defaultValue={project?.descEn}
        />
        <AdminTextarea
          label="Short description (AR)"
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
          label="Cover / hero image URL"
          name="coverImage"
          type="url"
          required
          defaultValue={project?.coverImage}
        />
        <AdminInput
          label="Listing gallery URLs (optional, one per line)"
          name="images"
          defaultValue={project?.images.join("\n") ?? ""}
        />
      </Section>

      <Section
        title="Hero"
        description="Top banner on the project page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Subtitle (EN)"
            name="heroSubtitleEn"
            defaultValue={project?.heroSubtitleEn ?? ""}
          />
          <AdminInput
            label="Subtitle (AR)"
            name="heroSubtitleAr"
            defaultValue={project?.heroSubtitleAr ?? ""}
          />
        </div>
      </Section>

      <Section title="Delivery section (sage green block)">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Title (EN)"
            name="deliveryTitleEn"
            placeholder="DELIVERY"
            defaultValue={project?.deliveryTitleEn ?? ""}
          />
          <AdminInput
            label="Title (AR)"
            name="deliveryTitleAr"
            defaultValue={project?.deliveryTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="Paragraph 1 (EN)"
          name="deliveryBody1En"
          defaultValue={project?.deliveryBody1En ?? ""}
        />
        <AdminTextarea
          label="Paragraph 1 (AR)"
          name="deliveryBody1Ar"
          defaultValue={project?.deliveryBody1Ar ?? ""}
        />
        <AdminTextarea
          label="Paragraph 2 (EN)"
          name="deliveryBody2En"
          defaultValue={project?.deliveryBody2En ?? ""}
        />
        <AdminTextarea
          label="Paragraph 2 (AR)"
          name="deliveryBody2Ar"
          defaultValue={project?.deliveryBody2Ar ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Delivery section video (YouTube or MP4)"
            name="deliveryVideoUrl"
            type="url"
            defaultValue={project?.deliveryVideoUrl ?? ""}
          />
          <AdminInput
            label="Button label (EN)"
            name="deliveryCtaEn"
            defaultValue={project?.deliveryCtaEn ?? ""}
          />
        </div>
        <AdminInput
          label="Button label (AR)"
          name="deliveryCtaAr"
          defaultValue={project?.deliveryCtaAr ?? ""}
        />
        <AdminInput
          label="Brochure / CTA URL"
          name="brochureUrl"
          type="url"
          defaultValue={project?.brochureUrl ?? ""}
        />
        <AdminInput
          label="Hero play button video (YouTube — opens in modal)"
          name="panoramicVideoUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=…"
          defaultValue={project?.panoramicVideoUrl ?? ""}
        />
        <AdminInput
          label="Background video (MP4 or YouTube — autoplays, no button)"
          name="panoramicBackgroundVideoUrl"
          type="url"
          placeholder="https://…/video.mp4"
          defaultValue={project?.panoramicBackgroundVideoUrl ?? ""}
        />
        <AdminInput
          label="Background video poster (optional, MP4 only)"
          name="panoramicImageUrl"
          type="url"
          defaultValue={project?.panoramicImageUrl ?? ""}
        />
      </Section>

      <Section
        title="Design gallery"
        description="New design renders shown first in the masonry grid (one URL per line)."
      >
        <AdminTextarea
          label="Design image URLs"
          name="designGalleryImages"
          defaultValue={project?.designGalleryImages.join("\n") ?? ""}
        />
      </Section>

      <Section title="Coastal living & gallery">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminTextarea
            label="Section title (EN)"
            name="coastalTitleEn"
            defaultValue={project?.coastalTitleEn ?? ""}
          />
          <AdminTextarea
            label="Section title (AR)"
            name="coastalTitleAr"
            defaultValue={project?.coastalTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="Column 1 (EN)"
          name="coastalCol1En"
          defaultValue={project?.coastalCol1En ?? ""}
        />
        <AdminTextarea
          label="Column 1 (AR)"
          name="coastalCol1Ar"
          defaultValue={project?.coastalCol1Ar ?? ""}
        />
        <AdminTextarea
          label="Column 2 (EN)"
          name="coastalCol2En"
          defaultValue={project?.coastalCol2En ?? ""}
        />
        <AdminTextarea
          label="Column 2 (AR)"
          name="coastalCol2Ar"
          defaultValue={project?.coastalCol2Ar ?? ""}
        />
        <AdminTextarea
          label="Summary column (EN)"
          name="coastalCol3En"
          defaultValue={project?.coastalCol3En ?? ""}
        />
        <AdminTextarea
          label="Summary column (AR)"
          name="coastalCol3Ar"
          defaultValue={project?.coastalCol3Ar ?? ""}
        />
        <AdminTextarea
          label="Highlight quote (EN)"
          name="coastalHighlightEn"
          defaultValue={project?.coastalHighlightEn ?? ""}
        />
        <AdminTextarea
          label="Highlight quote (AR)"
          name="coastalHighlightAr"
          defaultValue={project?.coastalHighlightAr ?? ""}
        />
        <AdminTextarea
          label="Gallery image URLs (5 recommended, one per line, in order)"
          name="galleryImages"
          defaultValue={project?.galleryImages.join("\n") ?? ""}
        />
      </Section>

      <Section
        title="Approach columns"
        description="Three-column grid shown before the location map. Use paragraph columns for body copy and highlight for numbered steps with a large headline."
      >
        <ProjectApproachColumnsEditor
          value={approachColumns}
          onChange={setApproachColumns}
        />
      </Section>

      <Section title="Location map">
        <AdminInput
          label="Map image URL"
          name="mapImageUrl"
          type="url"
          defaultValue={project?.mapImageUrl ?? ""}
        />
        <AdminInput
          label="Map overlay logo URL"
          name="mapLogoUrl"
          type="url"
          defaultValue={project?.mapLogoUrl ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Label (EN)"
            name="locationLabelEn"
            defaultValue={project?.locationLabelEn ?? ""}
          />
          <AdminInput
            label="Label (AR)"
            name="locationLabelAr"
            defaultValue={project?.locationLabelAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="Location text (EN)"
          name="locationBlurbEn"
          defaultValue={project?.locationBlurbEn ?? ""}
        />
        <AdminTextarea
          label="Location text (AR)"
          name="locationBlurbAr"
          defaultValue={project?.locationBlurbAr ?? ""}
        />
      </Section>

      <Section
        title="Material colors"
        description="Color palette shown after the location map. Optional intro image appears as the first card."
      >
        <AdminInput
          label="Intro image URL (optional)"
          name="materialColorsIntroImageUrl"
          type="url"
          defaultValue={project?.materialColorsIntroImageUrl ?? ""}
        />
        <ProjectMaterialColorsEditor
          value={materialColors}
          onChange={setMaterialColors}
        />
      </Section>

      <Section
        title="Credits"
        description="Team credits grid shown after material colors. Add one category per column (e.g. Project Management, Design & Architecture)."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Section title (EN)"
            name="creditsTitleEn"
            placeholder="Credits"
            defaultValue={project?.creditsTitleEn ?? ""}
          />
          <AdminInput
            label="Section title (AR)"
            name="creditsTitleAr"
            placeholder="الاعتمادات"
            defaultValue={project?.creditsTitleAr ?? ""}
          />
        </div>
        <ProjectCreditsEditor value={projectCredits} onChange={setProjectCredits} />
      </Section>

      <Section
        title="Features section"
        description="Heading above the 3×2 feature cards. Optional intro columns render above the grid when filled."
      >
        <AdminTextarea
          label="Section title (EN)"
          name="luxuryTitleEn"
          placeholder="Where luxury meets the dynamic choice"
          defaultValue={project?.luxuryTitleEn ?? ""}
        />
        <AdminTextarea
          label="Section title (AR)"
          name="luxuryTitleAr"
          defaultValue={project?.luxuryTitleAr ?? ""}
        />
        <AdminTextarea
          label="Intro column 1 (EN)"
          name="luxuryCol1En"
          defaultValue={project?.luxuryCol1En ?? ""}
        />
        <AdminTextarea
          label="Intro column 1 (AR)"
          name="luxuryCol1Ar"
          defaultValue={project?.luxuryCol1Ar ?? ""}
        />
        <AdminTextarea
          label="Intro column 2 (EN)"
          name="luxuryCol2En"
          defaultValue={project?.luxuryCol2En ?? ""}
        />
        <AdminTextarea
          label="Intro column 2 (AR)"
          name="luxuryCol2Ar"
          defaultValue={project?.luxuryCol2Ar ?? ""}
        />
      </Section>

      <Section title="Feature cards (3×2 grid)">
        <ProjectAmenitiesEditor value={amenities} onChange={setAmenities} />
      </Section>

      <Section
        title="Facilities list"
        description="Multi-column text list below the feature cards (one facility per line)."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Section title (EN)"
            name="facilitiesTitleEn"
            placeholder="Amenities"
            defaultValue={project?.facilitiesTitleEn ?? ""}
          />
          <AdminInput
            label="Section title (AR)"
            name="facilitiesTitleAr"
            placeholder="المرافق"
            defaultValue={project?.facilitiesTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="Facilities (EN, one per line)"
          name="facilitiesEn"
          defaultValue={project?.facilitiesEn.join("\n") ?? ""}
        />
        <AdminTextarea
          label="Facilities (AR, one per line)"
          name="facilitiesAr"
          defaultValue={project?.facilitiesAr.join("\n") ?? ""}
        />
      </Section>

      <Section title="Closing image">
        <AdminInput
          label="Footer patio / closing image URL"
          name="closingImageUrl"
          type="url"
          defaultValue={project?.closingImageUrl ?? ""}
        />
      </Section>

      <Section
        title="Say Hi CTA"
        description="Contact banner after the closing image. Fill any field to enable; empty fields use defaults."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Eyebrow (EN)"
            name="ctaEyebrowEn"
            placeholder="WE WOULD LOVE TO HEAR FROM YOU"
            defaultValue={project?.ctaEyebrowEn ?? ""}
          />
          <AdminInput
            label="Eyebrow (AR)"
            name="ctaEyebrowAr"
            defaultValue={project?.ctaEyebrowAr ?? ""}
          />
          <AdminInput
            label="Title (EN)"
            name="ctaTitleEn"
            placeholder="SAY HI"
            defaultValue={project?.ctaTitleEn ?? ""}
          />
          <AdminInput
            label="Title (AR)"
            name="ctaTitleAr"
            defaultValue={project?.ctaTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="Description (EN)"
          name="ctaBodyEn"
          defaultValue={project?.ctaBodyEn ?? ""}
        />
        <AdminTextarea
          label="Description (AR)"
          name="ctaBodyAr"
          defaultValue={project?.ctaBodyAr ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Button label (EN)"
            name="ctaButtonEn"
            placeholder="DROP US A LINE"
            defaultValue={project?.ctaButtonEn ?? ""}
          />
          <AdminInput
            label="Button label (AR)"
            name="ctaButtonAr"
            defaultValue={project?.ctaButtonAr ?? ""}
          />
        </div>
        <AdminInput
          label="WhatsApp URL or phone"
          name="ctaWhatsappUrl"
          type="url"
          placeholder="https://wa.me/9665xxxxxxx"
          defaultValue={project?.ctaWhatsappUrl ?? ""}
        />
      </Section>

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
