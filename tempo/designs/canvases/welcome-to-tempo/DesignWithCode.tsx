import { useEffect, useRef, type ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";
import { ArrowUpRight } from "./_ui/icons";
import { usePlayMode } from "./_playMode";
import { THEME_BRIDGE } from "./_themeBridge";

// Lesson 01: the title card. A planet rises out of the bottom right corner,
// drawn in monospace characters. The globe is set in real code and lit like
// a sphere: bright and dense on its lit side and along the rim, thinning to
// almost nothing in shadow. The ring is dust in three bands, in ordinary
// ASCII shading characters. At rest it is one still frame. In Play the code
// rides the globe as it spins, and the characters under the cursor burst:
// the middle clears, and a ring of code glyphs scatters round it.
//
// Its placement and every effect level are props with controls (see the
// defineControls call at the bottom), so they can be tuned from the canvas.

/** The three colours of the glow behind the planet: how far each follows
 *  the cursor (px), how far it wanders (px), how fast, and a phase. */
const GLOWS = [
  [150, 46, 0.33, 0],
  [80, 34, 0.24, 2.1],
  [210, 58, 0.29, 4.4],
];

const W = 1014;
const H = 600;
/** What the globe is written in. Spaces leave natural gaps. */
const SOURCE =
  '<Canvas name="Playground"> <Storyboard id="Hero" component={Hero} /> </Canvas> ' +
  'export function Hero() { return <section className="flex gap-6 p-12 rounded-2xl"> ' +
  '<h1 className="text-6xl font-semibold">Design with code.</h1> ' +
  '<Button variant="primary" size="lg">Press Play</Button> </section> } ' +
  "const tokens = { radius: 24, gap: 16, surface: '#050508' } ";
/** What the cursor's burst scatters. */
const CODE = "{}<>/=;()[]+*";
const LEVELS = 6;
/** Ring bands: inner radius, outer radius, brightness. */
const BANDS = [
  [1.5, 1.68, 0.5],
  [1.75, 2.02, 0.72],
  [2.08, 2.15, 0.4],
];
/** The ring's characters, faintest to brightest. */
const RAMP = ".,:;-~=+*x%#";

function hash(a: number, b: number) {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Props = {
  /** Where the planet's centre sits in the 1014 x 600 frame, and its radius. */
  planetX?: number;
  planetY?: number;
  planetSize?: number;
  /** How far the ring is tipped open, and how far the whole planet leans (degrees). */
  ringTilt?: number;
  lean?: number;
  /** Character size in px, and how tightly the characters are packed. */
  fontSize?: number;
  spacing?: number;
  /** Overall brightness of the characters. */
  brightness?: number;
  /** How much of the globe is filled with code: low is a thin crescent. */
  fill?: number;
  /** The bright edge round the globe. */
  rim?: number;
  /** The ring's brightness; 0 hides it. */
  ring?: number;
  stars?: boolean;
  /** The coloured glow behind: how strong, and how far it wanders. */
  glow?: number;
  glowMotion?: number;
  /** How fast the globe turns in Play. */
  spinSpeed?: number;
  /** The cursor's burst in Play: how wide, and how strong. */
  burstSize?: number;
  burstStrength?: number;
  /** Corner roundness of the frame, in px. */
  radius?: number;
  /** The two lines under the headline. */
  taglineFirst?: string;
  taglineSecond?: string;
  /** The small label and the two headline lines. */
  eyebrow?: string;
  headlineFirst?: string;
  headlineSecond?: string;
  /** Used as a closing band inside another lesson: no frame of its own and
   *  no Play hint. */
  embedded?: boolean;
  /** Shown under the two lines, e.g. a button. */
  action?: ReactNode;
};

export function DesignWithCode({
  planetX = 850,
  planetY = 425,
  planetSize = 270,
  ringTilt = 22,
  lean = -21,
  fontSize = 13,
  spacing = 1,
  brightness = 1,
  fill = 1,
  rim = 1,
  ring = 1,
  stars = true,
  glow = 0,
  glowMotion = 1,
  spinSpeed = 1,
  burstSize = 1,
  burstStrength = 1,
  radius = 10,
  taglineFirst = "A canvas that feels familiar.",
  taglineSecond = "Real code beneath everything you create.",
  eyebrow = "01 / 05 · Welcome to Tempo",
  headlineFirst = "Design",
  headlineSecond = "with code.",
  embedded = false,
  action,
}: Props) {
  const CX = planetX;
  const CY = planetY;
  const rimLevel = rim;
  const ringLevel = ring;
  const inPlay = usePlayMode();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textBaseline = "top";

    const R = planetSize;
    const TILT = Math.max(0.05, (ringTilt * Math.PI) / 180);
    const ROLL = (lean * Math.PI) / 180;
    // one character cell
    const CELL_W = fontSize * 0.6 * spacing;
    const CELL_H = fontSize * 0.96 * spacing;
    const COLS = Math.ceil(W / CELL_W);
    const ROWS = Math.ceil(H / CELL_H);

    const cosR = Math.cos(ROLL);
    const sinR = Math.sin(ROLL);
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    // The cursor as the grid feels it: eased, with a strength that fades.
    const mouse = {
      x: W / 2,
      y: H / 2,
      tx: W / 2,
      ty: H / 2,
      power: 0,
      target: 0,
    };
    let spin = 0.6;
    let time = 10;
    // The light, from the upper left of the frame, in the planet's own
    // (leaning) coordinates.
    const LX = -0.6 * cosR - 0.55 * sinR;
    const LY = -0.6 * sinR + 0.55 * cosR;
    const LZ = 0.58;
    // characters to draw, grouped by brightness so each group is one fill
    // style; everything is white
    const groups: { ch: string; x: number; y: number }[][] = Array.from(
      { length: LEVELS },
      () => [],
    );
    const styles = groups.map(
      (_, level) =>
        `rgba(244,244,250,${(0.16 + 0.84 * (level / (LEVELS - 1))).toFixed(3)})`,
    );
    // what a point of the frame shows; filled in by sample()
    const hit = { light: 0, ch: "" };

    const sample = (px: number, py: number, col: number, row: number) => {
      hit.light = 0;
      hit.ch = "";
      const a = (px - CX) / R;
      const b = (py - CY) / R;
      const x0 = a * cosR + b * sinR;
      const y1 = a * sinR - b * cosR;
      const d2 = x0 * x0 + y1 * y1;

      // the ring's plane, where this line of sight crosses it
      const ringZ1 = (-y1 * cosT) / sinT;
      const ringZ0 = -y1 / sinT;
      const rr = Math.hypot(x0, ringZ0);
      const ring0 = ringLevel * brightness;
      let ring = 0;
      let ringCh = "";
      for (const [from, to, light] of BANDS) {
        if (rr > from && rr < to) {
          const edge = Math.min(rr - from, to - rr) / (to - from);
          // dust: uneven along the band, turning slowly with the planet
          const ang = Math.atan2(ringZ0, x0) - spin * 0.4;
          const grain =
            0.55 + 0.45 * hash(Math.floor(ang * 70), Math.floor(rr * 60));
          ring = Math.min(
            1,
            light * grain * Math.min(1, 0.35 + edge * 2.2) * ring0,
          );
          const v = ring + (hash(col, row + 40) - 0.5) * 0.1;
          ringCh =
            RAMP[
              Math.max(
                0,
                Math.min(RAMP.length - 1, Math.round(v * (RAMP.length - 1))),
              )
            ];
        }
      }

      if (d2 < 1) {
        const z1 = Math.sqrt(1 - d2);
        // the ring passes in front of the globe on its near side
        if (ring > 0 && ringZ1 > z1) {
          hit.light = ring;
          hit.ch = ringCh;
          return;
        }
        // lit like a sphere, with a bright rim where it turns away
        const diff = Math.max(0, x0 * LX + y1 * LY + z1 * LZ);
        const rim = Math.pow(1 - z1, 4);
        // a little light still drifts over the surface
        const y0 = y1 * cosT + z1 * sinT;
        const z0 = -y1 * sinT + z1 * cosT;
        const X = x0 * Math.cos(spin) + z0 * Math.sin(spin);
        const wisp = Math.pow(
          0.5 + 0.5 * Math.sin((y0 * 1.3 + X * 0.7) * 2.2 + time * 0.12),
          3,
        );
        const lit =
          0.03 +
          0.7 * Math.pow(diff, 1.3) +
          0.14 * wisp * diff +
          0.95 * rim * rimLevel;
        // density follows the light: the shadow side thins to almost nothing
        if (hash(col * 1.3, row * 2.1) > (0.12 + lit * 1.5) * fill) return;
        const light = Math.min(1, lit * brightness);
        // the code rides the surface as the globe turns
        const ch =
          SOURCE[
            (((col + row * 31 + Math.floor(spin * 26)) % SOURCE.length) +
              SOURCE.length) %
              SOURCE.length
          ];
        if (ch === " ") return;
        hit.light = light;
        hit.ch = ch;
        return;
      }
      // behind the globe the ring is hidden; elsewhere it shows
      if (ring > 0) {
        hit.light = ring;
        hit.ch = ringCh;
      }
    };

    const frame = (animate: boolean) => {
      ctx.clearRect(0, 0, W, H);
      for (const g of groups) g.length = 0;
      const beat = Math.floor(time * 9);
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * CELL_W;
          const y = row * CELL_H;
          const px = x + CELL_W / 2;
          const py = y + CELL_H / 2;
          sample(px, py, col, row);
          let light = hit.light;
          let ch = hit.ch;
          // faint stars in the empty sky
          if (!ch) {
            const star = hash(col, row);
            if (!stars || star <= 0.988) continue;
            const tw = animate
              ? 0.6 + 0.4 * Math.sin(time * (1 + star * 3) + col)
              : 0.8;
            light = 0.14 * tw;
            ch = ".";
          }
          if (animate && mouse.power > 0.01) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const bell =
              Math.exp(-(dx * dx + dy * dy) / (7000 * burstSize * burstSize)) *
              mouse.power *
              burstStrength;
            if (bell > 0.04) {
              const own = hash(col * 3.1, row * 1.7);
              // the middle clears, each cell at its own moment
              if (own < bell * 1.15 - 0.2) continue;
              // round it, code glyphs flicker and flare
              if (own < bell * 2.2) {
                ch =
                  CODE[Math.floor(hash(col + beat, row - beat) * CODE.length)];
                light = Math.min(1, light + 0.5 * bell + 0.25);
              }
            }
          }
          const level = Math.max(
            0,
            Math.min(LEVELS - 1, Math.floor(light * LEVELS)),
          );
          groups[level].push({ ch, x, y });
        }
      }
      for (let g = 0; g < groups.length; g++) {
        if (!groups[g].length) continue;
        ctx.fillStyle = styles[g];
        for (const c of groups[g]) ctx.fillText(c.ch, c.x, c.y);
      }
    };

    if (!inPlay) {
      frame(false);
      return;
    }

    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width) * W;
      mouse.ty = ((e.clientY - r.top) / r.height) * H;
      mouse.target = 1;
    };
    const leave = () => {
      mouse.target = 0;
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    const flow = { x: 0, y: 0 };
    let raf = 0;
    const loop = () => {
      spin += 0.0016 * spinSpeed;
      time += 1 / 60;
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      mouse.power += (mouse.target - mouse.power) * 0.08;
      // the glow behind leans toward the cursor, each colour by its own amount
      // Each colour wanders on its own slow path and swells a little, and
      // all of them drift after the cursor, well behind it, so the light
      // flows instead of tracking the pointer.
      flow.x += (((mouse.x - W / 2) / (W / 2)) * mouse.power - flow.x) * 0.025;
      flow.y += (((mouse.y - H / 2) / (H / 2)) * mouse.power - flow.y) * 0.025;
      GLOWS.forEach(([reach, wander, pace, phase], i) => {
        const t = time * pace + phase;
        const far = wander * glowMotion;
        const x =
          flow.x * reach +
          Math.sin(t) * far +
          Math.sin(t * 0.43 + 1.7) * far * 0.5;
        const y =
          flow.y * reach +
          Math.cos(t * 0.8) * far * 0.7 +
          Math.sin(t * 0.31 + 0.6) * far * 0.4;
        root.style.setProperty(`--g${i + 1}x`, `${x.toFixed(1)}px`);
        root.style.setProperty(`--g${i + 1}y`, `${y.toFixed(1)}px`);
        root.style.setProperty(
          `--g${i + 1}s`,
          (1 + 0.12 * Math.sin(t * 0.6 + phase)).toFixed(3),
        );
      });
      frame(true);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      for (let i = 1; i <= GLOWS.length; i++)
        for (const k of ["x", "y", "s"])
          root.style.removeProperty(`--g${i}${k}`);
    };
  }, [
    inPlay,
    CX,
    CY,
    planetSize,
    ringTilt,
    lean,
    fontSize,
    spacing,
    brightness,
    fill,
    rimLevel,
    ringLevel,
    stars,
    glowMotion,
    spinSpeed,
    burstSize,
    burstStrength,
  ]);

  return (
    <div
      ref={rootRef}
      data-theme="dark"
      data-tutorial-token-scope=""
      style={{ ...THEME_BRIDGE, borderRadius: embedded ? 0 : radius }}
      className={
        embedded
          ? "relative h-[600px] w-[1014px] overflow-hidden bg-[#050508] font-sans text-text-primary"
          : "relative h-[600px] w-[1014px] overflow-hidden border border-border-primary bg-[#050508] font-sans text-text-primary"
      }
    >
      {/* An optional coloured light behind the planet. Off by default; the
          glow control turns it up. */}
      <div
        className="pointer-events-none absolute inset-0 blur-[40px]"
        style={{ opacity: Math.max(0, Math.min(1, glow / 2)) }}
      >
        <div
          className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.26)_0%,rgba(255,150,90,0.08)_35%,transparent_65%)]"
          style={{
            left: CX - 470,
            top: CY - 420,
            width: 640,
            height: 640,
            transform:
              "translate(var(--g1x, 0px), var(--g1y, 0px)) scale(var(--g1s, 1))",
          }}
        />
        <div
          className="absolute rounded-full bg-[radial-gradient(circle,rgba(200,90,230,0.2)_0%,rgba(140,70,200,0.07)_40%,transparent_68%)]"
          style={{
            left: CX - 380,
            top: CY - 380,
            width: 760,
            height: 760,
            transform:
              "translate(var(--g2x, 0px), var(--g2y, 0px)) scale(var(--g2s, 1))",
          }}
        />
        <div
          className="absolute rounded-full bg-[radial-gradient(circle,rgba(70,140,255,0.22)_0%,rgba(60,110,230,0.07)_40%,transparent_66%)]"
          style={{
            left: CX - 150,
            top: CY - 150,
            width: 640,
            height: 640,
            transform:
              "translate(var(--g3x, 0px), var(--g3y, 0px)) scale(var(--g3s, 1))",
          }}
        />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: W, height: H }}
      />
      <div className="absolute left-14 top-1/2 z-20 flex w-[440px] -translate-y-[56%] flex-col gap-5">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-tertiary">
          {eyebrow}
        </span>
        <h1 className="text-[64px] font-semibold leading-[66px] tracking-[-0.035em]">
          {headlineFirst}
          <br />
          {headlineSecond}
        </h1>
        <p className="max-w-[395px] text-[17px] leading-[26px] text-text-secondary">
          {taglineFirst}
          <br />
          {taglineSecond}
        </p>
        {action}
      </div>
      {embedded ? null : (
        <div className="absolute right-6 top-5 z-20 flex items-center gap-2 text-[15px] font-medium text-text-primary">
          {inPlay ? (
            "You're in! Click outside to exit, then head right →"
          ) : (
            <>
              Press
              {/* A picture of the board's Play button, so it is easy to spot
                  in the title bar. Not a control. */}
              <span
                aria-hidden
                className="flex size-6 items-center justify-center rounded-sm bg-[rgba(2,175,252,0.2)] text-[var(--blueberry-200)]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M9.4453 6.423C9.26855 7.0945 8.43335 7.569 6.76285 8.51805C5.148 9.43545 4.3406 9.8942 3.68991 9.7098C3.4209 9.63355 3.1758 9.4888 2.97812 9.28935C2.5 8.80695 2.5 7.8713 2.5 6C2.5 4.1287 2.5 3.19305 2.97812 2.71066C3.1758 2.51123 3.4209 2.36644 3.68991 2.29021C4.3406 2.10583 5.148 2.56454 6.76285 3.48197C8.43335 4.43099 9.26855 4.9055 9.4453 5.577C9.51825 5.8542 9.51825 6.1458 9.4453 6.423Z"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Play up here
            </>
          )}
          {inPlay ? null : (
            <ArrowUpRight className="size-5 text-[var(--blueberry-300)]" />
          )}
        </div>
      )}
    </div>
  );
}

