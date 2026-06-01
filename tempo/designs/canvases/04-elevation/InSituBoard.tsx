import { FONT_SANS } from '@/design-system/canvas-chrome';
import { PageShell, Section, SHADOW_CARD, SHADOW_CARD_HOVER } from './shared';

const SHADOW_MODAL = "0 24px 80px rgba(0,0,0,0.25)";

export function InSituBoard() {
  return (
    <PageShell
      title="In situ"
      intro="Where the three levels actually live. Card on the listing tiles, card-hover on the lifted tile beside them, modal on the sheet that floats above. Everything else on the page sits flat against the surface — no shadow."
    >
      <Section
        title="card · on a ListingCard"
        description="The default resting state for any tile in the home feed or search results. The shadow holds the tile down against the page warmly — readers should barely notice it, only feel that the tile reads as a 'thing'."
      >
        <div style={{ background: "#f7f7f7", padding: 32, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD }}>
              <div style={{ height: 160, background: "#ddd" }} />
              <div style={{ padding: 16 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Stone cottage</p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Cinque Terre · $248</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="card-hover · the lifted tile"
        description="The same row, with the middle tile hovered. The lift is small (1px) but the shadow change is enough to signal interactivity — and to flag which tile the click will go to in a dense grid."
      >
        <div style={{ background: "#f7f7f7", padding: 32, borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD }}>
            <div style={{ height: 160, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Stone cottage</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Cinque Terre · $248</p>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD_HOVER, transform: "translateY(-1px)" }}>
            <div style={{ height: 160, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Riad with rooftop pool</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Marrakech · $195</p>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: SHADOW_CARD }}>
            <div style={{ height: 160, background: "#ddd" }} />
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>Cabin in the pines</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "4px 0 0" }}>Lake Louise · $312</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="modal · a sheet above the page"
        description="The heaviest level. Pairs with a 50%-black scrim behind so the page reads as fully behind the modal. Used only for things that demand full attention — Reserve, Sign in, confirmation flows."
        bg="rgba(0,0,0,0.5)"
      >
        <div style={{ padding: "32px 16px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 440, background: "#fff", borderRadius: 16, boxShadow: SHADOW_MODAL, padding: 28 }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
              Confirm your booking
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#484848", margin: "8px 0 24px", lineHeight: 1.55 }}>
              Coastal stone cottage · Jun 8 – 13 · 2 guests. Pay $1,240 to reserve.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <div style={{ padding: "10px 16px", fontFamily: FONT_SANS, fontSize: 14, fontWeight: 500, color: "#717171" }}>Cancel</div>
              <div style={{ padding: "10px 16px", background: "#FF385C", color: "#fff", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600 }}>
                Reserve
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
