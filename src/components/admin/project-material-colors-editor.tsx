"use client";

import { AdminInput } from "@/components/admin/admin-field";
import type { ProjectMaterialColor } from "@/lib/projects/types";

const emptyColor = (): ProjectMaterialColor => ({
  category: "primary",
  nameEn: "",
  nameAr: "",
  hex: "#E8E4DF",
  ralCode: null,
  ncsCode: null,
});

type Props = {
  value: ProjectMaterialColor[];
  onChange: (value: ProjectMaterialColor[]) => void;
};

export function ProjectMaterialColorsEditor({ value, onChange }: Props) {
  const items = value.length > 0 ? value : [emptyColor()];

  function update(index: number, patch: Partial<ProjectMaterialColor>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function add() {
    onChange([...items, emptyColor()]);
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
            <p className="text-sm font-semibold text-primary">Color {index + 1}</p>
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
          <label className="block text-sm font-medium text-primary">
            Category
            <select
              className="mt-1 w-full rounded-lg border border-input bg-white px-2.5 py-2 text-sm"
              value={item.category}
              onChange={(e) =>
                update(index, {
                  category: e.target.value === "secondary" ? "secondary" : "primary",
                })
              }
            >
              <option value="primary">Primary color</option>
              <option value="secondary">Secondary color</option>
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Name (EN)"
              value={item.nameEn}
              onChange={(e) => update(index, { nameEn: e.target.value })}
            />
            <AdminInput
              label="Name (AR)"
              value={item.nameAr}
              onChange={(e) => update(index, { nameAr: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminInput
              label="Hex color"
              value={item.hex}
              placeholder="#E8E4DF"
              onChange={(e) => update(index, { hex: e.target.value })}
            />
            <AdminInput
              label="RAL code"
              value={item.ralCode ?? ""}
              placeholder="RAL 1015"
              onChange={(e) => update(index, { ralCode: e.target.value || null })}
            />
            <AdminInput
              label="NCS code"
              value={item.ncsCode ?? ""}
              placeholder="NCS 2730-Y64R"
              onChange={(e) => update(index, { ncsCode: e.target.value || null })}
            />
          </div>
          <div
            className="h-16 rounded-sm border border-primary/10"
            style={{ backgroundColor: item.hex }}
            aria-hidden
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm font-medium text-primary hover:underline"
      >
        + Add color
      </button>
    </div>
  );
}
