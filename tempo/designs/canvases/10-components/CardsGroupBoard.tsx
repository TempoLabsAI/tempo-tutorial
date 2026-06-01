import { MemoryRouter } from 'react-router-dom';
import { ListingCard } from '@/design-system/components/ListingCard';
import { BookingCard } from '@/design-system/components/BookingCard';
import { LISTINGS } from '@/data/listings';
import { TRIPS } from '@/data/trips';
import { FONT_SANS, DARK } from '@/design-system/canvas-chrome';

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

export function CardsGroupBoard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <div className="gap-[56px] flex flex-col"
        style={{ width: 1280, background: DARK.paper, padding: "72px 72px 96px", fontFamily: FONT_SANS, color: DARK.ink }}
      >
        <h1
          style={{
            fontFamily: FONT_SANS,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Cards
        </h1>

        <div style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
          <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
            <h2
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 600,
                color: DARK.ink,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
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
        style={{
        fontFamily: FONT_SANS,
        fontSize: 18,
        fontWeight: 600,
        color: DARK.ink,
        margin: 0,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
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
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 600,
                color: DARK.ink,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
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
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 600,
                color: DARK.ink,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
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
  );
}
