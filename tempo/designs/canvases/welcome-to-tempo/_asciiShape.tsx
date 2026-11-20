import { type CSSProperties, useEffect, useRef } from "react";
import { usePlayMode } from "./_playMode";

// A small solid drawn in ASCII, in the same hand as the intro's planet: the
// lit side is written in code, the shadow side thins out to punctuation. It
// holds still at rest. In Play it turns, and the cursor clears a hole in it
// with a ring of scattered code glyphs, as on the planet.

export type AsciiShapeKind = "frame" | "torus" | "link" | "planet";

const SOURCE =
  `export function Hero() { return <section className="flex gap-6 p-12"> ` +
  `<h1 className="text-6xl font-semibold">Design with code.</h1> ` +
  `<Button variant="primary" size="lg">Press Play</Button> </section> } ` +
  `const tokens = { radius: 24, gap: 16, surface: '#050508' } `;
const BURST = "{}<>/=;()[]+*";
const RAMP = ".,:;-~=+*x%#";
const FONT_PX = 11;
const CELL_W = 6.6;
const CELL_H = 11.5;

type Vec = [number, number, number];

function hash(a: number, b: number) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function torus(x: number, y: number, z: number, R: number, r: number) {
  const q = Math.hypot(x, z) - R;
  return Math.hypot(q, y) - r;
}

/** The edges of a box, as rods of thickness e. */
function boxFrame(x: number, y: number, z: number, b: number, e: number) {
  const px = Math.abs(x) - b;
  const py = Math.abs(y) - b;
  const pz = Math.abs(z) - b;
  const qx = Math.abs(px + e) - e;
  const qy = Math.abs(py + e) - e;
  const qz = Math.abs(pz + e) - e;
  const rod = (a: number, b2: number, c: number) =>
    Math.hypot(Math.max(a, 0), Math.max(b2, 0), Math.max(c, 0)) +
    Math.min(Math.max(a, b2, c), 0);
  return Math.min(rod(px, qy, qz), rod(qx, py, qz), rod(qx, qy, pz));
}

const SHAPES: Record<
  AsciiShapeKind,
  (x: number, y: number, z: number) => number
> = {
  frame: (x, y, z) => boxFrame(x, y, z, 0.6, 0.075),
  torus: (x, y, z) => torus(x, y, z, 0.62, 0.27),
  // two rings through each other
  link: (x, y, z) =>
    Math.min(
      torus(x + 0.3, y, z, 0.46, 0.15),
      torus(x - 0.3, z, y, 0.46, 0.15),
    ),
  // a globe and its ring
  planet: (x, y, z) =>
    Math.min(
      Math.hypot(x, y, z) - 0.55,
      Math.max(Math.abs(y) - 0.018, Math.abs(Math.hypot(x, z) - 0.92) - 0.13),
    ),
};

const LIGHT: Vec = (() => {
  const v: Vec = [-0.6, 0.55, -0.58];
  const n = Math.hypot(...v);
  return [v[0] / n, v[1] / n, v[2] / n];
})();

export function AsciiShape({
  shape,
  width = 300,
  height = 260,
  className,
  style,
}: {
  shape: AsciiShapeKind;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const inPlay = usePlayMode();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${FONT_PX}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textBaseline = "top";

    const sdf = SHAPES[shape];
    const cols = Math.floor(width / CELL_W);
    const rows = Math.floor(height / CELL_H);
    // one unit of the solid, in px
    const unit = Math.min(width, height) * 0.46;
    const tilt = { frame: 0.5, torus: 1.0, link: 0.75, planet: 0.42 }[shape];
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const mouse = { x: -999, y: -999, tx: -999, ty: -999, power: 0, on: false };

    const draw = (angle: number) => {
      ctx.clearRect(0, 0, width, height);
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);
      // view space -> the solid's own space: tilt towards the viewer, then spin
      const local = (x: number, y: number, z: number): Vec => {
        const y1 = y * cosT - z * sinT;
        const z1 = y * sinT + z * cosT;
        return [x * ca - z1 * sa, y1, x * sa + z1 * ca];
      };
      const dist = (x: number, y: number, z: number) => {
        const p = local(x, y, z);
        return sdf(p[0], p[1], p[2]);
      };
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * CELL_W + CELL_W / 2;
          const py = row * CELL_H + CELL_H / 2;
          const x = (px - width / 2) / unit;
          const y = -(py - height / 2) / unit;
          // march straight into the screen
          let z = -1.6;
          let hit = false;
          for (let i = 0; i < 28 && z < 1.6; i++) {
            const d = dist(x, y, z);
            if (d < 0.012) {
              hit = true;
              break;
            }
            z += Math.max(d, 0.02);
          }
          if (!hit) continue;
          const e = 0.02;
          const nx = dist(x + e, y, z) - dist(x - e, y, z);
          const ny = dist(x, y + e, z) - dist(x, y - e, z);
          const nz = dist(x, y, z + e) - dist(x, y, z - e);
          const nl = Math.hypot(nx, ny, nz) || 1;
          const diff = Math.max(
            0,
            (nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]) / nl,
          );
          const rim = Math.pow(1 - Math.abs(nz / nl), 3);
          const light = Math.min(
            1,
            0.14 + 0.75 * Math.pow(diff, 1.2) + 0.5 * rim,
          );
          const own = hash(col * 1.3, row * 2.1);
          // density follows the light
          if (own > 0.3 + light * 1.5) continue;

          let ch: string;
          let alpha: number;
          if (light > 0.42) {
            ch = SOURCE[(row * cols + col) % SOURCE.length];
            if (ch === " ") continue;
            alpha = 0.35 + light * 0.6;
          } else {
            ch =
              RAMP[
                Math.min(
                  RAMP.length - 1,
                  Math.floor((light / 0.42) * RAMP.length),
                )
              ];
            alpha = 0.26 + light * 0.8;
          }

          // the cursor's burst
          if (mouse.power > 0.01) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const bell =
              Math.exp(-(dx * dx + dy * dy) / (unit * unit * 0.2)) *
              mouse.power;
            if (own < bell * 1.15 - 0.2) continue;
            if (own < bell * 2.2) {
              ch =
                BURST[Math.floor(hash(col + angle * 40, row) * BURST.length)];
              alpha = Math.min(1, alpha + 0.3);
            }
          }
          ctx.fillStyle = `rgba(244,244,250,${alpha.toFixed(3)})`;
          ctx.fillText(ch, col * CELL_W, row * CELL_H);
        }
      }
    };

    let angle = 0.7;
    if (!inPlay) {
      draw(angle);
      return;
    }

    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const sx = box.width ? width / box.width : 1;
      mouse.tx = (event.clientX - box.left) * sx;
      mouse.ty = (event.clientY - box.top) * sx;
      mouse.on =
        mouse.tx > -60 &&
        mouse.tx < width + 60 &&
        mouse.ty > -60 &&
        mouse.ty < height + 60;
      if (mouse.x < -900) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      angle += 0.008;
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      mouse.power += ((mouse.on ? 1 : 0) - mouse.power) * 0.08;
      draw(angle);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [inPlay, shape, width, height]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ ...style, width, height }}
    />
  );
}
