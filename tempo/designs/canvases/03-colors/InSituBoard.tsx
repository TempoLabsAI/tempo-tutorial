import { FONT_SANS } from '@/design-system/canvas-chrome';
import { Button } from '@/design-system/primitives/Button';
import { Badge } from '@/design-system/primitives/Badge';
import { PageShell, Section } from './_helpers';

export default function InSituBoard() {
  return (
    <PageShell
      title="In situ"
      intro="The full system on a single card — the place where every token earns its keep. Surface holds the panel, Text carries the title and host name, Accent fires the Reserve button, System states flag the status."
    >
      <Section
        title="A booking card"
        description="One real composition. Try counting the tokens: four surfaces, three text steps, one accent button, two state badges. Nothing else is invented."
      >
        <div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
          <div style={{ width: 420, background: "#fff", border: "1px solid #ebebeb", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ height: 220, background: "#dddddd", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
                <Badge variant="gold">Superhost</Badge>
                <Badge variant="accent">Guest favourite</Badge>
              </div>
            </div>
            <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0 }}>
                Coastal stone cottage with sea views
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#484848", margin: 0 }}>Cinque Terre, Italy</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>Hosted by Lucia R.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 15, color: "#222", margin: 0 }}>
                  <span style={{ fontWeight: 600 }}>$248</span>{" "}
                  <span style={{ color: "#717171" }}>· night</span>
                </p>
                <Button variant="primary">Reserve</Button>
              </div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#bbbbbb", margin: "12px 0 0" }}>
                Disabled · Ink faint
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
