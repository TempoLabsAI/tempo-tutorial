import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './_helpers';

/* ── BorderSwatch — a paper card rendered with the token's border colour ── */
function BorderSwatch({
  name,
  value,
  note,
  weight = 1,
  ring,
}: {
  name: string;
  value: string;
  note?: string;
  weight?: number;
  ring?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: "#ffffff",
          height: 120,
          borderRadius: 12,
          border: `${weight}px solid ${value}`,
          boxShadow: ring ? `0 0 0 4px ${value}1A` : undefined,
        }}
      />
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>{value}</p>
        {note && (
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BordersBoard() {
  return (
    <PageShell
      title="Borders"
      intro="Five border tokens. Hairline is the default everywhere — cards, inputs, list rows. Stronger steps appear only when state changes: focus turns the border ink and adds a faint ring; error turns it coral; selected fills the surface. Deep is reserved for decorative dividers."
    >
      <Section
        title="The ramp"
        description="From lightest to strongest. Hairline lives on resting components. Paper deep is one step heavier for decorative use. Ink quiet is the hover state. Ink is focus. Accent is the error border."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          <BorderSwatch name="Hairline" value="#ebebeb" note="The default border. Cards, inputs, table rows." />
          <BorderSwatch name="Paper deep" value="#dddddd" note="Decorative dividers. Slightly heavier than hairline." />
          <BorderSwatch name="Ink quiet" value="#717171" note="Hover state on inputs and outline-solid buttons." />
          <BorderSwatch name="Ink" value="#222222" weight={2} ring note="Focus state. 2px border plus a 6%-black ring." />
          <BorderSwatch name="Accent" value="#FF385C" weight={2} ring note="Error border. 2px coral plus a 10%-coral ring." />
        </div>
      </Section>

      <Section
        title="Default → hover → focus"
        description="The same input rendered in three states. Hairline at rest, Ink quiet on hover, Ink + ring-3 on focus. The border is the entire state signal — nothing else changes."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Rest</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
              Search destinations
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Hover</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "1px solid #717171", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
              Search destinations
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Focus</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "2px solid #222222", boxShadow: "0 0 0 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
              Lis
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Error</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "2px solid #FF385C", boxShadow: "0 0 0 2px rgba(255,56,92,0.10)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
              not-an-email
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="On the page"
        description="A small composition that uses four border tokens at once — Hairline on the card, Hairline on the input, Ink on the focused input, Paper deep on the decorative divider."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>Where to?</p>
            <div style={{ width: "100%", height: 44, borderRadius: 10, border: "2px solid #222222", boxShadow: "0 0 0 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
              Lisbon, Portugal
            </div>
            <div style={{ height: 1, background: "#dddddd", margin: "8px 0" }} />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, height: 44, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
                Jun 8
              </div>
              <div style={{ flex: 1, height: 44, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
                Jun 13
              </div>
            </div>
        </div>
      </Section>
    </PageShell>
  );
}
