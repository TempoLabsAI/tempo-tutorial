import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { Listing } from "@/data/listings";
import { Button } from "@/design-system/primitives/Button";
import { DateRangeCalendar, type DateRange } from "./DateRangeCalendar";
import { GuestStepper } from "./GuestStepper";
import { cn, formatPrice, formatDateShort } from "@/lib/utils";
import { nightsBetween } from "@/lib/dates";

const CLEANING_FEE = 85;

export interface PriceBreakdown {
  room: number;
  cleaning: number;
  service: number;
  taxes: number;
  total: number;
}

/** Shared price math so the widget, mobile bar, and confirm modal agree. */
export function getPriceBreakdown(pricePerNight: number, nights: number): PriceBreakdown {
  const room = pricePerNight * nights;
  const cleaning = CLEANING_FEE;
  const service = Math.round(room * 0.12);
  const taxes = Math.round(room * 0.08);
  return { room, cleaning, service, taxes, total: room + cleaning + service + taxes };
}

interface BookingWidgetProps {
  listing: Listing;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  onDatesChange: (range: DateRange) => void;
  onGuestsChange: (guests: number) => void;
  onReserve: () => void;
  /** Months shown in the calendar popover. 2 on desktop, 1 on mobile. */
  calendarMonths?: number;
  className?: string;
}

/**
 * BookingWidget — the sticky booking card on the listing detail page.
 * Real dates via a calendar popover, an inline guest stepper, and a price
 * breakdown that recomputes from the chosen nights. Starts empty until the
 * guest picks a range.
 */
export function BookingWidget({
  listing,
  checkIn,
  checkOut,
  guests,
  onDatesChange,
  onGuestsChange,
  onReserve,
  calendarMonths = 2,
  className,
}: BookingWidgetProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const nights = nightsBetween(checkIn, checkOut);
  const hasDates = nights > 0;
  const price = getPriceBreakdown(listing.pricePerNight, nights);

  return (
    <div
      className={cn(
        "rounded-2xl border border-paper-deep p-6 shadow-card bg-white",
        className,
      )}
    >
      <div className="flex items-baseline gap-1.5 mb-5">
        <span className="text-[22px] font-semibold text-ink">
          {formatPrice(listing.pricePerNight)}
        </span>
        <span className="text-[15px] text-ink">night</span>
      </div>

      {/* Date + guest pickers */}
      <div className="border border-paper-deep rounded-lg overflow-hidden mb-4">
        <Popover.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
          <Popover.Anchor asChild>
            <div className="grid grid-cols-2">
              {[
                { label: "CHECK-IN", val: checkIn },
                { label: "CHECKOUT", val: checkOut },
              ].map((d, i) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setCalendarOpen(true)}
                  className={cn(
                    "p-3 text-left hover:bg-paper-warm transition-colors",
                    i === 0 ? "border-r border-paper-deep" : "",
                    calendarOpen && "bg-paper-warm",
                  )}
                >
                  <p className="text-[10px] font-bold text-ink tracking-wider">
                    {d.label}
                  </p>
                  <p
                    className={cn(
                      "text-[14px] mt-0.5",
                      d.val ? "text-ink" : "text-ink-quiet",
                    )}
                  >
                    {d.val ? formatDateShort(d.val) : "Add date"}
                  </p>
                </button>
              ))}
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              align="end"
              sideOffset={12}
              className="z-50 bg-white rounded-2xl border border-paper-deep shadow-modal p-6 w-auto max-w-[calc(100vw-24px)]"
            >
              <DateRangeCalendar
                value={{ checkIn, checkOut }}
                onChange={onDatesChange}
                months={calendarMonths}
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-paper-deep">
                <button
                  type="button"
                  onClick={() => onDatesChange({ checkIn: null, checkOut: null })}
                  className="text-[14px] font-medium text-ink underline hover:text-ink-quiet transition-colors"
                >
                  Clear dates
                </button>
                <Button
                  variant="ink"
                  size="sm"
                  className="w-auto"
                  onClick={() => setCalendarOpen(false)}
                >
                  Close
                </Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <div className="border-t border-paper-deep">
          <GuestStepper value={guests} onChange={onGuestsChange} max={listing.maxGuests} />
        </div>
      </div>

      <Button
        size="lg"
        className="mb-3"
        disabled={!hasDates}
        aria-label={hasDates ? "Reserve" : "Select dates to reserve"}
        onClick={onReserve}
      >
        {hasDates ? "Reserve" : "Select dates"}
      </Button>

      <p className="text-center text-[14px] text-ink-quiet mb-5">
        You won't be charged yet
      </p>

      {hasDates ? (
        <div className="space-y-3 text-[14px]">
          {[
            { label: `${formatPrice(listing.pricePerNight)} × ${nights} ${nights === 1 ? "night" : "nights"}`, value: price.room },
            { label: "Cleaning fee", value: price.cleaning },
            { label: "Service fee", value: price.service },
            { label: "Taxes", value: price.taxes },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-ink">
              <span className="underline">{row.label}</span>
              <span className="tabular-nums">{formatPrice(row.value)}</span>
            </div>
          ))}
          <div className="border-t border-paper-deep pt-3 flex justify-between font-semibold text-ink">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(price.total)}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-[14px] text-ink-quiet">
          Add dates for prices
        </p>
      )}
    </div>
  );
}
