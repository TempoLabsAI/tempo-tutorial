import { Heart } from 'lucide-react';
import { Frame } from '@/design-system/canvas-chrome';
import { WishlistsPage } from '@/pages/WishlistsPage';
import { EmptyState, GroupHeader, SectionBlock, groupShell } from './shared';

export function WishlistsPageGroupBoard() {
  return (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="07 · Page"
        title="WishlistsPage · /wishlists"
        subtext="Saved places. Header at the top, the saved-listing grid below. Empty state takes over when there's nothing saved yet."
      />
      <SectionBlock
        index="State · 01"
        title="Header"
        subtext="Page title and any quick actions (create a new wishlist, sort, etc.). Calm before the grid."
      >
        <Frame route="/wishlists"><WishlistsPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Grid"
        subtext="Saved listings rendered as ListingCards, hearts already filled coral. Tapping the heart removes the listing from the wishlist."
      >
        <Frame route="/wishlists"><WishlistsPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Empty · no saved places"
        subtext="Before the first heart — a quiet prompt pointing back to the home feed."
      >
        <Frame route="/wishlists">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={Heart}
                title="No saved places yet"
                body="Tap the heart on a listing to start a wishlist."
                cta="Browse stays"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  );
}
