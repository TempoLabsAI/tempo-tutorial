import { FONT_SANS } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './_helpers';

export default function InSituBoard() {
  return (
    <PageShell
      title="In situ"
      intro="The whole scale on one real surface. Count the steps: Eyebrow, Heading, Subheading, Body, Caption — all paired with their canonical ink colour and the spacing that matches them. Nothing here is freehand."
    >
      <Section
        title="A listing detail header"
        description="Read top to bottom — Eyebrow → Heading → Caption → Body. The vertical rhythm is set by the spacing tokens, not by the font's line-height alone."
      >
        <div style={{ background: "#fff", padding: 40, borderRadius: 12, maxWidth: 720 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
            Guest favourite · Italy
          </p>
          <h1 style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: "12px 0 8px", lineHeight: 1.1 }}>
            Coastal stone cottage with sea views
          </h1>
          <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: "0 0 24px" }}>
            Hosted by Lucia R. · Superhost · Cinque Terre, Italy
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#222", margin: 0, lineHeight: 1.5 }}>
            A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water. Walk to the village in eight minutes, or stay on the terrace all day with a glass of Vermentino.
          </p>
        </div>
      </Section>

      <Section
        title="A ListingCard"
        description="The same family at smaller sizes — Subheading + Caption. Notice how the subheading is bold but small (16/semibold) and the caption is the same size but quieter (14/regular)."
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
          <div style={{ width: 320, background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #ebebeb" }}>
            <div style={{ height: 220, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
                Cinque Terre, Italy
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: "4px 0 0" }}>
                Stay with Lucia · Superhost
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: "4px 0 12px" }}>
                Jun 8 – 13
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 15, color: "#222", margin: 0 }}>
                <span style={{ fontWeight: 600 }}>$248</span> night
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="An inline form"
        description="Caption (label) + Body (input) + Eyebrow (system hint). Three sizes layered in 12 vertical pixels — the whole scale earning its keep on a 44-pixel-tall input."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, maxWidth: 420 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600, color: "#222", margin: "0 0 6px" }}>
            Destination
          </p>
          <div style={{ width: "100%", height: 48, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
            Lisbon, Portugal
          </div>
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0" }}>
            We'll search nearby stays.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
