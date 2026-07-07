import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './_helpers';

export default function BasicsBoard() {
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 4, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>4</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 8, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>8</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 12, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>12</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 16, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>16</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 20, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>20</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 24, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>24</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 32, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>32</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 40, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>40</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FF385C", width: 12, height: 56, borderRadius: 2 }} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>56</p>
            </div>
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
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #ebebeb" }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#FF385C", margin: 0, fontWeight: 600 }}>16 · lg</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: "8px 0 6px" }}>Inside the tile</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>Card padding, gap between cards, label↔input spacing.</p>
          </div>
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #ebebeb" }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#FF385C", margin: 0, fontWeight: 600 }}>24 · 2xl</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: "8px 0 6px" }}>Inside the section</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>Between sub-sections of the same panel. The 'comfortable' default.</p>
          </div>
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #ebebeb" }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#FF385C", margin: 0, fontWeight: 600 }}>32 · 3xl</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: "8px 0 6px" }}>Between sections</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>Hero → grid → footer. Breathing room at the page level.</p>
          </div>
        </div>
      </Section>

      <Section
        title="Spacing meets radius"
        description="The two scales aren't independent — they pair. Pick the padding first, then match the radius. The rule of thumb: outer radius ≈ inner padding. A card with 16px padding rounds at 16; with 24px padding, at 24. Below: the rule shown at three common sizes."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="gap-[32px] flex flex-row justify-center items-start"
            style={{ gridTemplateColumns: "180px 1fr 1fr", gap: 32, padding: "16px 0", borderBottom: "1px solid #ebebeb" }}
          >
            {/* Demo tile with visible padding gap + matched outer/inner radius */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div className="mr-[100px]"
                style={{ width: 160, height: 110, background: "#FF385C", borderRadius: 12, padding: 12, boxSizing: "border-box" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: Math.max(12 - 12 / 2, 2),
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
                12px
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                p-{12 / 4}
              </p>
            </div>

            {/* Right column — radius + plain-English caption */}
            <div className="w-full">
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                Radius
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                12px
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                rounded-lg
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "10px 0 0", lineHeight: 1.5 }}>
                Inputs and inline panels. The tightest pair that still reads as rounded.
              </p>
            </div>
          </div>
          <div className="gap-[32px] flex flex-row justify-center items-start"
            style={{ gridTemplateColumns: "180px 1fr 1fr", gap: 32, padding: "16px 0", borderBottom: "1px solid #ebebeb" }}
          >
            {/* Demo tile with visible padding gap + matched outer/inner radius */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div className="mr-[100px]"
                style={{ width: 160, height: 110, background: "#FF385C", borderRadius: 16, padding: 16, boxSizing: "border-box" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: Math.max(16 - 16 / 2, 2),
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
                16px
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                p-{16 / 4}
              </p>
            </div>

            {/* Right column — radius + plain-English caption */}
            <div className="w-full">
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                Radius
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                16px
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                rounded-xl
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "10px 0 0", lineHeight: 1.5 }}>
                The default for ListingCard and BookingCard. The everyday pair.
              </p>
            </div>
          </div>
          <div className="gap-[32px] flex flex-row justify-center items-start"
            style={{ gridTemplateColumns: "180px 1fr 1fr", gap: 32, padding: "16px 0", borderBottom: "1px solid #ebebeb" }}
          >
            {/* Demo tile with visible padding gap + matched outer/inner radius */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div className="mr-[100px]"
                style={{ width: 160, height: 110, background: "#FF385C", borderRadius: 24, padding: 24, boxSizing: "border-box" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: Math.max(24 - 24 / 2, 2),
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
                24px
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                p-{24 / 4}
              </p>
            </div>

            {/* Right column — radius + plain-English caption */}
            <div className="w-full">
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                Radius
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: "6px 0 0", letterSpacing: "-0.01em" }}>
                24px
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "4px 0 0" }}>
                rounded-2xl
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "10px 0 0", lineHeight: 1.5 }}>
                Larger cards and modal bodies. More breathing room, softer corners.
              </p>
            </div>
          </div>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.55, textAlign: "center" }}>
            The coral border is the padding. The white inner shape is what holds your content. Notice how its corner stays smooth because the outer radius and the padding agree.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
