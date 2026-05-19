"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AdminFieldHelp } from "@/components/admin/admin-field-help";
import { AdminImagePreview } from "@/components/admin/admin-image-preview";
import { AdminVideoPreview } from "@/components/admin/admin-video-preview";
import type { ProjectFieldHelpKey } from "@/lib/admin/project-field-help";

export const adminFieldClass =
  "w-full rounded-lg border border-primary/10 bg-white px-3 py-2 text-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/20";

export function AdminField({
  label,
  helpKey,
  children,
  className,
}: {
  label: string;
  helpKey?: ProjectFieldHelpKey;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label className="text-primary">{label}</Label>
        {helpKey && <AdminFieldHelp helpKey={helpKey} />}
      </div>
      {children}
    </div>
  );
}

export function AdminInput({
  label,
  helpKey,
  preview,
  previewUrl,
  className,
  value,
  onChange,
  ...rest
}: React.ComponentProps<typeof Input> & {
  label?: string;
  helpKey?: ProjectFieldHelpKey;
  preview?: "image" | "video";
  previewUrl?: string;
}) {
  const urlForPreview =
    previewUrl ?? (typeof value === "string" ? value : undefined);

  const input = (
    <Input
      className={cn(adminFieldClass, "h-10", className)}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );

  const withPreview = (
    <>
      {input}
      {preview === "image" && urlForPreview && (
        <AdminImagePreview url={urlForPreview} />
      )}
      {preview === "video" && urlForPreview && (
        <AdminVideoPreview url={urlForPreview} />
      )}
    </>
  );

  if (!label) return withPreview;

  return (
    <AdminField label={label} helpKey={helpKey}>
      {withPreview}
    </AdminField>
  );
}

export function AdminTextarea({
  label,
  helpKey,
  className,
  ...props
}: React.ComponentProps<"textarea"> & {
  label: string;
  helpKey?: ProjectFieldHelpKey;
}) {
  return (
    <AdminField label={label} helpKey={helpKey}>
      <textarea
        className={cn(adminFieldClass, "min-h-[100px] resize-y", className)}
        {...props}
      />
    </AdminField>
  );
}
