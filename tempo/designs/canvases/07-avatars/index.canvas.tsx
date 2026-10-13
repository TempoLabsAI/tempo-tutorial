import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { Avatar } from '@/design-system/primitives/Avatar';
import { Badge } from '@/design-system/primitives/Badge';
import { LISTINGS } from '@/data/listings';
import {
  CanvasCover,
  HavnMark,
  Eyebrow,
  MonoText,
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "07 · Avatars & Identity",
};

export default page;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 07"
      slug="avatars.svg"
      title="Avatars & identity."
      description="Typically, we represent people using a circular avatar. Five sizes cover everything from inline mentions to host heroes. If we don't have a photo available, we fall back to using the first initial of their name."
    />
  ),
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1692, height: 200, intrinsicSizing: "root-element" },
};

/* ── UI3-style section helpers ───────────────────────────────────── */

function AvatarSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "44px 0",
        borderTop: `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 8 }}>
        <h2
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13.5,
            color: DARK.inkQuiet,
            margin: "12px 0 0",
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      </div>
      <div className="px-11 py-8"
        style={{ flex: 1, minHeight: 320, border: "1px solid #ebebeb", borderRadius: 8, padding: "24px 44px", background: "#f7f7f7" }}
      >
        {children}
      </div>
    </div>
  );
}

function AvatarRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "16px 0",
      }}
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
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Size marker — coral chip + bracket, like UI3 measurement callouts ─ */

const MARKER_CHIP: React.CSSProperties = {
  background: "#FF385C",
  color: "#fff",
  fontFamily: FONT_MONO,
  fontSize: 10,
  fontWeight: 600,
  padding: "1px 6px",
  borderRadius: 2,
  lineHeight: 1.3,
};

function HMarker({ width, children }: { width: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span style={MARKER_CHIP}>{children}</span>
      <div style={{ width, display: "flex", alignItems: "center" }}>
        <div style={{ width: 1, height: 5, background: "#FF385C" }} />
        <div style={{ flex: 1, height: 1, background: "#FF385C" }} />
        <div style={{ width: 1, height: 5, background: "#FF385C" }} />
      </div>
    </div>
  );
}

function VMarker({ height, children }: { height: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ height, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 5, height: 1, background: "#FF385C" }} />
        <div style={{ flex: 1, width: 1, background: "#FF385C" }} />
        <div style={{ width: 5, height: 1, background: "#FF385C" }} />
      </div>
      <span style={MARKER_CHIP}>{children}</span>
    </div>
  );
}


function InitialList({ size }: { size: "xs" | "sm" | "md" | "lg" | "xl"; }) {
  return (
    <>
      <Avatar alt="Aria" size={size} />
      <Avatar alt="Ben" size={size} />
      <Avatar alt="Cleo" size={size} />
      <Avatar alt="Devon" size={size} />
      <Avatar alt="Ezra" size={size} />
      <Avatar alt="Farah" size={size} />
      <Avatar alt="Gabe" size={size} />
    </>
  );
}

function InitialListShort({ size }: { size: "xs" | "sm" | "md" | "lg" | "xl"; }) {
  return (
    <>
      <Avatar alt="Aria" size={size} />
      <Avatar alt="Ben" size={size} />
      <Avatar alt="Cleo" size={size} />
      <Avatar alt="Devon" size={size} />
    </>
  );
}

/* ── 01 · Avatar — page with all sizes stacked ──────────────────── */
export const Sizes: TempoStoryboard = {
  render: () => (
    <div
      className="w-[1280px]"
      style={{
        background: DARK.paper,
        color: DARK.ink,
        padding: "72px 72px 56px",
        fontFamily: FONT_SANS,
        position: "relative",
      }}
    >
      <HavnMark />

      {/* Page header */}
      <h1
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily: FONT_SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: 0,
          lineHeight: 1.05,
          outline: "none",
        }}
      >
        Sizes
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

      <AvatarSection
        title="Default User Avatar"
        description="Our default user avatars are 40×40, which work well across most contexts — host rows in listings, message previews, review cards, and member lists."
      >
        <AvatarRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={40}>40</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="md" />
              <VMarker height={40}>40</VMarker>
            </div>
          </div>
        </AvatarRow>
        <AvatarRow label="Photo">
          <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="md" />
          <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="md" />
          <Avatar src={LISTINGS[2].host.avatar} alt={LISTINGS[2].host.name} size="md" />
          <Avatar src={LISTINGS[3].host.avatar} alt={LISTINGS[3].host.name} size="md" />
        </AvatarRow>
        <AvatarRow label="Initials">
          <InitialList size="md" />
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Large User Avatar"
        description="For host profile blocks on the listing detail page and the larger member tiles. We scale up to 56×56 — same circle, twice the visual weight of the default."
      >
        <AvatarRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={56}>56</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="lg" />
              <VMarker height={56}>56</VMarker>
            </div>
          </div>
        </AvatarRow>
        <AvatarRow label="Photo">
          <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="lg" />
          <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="lg" />
          <Avatar src={LISTINGS[2].host.avatar} alt={LISTINGS[2].host.name} size="lg" />
          <Avatar src={LISTINGS[3].host.avatar} alt={LISTINGS[3].host.name} size="lg" />
        </AvatarRow>
        <AvatarRow label="Initials">
          <InitialList size="lg" />
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Hero User Avatar"
        description="Reserved for the host hero on listing detail and the biggest profile views. The largest face we ever show — 80×80, earns its room."
      >
        <AvatarRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={80}>80</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="xl" />
              <VMarker height={80}>80</VMarker>
            </div>
          </div>
        </AvatarRow>
        <AvatarRow label="Photo">
          <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="xl" />
          <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="xl" />
          <Avatar src={LISTINGS[2].host.avatar} alt={LISTINGS[2].host.name} size="xl" />
        </AvatarRow>
        <AvatarRow label="Initials">
          <InitialListShort size="xl" />
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Compact User Avatar"
        description="For tight rows — search filter chips, settings lists, and the small face beside a name in a message thread. One step down from the default at 32×32."
      >
        <AvatarRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={32}>32</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="sm" />
              <VMarker height={32}>32</VMarker>
            </div>
          </div>
        </AvatarRow>
        <AvatarRow label="Photo">
          <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="sm" />
          <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="sm" />
          <Avatar src={LISTINGS[2].host.avatar} alt={LISTINGS[2].host.name} size="sm" />
          <Avatar src={LISTINGS[3].host.avatar} alt={LISTINGS[3].host.name} size="sm" />
        </AvatarRow>
        <AvatarRow label="Initials">
          <InitialList size="sm" />
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Inline Avatar"
        description="In cases where we need to nest an avatar inline with text — comment threads, branching message replies, dense table rows — we occasionally use 24×24."
      >
        <AvatarRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={24}>24</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="xs" />
              <VMarker height={24}>24</VMarker>
            </div>
          </div>
        </AvatarRow>
        <AvatarRow label="Photo">
          <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="xs" />
          <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="xs" />
          <Avatar src={LISTINGS[2].host.avatar} alt={LISTINGS[2].host.name} size="xs" />
          <Avatar src={LISTINGS[3].host.avatar} alt={LISTINGS[3].host.name} size="xs" />
        </AvatarRow>
        <AvatarRow label="Initials">
          <InitialList size="xs" />
        </AvatarRow>
      </AvatarSection>
    </div>
  ),
  name: "01 · Sizes",
  layout: { x: 2028, y: 0, width: 1162, height: 2765, intrinsicSizing: "root-element" },
};

/* ── 02 · In situ — compositions ────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <div
      className="w-[992px] h-[975px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: "100px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
    >
      <HavnMark />

      <h1
        contentEditable
        suppressContentEditableWarning
        className="mt-[32px] font-medium text-4xl"
        style={{ fontFamily: FONT_SANS, letterSpacing: "-0.02em", color: DARK.ink, margin: "0 0 52px", outline: "none" }}
      >
        In situ
      </h1>

      <AvatarSection
        title="Host row"
        description="The most common composition. Default avatar on the left, name and a piece of metadata (hosting tenure, location) stacked on the right."
      >
        <AvatarRow label="Default">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
            <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="md" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>{LISTINGS[0].host.name}</p>
              <p style={{ fontSize: 12, color: "#717171", margin: "2px 0 0", fontFamily: FONT_SANS }}>Hosting for 7 years</p>
            </div>
          </div>
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Superhost row"
        description="Same shape as the host row, but with a gold Superhost badge underneath the name. Used wherever an earned-tier host appears."
      >
        <AvatarRow label="With badge">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
            <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="md" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>{LISTINGS[1].host.name}</p>
              <div style={{ marginTop: 4 }}>
                <Badge variant="gold">Superhost</Badge>
              </div>
            </div>
          </div>
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Guest stack"
        description="Overlapping compact avatars to indicate a group of guests on a single trip. The fallback initials avatar caps the stack when the group exceeds what fits."
      >
        <AvatarRow label="Overlap">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
            <div style={{ display: "flex" }}>
              <Avatar src={LISTINGS[0].host.avatar} alt="g1" size="sm" />
              <div style={{ marginLeft: -10 }}>
                <Avatar src={LISTINGS[1].host.avatar} alt="g2" size="sm" />
              </div>
              <div style={{ marginLeft: -10 }}>
                <Avatar src={LISTINGS[2].host.avatar} alt="g3" size="sm" />
              </div>
              <div style={{ marginLeft: -10 }}>
                <Avatar alt="+3" size="sm" />
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#717171", margin: 0, fontFamily: FONT_SANS }}>6 guests on this trip</p>
          </div>
        </AvatarRow>
      </AvatarSection>
    </div>
  ),
  name: "02 · In situ",
  layout: { x: 3516, y: 0, width: 1159, height: 1453, intrinsicSizing: "root-element" },
};
