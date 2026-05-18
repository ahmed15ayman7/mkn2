import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "light" | "gold";
};

export function MknLogo({ className, variant = "light" }: Props) {
  const fill = variant === "gold" ? "#c4a47c" : "#ffffff";
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-9 w-9 shrink-0", className)}
      aria-hidden
    >
      <title>MKN</title>
      <path
        d="M24 2L46 24 24 46 2 24 24 2z"
        fill="none"
        stroke={fill}
        strokeWidth="1.5"
      />
      <path
        d="M24 10L38 24 24 38 10 24 24 10z"
        fill={fill}
        fillOpacity={0.18}
      />
    </svg>
  );
}
