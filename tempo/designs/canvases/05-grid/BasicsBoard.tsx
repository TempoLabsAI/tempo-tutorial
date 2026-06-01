import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section, SPACING } from './shared';

export function BasicsBoard() {
  return (
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
  );
}
