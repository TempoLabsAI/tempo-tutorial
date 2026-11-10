// Copy of @tempo-modules/tempo-design-system components/composites/
// share-progress.tsx (the Share popover's "Creating share link…" flight),
// plus the `CheckingState` wrapper and popover surface from tempo-client's
// SharePopover, so the tutorial renders the real loader without the private
// packages. Shippy is the design system's own `shippy-flying.webm` clip,
// shipped with the template.
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import shippyFlying from "../assets/shippy-flying.webm";

import {
  CursorSelectIcon,
  FlowConnectionIcon,
  FrameIcon,
  GridIcon,
  PaintBrushIcon,
  RectIcon,
  TextIcon,
} from "./canvas-toolbar-icons";

/** hooks/use-prefers-reduced-motion.ts */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * A single stage of a multi-step share flow. `key` identifies the stage,
 * `label` is the human sentence shown under the flight path while it runs.
 */
export interface ShareProgressStep {
  key: string;
  label: string;
}

export interface ShareProgressProps {
  /** Ordered stages — one marker each, passed bottom-to-top as work lands. */
  steps: ShareProgressStep[];
  /**
   * Index of the currently running stage. `-1` (or omitted) means the flow
   * hasn't reported a stage yet — Shippy climbs with the starfield alone and
   * no marker is lit, so an unknown stage still reads as "working"
   * without claiming progress it hasn't made.
   */
  activeIndex?: number;
  /** Sentence shown inside the box, under Shippy. */
  label?: string | null;
  /**
   * CSS custom property (including the leading `--`) for the accent used by
   * the lit markers, thruster and glow — e.g. `--lavender-500`. Keying off
   * a color-scale token keeps this in step with the artifact's color everywhere
   * else in the product, and follows light mode for free.
   */
  accentToken: string;
  /**
   * Side + bottom padding (px) of the surrounding surface. The sky box stays
   * inset by it; the step bar bleeds THROUGH it so it lands on the surface's
   * own bottom corners.
   *
   * Callers MUST pass the surface's REAL inset — too large and the bar pokes
   * out past the surface's edge, too small and it stops short of the corners.
   * This has now gone wrong in both directions: the share popover tightened
   * from `p-4` to `p-2` while this stayed at 16 (bar overhanging), and the fix
   * for that hardcoded 8 inside components the 472px `p-4` dialog also renders
   * (bar 8px short of every edge). In `tempo-client` the number is paired with
   * its surface's padding class in `share-surfaces.ts` and the state
   * components take it as a REQUIRED prop, so neither surface can drift again.
   *
   * The default here is for outside callers only and matches a `p-4` surface.
   */
  bleed?: number;
}

const MONO_FONT =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

