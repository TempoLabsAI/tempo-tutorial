import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { isTempoInteractFrameName } from "tempo-sdk/canvas";
import { AnimatedStarfield } from "./_ui/animated-starfield";
// Real Tempo brand art: the design system's planet outline and rim glow.
import planetBase from "./assets/planet-base.svg";
import planetGlow from "./assets/planet-glow.svg";

/**
 * A normal OS mouse arrow (same one CreateC uses). Its tip is the top-left
 * corner at (2, 2), so position its wrapper with that offset.
 */
export function IntroCursor() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path
        d="M2 2 L2 22.5 L7.4 17.6 L11 26 L14.6 24.4 L11.1 16.3 L18.5 16.3 Z"
        fill="#FFFFFF"
        stroke="#141414"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Deep-space backdrop from tempo.new: the real animated starfield, with the
 * blue-purple planet rising along the bottom edge. Fills its (relative)
 * parent; put content after it.
 */
export function IntroSpace() {
  const inPlay = useInPlay();
  return (
    <div className="pointer-events-none absolute inset-0 bg-surface-container-lowest">
      <AnimatedStarfield
        glowPosition="center"
        refreshRateIndependent
        still={!inPlay}
      />
      {inPlay ? <WarpStars /> : null}
      {/* Tempo's planet: a dark disc with the design system's glowing rim. */}
      <div className="absolute left-1/2 top-[492px] size-[1500px] -translate-x-1/2">
        <img
          src={planetGlow}
          alt=""
          className="absolute left-1/2 top-1/2 size-[1600px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,#1B1C2E_0%,#0A0A12_60%,#050508_100%)]" />
        <img
          src={planetBase}
          alt=""
          className="absolute inset-0 size-full opacity-70"
        />
      </div>
    </div>
  );
}

/**
 * A quieter take on IntroSpace for the lesson storyboards: the same starfield,
 * dimmed, with a faint violet glow and no planet. Sits behind everything, so
 * its parent needs `isolate` to keep it above the parent's own background.
 */
export function SubtleSpace({
  tint = "violet",
}: {
  tint?: "violet" | "build";
} = {}) {
  const inPlay = useInPlay();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {tint === "build" ? (
        // The generation-flow boards (Create, Generation target, Make it move)
        // share a Verso-blue sky so they read as one set.
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0E1446_0%,#0A0E2C_45%,#080A1E_100%)]" />
          <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(ellipse_85%_70%_at_50%_0%,rgba(52,76,255,0.45),transparent_72%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[520px] bg-[radial-gradient(ellipse_75%_65%_at_50%_100%,rgba(52,76,255,0.22),transparent_70%)]" />
        </>
      ) : (
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(110,120,255,0.10),transparent_70%)]" />
      )}
      <div
        className={`absolute inset-0 ${tint === "build" ? "opacity-70" : "opacity-45"}`}
      >
        <AnimatedStarfield
          glowPosition="center"
          refreshRateIndependent
          still={!inPlay}
        />
      </div>
      {inPlay ? <WarpStars subtle /> : null}
      {tint === "build" ? (
        <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(110,130,255,0.45)]" />
      ) : null}
    </div>
  );
}

/**
 * True while this storyboard is being played. Play opens the storyboard in
 * its own named iframe, so the frame's name says Play started. Stop sends the
 * storyboard nothing, and it keeps showing that same live document, so we
 * also watch the pointer: Stop hides the Play view and the pointer has left
 * it (it is on the header's Stop button), so motion pauses whenever the
 * pointer leaves the board and resumes when it comes back in Play.
 */
export const TutorialPlayContext = createContext<boolean | null>(null);
export function useInPlay() {
  const previewPlaying = useContext(TutorialPlayContext);
  const [inPlayFrame] = useState(
    () =>
      typeof window !== "undefined" &&
      window.parent !== window &&
      isTempoInteractFrameName(window.name),
  );
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (!inPlayFrame) return;
    const root = document.documentElement;
    const on = () => setActive(true);
    const off = () => setActive(false);
    root.addEventListener("mouseenter", on);
    root.addEventListener("pointermove", on);
    root.addEventListener("mouseleave", off);
    window.addEventListener("blur", off);
    return () => {
      root.removeEventListener("mouseenter", on);
      root.removeEventListener("pointermove", on);
      root.removeEventListener("mouseleave", off);
      window.removeEventListener("blur", off);
    };
  }, [inPlayFrame]);
  return previewPlaying ?? (inPlayFrame && active);
}

const WARP_STYLES = `
  @keyframes otv-warp {
    0%   { transform: rotate(var(--a)) translateX(var(--r0)) scaleX(0.15); opacity: 0 }
    15%  { opacity: var(--o) }
    100% { transform: rotate(var(--a)) translateX(var(--r1)) scaleX(1); opacity: 0 }
  }
  .otv-warp-streak {
    position: absolute; left: 50%; top: 50%;
    height: 1.5px; border-radius: 999px; transform-origin: 0 50%;
    background: linear-gradient(90deg, transparent, #fff);
    animation: otv-warp var(--d) cubic-bezier(.55,0,.9,.6) var(--delay) infinite;
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) { .otv-warp-streak { animation: none } }
`;

// Fixed pseudo-random streaks so every render (and every capture) matches.
const STREAKS = Array.from({ length: 56 }, (_, i) => {
  const r = (n: number) =>
    (((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1) + 1) % 1;
  return {
    angle: Math.round(r(1) * 360),
    start: 40 + r(2) * 120,
    length: 40 + r(3) * 110,
    duration: 0.9 + r(4) * 0.9,
    delay: -r(5) * 1.8,
  };
});

/** Stars streaking out from the centre, like jumping to light speed. */
export function WarpStars({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{WARP_STYLES}</style>
      {STREAKS.map((s, i) => (
        <span
          key={i}
          className="otv-warp-streak"
          style={
            {
              width: `${s.length}px`,
              "--a": `${s.angle}deg`,
              "--r0": `${s.start}px`,
              "--r1": `${s.start + 620}px`,
              "--o": subtle ? 0.35 : 0.8,
              "--d": `${s.duration}s`,
              "--delay": `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * The generation-flow boards' outline: a thin gradient rim in Shippy's
 * sparkle colours, sitting on the board's own edge. Ties Create, Generation
 * target and Make it move together without changing anything inside them.
 */
export function FlowOutline() {
  const ring: CSSProperties = {
    padding: 1.5,
    background:
      "linear-gradient(135deg, #B57CF6 0%, #3DA9F5 35%, #5FD68A 65%, #F6C445 100%)",
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 rounded-[24px] opacity-80"
      style={ring}
    />
  );
}
