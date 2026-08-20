import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  addMonths,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  monthMatrix,
  startOfDay,
  startOfMonth,
  MONTH_NAMES,
  WEEKDAY_INITIALS,
} from "@/lib/dates";

export interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

interface DateRangeCalendarProps {
  value: DateRange;
  onChange: (next: DateRange) => void;
  /** Number of months shown side by side. Defaults to 2. */
  months?: number;
  className?: string;
}

/**
 * DateRangeCalendar — the two-month grid used inside the booking widget's
 * date popover. Past dates are disabled; the first click sets check-in, the
 * second sets checkout, and clicking on/before the current check-in restarts
 * the range. Minimum stay is 1 night.
 */
export function DateRangeCalendar({
  value,
  onChange,
  months = 2,
  className,
}: DateRangeCalendarProps) {
  const today = startOfDay(new Date());
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(value.checkIn ?? today),
  );

  const canGoBack = !isSameMonth(viewMonth, today) && !isBeforeDay(viewMonth, today);

  function handlePick(day: Date) {
    const { checkIn, checkOut } = value;
    // No start yet, or a complete range exists → begin a fresh range.
    if (!checkIn || (checkIn && checkOut)) {
      onChange({ checkIn: day, checkOut: null });
      return;
    }
    // Clicking on/before the current check-in restarts from there.
    if (!isBeforeDay(checkIn, day)) {
      onChange({ checkIn: day, checkOut: null });
      return;
    }
    onChange({ checkIn, checkOut: day });
  }

  function inRange(day: Date): boolean {
    const { checkIn, checkOut } = value;
    if (!checkIn || !checkOut) return false;
    return isBeforeDay(checkIn, day) && isBeforeDay(day, checkOut);
  }

  return (
    <div className={cn("select-none", className)}>
      {/* Header: month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canGoBack}
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          className="flex items-center justify-center w-8 h-8 rounded-full text-ink transition-colors hover:bg-paper-warm disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="flex items-center justify-center w-8 h-8 rounded-full text-ink transition-colors hover:bg-paper-warm"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="flex gap-8">
        {Array.from({ length: months }).map((_, i) => {
          const monthDate = addMonths(viewMonth, i);
          return (
            <div key={i} className="flex-1 min-w-[240px]">
              <p className="text-center text-[15px] font-semibold text-ink mb-3">
                {MONTH_NAMES[monthDate.getMonth()]} {monthDate.getFullYear()}
              </p>
              <div className="grid grid-cols-7 gap-y-1 mb-1">
                {WEEKDAY_INITIALS.map((w, wi) => (
                  <div
                    key={wi}
                    className="text-center text-[11px] font-medium text-ink-quiet h-6 flex items-center justify-center"
                  >
                    {w}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {monthMatrix(monthDate).flat().map((day, di) => {
                  if (!day) return <div key={di} className="h-9" />;

                  const past = isBeforeDay(day, today);
                  const isCheckIn = value.checkIn && isSameDay(day, value.checkIn);
                  const isCheckOut = value.checkOut && isSameDay(day, value.checkOut);
                  const isEndpoint = isCheckIn || isCheckOut;
                  const between = inRange(day);

                  return (
                    <button
                      key={di}
                      type="button"
                      disabled={past}
                      onClick={() => handlePick(day)}
                      className={cn(
                        "h-9 w-full flex items-center justify-center text-[13px] tabular-nums transition-colors rounded-full",
                        past && "text-stone line-through cursor-not-allowed",
                        !past && !isEndpoint && !between && "text-ink hover:bg-paper-warm",
                        between && "bg-paper-warm text-ink rounded-none",
                        isEndpoint && "bg-ink text-white font-semibold",
                      )}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
