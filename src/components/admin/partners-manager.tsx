"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminInput } from "@/components/admin/admin-field";
import type { SerializedPartner } from "@/lib/admin/serialize";

export function PartnersManager({ partners }: { partners: SerializedPartner[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameEn: form.get("nameEn"),
        nameAr: form.get("nameAr"),
        logoUrl: form.get("logoUrl"),
        websiteUrl: form.get("websiteUrl") || "",
        sortOrder: Number(form.get("sortOrder") || 0),
      }),
    });
    if (!res.ok) {
      setError("Failed to add partner");
      return;
    }
    e.currentTarget.reset();
    setShowForm(false);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this partner?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-primary/70">
          {partners.length} partner{partners.length === 1 ? "" : "s"}
        </p>
        <Button
          type="button"
          size="sm"
          variant={showForm ? "outline" : "default"}
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Cancel" : "Add partner"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={onCreate}
          className="space-y-4 rounded-lg border border-primary/10 bg-white p-6"
        >
          <h2 className="font-semibold text-primary">New partner</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Name (EN)" name="nameEn" required />
            <AdminInput label="Name (AR)" name="nameAr" required />
          </div>
          <AdminInput label="Logo URL" name="logoUrl" type="url" required />
          <AdminInput label="Website URL" name="websiteUrl" type="url" />
          <AdminInput
            label="Sort order"
            name="sortOrder"
            type="number"
            defaultValue={0}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" size="sm">
            Save partner
          </Button>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg border border-primary/10 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-primary/10 bg-surface text-start">
            <tr>
              <th className="px-4 py-3 font-medium">Logo</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b border-primary/5">
                <td className="px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logoUrl}
                    alt=""
                    className="h-10 w-20 object-contain"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>{partner.nameEn}</div>
                  <div className="text-primary/50">{partner.nameAr}</div>
                </td>
                <td className="px-4 py-3">{partner.sortOrder}</td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={loadingId === partner.id}
                    onClick={() => remove(partner.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
