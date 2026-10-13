import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * FilterChip — Airbnb-style.
 * White pill with grey border. Active flips to ink-bordered pill.
 */
export function FilterChip({
  label,
  count,
  active = false,
  onClick,
  className,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-9 px-4 rounded-full",
        "text-[13px] font-medium",
        "border transition-[border-color,background-color,color] duration-150 ease-out",
        "whitespace-nowrap select-none",
        active
          ? "bg-paper-warm text-ink border-ink"
          : "bg-white text-ink border-paper-deep hover:border-ink",
        className,
      )}
    >
      <span>{label}</span>
      {count !== undefined && count > 0 && (
        <span
          className={cn(
            "min-w-[20px] h-5 inline-flex items-center justify-center px-1.5",
            "text-[11px] font-semibold rounded-full tabular-nums",
            active ? "bg-ink text-white" : "bg-accent text-white",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
