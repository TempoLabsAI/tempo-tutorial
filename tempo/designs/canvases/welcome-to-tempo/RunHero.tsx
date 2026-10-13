import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Loader2, TrendingUp } from "lucide-react";
import { StoryboardHeader } from "./_ui";
import cardWaveGrey from "./assets/card-wave-grey.png";

/**
 * The Generate strip's "run it" graphic: a storyboard-inside-a-storyboard.
 *
 * It renders the REAL design-system `StoryboardHeader` chrome (the same label
 * tab + open-in-new + play/stop morph toolbar you get when you select a
 * storyboard on the canvas) wrapped around the exact blue selection outline +
 * white corner handles the canvas paints (`#02A0E7`, from StoryboardRootHandles).
 *
 * The point is meta and interactive: every storyboard is live, running React,
 * and pressing the blue ▶ flips it into interact mode. So press Play on the
 * header here — `onPlayStopClick` toggles `running`, the header morphs to the
 * red ■ (with a little pop), and the inner design wakes up: the KPI sparklines
 * and the main area chart wipe in, confetti fires, and the "Publish snapshot"
 * CTA fades to full opacity. Then the whole thing AUTO-PLAYS: the arrow cursor
 * glides from the Play button down to the Publish button, the button shrinks a
 * touch as if pressed, and a spinner takes over inside it — publishing, forever
 * (an infinite-load demo loop). Run this very storyboard, then watch the one
 * inside it run itself. 🎉
 */
const CHROME = "#02A0E7"; // blue selection chrome (transform box + handles) — the canvas's real HOST_OVERLAY_COLOR

/* Light-mode palette so the rendered dashboard matches the editorial card's
   theme instead of inheriting the app's dark `surface` tokens. */
const PAPER = "#ffffff"; // dashboard surface
const INK = "#1b1f29"; // primary text
const MUTE = "#6b7280"; // secondary text
const TILE = "#f4f5f7"; // KPI tile fill
const BAR = "#dde2ea"; // inactive bar fill
const FAINT = "#9aa3af"; // KPI label (lighter, regular weight)

/* A fresh emerald-green accent — reused so the whole feature shares one accent
   instead of a multi-colour "AI dashboard" palette. */
const ACCENT = "oklch(58% 0.15 152)";
/* The interactive controls (active period chip + Publish button) use a neutral
   visible grey instead of the accent, so they read as plain UI chrome. */
const ACCENT_GRAD = "linear-gradient(180deg, #8b94a3 0%, #5b6473 100%)";

/** Fixed confetti pieces — deterministic so there's no SSR/hydration drift. */
const CONFETTI = [
  { x: 10, color: "var(--kiwi-600)", delay: 0, rot: -24, dur: 1.1 },
  { x: 22, color: "var(--lavender-600)", delay: 0.08, rot: 40, dur: 1.35 },
  { x: 35, color: "var(--blueberry-700)", delay: 0.16, rot: -12, dur: 1.0 },
  { x: 48, color: "var(--salmon-600)", delay: 0.04, rot: 60, dur: 1.45 },
  { x: 61, color: "var(--kiwi-600)", delay: 0.2, rot: -50, dur: 1.15 },
  { x: 74, color: "var(--lavender-600)", delay: 0.12, rot: 18, dur: 1.3 },
  { x: 87, color: "var(--blueberry-700)", delay: 0.06, rot: -36, dur: 1.05 },
  { x: 30, color: "var(--salmon-600)", delay: 0.24, rot: 28, dur: 1.4 },
  { x: 56, color: "var(--kiwi-600)", delay: 0.18, rot: -8, dur: 1.2 },
  { x: 68, color: "var(--lavender-600)", delay: 0.1, rot: 52, dur: 1.5 },
];

const HANDLES = [
  { left: 0, top: 0 },
  { left: "100%", top: 0 },
  { left: 0, top: "100%" },
  { left: "100%", top: "100%" },
];

/** Headline metric for the main chart — jumps when the live "Publish" fires. */
const HERO = { base: "$12.4k", up: "$18.9k" };
const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

/** Area-chart series (values as % of the plot height). */
const SERIES_BASE = [26, 32, 27, 41, 35, 49, 44, 56];