// Keyframes are injected once rather than written as Tailwind utilities: the
// rich-editor variable sheet pins `transition-property: none` on `:root *`,
// so class-driven motion in this tree silently doesn't animate. Inline styles
// + real keyframes are immune to that reset.
let keyframesInjected = false;
function ensureShareProgressKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  keyframesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-share-progress-keyframes", "");
  style.textContent = `
@keyframes share-progress-hover {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes share-progress-fall {
  0%   { transform: translateY(-44px); }
  100% { transform: translateY(0); }
}
@keyframes share-progress-thruster {
  0%, 100% { opacity: 0.55; transform: translateX(-50%) scaleY(1); }
  50%      { opacity: 0.95; transform: translateX(-50%) scaleY(1.25); }
}
@keyframes share-progress-label-in {
  0%   { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes share-progress-scroll {
  0%   { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
@keyframes share-progress-flypast {
  0%   { opacity: 0; transform: translate(-50%, -190px) scale(0.65); }
  18%  { opacity: 1; }
  55%  { opacity: 1; transform: translate(-50%, -8px) scale(1.1); }
  100% { opacity: 0; transform: translate(-50%, 96px) scale(1.25); }
}
@keyframes share-progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(433%); }
}
/* Dark is a night sky; light is a soft pastel-rainbow sky. Shippy's artwork is
   near-white, so light can't sit him on the near-white surface ramp — instead
   of dark's night panel, light uses saturated-enough pastels (the DS shallow
   accent ramps) that he still reads while the panel stays daylight. The whole
   backdrop is one custom property (--share-sky-bg) so the theme switch is a
   plain CSS selector — the values are consumed by the inline backgrounds,
   which would otherwise win over any stylesheet rule. */
.share-progress-sky {
  --share-sky-bg: linear-gradient(180deg, var(--surface-container-high) 0%, var(--surface-container) 100%);
  --share-sky-ink: var(--text-tertiary);
  /* Falling scenery glyphs — dark shares the starfield ink and keeps the
     original faintness; light overrides both (deeper sky, brighter specks). */
  --share-sky-scenery: var(--text-tertiary);
  --share-sky-scenery-opacity: 0.28;
  /* Lit milestone (flypast) tint — dark uses the artifact accent as-is
     (--share-sky-accent is set inline from the accentToken prop). */
  --share-sky-milestone: var(--share-sky-accent);
  --share-sky-label: var(--text-primary);
  /* Dark: the original bottom dissolve, unchanged — the panel melts into the
     surrounding dark surface so the bottom edge never reads. */
  --share-sky-mask: linear-gradient(to bottom, black 0%, black 58%, transparent 100%);
  /* Dark keeps the original box geometry byte-for-byte: 192px tall, and only
     the TOP corners rounded (the faded-out bottom never shows a corner). Both
     are custom properties so light can differ without touching dark. */
  --share-sky-height: 192px;
  --share-sky-radius: 10px 10px 0 0;
}
[data-theme="light"] .share-progress-sky {
  /* Pastel rainbow: soft radial pools of the shallow accent ramps (salmon /
     lavender / mustard / kiwi over a blueberry wash) melting into each other,
     like the brand illustration's gradient disc. Tokens, not hexes, so the
     sky retunes with the ramps. */
  --share-sky-bg:
    radial-gradient(54% 50% at 50% 46%, color-mix(in srgb, var(--lavender-400) 70%, transparent) 0%, transparent 70%),
    radial-gradient(90% 90% at 18% 18%, var(--salmon-400) 0%, transparent 60%),
    radial-gradient(80% 80% at 84% 22%, var(--blueberry-400) 0%, transparent 62%),
    radial-gradient(80% 75% at 20% 85%, var(--mustard-400) 0%, transparent 60%),
    radial-gradient(85% 80% at 80% 82%, var(--kiwi-400) 0%, transparent 62%),
    linear-gradient(180deg, var(--lavender-200) 0%, var(--blueberry-200) 100%);
  /* White ink: the starfield + scenery glyphs become the sparkles in the
     pastel sky (the reference art uses white specks); the label flips to the
     standard dark ink since the sky is light. */
  --share-sky-ink: var(--white);
  /* The deeper pools can carry brighter specks: the scenery glyphs go full
     white at roughly double dark's opacity so they read as drawn sparkles. */
  --share-sky-scenery: var(--white);
  --share-sky-scenery-opacity: 0.6;
  /* The raw accent reads garish on the pastel sky, so the lit milestone is
     the accent softened well toward white — still clearly "lit" next to the
     0.6-white scenery, without the neon edge. */
  --share-sky-milestone: color-mix(in srgb, var(--share-sky-accent) 70%, var(--white));
  --share-sky-label: var(--text-primary);
  /* Light gets the same bottom dissolve as dark. The old no-fade rule dated
     from the dark-panel-on-white-page era, where every fade length read as a
     hard band; the pastel sky ends near-white, so it can melt into the
     surrounding light surface the same way dark melts into dark. */
  --share-sky-mask: linear-gradient(to bottom, black 0%, black 58%, transparent 100%);
  /* Faded bottom = no visible bottom edge, so light matches dark's top-only
     rounding; the extra height stays as label runway over the fade. */
  --share-sky-height: 208px;
  --share-sky-radius: 10px 10px 0 0;
}
`;
  document.head.appendChild(style);
}

/**
 * Shippy only ever climbs. The share flow can legitimately re-enter an earlier
 * stage (the check flow re-runs when the devserver finishes loading, and again
 * after a commit + push), and watching the sky scroll backwards reads as
 * failure rather than retry — so the rendered position is the furthest stage
 * reached, not the raw one.
 */
