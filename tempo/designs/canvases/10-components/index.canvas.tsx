import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { MemoryRouter } from 'react-router-dom';
import { MapPin, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { ListingCard } from '@/design-system/components/ListingCard';
import { BookingCard } from '@/design-system/components/BookingCard';
import { SearchBar } from '@/design-system/components/SearchBar';
import { FilterChip } from '@/design-system/components/FilterChip';
import { HeartButton } from '@/design-system/components/HeartButton';
import { RatingStars } from '@/design-system/components/RatingStars';
import { Navbar } from '@/design-system/layout/Navbar';
import { LISTINGS } from '@/data/listings';
import { TRIPS } from '@/data/trips';
import {
  CanvasCover,
  DarkSheet,
  DarkRow,
  Eyebrow,
  FONT_SANS,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "10 · Components",
};

export default page;

/* ── Skeleton helpers (used in Cards · Loading) ───────────────────── */

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

/* ── Section helper — label-left / content-right ─────────────────── */

function ComponentSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[52px] py-[44px] mb-[24px]"
      style={{ display: "flex", gap: 56, alignItems: "flex-start", padding: "32px 0", borderTop: `1px solid ${DARK.hairline}` }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 16,
            fontWeight: 600,
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            outline: "none",
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 13,
              color: DARK.inkQuiet,
              margin: "10px 0 0",
              lineHeight: 1.55,
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 06"
      slug="components.svg"
      title="Components."
      description="The composed pieces. Cards, search and filter chips, the navbar — each one assembled from primitives and used across the app."
    />
  ),
  name: "00 · Cover",
  layout: { x: -218, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Cards ──────────────────────────────────────────────────── */
export const CardsGroup: TempoStoryboard = {
  render: () => (
    <MemoryRouter initialEntries={["/"]}>
      <div className="gap-[56px] flex flex-col"
        style={{ width: 1280, background: DARK.paper, padding: "72px 72px 96px", fontFamily: FONT_SANS, color: DARK.ink }}
      >
        <h1
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.1,
            outline: "none",
          }}
        >
          Cards
        </h1>

        <div style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
          <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
            <h2
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 600,
                color: DARK.ink,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                outline: "none",
              }}
            >
              ListingCard
            </h2>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: 13,
                color: DARK.inkQuiet,
                margin: "10px 0 0",
                lineHeight: 1.55,
              }}
            >
              The unit of the home feed and search results. Three demos: default, saved, Superhost.
            </p>
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <ListingCard listing={LISTINGS[0]} />
            <ListingCard listing={LISTINGS[1]} saved />
            <ListingCard listing={LISTINGS[2]} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
                            <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
                              <h2
        contentEditable
        suppressContentEditableWarning
        style={{
        fontFamily: FONT_SANS,
        fontSize: 18,
        fontWeight: 600,
        color: DARK.ink,
        margin: 0,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
        outline: "none",
        }}
                              >
                                Loading
                              </h2>
                            </div>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, background: "#fff", padding: 24, borderRadius: 12 }}>
                                <SkListingCard />
                                <SkListingCard />
                                <SkListingCard />
                              </div>
                            </div>
                          </div>

        <div className="pt-[100px] divide-solid border-l-0 border-r-0 border-b-0 [--tw-divide-opacity:1] border-t-2 border-[oklch(0.289_0_264.533)]" style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
          <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
            <h2
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 600,
                color: DARK.ink,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                outline: "none",
              }}
            >
              BookingCard
            </h2>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: 13,
                color: DARK.inkQuiet,
                margin: "10px 0 0",
                lineHeight: 1.55,
              }}
            >
              The unit of the trips list. Same surface, badges signal status.
            </p>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, maxWidth: 832 }}>
            <BookingCard trip={TRIPS[0]} />
            <BookingCard trip={TRIPS[1]} />
            <BookingCard trip={TRIPS[2]} />
            <BookingCard trip={TRIPS[3]} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
          <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
            <h2
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 600,
                color: DARK.ink,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                outline: "none",
              }}
            >
              Loading
            </h2>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="w-full" style={{ display: "flex", flexDirection: "column", gap: 12, background: "#fff", padding: 24, borderRadius: 12 }}>
              <SkBookingCard />
              <SkBookingCard />
            </div>
          </div>
        </div>
      </div>
    </MemoryRouter>
  ),
  name: "04 · Cards",
  layout: { x: 5320, y: 0, width: 1280, height: 2303, intrinsicSizing: "root-element" },
};

