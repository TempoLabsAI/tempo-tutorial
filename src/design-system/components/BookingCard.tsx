import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/design-system/primitives/Badge";
import { formatDateShort } from "@/lib/utils";
import type { Trip } from "@/data/trips";

interface BookingCardProps {
  trip: Trip;
  className?: string;
}

const statusConfig = {
  confirmed: { label: "Confirmed", variant: "success" as const, pulse: false },
  "check-in-today": {
    label: "Check-in today",
    variant: "warning" as const,
    pulse: true,
  },
  completed: { label: "Past", variant: "muted" as const, pulse: false },
  cancelled: { label: "Cancelled", variant: "error" as const, pulse: false },
};

/**
 * BookingCard — Airbnb-style trip row card.
 * Photo + title + dates + status badge.
 */
export function BookingCard({ trip, className }: BookingCardProps) {
  const status = statusConfig[trip.status];

  return (
    <Link to={`/trips/${trip.id}`} className={cn("block group", className)}>
      <div
        className={cn(
          "flex gap-4 p-4 rounded-2xl border border-paper-deep bg-white",
          "hover:shadow-card transition-shadow duration-200",
          "overflow-hidden",
        )}
      >
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-paper-warm">
          <img
            src={trip.listing.images[0]}
            alt={trip.listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between min-w-0 flex-1">
          <div>
            <p className="text-[15px] font-semibold text-ink line-clamp-1">
              {trip.listing.location}
            </p>
            <p className="text-[13px] text-ink-quiet mt-0.5 line-clamp-1">
              {trip.listing.title}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] text-ink-quiet tabular-nums">
              {formatDateShort(trip.checkIn)} – {formatDateShort(trip.checkOut)}
            </p>
            <Badge variant={status.variant} pulse={status.pulse}>
              {status.label}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
