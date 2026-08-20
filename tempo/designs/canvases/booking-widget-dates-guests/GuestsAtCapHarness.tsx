import { useState } from "react";
import { GuestStepper } from "@/design-system/components/GuestStepper";
import { LISTINGS } from "@/data/listings";

/** Mock-data harness: the inline guest stepper at the listing's max capacity. */
export function GuestsAtCapHarness() {
  const max = LISTINGS[0].maxGuests;
  const [guests, setGuests] = useState(max);
  return (
    <div className="w-[360px] bg-white rounded-lg border border-paper-deep">
      <GuestStepper value={guests} onChange={setGuests} max={max} />
    </div>
  );
}
