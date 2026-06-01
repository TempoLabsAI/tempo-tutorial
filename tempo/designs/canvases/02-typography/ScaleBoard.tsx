import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './shared';

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

export function ScaleBoard() {
  return (
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
  );
}
