type Props = {
  items: readonly string[];
  className?: string;
};

export function SectionMarquee({ items, className }: Props) {
  return (
    <div
      className={`border-y border-white/10 bg-primary py-4 text-white ${className ?? ""}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] sm:gap-6 sm:text-sm">
        {items.map((label, i) => (
          <span key={label} className="flex items-center gap-3">
            {i > 0 ? <span className="text-accent">•</span> : null}
            <span>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
