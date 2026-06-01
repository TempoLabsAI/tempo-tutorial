import { FONT_SANS } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './shared';

export function InSituBoard() {
  return (
    <PageShell
      title="In situ"
      intro="The spacing and radius scales applied to a real listing card. Every gap is a token — 16 inside, 24 between sections, 12 between chips. Every corner is a token — 16 on the card, 999 on the chips, 12 on the button."
    >
      <Section
        title="A booking card"
        description="One composition. Count the tokens: 16px card padding (lg), 12px gap between content rows (md), 8px gap inside the chip group (sm), rounded-xl on the card, rounded-full on each chip, rounded on the button."
      >
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 440, background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #ebebeb" }}>
            <div style={{ height: 220, background: "#ddd", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
                <div style={{ background: "rgba(255,255,255,0.95)", color: "#222", padding: "6px 12px", borderRadius: 999, fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600 }}>
                  Superhost
                </div>
              </div>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
                Coastal stone cottage with sea views
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>Cinque Terre · 5 nights · $1,240 total</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                {["Sea view", "Wifi", "Terrace"].map((t) => (
                  <span key={t} style={{ background: "#f7f7f7", padding: "6px 12px", borderRadius: 999, fontFamily: FONT_SANS, fontSize: 12, color: "#222" }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "inline-block", background: "#FF385C", color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>
                  Reserve
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="A listing grid"
        description="The same card multiplied — 24px gap between tiles, 32px page padding around the grid. The rhythm holds top to bottom: nothing here is a one-off value."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { title: "Stone cottage", meta: "Cinque Terre · $248" },
            { title: "Riad rooftop pool", meta: "Marrakech · $195" },
            { title: "Cabin in the pines", meta: "Lake Louise · $312" },
          ].map((c) => (
            <div key={c.title} style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 160, background: "#ddd" }} />
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>{c.title}</p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: 0 }}>{c.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
