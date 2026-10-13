import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { MemoryRouter } from 'react-router-dom';
import { Badge } from '@/design-system/primitives/Badge';
import { ListingCard } from '@/design-system/components/ListingCard';
import { BookingCard } from '@/design-system/components/BookingCard';
import { LISTINGS } from '@/data/listings';
import { TRIPS } from '@/data/trips';
import {
  CanvasCover,
  HavnMark,
  Eyebrow,
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "08 · Badges & Status",
};

export default page;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 05"
      slug="badges.svg"
      title="Badges & status."
      description="Small pills that carry meaning. Guest favourite, Superhost, check-in today — each one earns its place on a card or a row."
    />
  ),
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1353, height: 200, intrinsicSizing: "root-element" },
};

/* ── UI3-style section helpers ───────────────────────────────────── */

function BadgeSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="gap-20 pt-[100px]"
      style={{ display: "flex", gap: 56, alignItems: "flex-start", padding: "44px 0", borderTop: `1px solid ${DARK.hairline}` }}
    >
      <div className="w-[334px]" style={{ flexShrink: 0, paddingTop: 8 }}>
        <h2 className="text-xl"
          style={{ fontFamily: FONT_SANS, fontWeight: 600, letterSpacing: "-0.015em", color: DARK.ink, margin: 0 }}
        >
          {title}
        </h2>
        <p className="text-xs w-[272px]"
          style={{ fontFamily: FONT_SANS, color: DARK.inkQuiet, margin: "12px 0 0" }}
        >
          {description}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start"
        style={{ flex: 1, minHeight: 320, border: "1px solid #ebebeb", borderRadius: 8, padding: "24px 44px", background: "#f7f7f7" }}
      >
        {children}
      </div>
    </div>
  );
}

function BadgeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "center", padding: "16px 0" }}
    >
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#888",
          margin: 0,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

/* ── 01 · Badges — page with all variant sections stacked ────────── */
export const Badges: TempoStoryboard = {
  render: () => (
    <div
      className="w-[1012px] h-[3091px] pt-[100px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: "100px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
    >
      <HavnMark />

      {/* Page header */}
      <h1 className="mt-[32px] font-medium text-4xl"
        style={{ fontFamily: FONT_SANS, letterSpacing: "-0.02em", color: DARK.ink, margin: 0 }}
      >
        Badges
      </h1>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          color: DARK.inkQuiet,
          margin: "16px 0 56px",
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      ></p>

      <BadgeSection
        title="Neutral / Identity Badge"
        description="A generic label that has contrast against the background. We usually use these for labelling types of users, like 'Guest' or 'Host', and for plain factual metadata."
      >
        <BadgeRow label="Strong">
          <Badge variant="ink">Host</Badge>
          <Badge variant="ink">Top of the night</Badge>
        </BadgeRow>
        <BadgeRow label="Light">
          <Badge variant="default">Guest</Badge>
          <Badge variant="default">Member since 2023</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Accent Badge"
        description="Coral brand emphasis. Reserved for the few moments worth the brand-coloured pop — Guest favourite, featured stays, editor picks."
      >
        <BadgeRow label="Filled">
          <Badge variant="accent">Guest favourite</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="accent">Featured</Badge>
          <Badge variant="accent">Editor's pick</Badge>
          <Badge variant="accent">New</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Success Badge"
        description="Used to indicate confirmation, approval, or when a task has completed. Most common: a confirmed booking on the trips list."
      >
        <BadgeRow label="Filled">
          <Badge variant="success">Confirmed</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="success">Approved</Badge>
          <Badge variant="success">Booked</Badge>
          <Badge variant="success">Paid</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Warning Badge"
        description="Used to draw attention to potential issues, or warn a user about a potential problem. Pulses when the matter is time-sensitive — like a same-day check-in."
      >
        <BadgeRow label="Pulsing">
          <Badge variant="warning" pulse>Check-in today</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="warning">Action needed</Badge>
          <Badge variant="warning">Limited availability</Badge>
          <Badge variant="warning">In review</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Danger Badge"
        description="Used for destructive actions, errors, or something that urgently needs attention. Lives on cancelled trips and refunded transactions."
      >
        <BadgeRow label="Filled">
          <Badge variant="error">Cancelled</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="error">Removed</Badge>
          <Badge variant="error">Refunded</Badge>
          <Badge variant="error">Unavailable</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Muted Badge"
        description="For things that have passed or been quietly archived. Same shape as the rest — the muted tone signals 'historical' or 'inactive' without raising alarm."
      >
        <BadgeRow label="Filled">
          <Badge variant="muted">Past</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="muted">Archived</Badge>
          <Badge variant="muted">Inactive</Badge>
          <Badge variant="muted">Draft</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Tier Badge"
        description="Gold marker for earned status. Reserved for Superhosts — hosts who've consistently delivered exceptional experiences."
      >
        <BadgeRow label="Filled">
          <Badge variant="gold">Superhost</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="gold">Premium host</Badge>
          <Badge variant="gold">Verified</Badge>
        </BadgeRow>
      </BadgeSection>
    </div>
  ),
  name: "01 · Badges",
  layout: { x: 1773, y: 0, width: 1012, height: 3091, intrinsicSizing: "root-element" },
};

/* ── 02 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
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
  ),
  name: "02 · In situ",
  layout: { x: 3828, y: 0, width: 1155, height: 1372, intrinsicSizing: "root-element" },
};