/* ── SearchBar modal mockups ─────────────────────────────────────── */

function ModalPopover({ children, width = 720 }: { children: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        width,
        background: "#fff",
        borderRadius: 32,
        boxShadow: "0 16px 40px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.06)",
        padding: 24,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function DestinationRow({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: "#f3f3f3",
          display: "grid",
          placeItems: "center",
          color: "#717171",
          flexShrink: 0,
        }}
      >
        <MapPin size={20} strokeWidth={1.75} />
      </div>
      <div>
        <p style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>
          {title}
        </p>
        <p style={{ fontFamily: "inherit", fontSize: 13, color: "#717171", margin: "2px 0 0" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function MiniCalendar({ monthLabel }: { monthLabel: string }) {
  return (
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#222", margin: "0 0 12px", textAlign: "center" }}>{monthLabel}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontFamily: "inherit", fontSize: 11, color: "#717171", textAlign: "center", marginBottom: 4 }}>
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        <CalCell n="" />
        <CalCell n="" />
        <CalCell n="1" />
        <CalCell n="2" />
        <CalCell n="3" />
        <CalCell n="4" />
        <CalCell n="5" />
        <CalCell n="6" />
        <CalCell n="7" />
        <CalCell n="8" />
        <CalCell n="9" />
        <CalCell n="10" />
        <CalCell n="11" />
        <CalCell n="12" />
        <CalCell n="13" />
        <CalCell n="14" highlight="start" />
        <CalCell n="15" inRange />
        <CalCell n="16" inRange />
        <CalCell n="17" inRange />
        <CalCell n="18" highlight="end" />
        <CalCell n="19" />
        <CalCell n="20" />
        <CalCell n="21" />
        <CalCell n="22" />
        <CalCell n="23" />
        <CalCell n="24" />
        <CalCell n="25" />
        <CalCell n="26" />
        <CalCell n="27" />
        <CalCell n="28" />
        <CalCell n="29" />
        <CalCell n="30" />
      </div>
    </div>
  );
}

function CalCell({ n, highlight, inRange }: { n: string; highlight?: "start" | "end"; inRange?: boolean }) {
  const bg = highlight ? "#222" : inRange ? "#f7f7f7" : "transparent";
  const color = highlight ? "#fff" : "#222";
  return (
    <div
      style={{
        height: 32,
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        fontWeight: highlight ? 600 : 400,
        color,
        background: bg,
        borderRadius: highlight ? 999 : 4,
      }}
    >
      {n}
    </div>
  );
}

function GuestRow({ label, sub, count }: { label: string; sub: string; count: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        borderBottom: "1px solid #ebebeb",
      }}
    >
      <div>
        <p style={{ fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>{label}</p>
        <p style={{ fontFamily: "inherit", fontSize: 13, color: "#717171", margin: "2px 0 0" }}>{sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          aria-label={`Decrease ${label}`}
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: "1px solid #b0b0b0",
            background: "transparent",
            color: count === 0 ? "#ddd" : "#717171",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <Minus size={16} strokeWidth={2} />
        </button>
        <span style={{ fontFamily: "inherit", fontSize: 15, color: "#222", minWidth: 16, textAlign: "center" }}>
          {count}
        </span>
        <button
          aria-label={`Increase ${label}`}
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: "1px solid #222",
            background: "transparent",
            color: "#222",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <Plus size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/* ── 02 · SearchBar ──────────────────────────────────────────────── */
export const SearchBarShowcase: TempoStoryboard = {
  render: () => (
    <MemoryRouter initialEntries={["/"]}>
      <div className="w-[1280px]">
        <DarkSheet
          index="02"
          title="SearchBar"
          caption="Compact for the navbar, expanded on the hero. Click any segment to open a modal — destination search, date picker, or guest counter."
        >
          <ComponentSection title="Compact" description="Single pill for the inner-page navbar. Rest, filled with a destination, and on hover (soft shadow-sm lift).">
            <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 28, maxWidth: 520 }}>
              <SearchBar compact />
              <SearchBar compact defaultDestination="Lisbon" />
              <div style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.12))" }}>
                <SearchBar compact />
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Expanded" description="Full pill with Where / Check in / Check out / Who segments. Rest, on hover (shadow lift), and with a destination filled.">
            <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 28 }}>
              <SearchBar />
              <div style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.14))" }}>
                <SearchBar />
              </div>
              <SearchBar defaultDestination="Lisbon, Portugal" />
            </div>
          </ComponentSection>

          <ComponentSection title="Modal · Where" description="Tapping the Where segment opens a popover with the destination input and a suggested-destinations list.">
            <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
              <div style={{ marginBottom: 18 }}>
                <SearchBar />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <ModalPopover width={420}>
                  <p style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#717171", margin: "0 0 12px" }}>
                    Suggested destinations
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <DestinationRow title="Nearby" body="Find what's around you" />
                    <DestinationRow title="Lisbon, Portugal" body="For sights like Praça do Comércio" />
                    <DestinationRow title="Algarve, Portugal" body="Sun, sand, and seaside towns" />
                    <DestinationRow title="Madeira, Portugal" body="Mountain hikes and ocean cliffs" />
                    <DestinationRow title="Porto, Portugal" body="Riverside city, port wine country" />
                  </div>
                </ModalPopover>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Modal · Check in / out" description="Two-month date picker. Start and end dates anchor the range; mid-range days take a soft fill.">
            <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
              <div style={{ marginBottom: 18 }}>
                <SearchBar />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ModalPopover width={780}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18, padding: "0 4px" }}>
                    <button aria-label="Previous month" style={{ width: 32, height: 32, borderRadius: 999, border: "none", background: "transparent", color: "#222", display: "grid", placeItems: "center", cursor: "pointer" }}>
                      <ChevronLeft size={18} strokeWidth={2} />
                    </button>
                    <div style={{ flex: 1 }} />
                    <button aria-label="Next month" style={{ width: 32, height: 32, borderRadius: 999, border: "none", background: "transparent", color: "#222", display: "grid", placeItems: "center", cursor: "pointer" }}>
                      <ChevronRight size={18} strokeWidth={2} />
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 48, padding: "0 12px" }}>
                    <MiniCalendar monthLabel="April 2026" />
                    <MiniCalendar monthLabel="May 2026" />
                  </div>
                </ModalPopover>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Modal · Who" description="Guest counter with adults, children, infants, and pets. Each row has independent ± controls.">
            <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
              <div style={{ marginBottom: 18 }}>
                <SearchBar />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ModalPopover width={420}>
                  <GuestRow label="Adults" sub="Ages 13 or above" count={2} />
                  <GuestRow label="Children" sub="Ages 2–12" count={0} />
                  <GuestRow label="Infants" sub="Under 2" count={0} />
                  <GuestRow label="Pets" sub="Bringing a service animal?" count={0} />
                </ModalPopover>
              </div>
            </div>
          </ComponentSection>
        </DarkSheet>
      </div>
    </MemoryRouter>
  ),
  name: "02 · SearchBar",
  layout: { x: 2660, y: 0, width: 1280, height: 2908, intrinsicSizing: "root-element" },
};

