import { Button } from '@/design-system/primitives/Button';
import { DarkSheet, FONT_SANS } from '@/design-system/canvas-chrome';
import { ModalSection, Scrim, ModalCard } from './_helpers';

function BottomSheet({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        boxShadow: "0 -16px 40px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: 560,
        padding: 24,
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          width: 48,
          height: 4,
          borderRadius: 999,
          background: "#dddddd",
          margin: "0 auto 16px",
        }}
      />
      {children}
    </div>
  );
}

export default function AnatomyBoard() {
  return (
    <div className="w-[1280px]">
      <DarkSheet
        index="01"
        title="Anatomy"
        caption="Every Havn modal shares the same three pieces — scrim, card, content. Bottom-sheet modals swap the centered card for a top-rounded sheet anchored to the bottom edge."
      >
        <ModalSection title="Scrim" description="Black 50% overlay with a 2px backdrop blur. Click anywhere outside the card to dismiss (except mid-flow on multi-step modals).">
          <Scrim>
            <div style={{ background: "#fff", padding: 18, borderRadius: 12, color: "#222", fontSize: 13 }}>
              ⟵ click outside to close
            </div>
          </Scrim>
        </ModalSection>

        <ModalSection title="Card" description="White surface, 16px radius, soft modal shadow. Max-width clamps so the card never spans more than a comfortable reading column.">
          <Scrim>
            <ModalCard>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "#222", margin: 0 }}>Card title</h3>
              <p style={{ fontSize: 14, color: "#717171", margin: "8px 0 20px", lineHeight: 1.55 }}>
                Body text describes what the modal is asking and any consequence. One paragraph, ideally.
              </p>
              <Button>Primary action</Button>
            </ModalCard>
          </Scrim>
        </ModalSection>

        <ModalSection title="Sheet" description="On phone widths every centered modal collapses to a bottom sheet — top-rounded, anchored to the bottom edge, with a drag handle.">
          <Scrim align="bottom">
            <BottomSheet>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#222", margin: 0 }}>Sheet title</h3>
              <p style={{ fontSize: 14, color: "#717171", margin: "6px 0 18px", lineHeight: 1.55 }}>
                Same content, mobile-first surface.
              </p>
              <Button className="w-full">Action</Button>
            </BottomSheet>
          </Scrim>
        </ModalSection>
      </DarkSheet>
    </div>
  );
}
