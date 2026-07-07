import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './_helpers';

export default function ScaleBoard() {
  return (
    <PageShell
      title="Type scale"
      intro="Six steps top to bottom. Each row gives you the live sample, the exact specs, and a one-line note on where it belongs. Notice how weight, tracking, and line-height all change in step with size — no value is independent."
    >
      <Section
        title={`Display · 60`}
        description="The largest type in the system. Used once per page — TitleSpread covers, marketing heroes. Tight line-height and -2% tracking so big letters read as one shape."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 60,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#222",
              margin: 0,
              textTransform: "none",
            }}
          >
            Foundations for the system.
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
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Size
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`60px`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Weight
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`600`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Line-height
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`1.05`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Tracking
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                -0.02em
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={`Heading · 32`}
        description="The H1 on every internal page. Page titles, modal titles, the listing's name at the top of detail view."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
              color: "#222",
              margin: 0,
              textTransform: "none",
            }}
          >
            Coastal stone cottage with sea views
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
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Size
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`32px`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Weight
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`600`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Line-height
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`1.1`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Tracking
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                -0.015em
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={`Subheading · 22`}
        description="Section headers inside a page. The label above a row of cards, the title of a modal section."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              color: "#222",
              margin: 0,
              textTransform: "none",
            }}
          >
            Where to next?
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
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Size
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`22px`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Weight
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`600`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Line-height
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`1.2`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Tracking
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                -0.01em
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={`Body · 16`}
        description="Paragraphs and longer prose. The default text size in cards and descriptions. Regular weight, looser line-height."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 16,
              fontWeight: 400,
              letterSpacing: "0",
              lineHeight: 1.5,
              color: "#222",
              margin: 0,
              textTransform: "none",
            }}
          >
            A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water.
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
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Size
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`16px`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Weight
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`400`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Line-height
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`1.5`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Tracking
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                0
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={`Caption · 14`}
        description="Metadata and supporting copy. Host names, prices, dates. Paired with Ink quiet to recede beneath the body it supports."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0",
              lineHeight: 1.5,
              color: "#222",
              margin: 0,
              textTransform: "none",
            }}
          >
            Hosted by Lucia R. · Superhost · Cinque Terre, Italy
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
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Size
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`14px`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Weight
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`400`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Line-height
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`1.5`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Tracking
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                0
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={`Eyebrow · 12`}
        description="All-caps category labels. The tiny line above a section heading. Always tracked out 8% so the caps read evenly."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              color: "#222",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            WORKSPACE · 02
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
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Size
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`12px`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Weight
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`600`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Line-height
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                {`1.4`}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Tracking
              </p>
              <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#222", margin: "6px 0 0" }}>
                0.08em
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
