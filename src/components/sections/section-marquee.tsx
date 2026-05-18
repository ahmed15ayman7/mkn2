type Props = {
  items: readonly string[];
  className?: string;
};

export function SectionMarquee({ items, className }: Props) {
  const track = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y border-white/10 bg-brand-navy py-4 text-white ${className ?? ""}`}
      aria-hidden
    >
      <div className="flex w-max animate-marquee">
        {track.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-6 px-6 text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm"
          >
            <span className="text-brand-gold">•</span>
            <span>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
