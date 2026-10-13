import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { Heart, Search, MessageCircle, Calendar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { Frame, CanvasCover } from '@/design-system/canvas-chrome';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import { ListingDetailPage } from '@/pages/ListingDetailPage';
import { TripsPage } from '@/pages/TripsPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { WishlistsPage } from '@/pages/WishlistsPage';
import {
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "01 · Template",
};

export default page;

/* ── Skeleton helpers (Loading row + page-level state) ────────────── */

function SkBlock({
  width,
  height,
  radius = 8,
}: {
  width?: number | string;
  height: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: width ?? "100%",
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #ebebeb 0%, #f3f3f3 50%, #ebebeb 100%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

function SkListingCard() {
  return (
    <div style={{ background: "#fff", padding: 0, borderRadius: 16, overflow: "hidden" }}>
      <SkBlock height={220} radius={0} />
      <div style={{ padding: "16px 4px", display: "flex", flexDirection: "column", gap: 8 }}>
        <SkBlock height={14} width="60%" />
        <SkBlock height={12} width="40%" />
        <SkBlock height={12} width="30%" />
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div style={{ background: "#fff", padding: 48, borderRadius: 16, textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 999, background: "#f7f7f7", marginBottom: 16 }}>
        <Icon size={24} strokeWidth={1.75} color="#222" />
      </div>
      <p style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>{title}</p>
      <p style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: "#717171", margin: "8px 0 20px", lineHeight: 1.55 }}>{body}</p>
      <Button variant="ink">{cta}</Button>
    </div>
  );
}

function SkBookingCard() {
  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, display: "flex", gap: 14, alignItems: "center" }}>
      <SkBlock width={72} height={72} radius={10} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <SkBlock height={14} width="50%" />
        <SkBlock height={12} width="35%" />
        <SkBlock height={12} width="25%" />
      </div>
      <SkBlock width={88} height={28} radius={999} />
    </div>
  );
}

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 02"
      slug="template.svg"
      title="Template."
      description="Boilerplate for new canvases. Copy this file as a starting point — it shows the cover, anatomy, and usage patterns that every other canvas in this workspace follows."
    />
  ),
  name: "00 · Cover",
  layout: { x: -169, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── Page groups — each a vertical column of states (UI3 templates style) ── */

function SectionBlock({
  index,
  title,
  subtext,
  marginTop = 0,
  children,
}: {
  index: string;
  title: string;
  subtext: string;
  marginTop?: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
      <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: DARK.inkQuiet,
            margin: 0,
          }}
        >
          {index}
        </p>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 17,
            fontWeight: 600,
            color: DARK.ink,
            margin: "6px 0 6px",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13,
            color: DARK.inkQuiet,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {subtext}
        </p>
      </div>
      <div
        style={{
          width: 720,
          height: 440,
          borderRadius: 10,
          border: `1px solid ${DARK.hairline}`,
          overflow: "hidden",
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1440 }}>
          <div style={{ marginTop }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

const groupShell: React.CSSProperties = {
  background: DARK.paper,
  color: DARK.ink,
  padding: 56,
  fontFamily: FONT_SANS,
};

function GroupHeader({ index, title, subtext }: { index: string; title: string; subtext: string }) {
  return (
    <>
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: DARK.inkQuiet,
          margin: 0,
        }}
      >
        {index}
      </p>
      <h2
        style={{
          fontFamily: FONT_SANS,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: "10px 0 10px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 14,
          color: DARK.inkQuiet,
          margin: 0,
          lineHeight: 1.55,
          maxWidth: 540,
        }}
      >
        {subtext}
      </p>
      <div style={{ height: 1, background: DARK.hairline, margin: "32px 0 0" }} />
    </>
  );
}

/* 02 · HomePage — the default page */
export const HomePageGroup: TempoStoryboard = {
  render: () => (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="02 · Page"
        title="HomePage · /"
        subtext="The default page when the app opens. A big hero with the SearchBar, a category rail, then handpicked listings in a four-up grid. This is where every guest starts."
      />
      <SectionBlock
        index="State · 01"
        title="Hero"
        subtext="Big display title, supporting copy, the SearchBar. The widest part of the funnel — every guest passes through here."
      >
        <Frame route="/"><HomePage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Popular homes"
        subtext="Featured grid below the category rail. Four ListingCards in a row, each with photo, location, price, rating."
      >
        <Frame route="/"><HomePage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Inspiration & footer"
        subtext="Inspiration tiles for further browsing, then the four-column footer. The quiet exit of the page."
      >
        <Frame route="/"><HomePage /></Frame>
      </SectionBlock>
    </div>
  ),
  name: "02 · HomePage",
  layout: { x: 1330, y: 0, width: 1168, height: 1743, intrinsicSizing: "root-element" },
};

