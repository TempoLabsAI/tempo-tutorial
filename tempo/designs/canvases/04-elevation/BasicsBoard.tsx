import { MonoText, FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section, SHADOW_CARD, SHADOW_CARD_HOVER } from './_helpers';

export default function BasicsBoard() {
  return (
    <PageShell
      title="Basics"
      intro="How the shadow-sm system is built. The four CSS parameters every shadow-sm draws from, and the one interactive moment the system uses — the card → hover lift. The Levels page that follows breaks each token into its layers, and the In situ page shows them in real product context."
    >
      <Section
        title="The four parameters"
        description="What each value in the CSS string does. Y-offset places the shadow-sm below the surface (we never use X-offset). Blur softens it. Opacity controls weight. There's no spread — Havn shadows always start at the box edge."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Y-offset</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>2 → 24px</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>How far below the box the shadow drops. Always positive, never sideways.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Blur</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>4 → 80px</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>How soft the shadow is. Higher = wider, more diffuse.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ebebeb" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Spread</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>0</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>Never used — the shadow always starts at the box edge.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "120px 80px 1fr", gap: 16, alignItems: "center", padding: "10px 0" }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222" }}>Opacity</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171" }}>6% → 25%</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171" }}>Black at varying opacity. Resting cards stay quiet; modals go heaviest.</span>
          </div>
        </div>
      </Section>

      <Section
        title="Resting → Hover"
        description="The card → card-hover transition is the single interactive use of elevation in the system. A 1px upward translate plus the heavier shadow, animated over 220ms ease-out. Quiet on purpose — a lift, not a jump."
      >
        <div style={{ background: "#f7f7f7", padding: 40, borderRadius: 12, display: "flex", gap: 40, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{ width: 260, height: 200, background: "#fff", borderRadius: 16, boxShadow: SHADOW_CARD }} />
            <MonoText size={11} color="#717171">Rest · shadow-card</MonoText>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#FF385C" }}>→</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{ width: 260, height: 200, background: "#fff", borderRadius: 16, boxShadow: SHADOW_CARD_HOVER, transform: "translateY(-1px)" }} />
            <MonoText size={11} color="#717171">Hover · shadow-card-hover + -1px Y</MonoText>
          </div>
        </div>
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, marginTop: 16 }}>
          <pre style={{ fontFamily: FONT_MONO, fontSize: 12, color: "#222", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
{`transition: box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            transform   220ms cubic-bezier(0.2, 0.8, 0.2, 1);

/* Resting */
box-shadow: ${SHADOW_CARD};
transform:  translateY(0);

/* Hover */
box-shadow: ${SHADOW_CARD_HOVER};
transform:  translateY(-1px);`}
          </pre>
        </div>
      </Section>
    </PageShell>
  );
}
