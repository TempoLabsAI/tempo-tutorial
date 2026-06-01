import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section, SPACING } from './shared';

export function SpacingBoard() {
  return (
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
  );
}