/* ── 03 · FilterChip ─────────────────────────────────────────────── */
export const FilterChipShowcase: TempoStoryboard = {
  render: () => (
    <div className="w-[1280px]">
      <DarkSheet
        index="03"
        title="FilterChip"
        caption="The row that lives above search results. Tap to toggle, count badge shows applied options."
      >
        <ComponentSection title="Rest" description="The default chip. White surface, grey border, ink label.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" />
            <FilterChip label="Type of place" />
            <FilterChip label="Beds" />
            <FilterChip label="Amenities" />
          </div>
        </ComponentSection>

        <ComponentSection title="Hover" description="Border darkens to ink as the cursor hovers. Background stays white.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" className="border-ink!" />
            <FilterChip label="Type of place" className="border-ink!" />
            <FilterChip label="Beds" className="border-ink!" />
            <FilterChip label="Amenities" className="border-ink!" />
          </div>
        </ComponentSection>

        <ComponentSection title="Active" description="Selected state — warm paper fill, ink border. Signals an applied filter.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" active />
            <FilterChip label="Type of place" active />
            <FilterChip label="Beds" active />
            <FilterChip label="Amenities" active />
          </div>
        </ComponentSection>

        <ComponentSection title="With count" description="Numeric badge appears on the right when a chip has applied options. Coral on rest chips, ink on active ones.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Beds" count={2} />
            <FilterChip label="Amenities" count={5} />
            <FilterChip label="Beds" count={2} active />
            <FilterChip label="Amenities" count={5} active />
          </div>
        </ComponentSection>

        <ComponentSection title="Composed row" description="A realistic mix — three active, four resting. Wraps on narrow surfaces and stays single-row otherwise.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" />
            <FilterChip label="Type of place" active />
            <FilterChip label="Beds" count={2} active />
            <FilterChip label="Amenities" count={5} active />
            <FilterChip label="Booking options" />
            <FilterChip label="Standout stays" />
            <FilterChip label="Property type" />
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  ),
  name: "03 · FilterChip",
  layout: { x: 3990, y: 0, width: 1280, height: 1187, intrinsicSizing: "root-element" },
};

