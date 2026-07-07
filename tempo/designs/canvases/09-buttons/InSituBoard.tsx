import {
  Search,
  Heart,
  Send,
  Plus,
} from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { HavnMark, FONT_SANS, DARK } from '@/design-system/canvas-chrome';
import { ButtonSection } from './_helpers';

export default function InSituBoard() {
  return (
    <div
      className="w-[1020px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: "72px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
    >
      <HavnMark />

      <h1
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily: FONT_SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: "0 0 16px",
          lineHeight: 1.05,
          outline: "none",
        }}
      >
        In situ
      </h1>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          color: DARK.inkQuiet,
          margin: "0 0 40px",
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      >
        Where each variant lives in the product. Primary on the booking card; ink in empty states; destructive in confirms; ghost as inline cancel.
      </p>

      <ButtonSection
        title="With icon"
        description="Most action buttons in the app pair a lucide icon with the label. The icon sits 8px before the text and matches the label colour."
      >
        <div className="w-[200px]" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="primary"><Search size={16} strokeWidth={2} /> Search</Button>
          <Button variant="outline"><Heart size={16} strokeWidth={2} /> Save</Button>
          <Button variant="ink"><Send size={16} strokeWidth={2} /> Send</Button>
          <Button variant="ghost"><Plus size={16} strokeWidth={2} /> Add guest</Button>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Booking card"
        description="The Reserve action — the most important coral primary button in the app. Pinned to the bottom of the sticky booking card on every listing detail page."
      >
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, width: 320 }}>
          <p style={{ fontSize: 13, color: "#717171", margin: 0, fontFamily: FONT_SANS }}>Apr 12 — Apr 18 · 2 guests</p>
          <p style={{ fontSize: 22, fontWeight: 600, color: "#222", margin: "4px 0 14px", fontFamily: FONT_SANS }}>$1,284 total</p>
          <Button variant="primary">Reserve</Button>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Empty state"
        description="A single ink button under the icon + copy. Sits at the bottom of every empty wishlist, message inbox, and trips list — the way back to action."
      >
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 360, textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>No saved places yet</p>
          <p style={{ fontSize: 13, color: "#717171", margin: "6px 0 16px", fontFamily: FONT_SANS }}>Tap the heart on a listing to save it here.</p>
          <Button variant="ink">Browse stays</Button>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Destructive confirm"
        description="A destructive primary inside a modal, always paired with a ghost or outline-solid cancel. Cancel sits on the left, the destructive action on the right."
      >
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, width: 380 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>Cancel this trip?</p>
          <p style={{ fontSize: 13, color: "#717171", margin: "6px 0 18px", fontFamily: FONT_SANS }}>You'll get a full refund. Your host will be notified right away.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="ghost">Keep trip</Button>
            <Button variant="destructive">Cancel trip</Button>
          </div>
        </div>
      </ButtonSection>
    </div>
  );
}