/* 03 · SearchPage — directory */
export const SearchPageGroup: TempoStoryboard = {
  render: () => (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="03 · Page"
        title="SearchPage · /search"
        subtext="The directory. Filter chips above a grid of ListingCards. When filters return nothing, the empty-state copy and a 'clear filters' action take over."
      />
      <SectionBlock
        index="State · 01"
        title="Filter bar"
        subtext="The compact navbar with FilterChips. Tap to toggle, count badge shows applied options."
      >
        <Frame route="/search"><SearchPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Results grid"
        subtext="Four-column grid of ListingCards. Saved cards show the coral heart; unsaved cards stay neutral."
      >
        <Frame route="/search"><SearchPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Loading"
        subtext="First load — masthead, filter row, and a grid of card skeletons. Same shape as the real results so the layout doesn't jump in."
      >
        <Frame route="/search">
          <div style={{ padding: "32px 40px", background: "#fff", minHeight: 760 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <SkBlock height={36} width={88} radius={999} />
              <SkBlock height={36} width={120} radius={999} />
              <SkBlock height={36} width={96} radius={999} />
              <SkBlock height={36} width={120} radius={999} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <SkListingCard />
              <SkListingCard />
              <SkListingCard />
              <SkListingCard />
            </div>
          </div>
        </Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 04"
        title="Empty · no results"
        subtext="When filters return nothing — quiet icon, one sentence, one action to clear and try again."
      >
        <Frame route="/search">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={Search}
                title="No matches for these dates"
                body="Try widening the date range or removing a filter."
                cta="Clear filters"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  ),
  name: "03 · SearchPage",
  layout: { x: 2548, y: 0, width: 1168, height: 2239, intrinsicSizing: "root-element" },
};

/* 04 · ListingDetailPage */
export const ListingDetailPageGroup: TempoStoryboard = {
  render: () => (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="04 · Page"
        title="ListingDetailPage · /listing/:id"
        subtext="One listing, end-to-end. Photos first, then details, amenities, the sticky booking card on the right, and reviews + host below the fold."
      />
      <SectionBlock
        index="State · 01"
        title="Photo gallery"
        subtext="Hero photo on the left, three smaller photos stacked right. Heart overlay top-right, share top-left."
      >
        <Frame route="/listing/lst-001" path="/listing/:id"><ListingDetailPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Details & booking"
        subtext="Property title, host info, amenities list. The sticky BookingCard with date picker and Reserve button anchors to the right column."
      >
        <Frame route="/listing/lst-001" path="/listing/:id"><ListingDetailPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Reviews & host"
        subtext="Star rating breakdown, then individual review cards. The host section at the bottom features a Superhost badge when earned."
      >
        <Frame route="/listing/lst-001" path="/listing/:id"><ListingDetailPage /></Frame>
      </SectionBlock>
    </div>
  ),
  name: "04 · ListingDetailPage",
  layout: { x: 3766, y: 0, width: 1168, height: 1743, intrinsicSizing: "root-element" },
};

/* 05 · TripsPage */
export const TripsPageGroup: TempoStoryboard = {
  render: () => (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="05 · Page"
        title="TripsPage · /trips"
        subtext="The traveller's itinerary. Upcoming, today, and past trips — each rendered as a BookingCard row with the appropriate status badge."
      />
      <SectionBlock
        index="State · 01"
        title="Itinerary"
        subtext="Vertical list of BookingCards. Status badges (Confirmed, Check-in today, Past, Cancelled) signal where each trip is in its lifecycle."
      >
        <Frame route="/trips"><TripsPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Empty · no trips"
        subtext="Before the first booking — a quiet prompt to start a search."
      >
        <Frame route="/trips">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={Calendar}
                title="No trips booked yet"
                body="Time to dust off your bags and start planning your next adventure."
                cta="Start searching"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  ),
  name: "05 · TripsPage",
  layout: { x: 4984, y: 0, width: 1168, height: 1247, intrinsicSizing: "root-element" },
};

/* 06 · MessagesPage */
export const MessagesPageGroup: TempoStoryboard = {
  render: () => (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="06 · Page"
        title="MessagesPage · /messages"
        subtext="A two-pane inbox. Conversation list on the left, the active thread with the host on the right."
      />
      <SectionBlock
        index="State · 01"
        title="Inbox + thread"
        subtext="List sidebar with previews and unread dots. Selected conversation expands into the message thread on the right, with a composer at the bottom."
      >
        <Frame route="/messages"><MessagesPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Empty · no messages"
        subtext="When the inbox is empty — message bubble icon, calm copy, and a way back to discovery."
      >
        <Frame route="/messages">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={MessageCircle}
                title="Nothing here yet"
                body="When you book a stay, your messages with the host will appear here."
                cta="Find a stay"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  ),
  name: "06 · MessagesPage",
  layout: { x: 6202, y: 0, width: 1168, height: 1247, intrinsicSizing: "root-element" },
};

/* 07 · WishlistsPage */
export const WishlistsPageGroup: TempoStoryboard = {
  render: () => (
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
  ),
  name: "07 · WishlistsPage",
  layout: { x: 7420, y: 0, width: 1168, height: 1743, intrinsicSizing: "root-element" },
};
