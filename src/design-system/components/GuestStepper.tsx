import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { pluralize } from "@/lib/utils";

interface GuestStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max: number;
  className?: string;
}

/**
 * GuestStepper — inline guest count control for the booking widget.
 * No popover: the − / + controls sit directly in the row, so changing the
 * count is a single tap. Floored at `min` (default 1), capped at `max`.
 */
export function GuestStepper({
  value,
  onChange,
  min = 1,
  max,
  className,
}: GuestStepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold text-ink tracking-wider">GUESTS</p>
          <p className="text-[14px] text-ink mt-0.5 tabular-nums">
            {pluralize(value, "guest")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Remove guest"
            disabled={atMin}
            onClick={() => onChange(Math.max(min, value - 1))}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-stone text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-stone"
          >
            <Minus size={16} strokeWidth={2} />
          </button>
          <span className="w-5 text-center text-[15px] font-medium text-ink tabular-nums">
            {value}
          </span>
          <button
            type="button"
            aria-label="Add guest"
            disabled={atMax}
            onClick={() => onChange(Math.min(max, value + 1))}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-stone text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-stone"
          >
            <Plus size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {atMax && (
        <p className="text-[12px] text-ink-quiet mt-2">Maximum {pluralize(max, "guest")}</p>
      )}
    </div>
  );
}
