import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { TitleSpread, HavnMark, MonoText, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "02 · Typography",
};

export default page;

/* ── Type scale ──────────────────────────────────────────────────── */
const SCALE = [
  {
    name: "Display",
    px: 60,
    weight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    use: "The largest type in the system. Used once per page — TitleSpread covers, marketing heroes. Tight line-height and -2% tracking so big letters read as one shape.",
    sample: "Foundations for the system.",
  },
  {
    name: "Heading",
    px: 32,
    weight: 600,
    lineHeight: 1.1,
    letterSpacing: "-0.015em",
    use: "The H1 on every internal page. Page titles, modal titles, the listing's name at the top of detail view.",
    sample: "Coastal stone cottage with sea views",
  },
  {
    name: "Subheading",
    px: 22,
    weight: 600,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    use: "Section headers inside a page. The label above a row of cards, the title of a modal section.",
    sample: "Where to next?",
  },
  {
    name: "Body",
    px: 16,
    weight: 400,
    lineHeight: 1.5,
    letterSpacing: "0",
    use: "Paragraphs and longer prose. The default text size in cards and descriptions. Regular weight, looser line-height.",
    sample: "A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water.",
  },
  {
    name: "Caption",
    px: 14,
    weight: 400,
    lineHeight: 1.5,
    letterSpacing: "0",
    use: "Metadata and supporting copy. Host names, prices, dates. Paired with Ink quiet to recede beneath the body it supports.",
    sample: "Hosted by Lucia R. · Superhost · Cinque Terre, Italy",
  },
  {
    name: "Eyebrow",
    px: 12,
    weight: 600,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    use: "All-caps category labels. The tiny line above a section heading. Always tracked out 8% so the caps read evenly.",
    sample: "WORKSPACE · 02",
  },
];

const WEIGHTS = [
  { name: "Regular", value: 400, use: "Body, captions, placeholders — anything that isn't a heading or a CTA. The default for long prose." },
  { name: "Medium", value: 500, use: "Inline emphasis inside body copy. Button labels at small sizes. The 'a little louder' step." },
  { name: "Semibold", value: 600, use: "All headings, eyebrows, primary button labels. The system's heaviest weight — there's no bold." },
];

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
      <div
        style={{
          flex: 1,
          minWidth: 0,
          border: "1px solid #ebebeb",
          borderRadius: 8,
          padding: "32px 32px",
          background: "#f7f7f7",
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
      eyebrow="Workspace · 02"
      title={<>Typography.</>}
      caption="One sans family across the whole product. Semibold for headings, medium for actions, regular for body. Six steps from a 60px display down to a 12px eyebrow — tighter tracking up top, looser line-height down below."
      meta={[
        { label: "Family", value: "SF Pro" },
        { label: "Sizes", value: "6" },
        { label: "Weights", value: "3" },
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
      intro="How the system holds together. One family across the whole product. Three weights with one job each. Tracking tightens as the size goes up; line-height loosens as the size goes down. Together those rules keep the type readable at every scale without manual tuning."
    >
      <Section
        title="One family"
        description="SF Pro is the platform default on Apple devices and falls back to system-ui everywhere else. No web font, no FOIT. The benefit: every page renders instantly in a font the reader's OS already has cached."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: "#222", margin: 0, lineHeight: 1.05 }}>
            ABCDEFGHIJKLM
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: "#222", margin: "8px 0 24px", lineHeight: 1.05 }}>
            NOPQRSTUVWXYZ
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 32, color: "#484848", margin: 0, lineHeight: 1.1 }}>
            abcdefghijklmnopqrstuvwxyz
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 32, color: "#484848", margin: "8px 0 0", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
            0123456789 — — ·
          </p>
          <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "24px 0 0", lineHeight: 1.6 }}>
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif
          </p>
        </div>
      </Section>

      <Section
        title="Three weights"
        description="Regular for body. Medium for inline emphasis and small button labels. Semibold for everything that needs to read as a heading or an action. No bold — semibold is the heaviest step the system uses."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 14 }}>
          {WEIGHTS.map((w) => (
            <div key={w.name} style={{ display: "grid", gridTemplateColumns: "180px 80px 1fr", gap: 24, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: w.value, color: "#222", margin: 0 }}>{w.name}</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>weight {w.value}</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.55 }}>{w.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Tracking tightens up high"
        description="Larger type needs less air between letters — at 60px, normal tracking reads loose. The system steps tracking down as the size goes up: 0 at body, -1% at subheading, -1.5% at heading, -2% at display."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { size: 60, ls: "-0.02em", label: "Display · -2%" },
            { size: 32, ls: "-0.015em", label: "Heading · -1.5%" },
            { size: 22, ls: "-0.01em", label: "Subheading · -1%" },
            { size: 16, ls: "0", label: "Body · 0%" },
          ].map((r) => (
            <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "baseline" }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: r.size, fontWeight: 600, letterSpacing: r.ls, color: "#222", margin: 0, lineHeight: 1.05 }}>
                Find your stay
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>{r.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Line-height loosens down low"
        description="Body copy needs vertical room to be readable; headings need to feel compact. The system steps line-height up as the size goes down: 1.05 at display, 1.5 at body and caption."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: "0 0 8px" }}>
              Display · 1.05
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 44, fontWeight: 600, letterSpacing: "-0.02em", color: "#222", margin: 0, lineHeight: 1.05 }}>
              Foundations<br />for the system.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: "0 0 8px" }}>
              Body · 1.5
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#222", margin: 0, lineHeight: 1.5, maxWidth: 560 }}>
              A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water. Walk to the village in eight minutes, or stay on the terrace all day.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "01 · Basics",
  layout: { x: 1330, y: 0, width: 1280, height: 2069, intrinsicSizing: "root-element" },
};

