import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Waves,
  TreePine,
  Building2,
  Mountain,
  Tent,
  Castle,
} from "lucide-react";
import { Container } from "@/design-system/layout/Container";
import { SearchBar } from "@/design-system/components/SearchBar";
import { ListingCard } from "@/design-system/components/ListingCard";
import { Button } from "@/design-system/primitives/Button";
import { LISTINGS } from "@/data/listings";

const categories = [
  { label: "Beachfront", icon: Waves, q: "coastal" },
  { label: "Cabins", icon: TreePine, q: "forest" },
  { label: "Cities", icon: Building2, q: "city" },
  { label: "Mountains", icon: Mountain, q: "mountain" },
  { label: "Camping", icon: Tent, q: "camping" },
  { label: "Castles", icon: Castle, q: "castle" },
];

const featured = LISTINGS.slice(0, 4);
const more = LISTINGS.slice(4, 8);

export function HomePage() {
  const navigate = useNavigate();

  function handleSearch({ destination }: { destination: string }) {
    navigate(`/search${destination ? `?q=${encodeURIComponent(destination)}` : ""}`);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-paper-warm">
        <Container className="pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="text-center mb-10">
            <h1 className="text-display-lg font-semibold text-ink tracking-tight text-balance">
              Find your next favorite place to stay.
            </h1>
            <p className="mt-3 text-[16px] text-ink-quiet max-w-xl mx-auto">
              Eight handpicked properties around the world. Search by where, when, and who's coming.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </Container>
      </section>

      {/* ─── Category rail ───────────────────────────────────────────── */}
      <section className="border-b border-paper-deep">
        <Container>
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-none py-4">
            {categories.map(({ label, icon: Icon, q }) => (
              <button
                key={q}
                onClick={() => navigate(`/search?q=${q}`)}
                className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  className="text-ink-quiet group-hover:text-ink transition-colors"
                />
                <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Featured grid ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-12">
        <Container>
          <header className="mb-6 flex items-end justify-between">
            <h2 className="text-[22px] sm:text-[24px] font-semibold text-ink">
              Popular homes
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
              className="hidden sm:inline-flex items-center gap-1 underline"
            >
              Show all <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 reveal-up">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── More ─────────────────────────────────────────────────────── */}
      <section className="py-6 sm:py-12">
        <Container>
          <header className="mb-6 flex items-end justify-between">
            <h2 className="text-[22px] sm:text-[24px] font-semibold text-ink">
              Available next month
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
              className="hidden sm:inline-flex items-center gap-1 underline"
            >
              Show all <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {more.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Inspiration tiles ───────────────────────────────────────── */}
      <section className="py-12 bg-paper-warm/60 border-t border-paper-deep">
        <Container>
          <h2 className="text-[22px] sm:text-[24px] font-semibold text-ink mb-6">
            Inspiration for future getaways
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-3">
            {[
              ["Family travel", "Destinations for families"],
              ["Outdoor escapes", "Lakes, forests, hills"],
              ["Beach getaways", "Sun, sand, salt"],
              ["Unique stays", "Treehouses, riads, more"],
              ["City breaks", "Apartments in town"],
              ["Mountain retreats", "Cabins and lodges"],
            ].map(([title, sub]) => (
              <a
                key={title}
                onClick={() => navigate("/search")}
                className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
              >
                <p className="text-[14px] font-semibold text-ink">{title}</p>
                <p className="text-[13px] text-ink-quiet mt-0.5">{sub}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-paper-warm border-t border-paper-deep">
        <Container className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
            {[
              { h: "Support", links: ["Help Center", "Cancellation options", "Trust & Safety"] },
              { h: "Hosting", links: ["Become a host", "Resources", "Community forum"] },
              { h: "Havn", links: ["About", "Careers", "Press"] },
              { h: "Travel", links: ["Gift cards", "Travel insurance", "Affiliates"] },
            ].map((col) => (
              <div key={col.h}>
                <p className="text-[13px] font-semibold text-ink mb-3">{col.h}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l} className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-paper-deep pt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-ink-quiet">
            <span>© 2026 Havn, Inc. · Privacy · Terms · Sitemap</span>
            <span className="flex items-center gap-1">
              English (US) · USD
            </span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
