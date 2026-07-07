import { X } from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { DarkSheet, FONT_SANS } from '@/design-system/canvas-chrome';
import { ModalSection } from './_helpers';

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

export default function SizesBoard() {
  return (
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
  );
}
