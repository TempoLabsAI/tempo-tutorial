import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './shared';

const RADII = [
  { name: "sm", token: "rounded", px: 8, use: "Buttons. Tags. Anything pill-adjacent but still rectangular." },
  { name: "md", token: "rounded-lg", px: 12, use: "Inputs. Inline panels. Cards on dense surfaces." },
  { name: "lg", token: "rounded-xl", px: 16, use: "ListingCards. BookingCards. The default for any standalone tile." },
  { name: "xl", token: "rounded-2xl", px: 24, use: "Photo frames inside cards. The hero photo on listing detail." },
  { name: "2xl", token: "rounded-3xl", px: 32, use: "Modal sheets. Big floating surfaces." },
  { name: "pill", token: "rounded-full", px: 999, use: "Filter chips. Avatars. Anything circular or pill-shaped." },
];

export function RadiusBoard() {
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
        description={"When a rounded element sits inside another rounded element, the inner radius is the outer radius minus the padding. This keeps the two curves concentric — they read as parallel arcs rather than mismatched corners. The formula: inner = outer − padding."}
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
              innerToken: "rounded",
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
  );
}
