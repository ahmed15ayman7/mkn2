"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SerializedInquiry } from "@/lib/admin/serialize";

const statuses = ["NEW", "READ", "ARCHIVED"] as const;

export function InquiriesTable({ inquiries }: { inquiries: SerializedInquiry[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function setStatus(id: string, status: (typeof statuses)[number]) {
    setLoadingId(id);
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  if (inquiries.length === 0) {
    return (
      <p className="rounded-lg border border-primary/10 bg-white px-4 py-8 text-center text-sm text-primary/60">
        No inquiries yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => {
        const expanded = expandedId === inquiry.id;
        return (
          <article
            key={inquiry.id}
            className="rounded-lg border border-primary/10 bg-white"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-medium text-primary">
                  {inquiry.firstName} {inquiry.lastName}
                </p>
                <p className="text-sm text-primary/60">
                  {inquiry.email} · {inquiry.phone}
                </p>
                <p className="mt-1 text-xs text-primary/45">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={inquiry.status} />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setExpandedId(expanded ? null : inquiry.id)
                  }
                >
                  {expanded ? "Hide" : "View"}
                </Button>
              </div>
            </div>

            {expanded && (
              <div className="space-y-4 border-t border-primary/10 px-4 py-4 text-sm">
                {inquiry.subject && (
                  <p>
                    <span className="font-medium text-primary">Subject: </span>
                    {inquiry.subject}
                  </p>
                )}
                {inquiry.targetBudget && (
                  <p>
                    <span className="font-medium text-primary">Budget: </span>
                    {inquiry.targetBudget}
                  </p>
                )}
                <p className="whitespace-pre-wrap text-primary/80">
                  {inquiry.message}
                </p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      type="button"
                      size="sm"
                      variant={
                        inquiry.status === status ? "default" : "outline"
                      }
                      disabled={loadingId === inquiry.id}
                      onClick={() => setStatus(inquiry.id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={loadingId === inquiry.id}
                    onClick={() => remove(inquiry.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "NEW" && "bg-amber-100 text-amber-800",
        status === "READ" && "bg-blue-100 text-blue-800",
        status === "ARCHIVED" && "bg-primary/10 text-primary/60",
      )}
    >
      {status}
    </span>
  );
}