function useFurthestIndex(activeIndex: number, resetKey: number): number {
  const furthestRef = useRef(activeIndex);
  const resetKeyRef = useRef(resetKey);
  if (resetKeyRef.current !== resetKey) {
    resetKeyRef.current = resetKey;
    furthestRef.current = activeIndex;
  }
  if (activeIndex > furthestRef.current) furthestRef.current = activeIndex;
  return furthestRef.current;
}

// NOTE: stage pacing deliberately does NOT live here. This component is
// unmounted the moment the share completes (`setShareLink` flips the popover to
// its "ready" step), so any catching-up it did would simply be cut off. The
// caller paces the stage updates AND holds off completion until they have all
// been shown — see `paceShareStage` in SharePopover.tsx.

// Box height is theme-split and lives in the injected stylesheet as
// --share-sky-height (dark 192px — unchanged; light 208px, the extra rows
// under the label compensating for its missing bottom fade).
/** Where Shippy holds, as a fraction of the box height. */
const SHIPPY_TOP_PCT = 50;
/** Vertical gap between consecutive stage markers. */
const MARKER_GAP = 48;

/**
 * Per-stage marker placement — canvas vocabulary (frame, rect, grid, cursor,
 * text, brush, flow) rather than abstract dots, so what he's flying past is
 * recognisably the thing being shared. Deterministic (indexed by stage,
 * wrapping) rather than random so a given share always flies the same sky and
 * the layout can be tuned by eye; `dx` keeps markers clear of Shippy's centre
 * column and `tilt` stops the row reading as a rigid grid.
 */
const MARKERS = [
  { dx: -94, size: 34, tilt: -12, Icon: FrameIcon },
  { dx: 106, size: 22, tilt: 9, Icon: RectIcon },
  { dx: -114, size: 20, tilt: 14, Icon: GridIcon },
  { dx: 86, size: 38, tilt: -8, Icon: CursorSelectIcon },
  { dx: -80, size: 24, tilt: 11, Icon: TextIcon },
  { dx: 118, size: 30, tilt: -14, Icon: PaintBrushIcon },
  { dx: -102, size: 22, tilt: 7, Icon: FlowConnectionIcon },
];

/** One full pass of the scenery column; scrolled by exactly this per loop. */
const TILE_HEIGHT = MARKERS.length * MARKER_GAP;
/** Seconds for the scenery to fall one tile — sets the sense of speed. */
const SCENERY_SECONDS = 14;
/** How long a lit milestone glyph takes to fly from above Shippy to below. */
const FLYPAST_MS = 2600;

/** Corner radius of the surfaces this sits in (`rounded-lg` popover / dialog). */
const SURFACE_RADIUS = 8;

/* The box dissolves into the surface at the bottom, under the label — see the
   `--share-sky-mask` custom property in the injected stylesheet. */

/**
 * Markers get a tighter window than the backdrop: they fade IN out of the void
 * at the top and are gone well before the label's line, so a passed marker
 * never collides with the sentence.
 */
const MARKER_FADE =
  "linear-gradient(to bottom, transparent 0%, black 10%, black 56%, transparent 84%)";

/**
 * Reduced-motion stand-in for the flypast: the stage that just landed, shown
 * still and lit beside Shippy so the milestone still reads without movement.
 */
function StaticMilestoneGlyph({
  marker,
}: {
  marker: (typeof MARKERS)[number];
}): React.ReactElement {
  const { Icon } = marker;
  const size = marker.size * 1.3;
  return (
    <Icon
      aria-hidden
      width={size}
      height={size}
      style={{
        position: "absolute",
        top: `${SHIPPY_TOP_PCT}%`,
        left: `calc(50% + ${marker.dx}px)`,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        transform: `rotate(${marker.tilt}deg)`,
        color: "var(--share-sky-milestone)",
      }}
    />
  );
}

