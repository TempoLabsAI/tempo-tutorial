import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { TitleSpread, HavnMark, MonoText, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "05 · Grid",
};

export default page;

/* ── Tokens ──────────────────────────────────────────────────────── */
const SPACING = [
  { name: "xs", token: "1", px: 4, use: "Hairline gaps inside dense rows. Almost invisible — used when two glyphs need a breath." },
  { name: "sm", token: "2", px: 8, use: "Inside badges and small chips. The tightest readable gap between icon and label." },
  { name: "md", token: "3", px: 12, use: "Between buttons in a row. Around icons in dense rows. The everyday small step." },
  { name: "lg", token: "4", px: 16, use: "Card content padding. Between ListingCards in a grid. The most-used step in the system." },
  { name: "xl", token: "5", px: 20, use: "Inside input groups. Less common — sits between the everyday lg and the looser 2xl." },
  { name: "2xl", token: "6", px: 24, use: "Between sections inside a card. Modal padding. The 'comfortable' default." },
  { name: "3xl", token: "8", px: 32, use: "Between full sections on a page. The breathing room between the hero and the grid." },
  { name: "4xl", token: "10", px: 40, use: "Page padding on small layouts. Inside the cover canvas's wide hero." },
  { name: "5xl", token: "14", px: 56, use: "Page padding on the canvas itself. The largest step — only used as a page-level gutter." },
];

const RADII = [
  { name: "sm", token: "rounded-sm", px: 8, use: "Buttons. Tags. Anything pill-adjacent but still rectangular." },
  { name: "md", token: "rounded-lg", px: 12, use: "Inputs. Inline panels. Cards on dense surfaces." },
  { name: "lg", token: "rounded-xl", px: 16, use: "ListingCards. BookingCards. The default for any standalone tile." },
  { name: "xl", token: "rounded-2xl", px: 24, use: "Photo frames inside cards. The hero photo on listing detail." },
  { name: "2xl", token: "rounded-3xl", px: 32, use: "Modal sheets. Big floating surfaces." },
  { name: "pill", token: "rounded-full", px: 999, use: "Filter chips. Avatars. Anything circular or pill-shaped." },
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
      eyebrow="Workspace · 05"
      title={<>Grid.</>}
      caption="The layout layer. Spacing tokens set the 4-px rhythm everything snaps to. Radius tokens round every corner against the same scale. Read together — spacing first, radius second — they describe how the surfaces fit and feel."
      meta={[
        { label: "Spacing steps", value: "9" },
        { label: "Radii", value: "6" },
        { label: "Base", value: "4px" },
        { label: "Most-used", value: "16 · 24" },
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
      intro="The whole layout system is two scales drawn from one base. A 4-pixel unit that every spacing step is a multiple of, and a radius ramp that pairs with each spacing step. Everything on a page snaps to this rhythm — nothing is freehand."
    >
      <Section
        title="The 4-pixel base"
        description="Every spacing and radius step is a multiple of 4. The grid below shows the relationship: each row doubles or near-doubles the previous step, so two adjacent steps always read as distinct."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 8 }}>
            {SPACING.map((s) => (
              <div key={s.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ background: "#FF385C", width: 12, height: s.px, borderRadius: 2 }} />
                <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>{s.px}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "20px 0 0", textAlign: "center", lineHeight: 1.5 }}>
            xs (4) → sm (8) → md (12) → lg (16) → xl (20) → 2xl (24) → 3xl (32) → 4xl (40) → 5xl (56)
          </p>
        </div>
      </Section>

      <Section
        title="The three working steps"
        description="In practice, three steps do 80% of the work — 16, 24, and 32. Use 16 for content inside a card, 24 between elements inside a section, 32 between sections. Reach for the others only when the default feels wrong."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "16 · lg", role: "Inside the tile", note: "Card padding, gap between cards, label↔input spacing." },
            { name: "24 · 2xl", role: "Inside the section", note: "Between sub-sections of the same panel. The 'comfortable' default." },
            { name: "32 · 3xl", role: "Between sections", note: "Hero → grid → footer. Breathing room at the page level." },
          ].map((r) => (
            <div key={r.name} style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #ebebeb" }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#FF385C", margin: 0, fontWeight: 600 }}>{r.name}</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: "8px 0 6px" }}>{r.role}</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>{r.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Spacing meets radius"
        description="The two scales aren't independent — they pair. Pick the padding first, then match the radius. The rule of thumb: outer radius ≈ inner padding. A card with 16px padding rounds at 16; with 24px padding, at 24. Below: the rule shown at three common sizes."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            {
              padding: 12,
              radius: 12,
              radiusToken: "rounded-lg",
              caption: "Inputs and inline panels. The tightest pair that still reads as rounded.",
            },
            {
              padding: 16,
              radius: 16,
              radiusToken: "rounded-xl",
              caption: "The default for ListingCard and BookingCard. The everyday pair.",
            },
            {
              padding: 24,
              radius: 24,
              radiusToken: "rounded-2xl",
              caption: "Larger cards and modal bodies. More breathing room, softer corners.",
            },
          ].map((p) => (
            <div className="gap-[32px] flex flex-row justify-center items-start"
              key={p.padding}
              style={{ gridTemplateColumns: "180px 1fr 1fr", gap: 32, padding: "16px 0", borderBottom: "1px solid #ebebeb" }}
            >
              {/* Demo tile with visible padding gap + matched outer/inner radius */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div className="mr-[100px]"
                  style={{ width: 160, height: 110, background: "#FF385C", borderRadius: p.radius, padding: p.padding, boxSizing: "border-box" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#fff",
                      borderRadius: Math.max(p.radius - p.padding / 2, 2),
                    }}
                  />
                </div>
              </div>

              {/* Left column — padding */}
              <div className="w-full">
                <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                  Padding
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                  {p.padding}px
                </p>
                <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                  p-{p.padding / 4}
                </p>
              </div>

              {/* Right column — radius + plain-English caption */}
              <div className="w-full">
                <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                  Radius
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                  {p.radius}px
                </p>
                <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                  {p.radiusToken}
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "10px 0 0", lineHeight: 1.5 }}>
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
          <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.55, textAlign: "center" }}>
            The coral border is the padding. The white inner shape is what holds your content. Notice how its corner stays smooth because the outer radius and the padding agree.
          </p>
        </div>
      </Section>
    </PageShell>
  ),
  name: "01 · Basics",
  layout: { x: 1330, y: 0, width: 1280, height: 1792, intrinsicSizing: "root-element" },
};

