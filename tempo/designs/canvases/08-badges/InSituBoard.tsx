import { MemoryRouter } from 'react-router-dom';
import { ListingCard } from '@/design-system/components/ListingCard';
import { BookingCard } from '@/design-system/components/BookingCard';
import { LISTINGS } from '@/data/listings';
import { TRIPS } from '@/data/trips';
import { HavnMark, FONT_SANS, DARK } from '@/design-system/canvas-chrome';
import { BadgeSection } from './shared';

export function InSituBoard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <div
        className="w-[1155px]"
        style={{
          background: DARK.paper,
          color: DARK.ink,
          padding: "100px 72px 56px",
          fontFamily: FONT_SANS,
          position: "relative",
        }}
      >
        <HavnMark />

        {/* Page header */}
        <h1
          className="mt-[32px] font-medium text-4xl"
          style={{ fontFamily: FONT_SANS, letterSpacing: "-0.02em", color: DARK.ink, margin: "0 0 52px" }}
        >
          In situ
        </h1>

        <BadgeSection
          title="On a listing card"
          description="Top-left of the photo. 'Guest favourite' or 'Rare find' in coral accent — earned, never assumed. One badge per card, max."
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }}>
            <ListingCard listing={LISTINGS[0]} />
            <ListingCard listing={LISTINGS[1]} />
          </div>
        </BadgeSection>

        <BadgeSection
          title="On a booking card"
          description="Right-aligned status pill. Confirmed, Check-in today (pulsing), Past — the badge tells the traveller where the trip is in its lifecycle at a glance."
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            <BookingCard trip={TRIPS[0]} />
            <BookingCard trip={TRIPS[2]} />
            <BookingCard trip={TRIPS[3]} />
          </div>
        </BadgeSection>
      </div>
    </MemoryRouter>
  );
}