/** The three KPI tiles — each has its own value, delta, accent + sparkline. */
const STATS = [
  { label: "MRR", base: "$12.4k", up: "$18.9k", delta: "+4.2%", deltaUp: "+23.6%", accent: "#02A0E7",
    spark: [24, 30, 26, 38, 34, 46, 42, 54], sparkUp: [28, 40, 36, 52, 58, 68, 80, 94] },
  { label: "Active users", base: "2,318", up: "3,002", delta: "+1.8%", deltaUp: "+29.5%", accent: "#7C5CFC",
    spark: [30, 28, 34, 33, 40, 44, 48, 52], sparkUp: [34, 38, 44, 50, 58, 66, 76, 88] },
  { label: "Conversion", base: "3.1%", up: "4.4%", delta: "+0.4%", deltaUp: "+1.3%", accent: "#10B981",
    spark: [40, 38, 42, 46, 44, 50, 52, 58], sparkUp: [42, 46, 52, 58, 64, 72, 80, 90] },
];

/* Geometry — wide viewBoxes keep the SVGs short when scaled to 100% width. */
const CW = 320;
const CH = 70; // main chart
const SW = 104;
const SH = 32; // sparkline

/** Catmull-Rom → cubic-bézier smoothing for a sexy, organic line (not jagged). */
function chartPaths(vals: number[], w: number, h: number, pad: number) {
  const stepX = w / (vals.length - 1);
  const y = (v: number) => pad + (1 - v / 100) * (h - pad * 2);
  const pts = vals.map((v, i) => [i * stepX, y(v)] as const);
  const f = (n: number) => n.toFixed(1);
  let line = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    line += ` C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(p2[0])} ${f(p2[1])}`;
  }
  const last = pts[pts.length - 1];
  return { line, area: `${line} L ${w} ${h} L 0 ${h} Z`, lastX: last[0], lastY: last[1] };
}