defineControls(DesignWithCode, {
  planetX: { type: "range", min: 300, max: 1100, step: 5 },
  planetY: { type: "range", min: 0, max: 700, step: 5 },
  planetSize: { type: "range", min: 80, max: 500, step: 5 },
  ringTilt: { type: "range", min: 5, max: 80, step: 1 },
  lean: { type: "range", min: -90, max: 90, step: 1 },
  fontSize: { type: "range", min: 6, max: 24, step: 1 },
  spacing: { type: "range", min: 0.7, max: 2, step: 0.05 },
  brightness: { type: "range", min: 0.2, max: 2, step: 0.05 },
  fill: { type: "range", min: 0.2, max: 3, step: 0.05 },
  rim: { type: "range", min: 0, max: 2, step: 0.05 },
  ring: { type: "range", min: 0, max: 2, step: 0.05 },
  stars: { type: "boolean" },
  glow: { type: "range", min: 0, max: 2, step: 0.05 },
  glowMotion: { type: "range", min: 0, max: 3, step: 0.1 },
  spinSpeed: { type: "range", min: 0, max: 5, step: 0.1 },
  burstSize: { type: "range", min: 0.3, max: 3, step: 0.1 },
  burstStrength: { type: "range", min: 0, max: 2, step: 0.05 },
  radius: { type: "range", min: 0, max: 32, step: 1 },
  taglineFirst: { type: "text" },
  taglineSecond: { type: "text" },
  eyebrow: { type: "text" },
  headlineFirst: { type: "text" },
  headlineSecond: { type: "text" },
  embedded: { type: "boolean" },
  action: false,
});
