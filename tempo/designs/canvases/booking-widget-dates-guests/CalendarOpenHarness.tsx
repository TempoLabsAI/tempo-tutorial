import { useState } from "react";
import { DateRangeCalendar, type DateRange } from "@/design-system/components/DateRangeCalendar";

function daysFromToday(n: number): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() + n);
}

/** Mock-data harness: the calendar popover as it looks open, mid-range. */
export function CalendarOpenHarness() {
  const [range, setRange] = useState<DateRange>({
    checkIn: daysFromToday(10),
    checkOut: daysFromToday(15),
  });
  return (
    <div className="p-6 bg-white rounded-2xl border border-paper-deep shadow-modal w-[560px]">
      <DateRangeCalendar value={range} onChange={setRange} months={2} />
    </div>
  );
}
