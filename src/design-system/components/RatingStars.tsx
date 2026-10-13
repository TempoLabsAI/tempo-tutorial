import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
  /** Back-compat prop; rendering is the same in both modes. */
  variant?: "default" | "inline";
}

/**
 * RatingStars — Airbnb-style:  ★ 4.92 (184)
 */
export function RatingStars({
  rating,
  count,
  size = "sm",
  className,
}: RatingStarsProps) {
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-ink",
        size === "sm" ? "text-[14px]" : "text-[15px]",
        className,
      )}
    >
      <Star
        size={iconSize}
        className="fill-ink text-ink"
      />
      <span className="font-medium tabular-nums">{rating.toFixed(2)}</span>
      {count !== undefined && (
        <span className="text-ink-quiet">({count.toLocaleString()})</span>
      )}
    </span>
  );
}
