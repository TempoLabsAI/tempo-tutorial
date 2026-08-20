import { useState } from "react";
import { BookingWidget } from "@/design-system/components/BookingWidget";
import type { DateRange } from "@/design-system/components/DateRangeCalendar";
import { LISTINGS } from "@/data/listings";

function daysFromToday(n: number): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() + n);
}

/** Mock-data harness: the widget with a valid 5-night range and 3 guests. */
export function BookingWidgetValidRange() {
  const [range, setRange] = useState<DateRange>({
    checkIn: daysFromToday(14),
    checkOut: daysFromToday(19),
  });
  const [guests, setGuests] = useState(3);
  return (
    <div className="w-[420px] p-5 bg-white">
      <BookingWidget
        listing={LISTINGS[0]}
        checkIn={range.checkIn}
        checkOut={range.checkOut}
        guests={guests}
        onDatesChange={setRange}
        onGuestsChange={setGuests}
        onReserve={() => {}}
      />
    </div>
  );
}