/* ── 02 · Spacing ────────────────────────────────────────────────── */
export const Spacing: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Spacing"
      intro="Nine steps of the 4-pixel scale. Each row is the name, the Tailwind class, the pixel value, a usage note, and a coral bar drawn to scale. Read top to bottom for ascending weight — pick the smallest step that gives you the breathing room you need."
    >
      <Section
        title="The full ramp"
        description="Every spacing token in the system. Notice the gaps in the multipliers — xs to xl step by 4, then 2xl jumps to 24, 3xl to 32, 4xl to 40, 5xl to 56. The system favours bigger gaps as you go up."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
          {SPACING.map((s) => (
            <div
              key={s.name}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 80px 60px 1fr",
                gap: 16,
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #ebebeb",
              }}
            >
              <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>{s.name}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>p-{s.token}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", fontVariantNumeric: "tabular-nums" }}>{s.px}px</span>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ height: 14, background: "#FF385C", borderRadius: 3, width: s.px * 4, maxWidth: 240, flexShrink: 0 }} />
                <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", lineHeight: 1.5 }}>{s.use}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="In practice"
        description="Three working examples — a card with 16px padding, a 24px gap between buttons, a 32px section break. Same three steps the Basics page introduced, here shown at production fidelity."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 32 }}>
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: "0 0 8px" }}>
              16 · inside the tile
            </p>
            <div style={{ background: "#f7f7f7", padding: 16, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Coastal stone cottage</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>Cinque Terre · $248 · 4.97 ★</p>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: "0 0 8px" }}>
              24 · between actions
            </p>
            <div style={{ background: "#f7f7f7", padding: 24, borderRadius: 12, display: "flex", gap: 24 }}>
              <div style={{ background: "#FF385C", color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>Reserve</div>
              <div style={{ background: "#222", color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>Continue</div>
              <div style={{ background: "transparent", color: "#222", padding: "10px 20px", border: "1px solid #ebebeb", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 500 }}>Share</div>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: "0 0 8px" }}>
              32 · between sections
            </p>
            <div style={{ background: "#f7f7f7", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 32 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 600, color: "#222", margin: 0 }}>Where to?</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: 0 }}>Popular near you · Cinque Terre · Lisbon · Marrakech</p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "02 · Spacing",
  layout: { x: 2660, y: 0, width: 1280, height: 1796, intrinsicSizing: "root-element" },
};

