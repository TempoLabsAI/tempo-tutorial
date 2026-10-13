import type { CSSProperties } from "react";
import { Kbd } from "./_ui";
import cardWave from "./assets/card-wave.png";

/**
 * The Plan strip's "context" graphic, mirroring the real Design tab: a
 * rendered LANDSCAPE design on the canvas with one element (the Subscribe
 * button) SELECTED, the landing-page cursor right-clicking it (cursor sits ON
 * TOP of the menu's corner, the menu never covers it), and a floating chat
 * overlapping the card with the button already attached as a context chip.
 *
 * - The selected design is deliberately NOT a Tempo-style UI — it's a bright,
 *   editorial card set in Hedvig Letters Serif.
 * - Selection overlay = real canvas color #0091FF (DEFAULT_OVERLAY_COLOR) at
 *   2.5px with 8px white square handles — a rectangular box (not rounded).
 * - The menu reuses the exact DS dropdown classes (`bg-surface-container-high`,
 *   `shadow-dropdown`, real `dropdownMenuItemVariants` items + separator); it's
 *   a static surface because the live `@base-ui` menu only portals on a real
 *   pointer event and won't paint in the projection.
 * - No outer frame — the pieces float directly on the strip surface.
 */
const BLUE = "#0091FF";
const HEDVIG = "'Hedvig Letters Serif', Georgia, serif";

/** Real DS dropdown classes — `dropdownMenuItemVariants` (default) + separator. */
const ITEM = "flex items-center gap-2 rounded-sm px-2.5 py-2 text-body leading-body text-text-secondary";
const SEP = "my-1 -mx-1.5 h-px bg-menu-divider";

/**
 * The selection metadata badge Tempo's canvas renders just below a selected
 * element — three solid #0091FF pills (size · tag name · layout-kind icon),
 * white 11px monospace, 4px gaps, 4px below the box. Mirrors
 * `modules/element-overlay/render/dimensions.ts`. A flex-row element (the
 * Subscribe button) resolves to the "column" layout-kind glyph (two
 * side-by-side rects).
 */