/* ── 04 · Navbar ─────────────────────────────────────────────────── */
export const NavbarShowcase: TempoStoryboard = {
  render: () => (
    <div className="w-[1280px]">
      <DarkSheet
        index="01"
        title="Navbar"
        caption="One sticky white masthead. Compact search appears on every inner route; tabs underline the section the guest is in."
      >
        <ComponentSection title="Home · /" description="No compact search — the hero on the home page owns the SearchBar. Stays is the implicit landing tab.">
          <div style={{ border: `1px solid ${DARK.hairline}`, borderRadius: 12, overflow: "hidden" }}>
            <MemoryRouter initialEntries={["/"]}>
              <Navbar />
            </MemoryRouter>
          </div>
        </ComponentSection>

        <ComponentSection title="Section tabs" description="The four section routes share the same chrome — compact SearchBar beside the wordmark, and one tab underlined (Stays / Wishlists / Trips / Messages).">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/search"]}>
                <Navbar />
              </MemoryRouter>
            </div>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/wishlists"]}>
                <Navbar />
              </MemoryRouter>
            </div>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/trips"]}>
                <Navbar />
              </MemoryRouter>
            </div>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/messages"]}>
                <Navbar />
              </MemoryRouter>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Listing detail · /listing/:id" description="Same compact SearchBar so a guest can jump back to results without losing context. No tab underline — the listing isn't a section root.">
          <div style={{ border: `1px solid ${DARK.hairline}`, borderRadius: 12, overflow: "hidden" }}>
            <MemoryRouter initialEntries={["/listing/1"]}>
              <Navbar />
            </MemoryRouter>
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  ),
  name: "01 · Navbar",
  layout: { x: 1330, y: 0, width: 1280, height: 1335, intrinsicSizing: "root-element" },
};

