import type { ReactNode } from 'react';
import {
  TitleSpread,
  DarkSheet,
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

/* ── Legend — visual conventions ──────────────────────────────────── */

function LegendRow({
  stage,
  title,
  description,
  possibilities,
  graphic,
  first,
}: {
  stage: string;
  title: string;
  description: string;
  possibilities: string[];
  graphic: ReactNode;
  first?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "44px 0",
        borderTop: first ? "none" : `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 320, flexShrink: 0, paddingTop: 8 }}>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
          {stage}
        </p>
        <h3
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: "10px 0 0",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: DARK.inkQuiet, margin: "12px 0 0", lineHeight: 1.55 }}>
          {description}
        </p>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {possibilities.map((p) => (
            <p key={p} style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: DARK.inkQuiet, margin: 0, lineHeight: 1.5 }}>
              · {p}
            </p>
          ))}
        </div>
      </div>
      <div className="h-max flex flex-row justify-start items-end"
        style={{ flex: 1, minWidth: 0, border: "1px solid #ebebeb", borderRadius: 8, padding: 32, background: "#f7f7f7" }}
      >
        {graphic}
      </div>
    </div>
  );
}

export function LegendBoard() {
  return (
    <div className="w-[1280px]">
    <DarkSheet
      index="02"
      title="Legend"
      caption="Every canvas has the same three parts. A cover at the top, labeled sections in the middle, an in-situ example at the end. The examples below are pulled from the Typography canvas."
    >
      <div className="pt-[24px]">
        <LegendRow
          first
          stage="Beginning"
          title="A title spread."
          description="Sets up the canvas. Title, caption, optional meta row."
          possibilities={[
            "Workspace number",
            "Chapter title",
            "One-sentence caption",
            "Meta row (counts, owner)",
          ]}
          graphic={
            <div className="h-[155px] w-[576px]" style={{ maxWidth: 600, overflow: "hidden", borderRadius: 8 }}>
              <div className="h-max" style={{ transform: "scale(0.45)", transformOrigin: "top left", width: 1280 }}>
                <TitleSpread
                  eyebrow="Workspace · 02"
                  title={<>Typography.</>}
                  caption="One sans family across the whole product. Semibold for headings, medium for actions, regular for body."
                  meta={[{ label: "Family", value: "SF Pro" }, { label: "Sizes", value: "6" }, { label: "Weights", value: "3" }]}
                />
              </div>
            </div>
          }
        />

        <LegendRow
          stage="Middle"
          title="Labeled sections."
          description="The body. Each section has a title on the left and the content it's teaching on the right."
          possibilities={[
            "A token ramp or scale",
            "A variant or state showcase",
            "An anatomy diagram",
            "A code or CSS spec",
          ]}
          graphic={
            <div className="justify-start items-center" style={{ width: "100%", display: "flex", gap: 32 }}>
              <div style={{ width: 180, flexShrink: 0 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
                  Text ramp
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>
                  Strongest at the top, faintest at the bottom.
                </p>
              </div>
              <div style={{ flex: 1, background: "#fff", border: "1px solid #ebebeb", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: 0, lineHeight: 1.1 }}>
                  Heading · 32
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#222", margin: 0, lineHeight: 1.5 }}>
                  Body · 16. The default text size.
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>
                  Caption · 14. Metadata and hints.
                </p>
              </div>
            </div>
          }
        />

        <LegendRow
          stage="End"
          title="An in situ."
          description="The last section. Shows the system used on a real surface from the app."
          possibilities={[
            "A real ListingCard or BookingCard",
            "A page-level composition",
            "A before / after",
            "A small interaction demo",
          ]}
          graphic={
            <div style={{ background: "#fff", padding: 28, borderRadius: 8, maxWidth: 500, border: "1px solid #ebebeb" }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Guest favourite · Italy
              </p>
              <h1 style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: "10px 0 6px", lineHeight: 1.15 }}>
                Coastal stone cottage with sea views
              </h1>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "0 0 14px" }}>
                Hosted by Lucia R. · Superhost · Cinque Terre, Italy
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#222", margin: 0, lineHeight: 1.5 }}>
                A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water.
              </p>
            </div>
          }
        />
      </div>

    </DarkSheet>
    </div>
  );
}
