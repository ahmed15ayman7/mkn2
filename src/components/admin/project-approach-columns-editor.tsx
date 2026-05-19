"use client";

import { AdminInput, AdminTextarea } from "@/components/admin/admin-field";
import type { ProjectApproachColumn } from "@/lib/projects/types";

const emptyParagraph = (): ProjectApproachColumn => ({
  kind: "paragraph",
  bodyEn: "",
  bodyAr: "",
});

const emptyHighlight = (): ProjectApproachColumn => ({
  kind: "highlight",
  index: "01",
  labelEn: "",
  labelAr: "",
  headlineEn: "",
  headlineAr: "",
});

type Props = {
  value: ProjectApproachColumn[];
  onChange: (value: ProjectApproachColumn[]) => void;
};

export function ProjectApproachColumnsEditor({ value, onChange }: Props) {
  const items = value.length > 0 ? value : [emptyParagraph()];

  function update(index: number, patch: Partial<ProjectApproachColumn>) {
    onChange(
      items.map((item, i) =>
        i === index ? ({ ...item, ...patch } as ProjectApproachColumn) : item,
      ),
    );
  }

  function setKind(index: number, kind: "paragraph" | "highlight") {
    onChange(
      items.map((item, i) =>
        i === index ? (kind === "highlight" ? emptyHighlight() : emptyParagraph()) : item,
      ),
    );
  }

  function add(kind: "paragraph" | "highlight") {
    onChange([...items, kind === "highlight" ? emptyHighlight() : emptyParagraph()]);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-4 rounded-lg border border-primary/10 bg-surface/50 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-primary">Column {index + 1}</p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-primary/80">
                <input
                  type="radio"
                  name={`approach-kind-${index}`}
                  checked={item.kind === "paragraph"}
                  onChange={() => setKind(index, "paragraph")}
                />
                Paragraph
              </label>
              <label className="flex items-center gap-1.5 text-xs text-primary/80">
                <input
                  type="radio"
                  name={`approach-kind-${index}`}
                  checked={item.kind === "highlight"}
                  onChange={() => setKind(index, "highlight")}
                />
                Highlight step
              </label>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {item.kind === "paragraph" ? (
            <>
              <AdminTextarea
                label="Body (EN)"
                value={item.bodyEn}
                onChange={(e) => update(index, { bodyEn: e.target.value })}
              />
              <AdminTextarea
                label="Body (AR)"
                value={item.bodyAr}
                onChange={(e) => update(index, { bodyAr: e.target.value })}
              />
            </>
          ) : (
            <>
              <AdminInput
                label="Step index"
                value={item.index}
                placeholder="02"
                onChange={(e) => update(index, { index: e.target.value })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminInput
                  label="Label (EN)"
                  value={item.labelEn}
                  placeholder="A TAILORED APPROACH"
                  onChange={(e) => update(index, { labelEn: e.target.value })}
                />
                <AdminInput
                  label="Label (AR)"
                  value={item.labelAr}
                  onChange={(e) => update(index, { labelAr: e.target.value })}
                />
              </div>
              <AdminTextarea
                label="Headline (EN)"
                value={item.headlineEn}
                onChange={(e) => update(index, { headlineEn: e.target.value })}
              />
              <AdminTextarea
                label="Headline (AR)"
                value={item.headlineAr}
                onChange={(e) => update(index, { headlineAr: e.target.value })}
              />
            </>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => add("paragraph")}
          className="text-sm font-medium text-primary hover:underline"
        >
          + Add paragraph column
        </button>
        <button
          type="button"
          onClick={() => add("highlight")}
          className="text-sm font-medium text-primary hover:underline"
        >
          + Add highlight column
        </button>
      </div>
    </div>
  );
}
