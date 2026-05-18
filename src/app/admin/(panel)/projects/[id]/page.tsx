export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";
import { serializeProject } from "@/lib/admin/serialize";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { seo: true },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Edit project</h1>
        <p className="mt-2 font-mono text-sm text-primary/60">{project.slug}</p>
      </div>
      <ProjectForm project={serializeProject(project)} />
    </div>
  );
}