/* ── 02 · Type scale ─────────────────────────────────────────────── */
export const Scale: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Type scale"
      intro="Six steps top to bottom. Each row gives you the live sample, the exact specs, and a one-line note on where it belongs. Notice how weight, tracking, and line-height all change in step with size — no value is independent."
    >
      {SCALE.map((s) => (
        <Section
          key={s.name}
          title={`${s.name} · ${s.px}`}
          description={s.use}
        >
          <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: s.px,
                fontWeight: s.weight,
                letterSpacing: s.letterSpacing,
                lineHeight: s.lineHeight,
                color: "#222",
                margin: 0,
                textTransform: s.name === "Eyebrow" ? "uppercase" : "none",
              }}
            >
              {s.sample}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid #ebebeb",
              }}
            >
              {[
                { label: "Size", value: `${s.px}px` },
                { label: "Weight", value: `${s.weight}` },
                { label: "Line-height", value: `${s.lineHeight}` },
                { label: "Tracking", value: s.letterSpacing === "0" ? "0" : s.letterSpacing },
              ].map((m) => (
                <div key={m.label}>
                  <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                    {m.label}
                  </p>
                  <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}
    </PageShell>
  ),
  name: "02 · Type scale",
  layout: { x: 2660, y: 0, width: 1280, height: 2397, intrinsicSizing: "root-element" },
};

/* ── 03 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <PageShell
      title="In situ"
      intro="The whole scale on one real surface. Count the steps: Eyebrow, Heading, Subheading, Body, Caption — all paired with their canonical ink colour and the spacing that matches them. Nothing here is freehand."
    >
      <Section
        title="A listing detail header"
        description="Read top to bottom — Eyebrow → Heading → Caption → Body. The vertical rhythm is set by the spacing tokens, not by the font's line-height alone."
      >
        <div style={{ background: "#fff", padding: 40, borderRadius: 12, maxWidth: 720 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
            Guest favourite · Italy
          </p>
          <h1 style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: "12px 0 8px", lineHeight: 1.1 }}>
            Coastal stone cottage with sea views
          </h1>
          <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: "0 0 24px" }}>
            Hosted by Lucia R. · Superhost · Cinque Terre, Italy
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#222", margin: 0, lineHeight: 1.5 }}>
            A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water. Walk to the village in eight minutes, or stay on the terrace all day with a glass of Vermentino.
          </p>
        </div>
      </Section>

      <Section
        title="A ListingCard"
        description="The same family at smaller sizes — Subheading + Caption. Notice how the subheading is bold but small (16/semibold) and the caption is the same size but quieter (14/regular)."
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 320, background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #ebebeb" }}>
            <div style={{ height: 220, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
                Cinque Terre, Italy
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: "4px 0 0" }}>
                Stay with Lucia · Superhost
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: "4px 0 12px" }}>
                Jun 8 – 13
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 15, color: "#222", margin: 0 }}>
                <span style={{ fontWeight: 600 }}>$248</span> night
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="An inline form"
        description="Caption (label) + Body (input) + Eyebrow (system hint). Three sizes layered in 12 vertical pixels — the whole scale earning its keep on a 44-pixel-tall input."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, maxWidth: 420 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600, color: "#222", margin: "0 0 6px" }}>
            Destination
          </p>
          <div style={{ width: "100%", height: 48, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
            Lisbon, Portugal
          </div>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0" }}>
            We'll search nearby stays.
          </p>
        </div>
      </Section>
    </PageShell>
  ),
  name: "03 · In situ",
  layout: { x: 3990, y: 0, width: 1280, height: 1565, intrinsicSizing: "root-element" },
};
