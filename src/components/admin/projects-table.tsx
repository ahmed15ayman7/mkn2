"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProjectRow = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  featured: boolean;
  coverImage: string;
  updatedAt: string;
};

export function ProjectsTable({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  if (projects.length === 0) {
    return (
      <p className="rounded-lg border border-primary/10 bg-white px-4 py-8 text-center text-sm text-primary/60">
        No projects yet. Create your first project.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-primary/10 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-primary/10 bg-surface text-start">
          <tr>
            <th className="px-4 py-3 font-medium">Slug</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Featured</th>
            <th className="px-4 py-3 font-medium">Updated</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-primary/5">
              <td className="px-4 py-3 font-mono text-xs">{project.slug}</td>
              <td className="px-4 py-3">
                <div>{project.titleEn}</div>
                <div className="text-primary/50">{project.titleAr}</div>
              </td>
              <td className="px-4 py-3">
                {project.featured ? (
                  <span className="text-green-700">Yes</span>
                ) : (
                  <span className="text-primary/40">No</span>
                )}
              </td>
              <td className="px-4 py-3 text-primary/60">
                {new Date(project.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                  >
                    Edit
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={loadingId === project.id}
                    onClick={() => remove(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