/**
 * The share flow's progress indicator: Shippy climbs through space, one canvas
 * glyph per share stage sliding down past him as each lands, with the current stage's
 * sentence inside the box below. The box is inset from the surface with rounded
 * top corners and fades out at the bottom.
 *
 * Purely presentational — the caller owns the stage list and which stage is
 * running. Progress is strictly forward-only (see {@link useFurthestIndex}),
 * and under `prefers-reduced-motion` it degrades to a still Shippy plus the lit
 * markers and label, so it never depends on movement to say work is happening.
 */
export function ShareProgress({
  steps,
  activeIndex = -1,
  label,
  accentToken,
  bleed = 16,
}: ShareProgressProps): React.ReactElement {
  ensureShareProgressKeyframes();
  const reducedMotion = usePrefersReducedMotion();
  const accent = `var(${accentToken})`;

  // Plays only while motion is allowed; reduced motion holds the first frame.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    // Muted + inline, so autoplay policy permits this; a rejection (no source
    // yet, element torn down mid-flight) is not worth surfacing.
    void video.play().catch(() => {});
  }, [reducedMotion]);

  const count = steps.length;
  // Reset the high-water mark whenever the stage list itself changes, so a
  // different flow doesn't inherit the previous one's furthest position.
  const furthestIndex = useFurthestIndex(activeIndex, count);
  const hasStage = furthestIndex >= 0 && furthestIndex < count;

  const activeLabel = label ?? steps[furthestIndex]?.label ?? null;

  const currentMarker = MARKERS[Math.max(furthestIndex, 0) % MARKERS.length];
  const { Icon } = currentMarker;

  return (
    // The sky is clipped (rounded top, inset from the surface) but the step bar
    // has to escape that clip to reach the surface's own bottom corners — hence
    // an unclipped positioning wrapper around both.
    <div
      // The class sits here (not only on the sky) so --share-sky-height is in
      // scope for this element AND inherits down to the sky below it.
      className="share-progress-sky relative"
      style={
        {
          height: "var(--share-sky-height)",
          // Exposes the artifact accent to the theme stylesheet so light can
          // derive a softened milestone tint from it (--share-sky-milestone).
          "--share-sky-accent": accent,
        } as React.CSSProperties
      }
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={hasStage ? furthestIndex + 1 : undefined}
      aria-label={activeLabel ?? "Working"}
    >
      {/* Corner rounding is theme-split (--share-sky-radius): dark rounds only
          the top pair, since its bottom fades out before the edge; light has no
          fade, so its visible bottom edge needs rounding too. */}
      <div
        className="share-progress-sky absolute inset-0 overflow-hidden"
        style={{ borderRadius: "var(--share-sky-radius)" }}
      >
        {/* Backdrop — masked so the box dissolves into the surface at the
          bottom while the label above it stays fully opaque. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(90% 60% at 50% 35%, color-mix(in srgb, ${accent} 9%, transparent) 0%, transparent 70%), var(--share-sky-bg)`,
            maskImage: "var(--share-sky-mask)",
            WebkitMaskImage: "var(--share-sky-mask)",
          }}
        >
          {/* Starfield falling past him — the parallax that sells the climb. */}
          <div
            style={{
              position: "absolute",
              inset: "-44px 0 0 0",
              opacity: 0.35,
              backgroundImage: `radial-gradient(circle, var(--share-sky-ink) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
              animation: reducedMotion
                ? undefined
                : "share-progress-fall 2.6s linear infinite",
            }}
          />
        </div>

        {/* Ambient scenery: an endless column of canvas glyphs falling past him,
          independent of progress — this is the "we're passing things" layer and
          it never stops while the share is running. The tile is rendered TWICE
          back to back and scrolled by exactly one tile height, so the loop
          point is invisible (copy 2 is where copy 1 was when it restarts). */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            maskImage: MARKER_FADE,
            WebkitMaskImage: MARKER_FADE,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              height: TILE_HEIGHT * 2,
              animation: reducedMotion
                ? undefined
                : `share-progress-scroll ${SCENERY_SECONDS}s linear infinite`,
            }}
          >
            {[0, 1].map((copy) =>
              MARKERS.map((marker, i) => {
                const { Icon } = marker;
                return (
                  <Icon
                    key={`${copy}-${i}`}
                    width={marker.size}
                    height={marker.size}
                    style={{
                      position: "absolute",
                      top: copy * TILE_HEIGHT + i * MARKER_GAP,
                      left: marker.dx,
                      marginTop: -marker.size / 2,
                      marginLeft: -marker.size / 2,
                      transform: `rotate(${marker.tilt}deg)`,
                      color: "var(--share-sky-scenery)",
                      opacity: "var(--share-sky-scenery-opacity)",
                    }}
                  />
                );
              }),
            )}
          </div>
        </div>

        {/* The milestone beat: when a stage lands, ITS glyph flies past Shippy lit
          in the accent — same vocabulary as the scenery, but the one you just
          cleared. Only the CURRENT stage's glyph is rendered (keyed on it, so it
          remounts and replays each time): stages can land faster than the flight
          takes, and rendering every reached stage let two or three lit glyphs
          overlap at once. Exactly one lights up at a time. */}
        {!reducedMotion && hasStage && (
          <div
            key={`flypast-${furthestIndex}`}
            aria-hidden
            style={{
              position: "absolute",
              top: `${SHIPPY_TOP_PCT}%`,
              left: `calc(50% + ${currentMarker.dx}px)`,
              width: currentMarker.size * 1.3,
              height: currentMarker.size * 1.3,
              animation: `share-progress-flypast ${FLYPAST_MS}ms ease-out forwards`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: currentMarker.size * 2.2,
                height: currentMarker.size * 2.2,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: `radial-gradient(circle, color-mix(in srgb, var(--share-sky-milestone) 16%, transparent) 0%, transparent 70%)`,
              }}
            />
            <Icon
              width={currentMarker.size * 1.3}
              height={currentMarker.size * 1.3}
              style={{
                position: "relative",
                display: "block",
                transform: `rotate(${currentMarker.tilt}deg)`,
                // Stroked in `currentColor`, so "lit" is a colour swap on the
                // same asset the scenery uses. Themed (--share-sky-milestone):
                // the raw accent in dark, softened toward white in light.
                color: "var(--share-sky-milestone)",
                filter: `drop-shadow(0 0 5px color-mix(in srgb, var(--share-sky-milestone) 45%, transparent))`,
              }}
            />
          </div>
        )}

        {/* Reduced motion: no flypast, so the stage that just landed is shown as
          a still lit glyph beside Shippy instead. */}
        {reducedMotion && hasStage && (
          <StaticMilestoneGlyph
            marker={MARKERS[furthestIndex % MARKERS.length]}
          />
        )}

        {/* Shippy — upright, centred, holding altitude while the sky moves.
          The centring transform and the hover animation MUST live on separate
          elements: a keyframe that animates `transform` replaces the element's
          own transform outright, so combining them here would cancel the
          `translate(-50%, -50%)` and hang him off-centre. */}
        <div
          style={{
            position: "absolute",
            top: `${SHIPPY_TOP_PCT}%`,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              position: "relative",
              animation: reducedMotion
                ? undefined
                : "share-progress-hover 2.6s ease-in-out infinite",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 190,
                height: 190,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: `radial-gradient(circle, color-mix(in srgb, ${accent} 15%, transparent) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            {/* Thruster plume trailing below him. */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "88%",
                left: "50%",
                width: 14,
                height: 34,
                transform: "translateX(-50%)",
                transformOrigin: "top center",
                borderRadius: "50%",
                background: `linear-gradient(to bottom, color-mix(in srgb, ${accent} 38%, transparent), transparent)`,
                filter: "blur(5px)",
                animation: reducedMotion
                  ? undefined
                  : "share-progress-thruster 900ms ease-in-out infinite",
              }}
            />
            <video
              ref={videoRef}
              src={shippyFlying}
              // Under reduced motion Shippy holds still on his first frame —
              // the documented degradation — which also makes the surface
              // capturable by VRT (a playing clip lands on a different frame
              // every mount).
              autoPlay={!reducedMotion}
              loop
              muted
              playsInline
              aria-hidden
              style={{
                position: "relative",
                // Source artwork is 152×215 — keep that ratio so Shippy isn't
                // squashed. Upright: he's climbing, not banking.
                width: 112,
                height: 158,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Stage sentence, inside the box and above the fade.
          Keyed on the sentence so the entrance animation replays on every
          stage change — the text sliding up is the beat that says a step
          landed. */}
        <span
          key={activeLabel ?? ""}
          className="absolute inset-x-0 text-center text-[13px]"
          style={{
            // 36 (not the old 22): lifted clear of dark's bottom dissolve. In
            // light the sky has no fade (solid box), so the pale ink always
            // sits on opaque sky in both themes (--share-sky-label).
            bottom: 36,
            color: "var(--share-sky-label)",
            fontFamily: MONO_FONT,
            animation: reducedMotion
              ? undefined
              : "share-progress-label-in 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {activeLabel}
        </span>
      </div>

      {/* Step counter, pinned to the surface's own bottom-left/right corners
          (hence the negative `bleed` offsets — it deliberately escapes the
          box's inset). The flight says "something is happening"; this says
          "you are 3 of 7 through it". It is a STEP indicator, not a timer: it
          holds still and jumps once per completed stage. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -bleed,
          right: -bleed,
          bottom: -bleed,
          height: 3,
          overflow: "hidden",
          borderRadius: `0 0 ${SURFACE_RADIUS}px ${SURFACE_RADIUS}px`,
          // Flat track + flat fill, no glow and no gradient — same treatment as
          // the canvas "Loading Storyboards" bar (`canvas-loading-toolbar`), so
          // the two loading surfaces read as the same product.
          background: "var(--surface-container-high)",
        }}
      >
        <div
          style={
            hasStage
              ? {
                  height: "100%",
                  width: `${((furthestIndex + 1) / count) * 100}%`,
                  background: accent,
                  // A short snap, not a glide: the bar should read as landing on
                  // the next step rather than continuously creeping.
                  transition: reducedMotion
                    ? undefined
                    : "width 260ms cubic-bezier(0.32, 0.9, 0.4, 1)",
                }
              : {
                  // The ONLY continuously-moving case: no stage has been
                  // reported yet ("Checking project status…" / "Preparing your
                  // canvas…"), so there is no step to point at and a static
                  // empty bar would read as stalled. Once stages arrive the bar
                  // goes discrete.
                  height: "100%",
                  width: "30%",
                  background: accent,
                  animation: reducedMotion
                    ? undefined
                    : "share-progress-indeterminate 1.6s ease-in-out infinite",
                }
          }
        />
      </div>
    </div>
  );
}

// ── tempo-client SharePopover pieces ───────────────────────────────────────

/** `SHARE_POPOVER_SURFACE` (share-surfaces.ts): popover classes + its inset. */
export const SHARE_POPOVER_SURFACE = {
  className:
    "w-[416px] border-border-secondary bg-surface-container px-2 pb-2 pt-2.5",
  bleedPx: 8,
} as const;

/** The share flow's stages, in order (`SHARE_PROGRESS_STEPS`). */
const SHARE_PROGRESS_STEPS: ShareProgressStep[] = [
  { key: "git", label: "Checking repository status..." },
  { key: "org", label: "Resolving organization..." },
  { key: "capture", label: "Capturing canvas preview..." },
  { key: "encodeImages", label: "Encoding images..." },
  { key: "compress", label: "Compressing preview..." },
  { key: "upload", label: "Uploading preview..." },
  { key: "snapshot", label: "Creating share link..." },
];

const SHARE_LOADING_ACCENT_TOKEN = {
  canvas: "--lavender-500",
  prd: "--kiwi-500",
  issue: "--mustard-500",
} as const;

/** SharePopover's `CheckingState`: the flight at the stage `detail` names. */
export function CheckingState({
  detail,
  contentType = "canvas",
  bleed,
}: {
  detail?: string | null;
  contentType?: "canvas" | "prd" | "issue";
  bleed: number;
}) {
  return (
    <ShareProgress
      steps={SHARE_PROGRESS_STEPS}
      activeIndex={
        detail
          ? SHARE_PROGRESS_STEPS.findIndex((step) => step.label === detail)
          : -1
      }
      label={detail ?? "Checking project status..."}
      accentToken={SHARE_LOADING_ACCENT_TOKEN[contentType]}
      bleed={bleed}
    />
  );
}
