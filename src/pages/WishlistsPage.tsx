import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Heart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/design-system/layout/Container";
import { Button } from "@/design-system/primitives/Button";
import { ListingCard } from "@/design-system/components/ListingCard";
import { LISTINGS } from "@/data/listings";

interface Wishlist {
  id: string;
  name: string;
  listingIds: string[];
  createdAt: string;
}

const DEFAULT_WISHLISTS: Wishlist[] = [
  { id: "wl-001", name: "Italy trip", listingIds: ["lst-001", "lst-004"], createdAt: "2026-02-10" },
  { id: "wl-002", name: "Nature escapes", listingIds: ["lst-003", "lst-007", "lst-008"], createdAt: "2026-03-01" },
];

export function WishlistsPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>(DEFAULT_WISHLISTS);
  const [activeWishlist, setActiveWishlist] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  const active = wishlists.find((w) => w.id === activeWishlist);

  function createWishlist() {
    if (!newName.trim()) return;
    const id = `wl-${Date.now()}`;
    setWishlists((prev) => [
      ...prev,
      {
        id,
        name: newName.trim(),
        listingIds: [],
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewName("");
    setShowCreate(false);
  }

  // ── Detail view ──────────────────────────────────────────────
  if (active) {
    const savedListings = LISTINGS.filter((l) => active.listingIds.includes(l.id));
    return (
      <div className="min-h-screen pb-20 bg-white">
        <Container className="pt-8 max-w-6xl">
          <button
            onClick={() => setActiveWishlist(null)}
            className="flex items-center gap-1.5 text-[14px] font-medium text-ink hover:underline mb-4"
          >
            <ChevronLeft size={16} strokeWidth={2} /> All wishlists
          </button>
          <h1 className="text-[32px] font-semibold text-ink tracking-tight">
            {active.name}
          </h1>
          <p className="text-[14px] text-ink-quiet mt-1 mb-8">
            {savedListings.length} {savedListings.length === 1 ? "place" : "places"}{" "}
            saved
          </p>
          {savedListings.length === 0 ? (
            <div className="text-center py-16 border border-paper-deep rounded-2xl">
              <Heart size={32} className="text-ink-quiet mx-auto mb-3" />
              <p className="text-[15px] text-ink-quiet">
                No listings saved to this wishlist yet.
              </p>
              <Link to="/search">
                <Button variant="outline" className="mt-4">
                  Browse stays
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 reveal-up">
              {savedListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  saved
                  onSaveToggle={(id) => {
                    setWishlists((prev) =>
                      prev.map((w) =>
                        w.id === active.id
                          ? {
                              ...w,
                              listingIds: w.listingIds.filter((i) => i !== id),
                            }
                          : w,
                      ),
                    );
                  }}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────
  return (
    <div className="min-h-screen pb-20">
      <Container className="pt-8 max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-[32px] font-semibold text-ink tracking-tight">
            Wishlists
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={14} strokeWidth={2} /> Create
          </Button>
        </div>

        {wishlists.length === 0 ? (
          <div className="text-center py-24 border border-paper-deep rounded-2xl max-w-2xl mx-auto">
            <Heart size={40} className="text-ink-quiet mx-auto mb-4" />
            <p className="text-[20px] font-semibold text-ink">No wishlists yet</p>
            <p className="text-[14px] text-ink-quiet mt-2 mb-6">
              Create your first wishlist as you search.
            </p>
            <Link to="/search">
              <Button>Start exploring</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 reveal-up">
            {wishlists.map((wl) => {
              const listings = LISTINGS.filter((l) =>
                wl.listingIds.includes(l.id),
              );
              return (
                <motion.button
                  key={wl.id}
                  onClick={() => setActiveWishlist(wl.id)}
                  className="text-left group"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-paper-warm grid grid-cols-2 grid-rows-2 gap-px">
                    {[...Array(4)].map((_, i) => {
                      const img = listings[i]?.images[0];
                      return img ? (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div key={i} className="bg-paper-deep" />
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[16px] font-semibold text-ink">{wl.name}</p>
                  <p className="text-[14px] text-ink-quiet">
                    {listings.length} {listings.length === 1 ? "place" : "places"}
                  </p>
                </motion.button>
              );
            })}
          </div>
        )}
      </Container>

      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCreate(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-modal w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[20px] font-semibold text-ink mb-4">
              Create a new wishlist
            </h3>
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") createWishlist();
              }}
              placeholder="Name"
              className="w-full h-12 bg-white border border-paper-deep focus:border-ink rounded-lg px-4 text-[15px] text-ink placeholder:text-ink-quiet focus:outline-none transition-colors mb-4"
            />
            <Button
              className="w-full mb-2"
              onClick={createWishlist}
              disabled={!newName.trim()}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