/* ── 05 · RatingStars ────────────────────────────────────────────── */
export const RatingStarsShowcase: TempoStoryboard = {
  render: () => (
    <div className="w-[1280px]">
      <DarkSheet
        index="05"
        title="RatingStars"
        caption="One filled ink star, the rating to two decimals, and an optional review count. Always inline, never standalone."
      >
        <ComponentSection title="Small (default)" description="The size used on cards and list rows — 12px star, 14px label. Reads quietly inside a dense card footer.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <RatingStars rating={4.97} count={184} />
            <RatingStars rating={4.92} count={1240} />
            <RatingStars rating={5.0} />
            <RatingStars rating={4.5} count={12} />
          </div>
        </ComponentSection>

        <ComponentSection title="Medium" description="Slightly larger — used on the listing detail header and reviews section, where rating is a primary signal.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <RatingStars rating={4.97} count={184} size="md" />
            <RatingStars rating={4.92} count={1240} size="md" />
            <RatingStars rating={5.0} size="md" />
          </div>
        </ComponentSection>

        <ComponentSection title="Without count" description="When a listing has fewer than five reviews, drop the count and show only the rating — keeps the chrome quiet.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <RatingStars rating={5.0} />
            <RatingStars rating={4.83} />
            <RatingStars rating={4.5} size="md" />
          </div>
        </ComponentSection>

        <ComponentSection title="In a card footer" description="Where it actually lives. Aligned with the title, sits to the right of the city name and above the price.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
            <div style={{ width: 320 }}>
              <MemoryRouter initialEntries={["/"]}>
                <ListingCard listing={LISTINGS[0]} />
              </MemoryRouter>
            </div>
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  ),
  name: "05 · RatingStars",
  layout: { x: 6650, y: 0, width: 1280, height: 1393, intrinsicSizing: "root-element" },
};

/* ── 06 · HeartButton ────────────────────────────────────────────── */
export const HeartButtonShowcase: TempoStoryboard = {
  render: () => (
    <div className="w-[1280px]">
      <DarkSheet
        index="06"
        title="HeartButton"
        caption="The save-to-wishlist toggle. Two surface treatments — overlay on top of imagery, inline on paper — and a confirmed coral fill when active."
      >
        <ComponentSection title="Overlay · rest" description="Sits on a listing photo. Translucent black fill, white stroke, a soft drop shadow-sm so the heart reads on any image.">
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={false} size="sm" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={false} size="md" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={false} size="lg" surface="overlay" />
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Overlay · saved" description="Coral fills the heart on tap. The shape pulses once — quiet confirmation, no toast.">
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={true} size="sm" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={true} size="md" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={true} size="lg" surface="overlay" />
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Inline" description="Used in lists where the heart sits beside text on paper. Transparent fill, ink stroke at rest — same coral fill when saved.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 24, alignItems: "center" }}>
            <HeartButton saved={false} size="sm" surface="inline" />
            <HeartButton saved={false} size="md" surface="inline" />
            <HeartButton saved={false} size="lg" surface="inline" />
            <div style={{ width: 1, height: 32, background: DARK.hairline }} />
            <HeartButton saved={true} size="sm" surface="inline" />
            <HeartButton saved={true} size="md" surface="inline" />
            <HeartButton saved={true} size="lg" surface="inline" />
          </div>
        </ComponentSection>

        <ComponentSection title="On a listing card" description="Where it lives in production — top-right of the cover image, overlay surface, sm size.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
            <div style={{ width: 320 }}>
              <MemoryRouter initialEntries={["/"]}>
                <ListingCard listing={LISTINGS[2]} saved />
              </MemoryRouter>
            </div>
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  ),
  name: "06 · HeartButton",
  layout: { x: 7980, y: 0, width: 1280, height: 1384, intrinsicSizing: "root-element" },
};
