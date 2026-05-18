import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const adminFieldClass =
  "w-full rounded-lg border border-primary/10 bg-white px-3 py-2 text-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/20";

export function AdminField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-primary">{label}</Label>
      {children}
    </div>
  );
}

export function AdminInput(
  props: React.ComponentProps<typeof Input> & { label?: string },
) {
  const { label, className, ...rest } = props;
  const input = (
    <Input className={cn(adminFieldClass, "h-10", className)} {...rest} />
  );
  if (!label) return input;
  return <AdminField label={label}>{input}</AdminField>;
}

export function AdminTextarea({
  label,
  className,
  ...props
}: React.ComponentProps<"textarea"> & { label: string }) {
  return (
    <AdminField label={label}>
      <textarea
        className={cn(adminFieldClass, "min-h-[100px] resize-y", className)}
        {...props}
      />
    </AdminField>
  );
}
