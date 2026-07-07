import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './_helpers';

export default function BasicsBoard() {
  return (
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
          <div style={{ display: "grid", gridTemplateColumns: "180px 80px 1fr", gap: 24, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 400, color: "#222", margin: 0 }}>Regular</p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>weight {400}</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.55 }}>Body, captions, placeholders — anything that isn't a heading or a CTA. The default for long prose.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "180px 80px 1fr", gap: 24, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 500, color: "#222", margin: 0 }}>Medium</p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>weight {500}</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.55 }}>Inline emphasis inside body copy. Button labels at small sizes. The 'a little louder' step.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "180px 80px 1fr", gap: 24, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: 0 }}>Semibold</p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>weight {600}</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.55 }}>All headings, eyebrows, primary button labels. The system's heaviest weight — there's no bold.</p>
          </div>
        </div>
      </Section>

      <Section
        title="Tracking tightens up high"
        description="Larger type needs less air between letters — at 60px, normal tracking reads loose. The system steps tracking down as the size goes up: 0 at body, -1% at subheading, -1.5% at heading, -2% at display."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "baseline" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 60, fontWeight: 600, letterSpacing: "-0.02em", color: "#222", margin: 0, lineHeight: 1.05 }}>
              Find your stay
            </p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>Display · -2%</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "baseline" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: 0, lineHeight: 1.05 }}>
              Find your stay
            </p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>Heading · -1.5%</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "baseline" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: "#222", margin: 0, lineHeight: 1.05 }}>
              Find your stay
            </p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>Subheading · -1%</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "baseline" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, letterSpacing: "0", color: "#222", margin: 0, lineHeight: 1.05 }}>
              Find your stay
            </p>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0 }}>Body · 0%</p>
          </div>
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
  );
}
