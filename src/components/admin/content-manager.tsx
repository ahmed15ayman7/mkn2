"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminInput, AdminTextarea } from "@/components/admin/admin-field";

export type ContentRow = {
  id: string;
  key: string;
  valueEn: string;
  valueAr: string;
};

export function ContentManager({ items }: { items: ContentRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<ContentRow | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function save(
    e: React.FormEvent<HTMLFormElement>,
    id?: string,
  ) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const body = {
      key: String(form.get("key") ?? ""),
      valueEn: String(form.get("valueEn") ?? ""),
      valueAr: String(form.get("valueAr") ?? ""),
    };

    const res = await fetch(
      id ? `/api/admin/content/${id}` : "/api/admin/content",
      {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      setError(id ? "Update failed" : "Create failed (key may exist)");
      return;
    }

    setEditing(null);
    setShowCreate(false);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this content entry?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-primary/70">
          Site-wide bilingual snippets (e.g. hero tagline, footer text).
        </p>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setShowCreate((v) => !v);
            setEditing(null);
          }}
        >
          {showCreate ? "Cancel" : "Add entry"}
        </Button>
      </div>

      {(showCreate || editing) && (
        <form
          onSubmit={(e) => save(e, editing?.id)}
          className="space-y-4 rounded-lg border border-primary/10 bg-white p-6"
        >
          <h2 className="font-semibold text-primary">
            {editing ? `Edit: ${editing.key}` : "New content entry"}
          </h2>
          <AdminInput
            label="Key"
            name="key"
            required
            defaultValue={editing?.key}
            placeholder="home.hero.subtitle"
            readOnly={Boolean(editing)}
          />
          <AdminTextarea
            label="Value (EN)"
            name="valueEn"
            required
            defaultValue={editing?.valueEn}
          />
          <AdminTextarea
            label="Value (AR)"
            name="valueAr"
            required
            defaultValue={editing?.valueAr}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" size="sm">
              {editing ? "Update" : "Create"}
            </Button>
            {editing && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setEditing(null)}
              >
                Cancel edit
              </Button>
            )}
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg border border-primary/10 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-primary/10 bg-surface text-start">
            <tr>
              <th className="px-4 py-3 font-medium">Key</th>
              <th className="px-4 py-3 font-medium">Preview (EN)</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-8 text-center text-primary/50"
                >
                  No content entries yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-primary/5">
                  <td className="px-4 py-3 font-mono text-xs">{item.key}</td>
                  <td className="max-w-md truncate px-4 py-3 text-primary/80">
                    {item.valueEn}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditing(item);
                          setShowCreate(false);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loadingId === item.id}
                        onClick={() => remove(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
