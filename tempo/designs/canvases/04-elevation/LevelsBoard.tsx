import { FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';
import { PageShell } from './_helpers';

/* ── LevelRow — UI3-style per-token breakdown ────────────────────── */
function LevelRow({
  name,
  description,
  usedOn,
  layers,
  scrim,
}: {
  name: string;
  description: string;
  usedOn: string[];
  layers: string[];
  scrim?: boolean;
}) {
  const combined = layers.join(", ");
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
      <div style={{ width: 320, flexShrink: 0, paddingTop: 8 }}>
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
          Elevation · {name}
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
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: DARK.inkFaint, margin: "24px 0 8px" }}>
          Used on
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {usedOn.map((u) => (
            <p key={u} style={{ fontFamily: FONT_SANS, fontSize: 13, color: DARK.inkQuiet, margin: 0 }}>{u}</p>
          ))}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          border: `1px dashed ${DARK.hairlineStrong}`,
          borderRadius: 8,
          padding: 0,
          background: scrim ? "rgba(0,0,0,0.5)" : "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: scrim ? "rgba(255,255,255,0.7)" : "#717171", margin: 0, padding: "20px 24px 0" }}>
          Light mode
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
          <div style={{ width: 140, height: 140, background: "#fff", borderRadius: 16, boxShadow: combined }} />
        </div>
        <div style={{ background: "#f0f7ee", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
          {layers.map((l) => (
            <p key={l} style={{ fontFamily: FONT_MONO, fontSize: 12, color: "#1b5e20", margin: 0, lineHeight: 1.5 }}>
              <span style={{ marginRight: 8 }}>☼</span>
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LevelsBoard() {
  return (
    <PageShell
      title="Levels"
      intro="Each level taken apart, layer by layer. Read the title and description on the left, then look at the shape on the right — the chips beneath spell out the exact CSS that produces it. Read top to bottom for ascending weight."
    >
      <LevelRow
        name="card"
        description="The default everyday surface. Two stacked layers — a tight contact shadow-sm plus a longer, softer atmospheric halo. Reads as a tile sitting on the page."
        usedOn={[
          "ListingCard",
          "BookingCard",
          "Popovers at rest",
          "List rows in dense tables",
        ]}
        layers={[
          "0 2px 4px rgba(0,0,0,0.06)",
          "0 6px 16px rgba(0,0,0,0.08)",
        ]}
      />

      <LevelRow
        name="card-hover"
        description="The hover state for any card-level surface. Same two-layer structure, both layers grown and slightly darker — paired with a 1px upward translate so the tile lifts."
        usedOn={[
          "Hovered ListingCard",
          "Hovered BookingCard",
          "Any card mid-pointer-entry",
        ]}
        layers={[
          "0 6px 12px rgba(0,0,0,0.08)",
          "0 12px 28px rgba(0,0,0,0.12)",
        ]}
      />

      <LevelRow
        name="modal"
        description="The heaviest level. A single deep shadow-sm — paired with a 50% black scrim behind so the page reads as fully receded. Used only for things that demand full attention."
        usedOn={[
          "Modals",
          "Dialogs",
          "Confirmation sheets",
          "Command palette",
        ]}
        layers={[
          "0 24px 80px rgba(0,0,0,0.25)",
        ]}
        scrim
      />
    </PageShell>
  );
}
