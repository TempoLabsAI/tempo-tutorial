import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, Map } from "lucide-react";
import { Container } from "@/design-system/layout/Container";
import { FilterChip } from "@/design-system/components/FilterChip";
import { ListingCard } from "@/design-system/components/ListingCard";
import { Button } from "@/design-system/primitives/Button";
import { LISTINGS } from "@/data/listings";

const FILTERS = ["Price", "Type of place", "Beds", "Amenities", "Instant book", "More filters"];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const query = searchParams.get("q") ?? "";

  const results = useMemo(() => {
    let list = [...LISTINGS];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.region.toLowerCase().includes(q),
      );
    }
    if (maxPrice) {
      list = list.filter((l) => l.pricePerNight <= maxPrice);
    }
    return list;
  }, [query, maxPrice]);

  function toggleFilter(label: string) {
    setActiveFilters((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function clearAllFilters() {
    setActiveFilters({});
    setMaxPrice(null);
  }

  const hasActiveFilters =
    Object.values(activeFilters).some(Boolean) || maxPrice !== null;

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Sticky filter rail */}
      <div className="sticky top-[120px] z-30 bg-white border-b border-paper-deep">
        <Container className="py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
              {FILTERS.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={activeFilters[f]}
                  onClick={() => toggleFilter(f)}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2 flex-shrink-0">
              <SlidersHorizontal size={14} strokeWidth={2} />
              Filters
            </Button>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="hidden sm:inline-flex items-center gap-1 text-[14px] font-medium text-ink-quiet hover:text-ink underline transition-colors flex-shrink-0"
              >
                <X size={14} strokeWidth={2} /> Clear all
              </button>
            )}
          </div>
        </Container>
      </div>

      {/* Results header */}
      <Container className="pt-6 pb-2">
        <p className="text-[13px] text-ink-quiet">
          <span className="font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "stay" : "stays"}
          {query && (
            <span>
              {" "}for{" "}
              <span className="text-ink font-medium">"{query}"</span>
            </span>
          )}
          <span className="mx-1.5">·</span>
          Prices include all fees
        </p>
      </Container>

      {/* Results grid */}
      <Container>
        {results.length === 0 ? (
          <div className="text-center py-32 max-w-md mx-auto">
            <p className="text-[24px] font-semibold text-ink">No exact matches</p>
            <p className="text-[14px] text-ink-quiet mt-2 mb-6">
              Try adjusting or removing some of your filters.
            </p>
            <Button onClick={clearAllFilters} variant="outline">
              Remove all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 reveal-up">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </Container>

      {/* Floating "Show map" pill */}
      <button
        type="button"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 h-12 px-5 rounded-full bg-ink text-white text-[14px] font-semibold shadow-modal hover:bg-ink-soft transition-colors"
      >
        Show map
        <Map size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