/** The landing-page arrow cursor (exact `tempo-landing` mouse.svg path). */
function Cursor() {
  return (
    <svg viewBox="0 0 39 40" width="40" height="41" fill="none" aria-hidden className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
      <path
        d="M5.71829 2.87558C5.56251 2.30534 6.44481 1.51223 6.98048 1.74094L32.186 12.5025C32.8912 12.8036 32.803 13.8507 32.0427 14.2041L20.9091 18.8186C20.7141 18.9092 20.5472 19.0592 20.4347 19.245L15.0018 29.5241C14.563 30.2488 13.5326 30.2073 13.3275 29.4566L5.71829 2.87558Z"
        fill="black"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A mini area sparkline for a KPI tile — wipes in (left→right) when live. */
function Spark({ vals, accent, animate, delay }: { vals: number[]; accent: string; animate: boolean; delay: number }) {
  const { line, area } = chartPaths(vals, SW, SH, 4);
  const gid = `rhSpark-${accent.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <div
      className="mt-2"
      style={{
        animation: animate ? `runHeroWipe 0.7s ${delay}s cubic-bezier(0.4,0,0.2,1) both` : undefined,
        opacity: animate ? 1 : 0.5,
        transition: "opacity 0.3s ease",
      }}
    >
      <svg viewBox={`0 0 ${SW} ${SH}`} preserveAspectRatio="none" className="w-full" style={{ display: "block", height: 30 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.24" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export function RunHero() {
  const [running, setRunning] = useState(false);
  // Auto-play sequence state. `home`/`target` are measured screen positions
  // (in the un-clipped frame's coordinate space); `atTarget` drives the glide.
  const [home, setHome] = useState<{ x: number; y: number } | null>(null);
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [atTarget, setAtTarget] = useState(false); // false = at Play, true = at Publish
  const [playClicking, setPlayClicking] = useState(false); // press on the Play button
  const [pressed, setPressed] = useState(false); // press on the Publish button
  const [loading, setLoading] = useState(false); // infinite spinner inside button

  const wrapRef = useRef<HTMLDivElement>(null); // unscaled, un-clipped positioning frame
  const headerRef = useRef<HTMLDivElement>(null); // the storyboard header (cursor home)
  const publishRef = useRef<HTMLButtonElement>(null); // the Publish CTA (cursor target)

  const { line, area, lastX, lastY } = chartPaths(SERIES_BASE, CW, CH, 8);
  // Re-key the chart on each Run so the reveal animation replays.
  const chartKey = running ? "run" : "idle";

  // Measure the cursor's home (over Play) and target (centre of Publish) in the
  // frame's local coordinate space. Called on layout changes so the positions
  // stay correct even though the storyboard mounts at 0×0 and settles later.
  const measure = useCallback(() => {
    const wrap = wrapRef.current?.getBoundingClientRect();
    // Bail on a pre-layout / collapsed frame — a 0×0 wrap means the storyboard
    // hasn't been laid out yet, and measuring against it pins the cursor to the
    // card's top-left corner. Skip it; a later (valid) pass sets the real spot.
    if (!wrap || wrap.width === 0 || wrap.height === 0) return;
    // Home = the centre of the real Play/Stop button so the cursor lands ON it.
    const playBtn = headerRef.current?.querySelector(
      'button[aria-label="Play"], button[aria-label="Stop"]',
    );
    const play = playBtn?.getBoundingClientRect();
    if (play && play.width > 0) {
      setHome({ x: play.left + play.width / 2 - wrap.left, y: play.top + play.height / 2 - wrap.top });
    }
    const pub = publishRef.current?.getBoundingClientRect();
    if (pub && pub.width > 0) {
      setTarget({ x: pub.left + pub.width / 2 - wrap.left, y: pub.top + pub.height / 2 - wrap.top });
    }
  }, []);

  // Keep measurements live: measure once mounted, then on every resize/reflow.
  // The ResizeObserver fires its initial callback on observe, so `home` is set
  // as soon as the frame has a real size — that's why the cursor shows in idle.
  useEffect(() => {
    measure();
    // The frame mounts at 0×0 and settles a frame or two later, often without
    // ever changing the wrap's own size (only the inner content reflows) — so
    // the ResizeObserver alone can miss it. A couple of rAF re-measures
    // guarantee the cursor's resting spot is pinned to Play as soon as layout
    // is real, instead of being stranded at the card's top-left.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      measure();
      raf2 = requestAnimationFrame(measure);
    });
    const el = wrapRef.current;
    const ro =
      el && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measure())
        : null;
    ro?.observe(el!);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro?.disconnect();
    };
  }, [measure]);

  // Are we in Tempo's interact/run mode? The host injects `__tempoInteractKeys`
  // into the LIVE iframe only when the user hits Run on this storyboard — the
  // static projection iframe never gets it. So this is the real "is the
  // storyboard running" signal: false while it's a static preview, true once
  // it's actually been run. We poll because the flag may be injected a moment
  // after the component mounts.
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const isOn = () =>
      Boolean((window as unknown as { __tempoInteractKeys?: boolean }).__tempoInteractKeys);
    if (isOn()) {
      setInteractive(true);
      return;
    }
    const id = setInterval(() => {
      if (isOn()) {
        setInteractive(true);
        clearInterval(id);
      }
    }, 150);
    return () => clearInterval(id);
  }, []);

  // Auto-play loop — ONLY while the storyboard is actually running (interact
  // mode). In static preview it never fires, so the storyboard sits frozen on
  // its idle state (cursor resting on Play, Publish dimmed), matching the
  // caption "hit ▷ Run to see your designs turn reactive."
  //
  // One cycle: idle beat (cursor on Play) → CLICK Play (cursor + Play button
  // both press/zoom) → release → morph to Stop, dashboard wakes → cursor glides
  // to Publish → CLICK Publish (same press/zoom) → spinner → linger → reset →
  // repeat.
  useEffect(() => {
    if (!interactive) {
      setRunning(false);
      setAtTarget(false);
      setPlayClicking(false);
      setPressed(false);
      setLoading(false);
      return;
    }
    const IDLE_BEAT = 1300; // cursor resting on Play before the click
    const PRESS_DOWN = 150; // how long each button stays pressed
    const MORPH_SETTLE = 150; // after Play morphs to Stop, before gliding
    const GLIDE = 1000; // cursor travel to Publish (matches CSS transition)
    const PUB_PRESS = 150; // arrival press → spinner
    const SPIN_HOLD = 2600; // linger on the spinner before looping
    let alive = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const after = (ms: number, fn: () => void) => {
      const id = setTimeout(() => {
        timers.delete(id);
        if (alive) fn();
      }, ms);
      timers.add(id);
    };
    const cycle = () => {
      // back to idle: cursor on Play, nothing pressed, design asleep
      setRunning(false);
      setAtTarget(false);
      setPressed(false);
      setLoading(false);
      setPlayClicking(false);
      measure();
      after(IDLE_BEAT, () => {
        setPlayClicking(true); // press the Play button (and the cursor)
        after(PRESS_DOWN, () => {
          setPlayClicking(false); // release
          setRunning(true); // → morph to Stop, dashboard wakes
          after(MORPH_SETTLE, () => {
            measure(); // fresh Publish position now the design is awake
            setAtTarget(true); // cursor glides down to Publish
            after(GLIDE, () => {
              setPressed(true); // press Publish on arrival
              after(PUB_PRESS, () => {
                setLoading(true); // spinner takes over
                after(SPIN_HOLD, cycle); // linger, then loop
              });
            });
          });
        });
      });
    };
    cycle();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [interactive, measure]);

  // Where the cursor renders this frame: target while running+arrived, else home.
  const cursorXY = atTarget ? target ?? home : home ?? target;
  // The cursor shrinks whenever it's "pressing" either button.
  const cursorPressed = playClicking || pressed;

  return (
    <div className="flex w-full flex-col gap-5">
      <style>{`
        @keyframes runHeroConfettiFall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          100% { transform: translateY(230px) rotate(var(--spin)); opacity: 0; }
        }
        @keyframes runHeroPopIn {
          0%   { transform: scale(0.6); opacity: 0; }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes runHeroChartReveal {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes runHeroDotPop {
          0%   { opacity: 0; transform: scale(0); }
          70%  { opacity: 1; transform: scale(1.35); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes runHeroValuePop {
          0%   { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes runHeroWipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
        @keyframes runHeroBtnPop {
          0%   { transform: scale(0.6); }
          60%  { transform: scale(1.14); }
          100% { transform: scale(1); }
        }
        @keyframes runHeroPress {
          0%   { transform: scale(1); }
          45%  { transform: scale(0.8); }
          100% { transform: scale(1); }
        }
        @keyframes runHeroSpin {
          to { transform: rotate(360deg); }
        }
        /* The header label + open-external ("pop out") button stay grey via
           the wrapper's blueberry→graphite token override. The play button,
           though, gets a STRONG solid-blue fill with a white ▶ — the canvas's
           live-run accent — while everything else stays grey. (Stop keeps its
           real red danger state, untouched.) */
        .rh-storyboard-header button[aria-label="Play"] {
          background-color: #02a0e7 !important;
          color: #ffffff !important;
        }
        .rh-storyboard-header button[aria-label="Play"]:hover {
          background-color: #0291d2 !important;
        }
        /* Animate the Play→Stop morph: the colour eases and the button pops in
           when it swaps. The Stop button only exists while running, so its pop
           plays on appear (and the Play pop on the way back). */
        .rh-storyboard-header button[aria-label="Play"],
        .rh-storyboard-header button[aria-label="Stop"] {
          transition: background-color 0.25s ease;
        }
        .rh-storyboard-header.rh-running button[aria-label="Stop"] {
          animation: runHeroBtnPop 0.34s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .rh-storyboard-header:not(.rh-running) button[aria-label="Play"] {
          animation: runHeroBtnPop 0.34s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        /* The auto-cursor "clicks" the play/stop button — give it the same
           press/zoom as the Publish button. Higher specificity + !important so
           it wins over the pop rules above while the click is happening. */
        .rh-storyboard-header.rh-clicking button[aria-label="Play"],
        .rh-storyboard-header.rh-clicking button[aria-label="Stop"] {
          animation: runHeroPress 0.26s cubic-bezier(0.34,1.56,0.64,1) both !important;
        }
      `}</style>

      {/* The selected storyboard: real header chrome over a blue-outlined frame */}
      <p className="px-1 text-title-3 leading-relaxed text-text-secondary">Select a storyboard and hit ▹ Run to see how your designs look in a live environment. Run the '1 · Generate' storyboard to see the animation below.</p>
      {/* Un-clipped frame so the cursor can overflow outside the card. The
          wave panel below has overflow-hidden; the cursor lives here, beside
          it, positioned in this frame's (unscaled) coordinate space. */}
      <div ref={wrapRef} className="relative">
      {/* Wallpaper backdrop: the grey wave fills a wide landscape panel while a
          narrow, vertical dashboard card floats centered on top — the wave
          shows down both sides, so the two read as different aspect ratios:
          landscape wallpaper, portrait card sitting on it. */}
      <div
        className="relative w-full overflow-hidden rounded-2xl h-[357px]"
        style={{ backgroundImage: `url(${cardWaveGrey})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center h-[391px]">
          {/* Render the dashboard at a narrow width so it reflows into a tall,
              vertical card (no text wrapping at 380px), then uniformly scale it
              to nearly fill the panel height — leaving wave wallpaper down the
              left and right edges. */}
          <div
            className="relative"
            style={{ width: 380, transform: "scale(0.8)", transformOrigin: "center center" }}
          >
        {/* REAL design-system storyboard header — label tab + open + play/stop.
            Override the blueberry tokens it reads to greys (scoped to just the
            header so the inner design's blue accents are untouched). */}
        <div
          ref={headerRef}
          className={`rh-storyboard-header relative px-0.5 pb-1${running ? " rh-running" : ""}${playClicking ? " rh-clicking" : ""}`}
          style={
            {
              "--blueberry-500": "var(--base-graphite-400)",
              "--blueberry-200": "var(--base-graphite-200)",
              "--blueberry-700-a20":
                "color-mix(in srgb, var(--base-graphite-500) 22%, transparent)",
              "--blueberry-800": "var(--base-graphite-600)",
            } as CSSProperties
          }
        >
          <StoryboardHeader
            variant="component"
            componentName="RevenueDashboard"
            active
            keepVisible
            isRunning={running}
            toolbarButtons={[{ type: "open-external" }]}
            onPlayStopClick={() => setRunning((r) => !r)}
          />
        </div>

        {/* The storyboard body, wrapped in the canvas's real selection outline */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-2xl px-6 pb-5 pt-[31px]"
            style={{
              background: PAPER,
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow:
                "0 1px 2px rgba(15,23,42,0.06), 0 14px 30px -18px rgba(15,23,42,0.25)",
            }}
          >
            {/* confetti — fires once on Run, replayed on each Run via key */}
            {running ? (
              <div key="run" aria-hidden className="pointer-events-none absolute inset-0 z-0">
                {CONFETTI.map((c, i) => (
                  <span
                    key={i}
                    className="absolute top-0 block h-2.5 w-1.5 rounded-[2px]"
                    style={{
                      left: `${c.x}%`,
                      backgroundColor: c.color,
                      ["--spin" as string]: `${c.rot * 14}deg`,
                      animation: `runHeroConfettiFall ${c.dur}s ${c.delay}s ease-in both`,
                    } as CSSProperties}
                  />
                ))}
              </div>
            ) : null}

            {/* The design itself — a dense revenue dashboard: a KPI row whose
                sparklines + a main area chart all wipe in on Run and morph up on
                Publish. The CTA is a styled button (no broken disabled state). */}
            <div className="relative z-10">
              {/* Header: big title + period chips ↔ live pill */}
              <div className="flex items-center justify-between gap-3">
                <h4 className="leading-none tracking-[-0.015em] text-[28px]" style={{ color: INK }}>Welcome, Kevin.</h4>

                <div className="flex shrink-0 items-center gap-0.5 rounded-full p-0.5" style={{ backgroundColor: TILE }}>
                  {["1W", "1M", "1Y"].map((p) => (
                    <span
                      key={p}
                      className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                      style={p === "1M" ? { color: "#fff", background: ACCENT_GRAD } : { color: MUTE }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* KPI tiles — three mini sparkline charts side by side */}
              <div key={`${chartKey}-kpis`} className="mt-6 grid grid-cols-3 gap-2.5">
                {STATS.map((s, i) => (
                  <div key={s.label} className="rounded-xl px-3 py-2.5" style={{ backgroundColor: TILE }}>
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-[10px] font-normal" style={{ color: FAINT }}>{s.label}</span>
                      <span className="inline-flex shrink-0 items-center gap-0.5 text-[9px] font-semibold" style={{ color: ACCENT }}>
                        <TrendingUp className="size-2.5" strokeWidth={3} />
                        {s.delta}
                      </span>
                    </div>
                    <div
                      className="mt-0.5 text-[16px] font-semibold leading-none tabular-nums"
                      style={{ color: INK, animation: running ? "runHeroValuePop 0.45s ease-out both" : undefined }}
                    >
                      {s.base}
                    </div>
                    <Spark vals={s.spark} accent={ACCENT} animate={running} delay={0.1 + i * 0.12} />
                  </div>
                ))}
              </div>

              {/* Main area chart */}
              <div key={`${chartKey}-main`} className="mt-2.5 rounded-xl px-3 pb-2 pt-2.5" style={{ backgroundColor: TILE }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-normal" style={{ color: FAINT }}>Monthly revenue</span>
                  <span className="text-[12px] font-semibold tabular-nums" style={{ color: INK }}>{HERO.base}</span>
                </div>
                <div
                  className="mt-2"
                  style={{
                    animation: running ? "runHeroWipe 0.9s cubic-bezier(0.4,0,0.2,1) both" : undefined,
                    opacity: running ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <svg viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" className="w-full" style={{ display: "block", height: 78 }}>
                    <defs>
                      <linearGradient id="rhArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ACCENT} stopOpacity="0.26" />
                        <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[0.5, 1].map((g) => {
                      const gy = 8 + g * (CH - 16);
                      return <line key={g} x1="0" x2={CW} y1={gy} y2={gy} stroke={BAR} strokeWidth="1" strokeDasharray="3 4" />;
                    })}
                    <path d={area} fill="url(#rhArea)" />
                    <path d={line} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                    {running ? (
                      <circle
                        cx={lastX}
                        cy={lastY}
                        r="3"
                        fill={ACCENT}
                        stroke="#fff"
                        strokeWidth="2"
                        style={{ transformBox: "fill-box", transformOrigin: "center", animation: "runHeroDotPop 0.4s 0.85s ease-out both" }}
                      />
                    ) : null}
                  </svg>
                </div>
                <div className="mt-1 flex justify-between text-[8.5px] font-medium" style={{ color: MUTE }}>
                  {MONTHS.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Footer action — the Publish CTA. Dimmed until Run; on Run it
                  fades to full opacity, the cursor glides over and presses it
                  (a slight shrink), then a spinner takes over inside it and
                  spins forever — publishing, infinitely. */}
              <div className="mt-3.5 flex items-center justify-end">
                <button
                  ref={publishRef}
                  type="button"
                  disabled
                  className="flex min-w-[128px] items-center justify-center gap-1.5 rounded-[10px] px-4 py-2 text-[12px] font-semibold text-white"
                  style={{
                    cursor: "default",
                    opacity: running ? 1 : 0.55,
                    transform: pressed ? "scale(0.94)" : "scale(1)",
                    transition:
                      "opacity 0.45s ease, transform 0.14s cubic-bezier(0.34,1.56,0.64,1)",
                    background: ACCENT_GRAD,
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.3) inset, 0 0 0 1px rgba(75,82,95,0.7), 0 6px 14px -6px rgba(75,82,95,0.5)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="size-3.5"
                        style={{ animation: "runHeroSpin 0.8s linear infinite" }}
                      />
                      Publishing…
                    </>
                  ) : (
                    "Publish snapshot"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* The transform box — a SQUARE selection that floats just outside
              the rounded card (the canvas never rounds its selection chrome),
              so the rounded card reads clearly inside it. Sized + styled to
              match the subscribe-button box: blue outline + small white corner
              handles. */}
          <div
            aria-hidden
            className="pointer-events-none absolute z-20"
            style={{
              inset: -4,
              border: `2px solid ${CHROME}`,
              boxSizing: "border-box",
            }}
          >
            {/* White corner handles — 8px squares, 1.5px blue border (exact
                canvas-selection size, matching the subscribe-button box). */}
            {HANDLES.map((pos, i) => (
              <span
                key={i}
                className="absolute block"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: 8,
                  height: 8,
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  border: `1.5px solid ${CHROME}`,
                  borderRadius: 1,
                  boxSizing: "border-box",
                }}
              />
            ))}
          </div>
        </div>
          </div>
        </div>
      </div>

        {/* The auto-driven arrow cursor — lives in the un-clipped frame so it
            can glide outside the card. Starts hovering the Play button, then
            slides to the Publish CTA and "clicks" it. The SVG tip sits near
            its top-left, so we nudge it up-left to land on the target point. */}
        {cursorXY ? (
          <span
            aria-hidden
            className="pointer-events-none absolute z-40"
            style={{
              left: cursorXY.x,
              top: cursorXY.y,
              transform: `translate(-5px, -3px) rotate(10deg) scale(${cursorPressed ? 0.82 : 1})`,
              transition:
                "left 0.98s cubic-bezier(0.45,0,0.2,1), top 0.98s cubic-bezier(0.45,0,0.2,1), transform 0.14s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <Cursor />
          </span>
        ) : null}
      </div>

      {/* baked caption (Strip's own caption slot is unused for this graphic) */}
    </div>
  );
}
