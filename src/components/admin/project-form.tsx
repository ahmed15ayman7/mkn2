"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProjectAmenitiesEditor } from "@/components/admin/project-amenities-editor";
import { ProjectApproachColumnsEditor } from "@/components/admin/project-approach-columns-editor";
import { ProjectCreditsEditor } from "@/components/admin/project-credits-editor";
import { ProjectMaterialColorsEditor } from "@/components/admin/project-material-colors-editor";
import { AdminCollapsibleSection } from "@/components/admin/admin-collapsible-section";
import { AdminFieldHelp } from "@/components/admin/admin-field-help";
import { AdminGalleryUrlsField } from "@/components/admin/admin-gallery-urls-field";
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

type FormMediaState = {
  coverImage: string;
  panoramicVideoUrl: string;
  deliveryVideoUrl: string;
  panoramicBackgroundVideoUrl: string;
  panoramicImageUrl: string;
  mapImageUrl: string;
  mapLogoUrl: string;
  closingImageUrl: string;
  materialColorsIntroImageUrl: string;
  designGalleryImages: string[];
  galleryImages: string[];
};

function buildPayload(
  form: FormData,
  amenities: ProjectAmenity[],
  approachColumns: ProjectApproachColumn[],
  materialColors: ProjectMaterialColor[],
  projectCredits: ProjectCreditGroup[],
  media: FormMediaState,
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
    coverImage: media.coverImage || String(form.get("coverImage") ?? ""),
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
    deliveryVideoUrl: media.deliveryVideoUrl,
    deliveryCtaEn: String(form.get("deliveryCtaEn") ?? ""),
    deliveryCtaAr: String(form.get("deliveryCtaAr") ?? ""),
    brochureUrl: String(form.get("brochureUrl") ?? ""),
    panoramicImageUrl: media.panoramicImageUrl,
    panoramicVideoUrl: media.panoramicVideoUrl,
    panoramicBackgroundVideoUrl: media.panoramicBackgroundVideoUrl,
    designGalleryImages: media.designGalleryImages,
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
    galleryImages: media.galleryImages,
    approachColumns: filteredApproach,
    mapImageUrl: media.mapImageUrl,
    mapLogoUrl: media.mapLogoUrl,
    locationBlurbEn: String(form.get("locationBlurbEn") ?? ""),
    locationBlurbAr: String(form.get("locationBlurbAr") ?? ""),
    locationLabelEn: String(form.get("locationLabelEn") ?? ""),
    locationLabelAr: String(form.get("locationLabelAr") ?? ""),
    materialColorsIntroImageUrl: media.materialColorsIntroImageUrl,
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
    closingImageUrl: media.closingImageUrl,
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

function initialMedia(project?: SerializedProject): FormMediaState {
  return {
    coverImage: project?.coverImage ?? "",
    panoramicVideoUrl: project?.panoramicVideoUrl ?? "",
    deliveryVideoUrl: project?.deliveryVideoUrl ?? "",
    panoramicBackgroundVideoUrl: project?.panoramicBackgroundVideoUrl ?? "",
    panoramicImageUrl: project?.panoramicImageUrl ?? "",
    mapImageUrl: project?.mapImageUrl ?? "",
    mapLogoUrl: project?.mapLogoUrl ?? "",
    closingImageUrl: project?.closingImageUrl ?? "",
    materialColorsIntroImageUrl: project?.materialColorsIntroImageUrl ?? "",
    designGalleryImages: project?.designGalleryImages ?? [],
    galleryImages: project?.galleryImages ?? [],
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<FormMediaState>(() => initialMedia(project));
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

  function patchMedia(patch: Partial<FormMediaState>) {
    setMedia((prev) => ({ ...prev, ...patch }));
  }

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
      media,
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
    <form onSubmit={onSubmit} className="space-y-6">
      <AdminCollapsibleSection
        title="إعدادات القائمة"
        description="حقول البطاقات والرابط — لا تظهر بهذا الترتيب في صفحة تفاصيل المشروع."
        defaultOpen={false}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Slug (URL)"
            name="slug"
            helpKey="slug"
            required
            defaultValue={project?.slug}
            placeholder="sea-point"
          />
          <AdminField label="مميز في الصفحة الرئيسية" helpKey="featured">
            <label className="flex items-center gap-2 text-sm text-primary">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured}
                className="size-4 rounded border-primary/30"
              />
              Featured
            </label>
          </AdminField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="العنوان (EN)"
            name="titleEn"
            helpKey="titleEn"
            required
            defaultValue={project?.titleEn}
          />
          <AdminInput
            label="العنوان (AR)"
            name="titleAr"
            helpKey="titleAr"
            required
            defaultValue={project?.titleAr}
          />
        </div>
        <AdminTextarea
          label="وصف مختصر (EN)"
          name="descEn"
          helpKey="descEn"
          required
          defaultValue={project?.descEn}
        />
        <AdminTextarea
          label="وصف مختصر (AR)"
          name="descAr"
          helpKey="descAr"
          required
          defaultValue={project?.descAr}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="الموقع (EN)"
            name="locationEn"
            helpKey="locationEn"
            required
            defaultValue={project?.locationEn}
          />
          <AdminInput
            label="الموقع (AR)"
            name="locationAr"
            helpKey="locationAr"
            required
            defaultValue={project?.locationAr}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminInput
            label="المساحة (م²)"
            name="areaSqm"
            helpKey="areaSqm"
            type="number"
            step="0.01"
            defaultValue={project?.areaSqm ?? ""}
          />
          <AdminInput
            label="تاريخ التسليم"
            name="completionDate"
            helpKey="completionDate"
            type="date"
            defaultValue={project?.completionDate ?? ""}
          />
          <AdminInput
            label="سعر البداية"
            name="investmentValue"
            helpKey="investmentValue"
            type="number"
            step="0.01"
            defaultValue={project?.investmentValue ?? ""}
          />
        </div>
        <AdminInput
          label="صورة الغلاف / الهيرو"
          name="coverImage"
          helpKey="coverImage"
          type="url"
          required
          value={media.coverImage}
          onChange={(e) => patchMedia({ coverImage: e.target.value })}
          preview="image"
          previewUrl={media.coverImage}
        />
        <AdminTextarea
          label="صور القائمة (رابط في كل سطر)"
          name="images"
          helpKey="images"
          defaultValue={project?.images.join("\n") ?? ""}
        />
      </AdminCollapsibleSection>

      <Section
        title="1 — الهيرو"
        description="أعلى صفحة المشروع: خلفية، زر تشغيل، عنوان، وشبكة البيانات."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="السطر التعريفي (EN)"
            name="heroSubtitleEn"
            helpKey="heroSubtitleEn"
            placeholder="FULL FINISHED, READY TO MOVE"
            defaultValue={project?.heroSubtitleEn ?? ""}
          />
          <AdminInput
            label="السطر التعريفي (AR)"
            name="heroSubtitleAr"
            helpKey="heroSubtitleAr"
            defaultValue={project?.heroSubtitleAr ?? ""}
          />
        </div>
        <AdminInput
          label="فيديو زر التشغيل (يوتيوب أو MP4)"
          name="panoramicVideoUrl"
          helpKey="panoramicVideoUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=…"
          value={media.panoramicVideoUrl}
          onChange={(e) => patchMedia({ panoramicVideoUrl: e.target.value })}
          preview="video"
          previewUrl={media.panoramicVideoUrl}
        />
      </Section>

      <Section
        title="2 — التسليم"
        description="الكتلة الخضراء: نصوص، زر فيديو، وتحميل الكتيب."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="عنوان القسم (EN)"
            name="deliveryTitleEn"
            helpKey="deliveryTitleEn"
            placeholder="DELIVERY"
            defaultValue={project?.deliveryTitleEn ?? ""}
          />
          <AdminInput
            label="عنوان القسم (AR)"
            name="deliveryTitleAr"
            helpKey="deliveryTitleAr"
            defaultValue={project?.deliveryTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="الفقرة 1 (EN)"
          name="deliveryBody1En"
          helpKey="deliveryBody1En"
          defaultValue={project?.deliveryBody1En ?? ""}
        />
        <AdminTextarea
          label="الفقرة 1 (AR)"
          name="deliveryBody1Ar"
          helpKey="deliveryBody1Ar"
          defaultValue={project?.deliveryBody1Ar ?? ""}
        />
        <AdminTextarea
          label="الفقرة 2 (EN)"
          name="deliveryBody2En"
          helpKey="deliveryBody2En"
          defaultValue={project?.deliveryBody2En ?? ""}
        />
        <AdminTextarea
          label="الفقرة 2 (AR)"
          name="deliveryBody2Ar"
          helpKey="deliveryBody2Ar"
          defaultValue={project?.deliveryBody2Ar ?? ""}
        />
        <AdminInput
          label="فيديو قسم التسليم"
          name="deliveryVideoUrl"
          helpKey="deliveryVideoUrl"
          type="url"
          value={media.deliveryVideoUrl}
          onChange={(e) => patchMedia({ deliveryVideoUrl: e.target.value })}
          preview="video"
          previewUrl={media.deliveryVideoUrl}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="نص الزر (EN)"
            name="deliveryCtaEn"
            helpKey="deliveryCtaEn"
            defaultValue={project?.deliveryCtaEn ?? ""}
          />
          <AdminInput
            label="نص الزر (AR)"
            name="deliveryCtaAr"
            helpKey="deliveryCtaAr"
            defaultValue={project?.deliveryCtaAr ?? ""}
          />
        </div>
        <AdminInput
          label="رابط الكتيب"
          name="brochureUrl"
          helpKey="brochureUrl"
          type="url"
          defaultValue={project?.brochureUrl ?? ""}
        />
      </Section>

      <Section
        title="3 — فيديو الخلفية"
        description="شريط فيديو بعرض الصفحة بين التسليم والمعرض."
      >
        <AdminInput
          label="فيديو الخلفية (يوتيوب أو MP4)"
          name="panoramicBackgroundVideoUrl"
          helpKey="panoramicBackgroundVideoUrl"
          type="url"
          placeholder="https://…/video.mp4"
          value={media.panoramicBackgroundVideoUrl}
          onChange={(e) =>
            patchMedia({ panoramicBackgroundVideoUrl: e.target.value })
          }
          preview="video"
          previewUrl={media.panoramicBackgroundVideoUrl}
        />
        <AdminInput
          label="بوستر الفيديو (اختياري)"
          name="panoramicImageUrl"
          helpKey="panoramicImageUrl"
          type="url"
          value={media.panoramicImageUrl}
          onChange={(e) => patchMedia({ panoramicImageUrl: e.target.value })}
          preview="image"
          previewUrl={media.panoramicImageUrl}
        />
      </Section>

      <Section
        title="4 — الساحل والمعرض"
        description="عنوان ونصوص ثم صف الصور الأفقي."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminTextarea
            label="عنوان المعرض (EN)"
            name="coastalTitleEn"
            helpKey="coastalTitleEn"
            defaultValue={project?.coastalTitleEn ?? ""}
          />
          <AdminTextarea
            label="عنوان المعرض (AR)"
            name="coastalTitleAr"
            helpKey="coastalTitleAr"
            defaultValue={project?.coastalTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="العمود 1 (EN)"
          name="coastalCol1En"
          helpKey="coastalCol1En"
          defaultValue={project?.coastalCol1En ?? ""}
        />
        <AdminTextarea
          label="العمود 1 (AR)"
          name="coastalCol1Ar"
          helpKey="coastalCol1Ar"
          defaultValue={project?.coastalCol1Ar ?? ""}
        />
        <AdminTextarea
          label="العمود 2 (EN)"
          name="coastalCol2En"
          helpKey="coastalCol2En"
          defaultValue={project?.coastalCol2En ?? ""}
        />
        <AdminTextarea
          label="العمود 2 (AR)"
          name="coastalCol2Ar"
          helpKey="coastalCol2Ar"
          defaultValue={project?.coastalCol2Ar ?? ""}
        />
        <AdminTextarea
          label="العمود 3 (EN)"
          name="coastalCol3En"
          helpKey="coastalCol3En"
          defaultValue={project?.coastalCol3En ?? ""}
        />
        <AdminTextarea
          label="العمود 3 (AR)"
          name="coastalCol3Ar"
          helpKey="coastalCol3Ar"
          defaultValue={project?.coastalCol3Ar ?? ""}
        />
        <AdminTextarea
          label="اقتباس (EN)"
          name="coastalHighlightEn"
          helpKey="coastalHighlightEn"
          defaultValue={project?.coastalHighlightEn ?? ""}
        />
        <AdminTextarea
          label="اقتباس (AR)"
          name="coastalHighlightAr"
          helpKey="coastalHighlightAr"
          defaultValue={project?.coastalHighlightAr ?? ""}
        />
        <AdminGalleryUrlsField
          label="صور التصميم"
          helpKey="designGalleryImages"
          value={media.designGalleryImages}
          onChange={(designGalleryImages) => patchMedia({ designGalleryImages })}
        />
        <AdminGalleryUrlsField
          label="صور المعرض"
          helpKey="galleryImages"
          value={media.galleryImages}
          onChange={(galleryImages) => patchMedia({ galleryImages })}
        />
      </Section>

      <Section
        title="5 — أعمدة النهج"
        description="شبكة أعمدة قبل خريطة الموقع."
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">محرر الأعمدة</span>
          <AdminFieldHelp helpKey="approachColumns" />
        </div>
        <ProjectApproachColumnsEditor
          value={approachColumns}
          onChange={setApproachColumns}
        />
      </Section>

      <Section title="6 — خريطة الموقع">
        <AdminInput
          label="صورة الخريطة"
          name="mapImageUrl"
          helpKey="mapImageUrl"
          type="url"
          value={media.mapImageUrl}
          onChange={(e) => patchMedia({ mapImageUrl: e.target.value })}
          preview="image"
          previewUrl={media.mapImageUrl}
        />
        <AdminInput
          label="شعار البطاقة"
          name="mapLogoUrl"
          helpKey="mapLogoUrl"
          type="url"
          value={media.mapLogoUrl}
          onChange={(e) => patchMedia({ mapLogoUrl: e.target.value })}
          preview="image"
          previewUrl={media.mapLogoUrl}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="تسمية البطاقة (EN)"
            name="locationLabelEn"
            helpKey="locationLabelEn"
            defaultValue={project?.locationLabelEn ?? ""}
          />
          <AdminInput
            label="تسمية البطاقة (AR)"
            name="locationLabelAr"
            helpKey="locationLabelAr"
            defaultValue={project?.locationLabelAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="نص الموقع (EN)"
          name="locationBlurbEn"
          helpKey="locationBlurbEn"
          defaultValue={project?.locationBlurbEn ?? ""}
        />
        <AdminTextarea
          label="نص الموقع (AR)"
          name="locationBlurbAr"
          helpKey="locationBlurbAr"
          defaultValue={project?.locationBlurbAr ?? ""}
        />
      </Section>

      <Section
        title="7 — المميزات"
        description="عنوان، مقدمة، وبطاقات 3×2."
      >
        <AdminTextarea
          label="عنوان القسم (EN)"
          name="luxuryTitleEn"
          helpKey="luxuryTitleEn"
          placeholder="Where luxury meets the dynamic choice"
          defaultValue={project?.luxuryTitleEn ?? ""}
        />
        <AdminTextarea
          label="عنوان القسم (AR)"
          name="luxuryTitleAr"
          helpKey="luxuryTitleAr"
          defaultValue={project?.luxuryTitleAr ?? ""}
        />
        <AdminTextarea
          label="مقدمة 1 (EN)"
          name="luxuryCol1En"
          helpKey="luxuryCol1En"
          defaultValue={project?.luxuryCol1En ?? ""}
        />
        <AdminTextarea
          label="مقدمة 1 (AR)"
          name="luxuryCol1Ar"
          helpKey="luxuryCol1Ar"
          defaultValue={project?.luxuryCol1Ar ?? ""}
        />
        <AdminTextarea
          label="مقدمة 2 (EN)"
          name="luxuryCol2En"
          helpKey="luxuryCol2En"
          defaultValue={project?.luxuryCol2En ?? ""}
        />
        <AdminTextarea
          label="مقدمة 2 (AR)"
          name="luxuryCol2Ar"
          helpKey="luxuryCol2Ar"
          defaultValue={project?.luxuryCol2Ar ?? ""}
        />
        <div className="flex items-center gap-2 pt-2">
          <span className="text-sm font-medium text-primary">بطاقات المميزات</span>
          <AdminFieldHelp helpKey="amenities" />
        </div>
        <ProjectAmenitiesEditor value={amenities} onChange={setAmenities} />
      </Section>

      <Section title="8 — ألوان المواد">
        <AdminInput
          label="صورة البطاقة الأولى (اختياري)"
          name="materialColorsIntroImageUrl"
          helpKey="materialColorsIntroImageUrl"
          type="url"
          value={media.materialColorsIntroImageUrl}
          onChange={(e) =>
            patchMedia({ materialColorsIntroImageUrl: e.target.value })
          }
          preview="image"
          previewUrl={media.materialColorsIntroImageUrl}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">عينات الألوان</span>
          <AdminFieldHelp helpKey="materialColors" />
        </div>
        <ProjectMaterialColorsEditor
          value={materialColors}
          onChange={setMaterialColors}
        />
      </Section>

      <Section title="9 — الاعتمادات">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="عنوان القسم (EN)"
            name="creditsTitleEn"
            helpKey="creditsTitleEn"
            placeholder="Credits"
            defaultValue={project?.creditsTitleEn ?? ""}
          />
          <AdminInput
            label="عنوان القسم (AR)"
            name="creditsTitleAr"
            helpKey="creditsTitleAr"
            placeholder="الاعتمادات"
            defaultValue={project?.creditsTitleAr ?? ""}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">فئات الاعتمادات</span>
          <AdminFieldHelp helpKey="projectCredits" />
        </div>
        <ProjectCreditsEditor value={projectCredits} onChange={setProjectCredits} />
      </Section>

      <Section title="10 — المرافق">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="عنوان القائمة (EN)"
            name="facilitiesTitleEn"
            helpKey="facilitiesTitleEn"
            placeholder="Amenities"
            defaultValue={project?.facilitiesTitleEn ?? ""}
          />
          <AdminInput
            label="عنوان القائمة (AR)"
            name="facilitiesTitleAr"
            helpKey="facilitiesTitleAr"
            placeholder="المرافق"
            defaultValue={project?.facilitiesTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="المرافق (EN — سطر لكل عنصر)"
          name="facilitiesEn"
          helpKey="facilitiesEn"
          defaultValue={project?.facilitiesEn.join("\n") ?? ""}
        />
        <AdminTextarea
          label="المرافق (AR)"
          name="facilitiesAr"
          helpKey="facilitiesAr"
          defaultValue={project?.facilitiesAr.join("\n") ?? ""}
        />
      </Section>

      <Section title="11 — صورة الإغلاق">
        <AdminInput
          label="صورة الإغلاق"
          name="closingImageUrl"
          helpKey="closingImageUrl"
          type="url"
          value={media.closingImageUrl}
          onChange={(e) => patchMedia({ closingImageUrl: e.target.value })}
          preview="image"
          previewUrl={media.closingImageUrl}
        />
      </Section>

      <Section title="12 — Say Hi">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="السطر العلوي (EN)"
            name="ctaEyebrowEn"
            helpKey="ctaEyebrowEn"
            placeholder="WE WOULD LOVE TO HEAR FROM YOU"
            defaultValue={project?.ctaEyebrowEn ?? ""}
          />
          <AdminInput
            label="السطر العلوي (AR)"
            name="ctaEyebrowAr"
            helpKey="ctaEyebrowAr"
            defaultValue={project?.ctaEyebrowAr ?? ""}
          />
          <AdminInput
            label="العنوان (EN)"
            name="ctaTitleEn"
            helpKey="ctaTitleEn"
            placeholder="SAY HI"
            defaultValue={project?.ctaTitleEn ?? ""}
          />
          <AdminInput
            label="العنوان (AR)"
            name="ctaTitleAr"
            helpKey="ctaTitleAr"
            defaultValue={project?.ctaTitleAr ?? ""}
          />
        </div>
        <AdminTextarea
          label="الوصف (EN)"
          name="ctaBodyEn"
          helpKey="ctaBodyEn"
          defaultValue={project?.ctaBodyEn ?? ""}
        />
        <AdminTextarea
          label="الوصف (AR)"
          name="ctaBodyAr"
          helpKey="ctaBodyAr"
          defaultValue={project?.ctaBodyAr ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="نص الزر (EN)"
            name="ctaButtonEn"
            helpKey="ctaButtonEn"
            placeholder="DROP US A LINE"
            defaultValue={project?.ctaButtonEn ?? ""}
          />
          <AdminInput
            label="نص الزر (AR)"
            name="ctaButtonAr"
            helpKey="ctaButtonAr"
            defaultValue={project?.ctaButtonAr ?? ""}
          />
        </div>
        <AdminInput
          label="واتساب أو رابط"
          name="ctaWhatsappUrl"
          helpKey="ctaWhatsappUrl"
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
          {loading ? "جاري الحفظ…" : project ? "تحديث المشروع" : "إنشاء المشروع"}
        </Button>
        <Link
          href="/admin/projects"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          إلغاء
        </Link>
      </div>
    </form>
  );
}
