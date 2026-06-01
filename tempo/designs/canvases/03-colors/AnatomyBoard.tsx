import { MonoText, FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { Button } from '@/design-system/primitives/Button';
import { PageShell, Section } from './shared';

/* ── MiniSwatch — compact tile used in the full-palette overview ───── */
function MiniSwatch({
  name,
  value,
  border,
  textColor = "#222",
}: {
  name: string;
  value: string;
  border?: boolean;
  textColor?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          background: value,
          height: 72,
          borderRadius: 10,
          border: border ? "1px solid #ebebeb" : "none",
        }}
      />
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600, color: textColor, margin: 0, lineHeight: 1.2 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: "2px 0 0" }}>{value}</p>
      </div>
    </div>
  );
}

/* ── PaletteGroup — a labeled row of MiniSwatches in the full-palette view ── */
function PaletteGroup({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
          {label}
        </p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>
          {count} tokens
        </p>
      </div>
      {children}
    </div>
  );
}

export function AnatomyBoard() {
  return (
    <PageShell
      title="Anatomy"
      intro="Three roles. Surface holds the page, Text carries the words, Accent fires the one most-important action — and 'one' is the rule, captured in Restraint below. Every other colour is either a step within those roles or a system-state flag layered on top."
    >
      <Section
        title="Three roles"
        description="The minimum vocabulary for a page. Pick a surface, set the ink, place an accent — you have a button, a card, a screen."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
              Surface
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 600, color: "#222", margin: 0 }}>Paper</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>
              The page itself. Mostly white. Goes warmer to lift sections and deeper for chrome.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
              Text
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 600, color: "#222", margin: 0 }}>Words on the page</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>
              Four steps from the strongest body text down to a faint disabled state.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
              Accent
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 600, color: "#FF385C", margin: 0 }}>Coral, used sparingly</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>
              One Reserve button per page. The single loudest mark on the screen.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Restraint"
        description="The rule that defines the Accent role. One coral per screen — Reserve is the canonical use. Everything else picks Ink or Outline so the accent stays the loudest mark on the page."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary">Reserve</Button>
          <Button variant="ink">Continue</Button>
          <Button variant="outline">Share</Button>
          <Button variant="ghost">Skip</Button>
          <MonoText size={11} color="#717171">↑ one primary · the rest are quieter</MonoText>
        </div>
      </Section>

      <Section
        title="Hierarchy by contrast"
        description="The text ramp shown at the sizes each step is paired with. Strongest on top, faintest on the bottom. The system never gets lighter than #bbbbbb on white — under that, the legibility falls off."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "#fff", padding: 24, borderRadius: 12 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222222", margin: 0 }}>
            Primary · body & headings
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 500, color: "#484848", margin: 0 }}>
            Soft · supporting copy
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#717171", margin: 0 }}>
            Quiet · captions, hints, metadata
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#bbbbbb", margin: 0 }}>
            Faint · disabled state only
          </p>
        </div>
      </Section>

      <Section
        title="The full palette"
        description="Every token in the system on one screen. Four groups, eighteen colours. The detail sections that follow zoom in on each — here, you see the whole thing at once."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <PaletteGroup label="Surface" count={4}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Paper" value="#ffffff" border />
              <MiniSwatch name="Paper warm" value="#f7f7f7" />
              <MiniSwatch name="Paper deep" value="#dddddd" />
              <MiniSwatch name="Hairline" value="#ebebeb" />
            </div>
          </PaletteGroup>

          <PaletteGroup label="Text" count={4}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Primary" value="#222222" />
              <MiniSwatch name="Soft" value="#484848" />
              <MiniSwatch name="Quiet" value="#717171" />
              <MiniSwatch name="Faint" value="#bbbbbb" />
            </div>
          </PaletteGroup>

          <PaletteGroup label="Accent" count={2}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Accent" value="#FF385C" />
              <MiniSwatch name="Accent hover" value="#E31C5F" />
            </div>
            <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "12px 0 0", lineHeight: 1.55, maxWidth: 640 }}>
              Used sparingly — one coral per screen, only on the most important action (Reserve, Book, Send). The hover step is ~6% darker. Holds its weight on every surface, including imagery.
            </p>
          </PaletteGroup>

          <PaletteGroup label="System states · bg + fg pairs" count={8}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Success bg" value="#e8f5e9" />
              <MiniSwatch name="Warning bg" value="#fff3e0" />
              <MiniSwatch name="Error bg" value="#ffebee" />
              <MiniSwatch name="Gold bg" value="#fef7e0" />
              <MiniSwatch name="Success fg" value="#1b5e20" />
              <MiniSwatch name="Warning fg" value="#e65100" />
              <MiniSwatch name="Error fg" value="#b71c1c" />
              <MiniSwatch name="Gold fg" value="#7d5a00" />
            </div>
          </PaletteGroup>
        </div>
      </Section>
    </PageShell>
  );
}
