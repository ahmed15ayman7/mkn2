"use client";

import { AdminInput } from "@/components/admin/admin-field";
import type { ProjectCreditGroup, ProjectCreditItem } from "@/lib/projects/types";

const emptyItem = (): ProjectCreditItem => ({
  roleEn: "",
  roleAr: "",
  nameEn: "",
  nameAr: "",
});

const emptyGroup = (): ProjectCreditGroup => ({
  titleEn: "",
  titleAr: "",
  items: [emptyItem()],
});

type Props = {
  value: ProjectCreditGroup[];
  onChange: (value: ProjectCreditGroup[]) => void;
};

export function ProjectCreditsEditor({ value, onChange }: Props) {
  const groups = value.length > 0 ? value : [emptyGroup()];

  function updateGroup(index: number, patch: Partial<ProjectCreditGroup>) {
    onChange(groups.map((g, i) => (i === index ? { ...g, ...patch } : g)));
  }

  function updateItem(groupIndex: number, itemIndex: number, patch: Partial<ProjectCreditItem>) {
    const group = groups[groupIndex]!;
    const items = group.items.map((item, i) =>
      i === itemIndex ? { ...item, ...patch } : item,
    );
    updateGroup(groupIndex, { items });
  }

  function addGroup() {
    onChange([...groups, emptyGroup()]);
  }

  function removeGroup(index: number) {
    onChange(groups.filter((_, i) => i !== index));
  }

  function addItem(groupIndex: number) {
    const group = groups[groupIndex]!;
    updateGroup(groupIndex, { items: [...group.items, emptyItem()] });
  }

  function removeItem(groupIndex: number, itemIndex: number) {
    const group = groups[groupIndex]!;
    updateGroup(groupIndex, {
      items: group.items.filter((_, i) => i !== itemIndex),
    });
  }

  return (
    <div className="space-y-8">
      {groups.map((group, gi) => (
        <div
          key={gi}
          className="space-y-4 rounded-lg border border-primary/10 bg-surface/50 p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-primary">Category {gi + 1}</p>
            {groups.length > 1 && (
              <button
                type="button"
                onClick={() => removeGroup(gi)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove category
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Category title (EN)"
              value={group.titleEn}
              placeholder="PROJECT MANAGEMENT"
              onChange={(e) => updateGroup(gi, { titleEn: e.target.value })}
            />
            <AdminInput
              label="Category title (AR)"
              value={group.titleAr}
              onChange={(e) => updateGroup(gi, { titleAr: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            {group.items.map((item, ii) => (
              <div
                key={ii}
                className="space-y-3 rounded-md border border-primary/5 bg-white p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-primary/70">Entry {ii + 1}</p>
                  {group.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(gi, ii)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <AdminInput
                    label="Role (EN)"
                    value={item.roleEn}
                    placeholder="Brand research"
                    onChange={(e) => updateItem(gi, ii, { roleEn: e.target.value })}
                  />
                  <AdminInput
                    label="Role (AR)"
                    value={item.roleAr}
                    onChange={(e) => updateItem(gi, ii, { roleAr: e.target.value })}
                  />
                  <AdminInput
                    label="Name (EN)"
                    value={item.nameEn}
                    placeholder="Stacey Grey"
                    onChange={(e) => updateItem(gi, ii, { nameEn: e.target.value })}
                  />
                  <AdminInput
                    label="Name (AR)"
                    value={item.nameAr}
                    onChange={(e) => updateItem(gi, ii, { nameAr: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem(gi)}
              className="text-sm text-primary hover:underline"
            >
              + Add entry
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addGroup}
        className="text-sm font-medium text-primary hover:underline"
      >
        + Add category column
      </button>
    </div>
  );
}
