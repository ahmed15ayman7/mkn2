import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">New project</h1>
        <p className="mt-2 text-primary/70">
          Add a bilingual project for the public site.
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
