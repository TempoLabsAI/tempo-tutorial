import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './_helpers';

export default function RadiusBoard() {
  return (
    <PageShell
      title="Radius"
      intro="Six corner-rounding tokens, paired with the spacing scale. Cards round at 16, photos at 24, sheets at 32, pills at 999. Every component the system ships has a token already chosen — these are the values, not a menu."
    >
      <Section
        title="The full ramp"
        description="Each tile is the radius applied to a 100×100 box. Notes describe the canonical use — the place in the product where each radius is the default."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#222", height: 120, borderRadius: 8 }} />
            <div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>sm</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                rounded-sm · {8 + "px"}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>Buttons. Tags. Anything pill-adjacent but still rectangular.</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#222", height: 120, borderRadius: 12 }} />
            <div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>md</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                rounded-lg · {12 + "px"}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>Inputs. Inline panels. Cards on dense surfaces.</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#222", height: 120, borderRadius: 16 }} />
            <div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>lg</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                rounded-xl · {16 + "px"}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>ListingCards. BookingCards. The default for any standalone tile.</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#222", height: 120, borderRadius: 24 }} />
            <div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>xl</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                rounded-2xl · {24 + "px"}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>Photo frames inside cards. The hero photo on listing detail.</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#222", height: 120, borderRadius: 32 }} />
            <div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>2xl</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                rounded-3xl · {32 + "px"}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>Modal sheets. Big floating surfaces.</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#222", height: 120, borderRadius: 999 }} />
            <div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>pill</p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
                rounded-full · {"999px"}
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>Filter chips. Avatars. Anything circular or pill-shaped.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Nested radius"
        description={"When a rounded-sm element sits inside another rounded-sm element, the inner radius is the outer radius minus the padding. This keeps the two curves concentric — they read as parallel arcs rather than mismatched corners. The formula: inner = outer − padding."}
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 24 }}>
          <div
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
                  borderRadius: 24,
                  padding: 8,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: 16,
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
                24px <span style={{ color: "#717171" }}>− 8px =</span> <span style={{ fontWeight: 600 }}>16px</span>
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "10px 0 0", lineHeight: 1.6 }}>
                outer · rounded-2xl<br />
                inner · rounded-xl
              </p>
            </div>

            {/* In-context note */}
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                Where it shows up
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "8px 0 0", lineHeight: 1.55 }}>
                A photo inside a small card. Outer card rounds at 24, sits with 8px padding around the photo, so the photo rounds at 16.
              </p>
            </div>
          </div>
          <div
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
                  borderRadius: 16,
                  padding: 8,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: 8,
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
                16px <span style={{ color: "#717171" }}>− 8px =</span> <span style={{ fontWeight: 600 }}>8px</span>
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "10px 0 0", lineHeight: 1.6 }}>
                outer · rounded-xl<br />
                inner · rounded-sm
              </p>
            </div>

            {/* In-context note */}
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                Where it shows up
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "8px 0 0", lineHeight: 1.55 }}>
                A button inside a card footer. Card rounds at 16; with 8px padding the button rounds at 8 — Havn's smallest, the default for buttons.
              </p>
            </div>
          </div>
          <div
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
                  borderRadius: 32,
                  padding: 16,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: 16,
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
                32px <span style={{ color: "#717171" }}>− 16px =</span> <span style={{ fontWeight: 600 }}>16px</span>
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "10px 0 0", lineHeight: 1.6 }}>
                outer · rounded-3xl<br />
                inner · rounded-xl
              </p>
            </div>

            {/* In-context note */}
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
                Where it shows up
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "8px 0 0", lineHeight: 1.55 }}>
                A photo inside a modal sheet. Sheet rounds at 32, 16px padding lifts the photo off the edge, photo rounds at 16.
              </p>
            </div>
          </div>

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
  );
}
