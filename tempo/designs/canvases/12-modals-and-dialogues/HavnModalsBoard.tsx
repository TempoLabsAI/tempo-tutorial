import { Check } from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { DarkSheet, FONT_SANS } from '@/design-system/canvas-chrome';
import { ModalSection, Scrim, ModalCard } from './_helpers';

function ReasonRow({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #ebebeb",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          border: `1px solid ${selected ? "#222" : "#dddddd"}`,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {selected && (
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#222" }} />
        )}
      </span>
      <span style={{ fontSize: 14, color: "#222", fontFamily: FONT_SANS }}>{label}</span>
    </label>
  );
}

export default function HavnModalsBoard() {
  return (
    <div className="w-[1280px]">
      <DarkSheet
        index="03"
        title="In-app modals"
        caption="The three real Havn modals — Create wishlist, Cancel reservation (multi-step), and the Booking confirmation. Each is rendered with the exact markup that ships in /pages."
      >
        <ModalSection title="Create wishlist" description="From WishlistsPage — opens when a guest taps + on the wishlists header. Single input, primary save, ghost cancel. Cmd-Enter confirms.">
          <Scrim>
            <ModalCard maxWidth={400}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "#222", margin: "0 0 16px" }}>
                Create a new wishlist
              </h3>
              <input
                readOnly
                value="Lisbon, 2026"
                style={{
                  width: "100%",
                  height: 48,
                  background: "#fff",
                  border: "1px solid #222",
                  borderRadius: 8,
                  padding: "0 16px",
                  fontSize: 15,
                  color: "#222",
                  outline: "none",
                  marginBottom: 16,
                  fontFamily: FONT_SANS,
                }}
              />
              <Button className="w-full mb-2">Create</Button>
              <Button variant="ghost" className="w-full">Cancel</Button>
            </ModalCard>
          </Scrim>
        </ModalSection>

        <ModalSection title="Cancel reservation · step 1" description="From TripDetailPage. Destructive confirm with a green refund total inside a warm paper panel — surfaces the upside before the guest commits.">
          <Scrim>
            <ModalCard>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: "#222", margin: "0 0 4px" }}>
                Cancel this reservation?
              </h3>
              <p style={{ fontSize: 13, color: "#717171", margin: "0 0 20px" }}>
                Casa do Mar · Apr 12 – Apr 18
              </p>
              <div
                style={{
                  background: "#f7f7f7",
                  borderRadius: 12,
                  padding: "20px 16px",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                <p style={{ fontSize: 12, color: "#717171", margin: "0 0 4px" }}>Your refund</p>
                <p style={{ fontSize: 32, fontWeight: 600, color: "#008a05", letterSpacing: "-0.02em", margin: 0 }}>
                  $1,284
                </p>
                <p style={{ fontSize: 12, color: "#717171", margin: "4px 0 0" }}>Full refund · cancelled before check-in</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="ghost" className="flex-1">Keep trip</Button>
                <Button variant="destructive" className="flex-1">Cancel trip</Button>
              </div>
            </ModalCard>
          </Scrim>
        </ModalSection>

        <ModalSection title="Cancel reservation · step 2 (reason)" description="Step 2 captures an optional reason as a radio list. Light-touch — none of the options block submission.">
          <Scrim>
            <ModalCard>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "#222", margin: "0 0 16px" }}>
                Why are you cancelling?
              </h3>
              <ReasonRow label="My plans changed" selected />
              <ReasonRow label="I booked the wrong dates" />
              <ReasonRow label="I found a different stay" />
              <ReasonRow label="Something came up at home" />
              <ReasonRow label="Other" />
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <Button variant="ghost" className="flex-1">Back</Button>
                <Button className="flex-1">Confirm cancellation</Button>
              </div>
            </ModalCard>
          </Scrim>
        </ModalSection>

        <ModalSection title="Cancel reservation · step 3 (success)" description="A quiet success state — green check, refund confirmation, single dismiss button.">
          <Scrim>
            <ModalCard>
              <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: "#008a05",
                    color: "#fff",
                    marginBottom: 16,
                  }}
                >
                  <Check size={24} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: "#222", margin: 0 }}>Trip cancelled</h3>
                <p style={{ fontSize: 13, color: "#717171", margin: "8px 0 20px", lineHeight: 1.55 }}>
                  Your $1,284 refund is on its way. It usually arrives in 5–10 business days.
                </p>
                <Button className="w-full">Done</Button>
              </div>
            </ModalCard>
          </Scrim>
        </ModalSection>

        <ModalSection title="Booking confirmation" description="From ListingDetailPage. Celebration tone — emoji, big title, the confirmation code. Single dismiss button, no destructive option.">
          <Scrim>
            <ModalCard>
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontSize: 24, fontWeight: 600, color: "#222", margin: "0 0 8px" }}>Trip booked!</h3>
                <p style={{ fontSize: 14, color: "#717171", margin: 0 }}>
                  Confirmation code:{" "}
                  <span style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "#222" }}>
                    HMXK9W
                  </span>
                </p>
                <Button className="mt-6 w-full">Done</Button>
              </div>
            </ModalCard>
          </Scrim>
        </ModalSection>
      </DarkSheet>
    </div>
  );
}
