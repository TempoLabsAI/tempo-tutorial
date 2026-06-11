import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  compact?: boolean;
  defaultDestination?: string;
  onSearch?: (params: {
    destination: string;
    checkIn?: string;
    checkOut?: string;
    guests: number;
  }) => void;
  className?: string;
}

/**
 * SearchBar — Airbnb-style pill.
 * Full: rounded pill with section dividers (Where / Check in / Check out / Who) + coral search button.
 * Compact: a single white pill summarizing the search with a small pink button.
 */
export function SearchBar({
  compact = false,
  defaultDestination = "",
  onSearch,
  className,
}: SearchBarProps) {
  const [destination, setDestination] = useState(defaultDestination);
  const [guests] = useState(1);

  function handleSearch() {
    onSearch?.({ destination, guests });
  }

  if (compact) {
    return (
      <button
        onClick={() => onSearch?.({ destination, guests })}
        className={cn(
          "group flex items-center gap-3 h-12 pl-5 pr-1.5",
          "bg-white border border-paper-deep rounded-full",
          "shadow-pill hover:shadow-card-hover transition-shadow duration-200 text-left",
          className,
        )}
      >
        <span className="text-[14px] font-semibold text-ink">
          {destination || "Anywhere"}
        </span>
        <span className="w-px h-5 bg-paper-deep" />
        <span className="text-[14px] text-ink-quiet font-medium">Any week</span>
        <span className="w-px h-5 bg-paper-deep hidden sm:inline-block" />
        <span className="text-[14px] text-ink-quiet hidden sm:inline">Add guests</span>
        <span className="ml-auto w-9 h-9 rounded-full bg-accent text-white grid place-items-center group-hover:bg-accent-hover transition-colors">
          <Search size={14} strokeWidth={3} />
        </span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "flex items-stretch",
        "bg-white border border-paper-deep rounded-full",
        "shadow-card hover:shadow-card-hover transition-shadow duration-200",
        "p-2",
        className,
      )}
    >
      {/* Where */}
      <label className="flex flex-col flex-[1.4] px-6 py-2 rounded-full hover:bg-paper-warm transition-colors cursor-text">
        <span className="text-[12px] font-semibold text-ink leading-tight">Where</span>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Search destinations"
          className="bg-transparent text-[14px] text-ink placeholder:text-ink-quiet focus:outline-hidden w-full mt-0.5 leading-tight"
        />
      </label>

      <Divider />

      {/* Check in */}
      <button
        type="button"
        className="flex flex-col flex-1 text-left px-6 py-2 rounded-full hover:bg-paper-warm transition-colors"
      >
        <span className="text-[12px] font-semibold text-ink leading-tight">Check in</span>
        <span className="text-[14px] text-ink-quiet mt-0.5 leading-tight">Add dates</span>
      </button>

      <Divider />

      {/* Check out */}
      <button
        type="button"
        className="flex flex-col flex-1 text-left px-6 py-2 rounded-full hover:bg-paper-warm transition-colors"
      >
        <span className="text-[12px] font-semibold text-ink leading-tight">Check out</span>
        <span className="text-[14px] text-ink-quiet mt-0.5 leading-tight">Add dates</span>
      </button>

      <Divider />

      {/* Who + Search */}
      <div className="flex items-center flex-[1.2] pl-6 pr-1 rounded-full hover:bg-paper-warm transition-colors">
        <button type="button" className="flex flex-col flex-1 text-left py-2">
          <span className="text-[12px] font-semibold text-ink leading-tight">Who</span>
          <span className="text-[14px] text-ink-quiet mt-0.5 leading-tight tabular-nums">
            {guests} guest{guests !== 1 ? "s" : ""}
          </span>
        </button>
        <button
          onClick={handleSearch}
          className="ml-2 h-12 w-12 rounded-full bg-accent hover:bg-accent-hover transition-colors text-white grid place-items-center"
          aria-label="Search"
        >
          <Search size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="self-center w-px h-8 bg-paper-deep" aria-hidden />;
}
