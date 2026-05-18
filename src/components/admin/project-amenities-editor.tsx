"use client";

import { AdminInput, AdminTextarea } from "@/components/admin/admin-field";
import type { ProjectAmenity } from "@/lib/projects/types";

const emptyAmenity = (): ProjectAmenity => ({
  titleEn: "",
  titleAr: "",
  descEn: "",
  descAr: "",
  imageUrl: null,
  variant: "default",
});

type Props = {
  value: ProjectAmenity[];
  onChange: (value: ProjectAmenity[]) => void;
};

export function ProjectAmenitiesEditor({ value, onChange }: Props) {
  const items = value.length > 0 ? value : [emptyAmenity()];

  function update(index: number, patch: Partial<ProjectAmenity>) {
    const next = items.map((item, i) =>
      i === index ? { ...item, ...patch } : item,
    );
    onChange(next);
  }

  function add() {
    onChange([...items, emptyAmenity()]);
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
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-primary">
              Amenity {index + 1}
            </p>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Title (EN)"
              value={item.titleEn}
              onChange={(e) => update(index, { titleEn: e.target.value })}
            />
            <AdminInput
              label="Title (AR)"
              value={item.titleAr}
              onChange={(e) => update(index, { titleAr: e.target.value })}
            />
          </div>
          <AdminTextarea
            label="Description (EN)"
            value={item.descEn}
            onChange={(e) => update(index, { descEn: e.target.value })}
          />
          <AdminTextarea
            label="Description (AR)"
            value={item.descAr}
            onChange={(e) => update(index, { descAr: e.target.value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Image URL (optional)"
              type="url"
              value={item.imageUrl ?? ""}
              onChange={(e) =>
                update(index, { imageUrl: e.target.value || null })
              }
            />
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-primary">Card style</span>
              <select
                className="w-full rounded-lg border border-primary/10 bg-white px-3 py-2"
                value={item.variant ?? "default"}
                onChange={(e) =>
                  update(index, {
                    variant: e.target.value as ProjectAmenity["variant"],
                  })
                }
              >
                <option value="default">White</option>
                <option value="accent">Gold tint</option>
                <option value="muted">Grey</option>
                <option value="image">With image</option>
              </select>
            </label>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm font-medium text-primary hover:underline"
      >
        + Add amenity card
      </button>
    </div>
  );
}
