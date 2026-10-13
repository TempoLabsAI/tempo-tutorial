import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { TitleSpread, HavnMark, MonoText, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "04 · Elevation",
};

export default page;

/* ── Shadow tokens ────────────────────────────────────────────────── */
const SHADOW_CARD = "0 2px 4px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.08)";
const SHADOW_CARD_HOVER = "0 6px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.12)";
const SHADOW_MODAL = "0 24px 80px rgba(0,0,0,0.25)";

/* ── PageShell — dark canvas with HavnMark, H1, intro ─────────────── */
function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: 1280,
        background: DARK.paper,
        color: DARK.ink,
        padding: "72px 72px 56px",
        fontFamily: FONT_SANS,
        position: "relative",
      }}
    >
      <HavnMark />
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
        {title}
      </h1>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          color: DARK.inkQuiet,
          margin: "16px 0 24px",
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      >
        {intro}
      </p>
      {children}
    </div>
  );
}

/* ── Section — label-left / panel-right ──────────────────────────── */
function Section({
  title,
  description,
  children,
  bg = "#f7f7f7",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  bg?: string;
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
      <div
        style={{
          flex: 1,
          minWidth: 0,
          border: "1px solid #ebebeb",
          borderRadius: 8,
          padding: "32px 32px",
          background: bg,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Workspace · 04"
      title={<>Elevation.</>}
      caption="Three soft, multi-layered shadows. We never shadow-sm page chrome — only floating surfaces: resting cards, hover-lifted cards, and modal sheets. Each level is a stacked pair (or single, for modal) of shadows: a tight one for definition, a longer one for atmosphere."
      meta={[
        { label: "Levels", value: "3" },
        { label: "Layers", value: "Up to 2" },
        { label: "Used on", value: "Cards · Modals" },
        { label: "Owner", value: "Sasha · Design" },
      ]}
    />
  ),
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 540 },
};

/* ── 01 · Basics ─────────────────────────────────────────────────── */
export const Basics: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Basics"
      intro="How the shadow-sm system is built. The four CSS parameters every shadow-sm draws from, and the one interactive moment the system uses — the card → hover lift. The Levels page that follows breaks each token into its layers, and the In situ page shows them in real product context."
    >
      <Section
        title="The four parameters"
        description="What each value in the CSS string does. Y-offset places the shadow-sm below the surface (we never use X-offset). Blur softens it. Opacity controls weight. There's no spread — Havn shadows always start at the box edge."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Y-offset</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>2 → 24px</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>How far below the box the shadow drops. Always positive, never sideways.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Blur</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>4 → 80px</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>How soft the shadow is. Higher = wider, more diffuse.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Spread</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>0</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>Never used — the shadow always starts at the box edge.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Opacity</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>6% → 25%</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>Black at varying opacity. Resting cards stay quiet; modals go heaviest.</span>
          </div>
        </div>
      </Section>

      <Section
        title="Resting → Hover"
        description="The card → card-hover transition is the single interactive use of elevation in the system. A 1px upward translate plus the heavier shadow, animated over 220ms ease-out. Quiet on purpose — a lift, not a jump."
      >
        <div style={{ background: "#f7f7f7", padding: 40, borderRadius: 12, display: "flex", gap: 40, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{ width: 260, height: 200, background: "#fff", borderRadius: 16, boxShadow: SHADOW_CARD }} />
            <MonoText size={11} color="#717171">Rest · shadow-card</MonoText>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#FF385C" }}>→</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{ width: 260, height: 200, background: "#fff", borderRadius: 16, boxShadow: SHADOW_CARD_HOVER, transform: "translateY(-1px)" }} />
            <MonoText size={11} color="#717171">Hover · shadow-card-hover + -1px Y</MonoText>
          </div>
        </div>
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, marginTop: 16 }}>
          <pre style={{ fontFamily: FONT_MONO, fontSize: 12, color: "#222", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
{`transition: box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            transform   220ms cubic-bezier(0.2, 0.8, 0.2, 1);

/* Resting */
box-shadow: ${SHADOW_CARD};
transform:  translateY(0);

/* Hover */
box-shadow: ${SHADOW_CARD_HOVER};
transform:  translateY(-1px);`}
          </pre>
        </div>
      </Section>
    </PageShell>
  ),
  name: "01 · Basics",
  layout: { x: 1330, y: 0, width: 1280, height: 1443, intrinsicSizing: "root-element" },
};

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

/* ── 02 · Levels ─────────────────────────────────────────────────── */
export const Levels: TempoStoryboard = {
  render: () => (
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
  ),
  name: "02 · Levels",
  layout: { x: 2660, y: 0, width: 1280, height: 1643, intrinsicSizing: "root-element" },
};

/* ── 03 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <PageShell
      title="In situ"
      intro="Where the three levels actually live. Card on the listing tiles, card-hover on the lifted tile beside them, modal on the sheet that floats above. Everything else on the page sits flat against the surface — no shadow."
    >
      <Section
        title="card · on a ListingCard"
        description="The default resting state for any tile in the home feed or search results. The shadow-sm holds the tile down against the page warmly — readers should barely notice it, only feel that the tile reads as a 'thing'."
      >
        <div style={{ background: "#f7f7f7", padding: 32, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD }}>
              <div style={{ height: 160, background: "#ddd" }} />
              <div style={{ padding: 16 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Stone cottage</p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Cinque Terre · $248</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="card-hover · the lifted tile"
        description="The same row, with the middle tile hovered. The lift is small (1px) but the shadow-sm change is enough to signal interactivity — and to flag which tile the click will go to in a dense grid."
      >
        <div style={{ background: "#f7f7f7", padding: 32, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD }}>
            <div style={{ height: 160, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Stone cottage</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Cinque Terre · $248</p>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD_HOVER, transform: "translateY(-1px)" }}>
            <div style={{ height: 160, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Riad with rooftop pool</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Marrakech · $195</p>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD }}>
            <div style={{ height: 160, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Cabin in the pines</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Lake Louise · $312</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="modal · a sheet above the page"
        description="The heaviest level. Pairs with a 50%-black scrim behind so the page reads as fully behind the modal. Used only for things that demand full attention — Reserve, Sign in, confirmation flows."
        bg="rgba(0,0,0,0.5)"
      >
        <div style={{ padding: "32px 16px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 440, background: "#fff", borderRadius: 16, boxShadow: SHADOW_MODAL, padding: 28 }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
              Confirm your booking
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#484848", margin: "8px 0 24px", lineHeight: 1.55 }}>
              Coastal stone cottage · Jun 8 – 13 · 2 guests. Pay $1,240 to reserve.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <div style={{ padding: "10px 16px", fontFamily: FONT_SANS, fontSize: 14, fontWeight: 500, color: "#717171" }}>Cancel</div>
              <div style={{ padding: "10px 16px", background: "#FF385C", color: "#fff", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>
                Reserve
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "03 · In situ",
  layout: { x: 3990, y: 0, width: 1280, height: 1608, intrinsicSizing: "root-element" },
};