function SelectionBadge() {
  const pill = "rounded-[3px] text-white";
  return (
    <div
      className="pointer-events-none absolute left-0 top-full z-20 mt-[9px] flex gap-1"
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
    >
      <span className={`${pill} px-1.5 py-0.5 text-[11px] leading-none`} style={{ background: BLUE }}>
        163 × 40
      </span>
      <span className={`${pill} px-1.5 py-0.5 text-[11px] leading-none`} style={{ background: BLUE }}>
        div
      </span>
      <span className={`${pill} flex items-center px-1 py-0.5`} style={{ background: BLUE }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="1.5" y="1.5" width="5.75" height="13" rx="2" stroke="currentColor" />
          <rect x="8.75" y="1.5" width="5.75" height="13" rx="2" stroke="currentColor" />
        </svg>
      </span>
    </div>
  );
}

/** The landing-page arrow cursor (exact `tempo-landing` mouse.svg path). */
function Cursor() {
  return (
    <svg viewBox="0 0 39 40" width="34" height="35" fill="none" aria-hidden className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
      <path
        d="M5.71829 2.87558C5.56251 2.30534 6.44481 1.51223 6.98048 1.74094L32.186 12.5025C32.8912 12.8036 32.803 13.8507 32.0427 14.2041L20.9091 18.8186C20.7141 18.9092 20.5472 19.0592 20.4347 19.245L15.0018 29.5241C14.563 30.2488 13.5326 30.2073 13.3275 29.4566L5.71829 2.87558Z"
        fill="black"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * A bright editorial subscription card in Hedvig Letters Serif — LANDSCAPE
 * (image left, content right). The "Subscribe" button is the selected element.
 */
function MembershipCard() {
  const handle: CSSProperties = { background: "white", border: `1.5px solid ${BLUE}`, borderRadius: "1px" };
  return (
    <div
      className="flex min-h-[193px] w-full rounded-[18px] border-[3px] shadow-[0_14px_34px_rgba(0,0,0,0.2)] bg-[oklch(100%_0_83.713)] h-[223px] border-[rgb(27,_18,_6)]"
      style={{ borderColor: "#1B1206", fontFamily: HEDVIG }}
    >
      <img src={cardWave} alt="" className="w-[150px] shrink-0 self-stretch rounded-l-[15px] object-cover [filter:saturate(152%)]" />
      <div className="flex flex-1 flex-col px-5 py-4">

        <h4 className="mt-2 font-medium leading-[1.04] font-sans text-[17px]" style={{ color: "#1B1206" }}>
          Premium membership.
        </h4>

        <p className="mt-1 font-sans text-[12px] leading-snug" style={{ color: "oklch(58% 0.045 262)" }}>
          Unlimited access, exclusive reporting, and ad-free reading.
        </p>

        <div className="flex items-baseline gap-1 my-[10px] py-[0px] font-sans" style={{ color: "#1B1206" }}>
          <span className="leading-none text-[17px]">$9</span>
          <span className="text-[13px]" style={{ color: "oklch(58% 0.045 262)" }}>/ month</span>
        </div>

        {/* Button group, pinned to the bottom of the (taller) card. The left
            "Subscribe" is the SELECTED element. */}
        <div className="mt-auto flex gap-2.5">
          <div className="relative flex-1">
            <div
              className="flex items-center justify-center py-2.5 text-[14px] font-medium tracking-[0.01em] font-sans"
              style={{
                color: "oklch(0.97 0.014 255)",
                borderRadius: "11px",
                background:
                  "linear-gradient(180deg, oklch(62% 0.155 262) 0%, oklch(50% 0.185 266) 100%)",
                boxShadow:
                  "0 1px 0 oklch(100% 0 0 / 0.35) inset, 0 0 0 1px oklch(45% 0.185 266 / 0.7), 0 8px 18px -6px oklch(52% 0.195 264 / 0.65), 0 2px 4px oklch(38% 0.15 266 / 0.35)",
              }}
            >
              Subscribe
            </div>
            <span className="pointer-events-none absolute -inset-[3px] outline" style={{ outline: `2.5px solid ${BLUE}` }} />
            <span className="pointer-events-none absolute -left-[7px] -top-[7px] z-10 h-2 w-2" style={handle} />
            <span className="pointer-events-none absolute -right-[7px] -top-[7px] z-10 h-2 w-2" style={handle} />
            <span className="pointer-events-none absolute -bottom-[7px] -left-[7px] z-10 h-2 w-2" style={handle} />
            <span className="pointer-events-none absolute -bottom-[7px] -right-[7px] z-10 h-2 w-2" style={handle} />
            <SelectionBadge />
          </div>
          <div
            className="flex flex-1 items-center justify-center py-2.5 text-[14px] font-medium tracking-[0.01em] font-sans"
            style={{
              color: "oklch(45% 0.16 266)",
              borderRadius: "11px",
              background:
                "linear-gradient(180deg, oklch(93% 0.035 256) 0%, oklch(88% 0.055 260) 100%)",
              boxShadow:
                "0 1px 0 oklch(100% 0 0 / 0.6) inset, 0 0 0 1px oklch(68% 0.1 262 / 0.55), 0 6px 14px -8px oklch(52% 0.21 264 / 0.4)",
            }}
          >
            Gift
          </div>
        </div>
      </div>

    </div>
  );
}

export function ContextHero() {
  return (
    <div className="relative h-[354px] w-full">
      {/* Load the Hedvig Letters Serif webfont for the card. */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&display=swap" />

      {/* Section subtitle â above the graphic, with the help-menu keycap beside it */}
      <div className="absolute left-[4px] top-0 z-10 flex items-center w-fit gap-[4.875rem]">
        <span className="text-title-3 leading-relaxed text-text-secondary">Pull any element as context into your chat. Ask specific questions about a layer.</span>
        <span className="flex shrink-0 items-center gap-1">
          <Kbd variant="large" className="font-sans">⌘</Kbd>
          <Kbd variant="large">L</Kbd>
        </span>
      </div>

      {/* The selected LANDSCAPE design */}
      <div className="absolute inset-x-0 top-[74px] z-10 w-full [--tw-border-style:solid] [--tw-outline-style:solid]">
        <MembershipCard />
      </div>

      {/* Real-styled canvas right-click menu — sits at the cursor's corner,
          below the cursor in z so it never covers the pointer. */}
      <div className="absolute left-[352px] top-[270px] z-30 min-w-[176px] overflow-hidden rounded-lg border border-border-primary bg-surface-container-high px-1.5 py-1.5 shadow-dropdown w-[210px]">
        <div className={ITEM}>View Code</div>
        <div className={`${ITEM} bg-surface-container-highest text-text-primary`}>Add to Context</div>
      </div>

      {/* The landing-page cursor, ON TOP of the menu (tip at its top-left). */}
      <div className="absolute left-[328px] top-[252px] z-50">
        <Cursor />
      </div>

      {/* Floating chat — no frame, real composer with a soft drop shadow,
          shrunk a touch, overlapping the card's bottom-left. */}
    </div>
  );
}
