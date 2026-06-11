import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { RatingStars } from "./RatingStars";
import { HeartButton } from "./HeartButton";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/data/listings";

interface ListingCardProps {
  listing: Listing;
  saved?: boolean;
  onSaveToggle?: (id: string, saved: boolean) => void;
  className?: string;
  priority?: boolean;
  /** Back-compat — not visually used in the Airbnb style. */
  index?: number;
}

/**
 * ListingCard — Airbnb-style.
 * Rounded square photo + heart top-right, location + rating row, distance line,
 * date range line, and a price line with bold price + "/ night".
 */
export function ListingCard({
  listing,
  saved = false,
  onSaveToggle,
  className,
}: ListingCardProps) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      {/* Photo */}
      <Link to={`/listing/${listing.id}`} className="block">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-paper-warm">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {listing.badge && (
            <span className="absolute top-3 left-3 bg-white text-ink text-[12px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
              {listing.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Heart */}
      <div className="absolute top-2.5 right-2.5">
        <HeartButton
          saved={saved}
          onToggle={(s) => onSaveToggle?.(listing.id, s)}
          size="md"
          surface="overlay"
        />
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-0.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/listing/${listing.id}`}
            className="text-[15px] font-semibold text-ink leading-snug line-clamp-1 hover:underline"
          >
            {listing.location}
          </Link>
          <RatingStars rating={listing.rating} className="shrink-0 mt-0.5 text-[14px]" />
        </div>
        <p className="text-[14px] text-ink-quiet line-clamp-1">
          {listing.title}
        </p>
        <p className="text-[14px] text-ink-quiet">{listing.dateRange}</p>
        <p className="text-[14px] text-ink mt-1">
          <span className="font-semibold underline">{formatPrice(listing.pricePerNight)}</span>{" "}
          <span className="text-ink-quiet">night</span>
        </p>
      </div>
    </article>
  );
}
