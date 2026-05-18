export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProjectsTable } from "@/components/admin/projects-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      titleEn: true,
      titleAr: true,
      featured: true,
      coverImage: true,
      updatedAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Projects</h1>
          <p className="mt-2 text-primary/70">
            Manage bilingual project listings and media.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          New project
        </Link>
      </div>
      <ProjectsTable
        projects={projects.map((p) => ({
          ...p,
          updatedAt: p.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
