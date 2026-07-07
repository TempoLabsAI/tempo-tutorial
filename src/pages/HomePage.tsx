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
            <button
              onClick={() => navigate("/search?q=coastal")}
              className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
            >
              <Waves
                size={26}
                strokeWidth={1.5}
                className="text-ink-quiet group-hover:text-ink transition-colors"
              />
              <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                Beachfront
              </span>
            </button>
            <button
              onClick={() => navigate("/search?q=forest")}
              className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
            >
              <TreePine
                size={26}
                strokeWidth={1.5}
                className="text-ink-quiet group-hover:text-ink transition-colors"
              />
              <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                Cabins
              </span>
            </button>
            <button
              onClick={() => navigate("/search?q=city")}
              className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
            >
              <Building2
                size={26}
                strokeWidth={1.5}
                className="text-ink-quiet group-hover:text-ink transition-colors"
              />
              <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                Cities
              </span>
            </button>
            <button
              onClick={() => navigate("/search?q=mountain")}
              className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
            >
              <Mountain
                size={26}
                strokeWidth={1.5}
                className="text-ink-quiet group-hover:text-ink transition-colors"
              />
              <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                Mountains
              </span>
            </button>
            <button
              onClick={() => navigate("/search?q=camping")}
              className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
            >
              <Tent
                size={26}
                strokeWidth={1.5}
                className="text-ink-quiet group-hover:text-ink transition-colors"
              />
              <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                Camping
              </span>
            </button>
            <button
              onClick={() => navigate("/search?q=castle")}
              className="flex flex-col items-center gap-2 min-w-[80px] shrink-0 pb-2 border-b-2 border-transparent hover:border-ink-quiet transition-colors group"
            >
              <Castle
                size={26}
                strokeWidth={1.5}
                className="text-ink-quiet group-hover:text-ink transition-colors"
              />
              <span className="text-[12px] font-medium text-ink-quiet group-hover:text-ink transition-colors whitespace-nowrap">
                Castles
              </span>
            </button>
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
            <a
              onClick={() => navigate("/search")}
              className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-[14px] font-semibold text-ink">Family travel</p>
              <p className="text-[13px] text-ink-quiet mt-0.5">Destinations for families</p>
            </a>
            <a
              onClick={() => navigate("/search")}
              className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-[14px] font-semibold text-ink">Outdoor escapes</p>
              <p className="text-[13px] text-ink-quiet mt-0.5">Lakes, forests, hills</p>
            </a>
            <a
              onClick={() => navigate("/search")}
              className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-[14px] font-semibold text-ink">Beach getaways</p>
              <p className="text-[13px] text-ink-quiet mt-0.5">Sun, sand, salt</p>
            </a>
            <a
              onClick={() => navigate("/search")}
              className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-[14px] font-semibold text-ink">Unique stays</p>
              <p className="text-[13px] text-ink-quiet mt-0.5">Treehouses, riads, more</p>
            </a>
            <a
              onClick={() => navigate("/search")}
              className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-[14px] font-semibold text-ink">City breaks</p>
              <p className="text-[13px] text-ink-quiet mt-0.5">Apartments in town</p>
            </a>
            <a
              onClick={() => navigate("/search")}
              className="block py-3 border-t border-paper-deep cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-[14px] font-semibold text-ink">Mountain retreats</p>
              <p className="text-[13px] text-ink-quiet mt-0.5">Cabins and lodges</p>
            </a>
          </div>
        </Container>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-paper-warm border-t border-paper-deep">
        <Container className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
            <div>
              <p className="text-[13px] font-semibold text-ink mb-3">Support</p>
              <ul className="space-y-2">
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Help Center
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Cancellation options
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Trust &amp; Safety
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink mb-3">Hosting</p>
              <ul className="space-y-2">
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Become a host
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Resources
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Community forum
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink mb-3">Havn</p>
              <ul className="space-y-2">
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  About
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Careers
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Press
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink mb-3">Travel</p>
              <ul className="space-y-2">
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Gift cards
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Travel insurance
                </li>
                <li className="text-[13px] text-ink-quiet hover:text-ink transition-colors cursor-pointer">
                  Affiliates
                </li>
              </ul>
            </div>
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
