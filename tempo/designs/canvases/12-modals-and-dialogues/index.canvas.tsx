import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { Check, X } from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import {
  CanvasCover,
  DarkSheet,
  HavnMark,
  Eyebrow,
  FONT_SANS,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "12 · Modals & Dialogues",
};

export default page;

/* ── Section helper — label-left / content-right ─────────────────── */

function ModalSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "32px 0",
        borderTop: `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 16,
            fontWeight: 600,
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            outline: "none",
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 13,
              color: DARK.inkQuiet,
              margin: "10px 0 0",
              lineHeight: 1.55,
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

/* ── Scrim — the dimmed overlay behind every modal ───────────────── */

function Scrim({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "bottom";
}) {
  return (
    <div
      style={{
        background: "#f7f7f7",
        border: "1px solid #ebebeb",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          padding: align === "bottom" ? "40px 24px 0" : 24,
          borderRadius: 8,
          display: "flex",
          alignItems: align === "bottom" ? "flex-end" : "center",
          justifyContent: "center",
          minHeight: 420,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Modal shells ─────────────────────────────────────────────────── */

function ModalCard({
  children,
  maxWidth = 440,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        width: "100%",
        maxWidth,
        padding: 28,
        fontFamily: FONT_SANS,
      }}
    >
      {children}
    </div>
  );
}

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

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 13"
      slug="modals.svg"
      title="Modals & dialogues."
      description="One scrim, one card, one job. Confirm-style for binary decisions, destructive-style for actions that can't be undone, form-style for capturing input, sheet-style for mobile gestures. All from /pages — these are real Havn modals shown out of context."
    />
  ),
  name: "00 · Cover",
  layout: { x: -63, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => (
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
  ),
  name: "01 · Anatomy",
  layout: { x: 1423, y: 0, width: 1280, height: 1707, intrinsicSizing: "root-element" },
};

/* ── Size chip — coral measurement label ─────────────────────────── */

function SizeChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#FF385C",
        color: "#fff",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 10,
        fontWeight: 600,
        padding: "1px 6px",
        borderRadius: 2,
        lineHeight: 1.3,
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}

/* ── 02 · Sizes ──────────────────────────────────────────────────── */
export const Sizes: TempoStoryboard = {
  render: () => (
    <div className="w-[1280px]">
      <DarkSheet
        index="02"
        title="Sizes"
        caption="Three fixed widths cover almost every modal in Havn; relative (vh-based) heights handle long-form flows. Pick the smallest that fits the content."
      >
        <ModalSection title="Fixed widths" description="Our modals are offered in standard widths (320, 440, 560px) to play well with the 8px grid. Width depends on the depth of controls inside the content area.">
          <div
            style={{
              background: "#f7f7f7",
              border: "1px solid #ebebeb",
              borderRadius: 12,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div>
              <SizeChip>320px · sm</SizeChip>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "0 0 10px" }}>
                Quiet confirmations and tutorial bubbles.
              </p>
              <div
                style={{
                  width: 320,
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                  padding: 20,
                  fontFamily: FONT_SANS,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>Confirm</p>
                  <button aria-label="Close" style={{ background: "transparent", border: "none", color: "#717171", cursor: "pointer", padding: 0 }}>
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>
                <p style={{ fontSize: 13, color: "#717171", margin: "0 0 14px", lineHeight: 1.5 }}>
                  A simpler modal — text only, one input, or a single confirm action.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button size="sm">Got it</Button>
                </div>
              </div>
            </div>

            <div>
              <SizeChip>440px · md</SizeChip>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "0 0 10px" }}>
                The default. Confirmations, multi-step flows, success states.
              </p>
              <div
                style={{
                  width: 440,
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
                  padding: 28,
                  fontFamily: FONT_SANS,
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#222", margin: 0 }}>Cancel this reservation?</h3>
                <p style={{ fontSize: 14, color: "#717171", margin: "8px 0 16px", lineHeight: 1.55 }}>
                  Casa do Mar · Apr 12 – Apr 18. You'll receive a full refund.
                </p>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <Button variant="ghost">Keep trip</Button>
                  <Button variant="destructive">Cancel trip</Button>
                </div>
              </div>
            </div>

            <div>
              <SizeChip>560px · lg</SizeChip>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "0 0 10px" }}>
                Forms with multiple fields — message host, report a listing, edit profile.
              </p>
              <div
                style={{
                  width: 560,
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
                  padding: 28,
                  fontFamily: FONT_SANS,
                }}
              >
                <h3 style={{ fontSize: 22, fontWeight: 600, color: "#222", margin: 0 }}>Report a listing</h3>
                <p style={{ fontSize: 13, color: "#717171", margin: "6px 0 18px", lineHeight: 1.55 }}>
                  Let us know what's wrong. Reports are anonymous and reviewed by the safety team.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <FieldStub label="Issue" value="Inaccurate listing" />
                  <FieldStub label="Severity" value="Medium" />
                </div>
                <FieldStub label="Details" multi value="The photos don't match the property and the address pin is off by about a block." />
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
                  <Button variant="ghost">Cancel</Button>
                  <Button>Submit report</Button>
                </div>
              </div>
            </div>
          </div>
        </ModalSection>

        <ModalSection title="Relative heights" description="For long-form content — multi-step bookings, account settings, host onboarding. Height tracks the viewport so the modal never spills past the fold. Content overflows under the footer with a scrollbar as a visual cue.">
          <div
            style={{
              background: "#f7f7f7",
              border: "1px solid #ebebeb",
              borderRadius: 12,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div>
              <SizeChip>70vh</SizeChip>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "0 0 10px" }}>
                Modal resizes to 70% of viewport height. Used for full booking flows and account settings.
              </p>
              <RelativeModal heightLabel="70vh" rows={6} />
            </div>

            <div>
              <SizeChip>50vh</SizeChip>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "0 0 10px" }}>
                Modal resizes to 50% of viewport. Lighter flows — host onboarding step, photo upload.
              </p>
              <RelativeModal heightLabel="50vh" rows={3} />
            </div>
          </div>
        </ModalSection>
      </DarkSheet>
    </div>
  ),
  name: "02 · Sizes",
  layout: { x: 2660, y: 0, width: 1280, height: 2272, intrinsicSizing: "root-element" },
};

function FieldStub({ label, value, multi }: { label: string; value: string; multi?: boolean }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <p style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, color: "#717171", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
      <div
        style={{
          background: "#fff",
          border: "1px solid #dddddd",
          borderRadius: 10,
          padding: multi ? "10px 12px" : "10px 12px",
          fontFamily: FONT_SANS,
          fontSize: 13.5,
          color: "#222",
          minHeight: multi ? 64 : 36,
          lineHeight: 1.45,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function RelativeModal({ heightLabel, rows }: { heightLabel: string; rows: number }) {
  const cardHeight = heightLabel === "70vh" ? 420 : 300;
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(0,0,0,0.5)",
        borderRadius: 8,
        padding: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: cardHeight + 64,
      }}
    >
      <div
        style={{
          width: 560,
          height: cardHeight,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: FONT_SANS,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #ebebeb" }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: 0 }}>Title</p>
          <button aria-label="Close" style={{ background: "transparent", border: "none", color: "#717171", cursor: "pointer", padding: 0 }}>
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div style={{ flex: 1, padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <ScrollRow />
          <ScrollRow />
          <ScrollRow />
          {rows >= 4 && <ScrollRow />}
          {rows >= 5 && <ScrollRow />}
          {rows >= 6 && <ScrollRow />}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderTop: "1px solid #ebebeb" }}>
          <p style={{ fontSize: 13, color: "#717171", margin: 0 }}>Footer info</p>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm">Action</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f3f3f3" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f3f3f3", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ width: "55%", height: 12, background: "#ebebeb", borderRadius: 6, marginBottom: 6 }} />
        <div style={{ width: "35%", height: 10, background: "#f3f3f3", borderRadius: 5 }} />
      </div>
    </div>
  );
}

/* ── 03 · Havn modals ────────────────────────────────────────────── */
export const HavnModals: TempoStoryboard = {
  render: () => (
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
  ),
  name: "03 · In-app modals",
  layout: { x: 3990, y: 0, width: 1280, height: 2757, intrinsicSizing: "root-element" },
};

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
