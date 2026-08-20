import { useState } from "react";
import { BookingWidget } from "@/design-system/components/BookingWidget";
import type { DateRange } from "@/design-system/components/DateRangeCalendar";
import { LISTINGS } from "@/data/listings";

/** Mock-data harness: the booking widget in its empty state (no dates yet). */
export function BookingWidgetEmpty() {
  const [range, setRange] = useState<DateRange>({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(1);
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
