import { Avatar } from '@/design-system/primitives/Avatar';
import { LISTINGS } from '@/data/listings';
import { HavnMark, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';
import { AvatarSection, AvatarRow } from './_helpers';

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

export default function SizesBoard() {
  return (
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
  );
}
