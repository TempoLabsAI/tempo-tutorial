import { HavnMark, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

/* ── Measurement markers — coral chip + bracket, UI3 style ────────── */

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

export function HMarker({ width, children }: { width: number; children: React.ReactNode }) {
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

export function VMarker({ height, children }: { height: number; children: React.ReactNode }) {
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

/* ── UI3-style section helpers ────────────────────────────────────── */

export function ButtonSection({
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
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
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
      <div
        style={{
          flex: 1,
          minHeight: 320,
          border: "1px solid #ebebeb",
          borderRadius: 8,
          padding: "24px 44px",
          background: "#f7f7f7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const ROW_LABEL_STYLE: React.CSSProperties = {
  fontFamily: FONT_MONO,
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#888",
  margin: 0,
};

export function ButtonRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="h-full"
      style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "center", padding: "16px 0" }}
    >
      <p style={ROW_LABEL_STYLE}>{label}</p>
      <div className="w-[163px]" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

export function PageShell({
  title,
  description,
  width,
  children,
}: {
  title: string;
  description?: string;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ width, background: DARK.paper, color: DARK.ink, padding: "72px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
    >
      <HavnMark />
      <h1
        style={{
          fontFamily: FONT_SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: 0,
          lineHeight: 1.05,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 15,
            color: DARK.inkQuiet,
            margin: "16px 0 56px",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