/* ── 03 · Radius ─────────────────────────────────────────────────── */
export const Radius: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Radius"
      intro="Six corner-rounding tokens, paired with the spacing scale. Cards round at 16, photos at 24, sheets at 32, pills at 999. Every component the system ships has a token already chosen — these are the values, not a menu."
    >
      <Section
        title="The full ramp"
        description="Each tile is the radius applied to a 100×100 box. Notes describe the canonical use — the place in the product where each radius is the default."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {RADII.map((r) => (
            <div key={r.name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#222", height: 120, borderRadius: r.px }} />
              <div>
                <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>{r.name}</p>
                <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                  {r.token} · {r.px === 999 ? "999px" : r.px + "px"}
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>{r.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Nested radius"
        description={"When a rounded-sm element sits inside another rounded-sm element, the inner radius is the outer radius minus the padding. This keeps the two curves concentric — they read as parallel arcs rather than mismatched corners. The formula: inner = outer − padding."}
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            {
              outer: 24,
              padding: 8,
              inner: 16,
              outerToken: "rounded-2xl",
              innerToken: "rounded-xl",
              note: "A photo inside a small card. Outer card rounds at 24, sits with 8px padding around the photo, so the photo rounds at 16.",
            },
            {
              outer: 16,
              padding: 8,
              inner: 8,
              outerToken: "rounded-xl",
              innerToken: "rounded-sm",
              note: "A button inside a card footer. Card rounds at 16; with 8px padding the button rounds at 8 — Havn's smallest, the default for buttons.",
            },
            {
              outer: 32,
              padding: 16,
              inner: 16,
              outerToken: "rounded-3xl",
              innerToken: "rounded-xl",
              note: "A photo inside a modal sheet. Sheet rounds at 32, 16px padding lifts the photo off the edge, photo rounds at 16.",
            },
          ].map((p) => (
            <div
              key={`${p.outer}-${p.padding}`}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr 1fr",
                gap: 32,
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid #ebebeb",
              }}
            >
              {/* Demo: outer dark box with padding, inner light box with computed radius */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: 160,
                    height: 120,
                    background: "#222",
                    borderRadius: p.outer,
                    padding: p.padding,
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#fff",
                      borderRadius: p.inner,
                    }}
                  />
                </div>
              </div>

              {/* Math column */}
              <div>
                <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                  The math
                </p>
                <p style={{ fontFamily: FONT_MONO, fontSize: 14, color: "#222", margin: "8px 0 0", lineHeight: 1.5 }}>
                  {p.outer}px <span style={{ color: "#717171" }}>− {p.padding}px =</span> <span style={{ fontWeight: 600 }}>{p.inner}px</span>
                </p>
                <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "10px 0 0", lineHeight: 1.6 }}>
                  outer · {p.outerToken}<br />
                  inner · {p.innerToken}
                </p>
              </div>

              {/* In-context note */}
              <div>
                <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                  Where it shows up
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "8px 0 0", lineHeight: 1.55 }}>
                  {p.note}
                </p>
              </div>
            </div>
          ))}

          <div style={{ background: "#f7f7f7", padding: 20, borderRadius: 8, marginTop: 8 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
              Edge cases
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.55 }}>
              When the math would give a number under 4, round down to 4 — anything smaller reads as a hard corner. When the content sits flush against the edge (photos in a ListingCard with no padding), the inner element doesn't round at all; the outer's overflow clip handles it.
            </p>
          </div>
        </div>
      </Section>

    </PageShell>
  ),
  name: "03 · Radius",
  layout: { x: 3990, y: 0, width: 1280, height: 1776, intrinsicSizing: "root-element" },
};

/* ── 04 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <PageShell
      title="In situ"
      intro="The spacing and radius scales applied to a real listing card. Every gap is a token — 16 inside, 24 between sections, 12 between chips. Every corner is a token — 16 on the card, 999 on the chips, 12 on the button."
    >
      <Section
        title="A booking card"
        description="One composition. Count the tokens: 16px card padding (lg), 12px gap between content rows (md), 8px gap inside the chip group (sm), rounded-xl on the card, rounded-full on each chip, rounded-sm on the button."
      >
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 440, background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #ebebeb" }}>
            <div style={{ height: 220, background: "#ddd", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
                <div style={{ background: "rgba(255,255,255,0.95)", color: "#222", padding: "6px 12px", borderRadius: 999, fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600 }}>
                  Superhost
                </div>
              </div>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
                Coastal stone cottage with sea views
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>Cinque Terre · 5 nights · $1,240 total</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                {["Sea view", "Wifi", "Terrace"].map((t) => (
                  <span key={t} style={{ background: "#f7f7f7", padding: "6px 12px", borderRadius: 999, fontFamily: FONT_SANS, fontSize: 12, color: "#222" }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "inline-block", background: "#FF385C", color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>
                  Reserve
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="A listing grid"
        description="The same card multiplied — 24px gap between tiles, 32px page padding around the grid. The rhythm holds top to bottom: nothing here is a one-off value."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { title: "Stone cottage", meta: "Cinque Terre · $248" },
            { title: "Riad rooftop pool", meta: "Marrakech · $195" },
            { title: "Cabin in the pines", meta: "Lake Louise · $312" },
          ].map((c) => (
            <div key={c.title} style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 160, background: "#ddd" }} />
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>{c.title}</p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: 0 }}>{c.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  ),
  name: "04 · In situ",
  layout: { x: 5320, y: 0, width: 1280, height: 1363, intrinsicSizing: "root-element" },
};
