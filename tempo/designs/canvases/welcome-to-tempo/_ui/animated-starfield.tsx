// Verbatim copy of @tempo-modules/tempo-design-system
// components/composites/animated-starfield.tsx (react + tempo-sdk only), so the
// vendored tutorial canvas renders without the private design-system package.
import { defineControls } from "tempo-sdk/assets";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type GlowPosition = "left" | "center" | "right";

interface AnimatedStarfieldProps {
  /** When set, shows a radial glow at the given horizontal position with a power-on animation. */
  glowPosition?: GlowPosition;
  /**
   * Multiplier on star + shooting-star size and drift. Defaults to 1 (the
   * viewport-scale tuning every page uses).
   *
   * Raise it only for surfaces far larger than a viewport — e.g. a
   * 4200px export artboard — where the default sub-pixel dots read as
   * dust. Scaling the element with CSS instead would upsample the
   * canvas buffer and smear the stars; this keeps the buffer native and
   * draws bigger geometry into it.
   */
  starScale?: number;
  /**
   * Advance motion by a wall-clock delta normalized to 120 Hz instead of a
   * per-rAF-tick frame count, so the animation runs at the same visible speed
   * regardless of the display's refresh rate (fixes the "static on 60 Hz
   * Windows" bug — TEM-1262). Opt-in: the app + sign-in surfaces enable it;
   * the marketing site keeps the legacy frame-count timing. Defaults to false.
   */
  refreshRateIndependent?: boolean;
  /** Draw one still frame (the reduced-motion sky) — no rAF loop. For
   *  surfaces like modals where a moving sky is too heavy. */
  still?: boolean;
}

const GLOW_X: Record<GlowPosition, string> = {
  left: "25%",
  center: "50%",
  right: "75%",
};

const cornerFadeMask: React.CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to top left, transparent 0%, black 80%), linear-gradient(to top right, transparent 0%, black 80%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to top left, transparent 0%, black 80%), linear-gradient(to top right, transparent 0%, black 80%)",
  maskComposite: "intersect",
};

/**
 * `prefers-reduced-motion: reduce` turns the sky into a still: one frame of
 * stars at their seeded starting positions and twinkle, no drift, no shooting
 * stars, and the glow lit without its power-on delay. Read at mount, like the
 * rest of this component's environment probes. Beyond the accessibility
 * preference itself, every visual-regression capture (the headless engine
 * and the in-app capture lane) emulates this media feature, so a tracked
 * storyboard that sits on a starfield renders the same pixels no matter how
 * many animation frames elapsed before the capture landed.
 */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

let glowStyleInjected = false;
function ensureGlowKeyframes() {
  if (glowStyleInjected || typeof document === "undefined") return;
  glowStyleInjected = true;
  const style = document.createElement("style");
  style.textContent = `
@keyframes glow-power-on { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes stars-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
`;
  document.head.appendChild(style);
}

function CornerGlow({ inverted = false }: { inverted?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: inverted ? "rotate(180deg)" : undefined,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top left, rgba(212,212,212,0.45) 0%, transparent 40%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top right, rgba(212,212,212,0.45) 0%, transparent 40%)",
        }}
      />
    </div>
  );
}

function useGlowOnView(enabled: boolean, still = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"off" | "warming" | "on">("off");

  useEffect(() => {
    if (!enabled || still) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reduced motion skips the one-second power-on: the glow is simply
          // there, so a capture never lands mid-warm-up.
          setPhase(prefersReducedMotion() ? "on" : "warming");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, still]);

  useEffect(() => {
    if (!enabled || phase !== "warming") return;
    const timer = setTimeout(() => setPhase("on"), 1000);
    return () => clearTimeout(timer);
  }, [enabled, phase]);

  return { ref, phase: still ? ("on" as const) : phase };
}

const COLS = 24;
const ROWS = 18;
const DRIFT_RANGE = 12;
const DRIFT_SPEED = 0.001;
const EXTRA_RANDOM_STARS = 200;
const COLORS = ["#ffffff", "#f0faff", "#fffef5", "#e8f0ff", "#fff8e8"];

// Each still sky owns its random stream. Even a capture-seeded Math.random
// can advance differently as lazy imports and other components mount.
function createStillStarRandom(): () => number {
  let seed = 0x74656d70;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

// Shooting stars config
const SHOOT_INTERVAL_MIN = 4000;
const SHOOT_INTERVAL_MAX = 8000;
const SHOOT_SPEED_MIN = 0.8;
const SHOOT_SPEED_MAX = 1.8;
const SHOOT_LENGTH_MIN = 80;
const SHOOT_LENGTH_MAX = 180;
const SHOOT_OPACITY = 0.9;
const SHOOT_BURST_MIN = 1;
const SHOOT_BURST_MAX = 4;
const SHOOT_STAGGER = 250; // ms between each star in a burst

// Motion timing (only when `refreshRateIndependent` is set). `dt` is driven by
// a WALL-CLOCK delta, not a frame count, so the animation runs at the same
// visible speed regardless of the display's refresh rate. It is normalized to
// the 120 Hz ProMotion reference the design was tuned and approved on — one
// 120 Hz frame (≈8.33 ms) == dt 1 — so macOS is unchanged and a 60 Hz display
// (typical Windows) advances by ≈2 per draw to match, instead of running at
// half speed. MAX_DT clamps the step so returning from a background tab
// (elapsed in the seconds) doesn't teleport every star in one frame; ≈66 ms
// still covers ambient half-rate draws down to ~15 fps. When the flag is off,
// motion falls back to the legacy per-tick frame count (LEGACY_MAX_DT).
const REFERENCE_FRAME_MS = 1000 / 120;
const MAX_DT = 8;
const LEGACY_MAX_DT = 4;

// Pre-computed direction vector for 210° shooting angle
const SHOOT_ANGLE = (7 * Math.PI) / 6;
const SHOOT_DIR_X = Math.cos(SHOOT_ANGLE);
const SHOOT_DIR_Y = -Math.sin(SHOOT_ANGLE);

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  length: number;
  life: number;
  maxLife: number;
}

// Burst zones — each burst targets a different region, cycling through
const BURST_ZONES = [
  { x: [0, 0.3], y: [0, 0.4] }, // top-left
  { x: [0.7, 1], y: [0, 0.4] }, // top-right (far right)
  { x: [0.3, 0.7], y: [0.3, 0.7] }, // center
  { x: [0, 0.3], y: [0.6, 1] }, // bottom-left
  { x: [0.7, 1], y: [0.6, 1] }, // bottom-right
  { x: [0.3, 0.7], y: [0, 0.4] }, // top-center
];

function createShootingStar(
  width: number,
  height: number,
  zoneIndex: number,
  starScale = 1,
): ShootingStar {
  const speed =
    (SHOOT_SPEED_MIN + Math.random() * (SHOOT_SPEED_MAX - SHOOT_SPEED_MIN)) *
    starScale;

  // Spawn within the current burst zone
  const zone = BURST_ZONES[zoneIndex % BURST_ZONES.length];
  const startX = (zone.x[0] + Math.random() * (zone.x[1] - zone.x[0])) * width;
  const startY = (zone.y[0] + Math.random() * (zone.y[1] - zone.y[0])) * height;

  return {
    x: startX,
    y: startY,
    vx: SHOOT_DIR_X * speed,
    vy: SHOOT_DIR_Y * speed,
    speed,
    length:
      (SHOOT_LENGTH_MIN +
        Math.random() * (SHOOT_LENGTH_MAX - SHOOT_LENGTH_MIN)) *
      starScale,
    life: 0,
    maxLife: 80 + Math.random() * 60,
  };
}

interface Star {
  anchorX: number;
  anchorY: number;
  size: number;
  color: string;
  angle: number;
  angleSpeed: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

function makeStar(
  anchorX: number,
  anchorY: number,
  sizeMax: number,
  rand = Math.random,
  starScale = 1,
): Star {
  return {
    anchorX,
    anchorY,
    size: (rand() * sizeMax + 0.1) * starScale,
    color: COLORS[Math.floor(rand() * COLORS.length)],
    angle: rand() * Math.PI * 2,
    angleSpeed: (rand() - 0.5) * DRIFT_SPEED,
    radius: rand() * DRIFT_RANGE * starScale,
    pulse: rand() * Math.PI,
    pulseSpeed: 0.01 + rand() * 0.04,
  };
}

function createStars(
  width: number,
  height: number,
  rand = Math.random,
  starScale = 1,
): Star[] {
  const cellWidth = width / COLS;
  const cellHeight = height / ROWS;
  const stars: Star[] = [];

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let anchorX = i * cellWidth + rand() * cellWidth;
      let anchorY = j * cellHeight + rand() * cellHeight;

      if (j > ROWS * 0.7) {
        anchorY -= rand() * (height * 0.1);
      }

      stars.push(makeStar(anchorX, anchorY, 1.2, rand, starScale));
    }
  }

  for (let i = 0; i < EXTRA_RANDOM_STARS; i++) {
    stars.push(makeStar(rand() * width, rand() * height, 0.8, rand, starScale));
  }

  for (let i = 0; i < 15; i++) {
    const star = makeStar(
      rand() * width,
      rand() * height,
      1.8,
      rand,
      starScale,
    );
    star.pulseSpeed = 0.01 + rand() * 0.04;
    stars.push(star);
  }

  return stars;
}

function StarfieldCanvas({
  starScale = 1,
  refreshRateIndependent = false,
  still = false,
}: {
  starScale?: number;
  refreshRateIndependent?: boolean;
  still?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const builtScaleRef = useRef<number | null>(null);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nextShootRef = useRef<number>(0);
  const burstQueueRef = useRef<number[]>([]);
  const burstZoneRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;
    const reducedMotion = still || prefersReducedMotion();

    // Size the canvas buffer to the container's CSS dimensions, capped at
    // a total-pixel budget. On desktop we stay at DPR=1 with a 2.07M-pixel
    // cap (1920×1080): stars are sub-pixel dots so there's no visual
    // payoff for higher DPR, and desktop browser zoom inflates
    // `devicePixelRatio` — which is how the page used to balloon on zoom.
    // On touch / small-viewport devices we render at min(DPR, 3) with an
    // 8M-pixel cap: pinch-zoom on mobile is a visual-viewport zoom that
    // does NOT mutate DPR, so the memory cost is fixed at mount, and
    // rendering at the container's CSS size on a DPR-3 phone otherwise
    // gets upscaled 3× by the device and smears the stars. We use a
    // *total-pixel* cap (not per-axis) so a tall hero-section wrapper
    // doesn't claw the scale below 1× — which would make the buffer
    // smaller than the CSS box and be worse than the previous DPR=1 fix.
    // The scale is isotropic so the cap doesn't warp diamond stars into
    // ellipses when only one axis would otherwise need to clip.
    const container = canvas.parentElement;
    const containerW = container?.clientWidth ?? 1920;
    const containerH = container?.clientHeight ?? 1080;
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches ||
        window.matchMedia?.("(pointer: coarse)").matches ||
        window.innerWidth <= 767);
    const requestedDpr = isTouch
      ? Math.min(window.devicePixelRatio || 1, 3)
      : 1;
    const maxPixels = isTouch ? 8 * 1024 * 1024 : 1920 * 1080;
    const cssArea = Math.max(1, containerW) * Math.max(1, containerH);
    const requestedPixels = cssArea * requestedDpr * requestedDpr;
    const scaleRaw =
      requestedPixels > maxPixels
        ? Math.sqrt(maxPixels / cssArea)
        : requestedDpr;
    // On touch, floor at 1× — going below would re-introduce blur worse
    // than the previous DPR=1 baseline. On desktop, let the cap clamp
    // below 1 so an over-cap container (e.g. ultra-wide monitor) still
    // gets a buffer no larger than `maxPixels` total.
    const scale = isTouch ? Math.max(1, scaleRaw) : scaleRaw;
    const fixedW = Math.max(1, Math.round(containerW * scale));
    const fixedH = Math.max(1, Math.round(containerH * scale));
    canvas.width = fixedW;
    canvas.height = fixedH;
    // Draw in CSS-pixel coords; the isotropic scale maps to buffer pixels.
    if (scale !== 1) ctx.scale(scale, scale);
    const cssW = containerW;
    const cssH = containerH;

    // Stars are cached across re-runs so the sky doesn't reshuffle, but a
    // changed starScale has to rebuild them — their sizes are baked in.
    if (starsRef.current.length === 0 || builtScaleRef.current !== starScale) {
      const random = reducedMotion ? createStillStarRandom() : Math.random;
      starsRef.current = createStars(cssW, cssH, random, starScale);
      builtScaleRef.current = starScale;
    }

    // One frame of stars, advanced by `dt` ticks. Twinkle is applied via
    // `globalAlpha` instead of baked into the fillStyle as an "#rrggbbaa"
    // string. The string form allocated 432 strings per frame (plus the
    // implicit parse on every fillStyle assignment), which at 120 Hz on
    // ProMotion iPhones meant ~52k allocations/sec — pure GC pressure for an
    // animation that's purely background decoration. globalAlpha is a single
    // number assignment, no parsing, no GC.
    function drawStars(dt: number) {
      ctx.clearRect(0, 0, cssW, cssH);
      for (const s of starsRef.current) {
        s.angle += s.angleSpeed * dt;
        const currentX = s.anchorX + Math.cos(s.angle) * s.radius;
        const currentY = s.anchorY + Math.sin(s.angle * 0.8) * (s.radius * 0.5);

        s.pulse += s.pulseSpeed * dt;
        const twinkle = 0.15 + ((Math.sin(s.pulse) + 1) / 2) * 0.85;

        const sz = s.size / 1.5;

        if (sz > 0.33) {
          ctx.globalAlpha = twinkle * 0.2;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          const hr = sz * 3;
          ctx.moveTo(currentX, currentY - hr);
          ctx.lineTo(currentX + hr, currentY);
          ctx.lineTo(currentX, currentY + hr);
          ctx.lineTo(currentX - hr, currentY);
          ctx.closePath();
          ctx.fill();
        }

        ctx.globalAlpha = twinkle;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY - sz);
        ctx.lineTo(currentX + sz, currentY);
        ctx.lineTo(currentX, currentY + sz);
        ctx.lineTo(currentX - sz, currentY);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Reduced motion: the sky is a still. Draw the seeded starting frame once
    // — no drift, no twinkle, no shooting stars, no rAF loop to pace — so the
    // pixels never depend on how long the canvas has been mounted.
    if (reducedMotion) {
      drawStars(0);
      return;
    }

    // Pause rAF when the canvas leaves the viewport. Each instance
    // previously kept burning ~16ms/frame even when scrolled out of
    // view — with 3+ starfields on the landing page that's ~48ms/frame
    // of CPU/GPU work for nothing. `visible` flips synchronously inside
    // the observer; `animate()` checks it before re-queueing.
    let visible = true;
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              const nowVisible = entry.isIntersecting;
              if (nowVisible && !visible) {
                visible = true;
                // Skip the accumulated-while-hidden gap so the first resumed
                // frame advances by ~0, not one clamped MAX_DT catch-up step.
                lastDrawTime = performance.now();
                if (!animFrameRef.current) animate();
              } else if (!nowVisible && visible) {
                visible = false;
                if (animFrameRef.current) {
                  cancelAnimationFrame(animFrameRef.current);
                  animFrameRef.current = 0;
                }
              }
            },
            { rootMargin: "100px" },
          )
        : null;
    observer?.observe(canvas);

    // Ambient-only frames draw at HALF the display rate: the twinkle
    // and drift are slow sinusoids (0.01–0.05 rad/tick), so updating
    // them every other rAF is imperceptible, and a skipped frame does
    // no clear/draw at all — the previous frame simply stays on
    // screen. Star state advances by the number of elapsed ticks so
    // motion speed is identical, it just commits less often. Shooting
    // stars are fast movers, so any frame with one airborne (or a
    // burst due) draws at the full rate.
    let tick = 0;
    let lastDrawTick = 0;
    // Wall-clock timestamp of the last drawn frame; drives the refresh-rate
    // -independent `dt` below. Reset on resume so a paused-then-visible
    // canvas doesn't apply one clamped catch-up step. See REFERENCE_FRAME_MS.
    let lastDrawTime = performance.now();

    function animate() {
      tick++;
      const drawNow = performance.now();
      const shootingActive = shootingStarsRef.current.length > 0;
      const burstDue =
        burstQueueRef.current.length > 0 || drawNow >= nextShootRef.current;
      if (!shootingActive && !burstDue && tick - lastDrawTick < 2) {
        if (visible) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          animFrameRef.current = 0;
        }
        return;
      }
      const dt = refreshRateIndependent
        ? Math.min((drawNow - lastDrawTime) / REFERENCE_FRAME_MS, MAX_DT)
        : Math.min(tick - lastDrawTick, LEGACY_MAX_DT);
      lastDrawTick = tick;
      lastDrawTime = drawNow;

      drawStars(dt);

      const now = performance.now();

      if (now >= nextShootRef.current && burstQueueRef.current.length === 0) {
        const count =
          SHOOT_BURST_MIN +
          Math.floor(Math.random() * (SHOOT_BURST_MAX - SHOOT_BURST_MIN + 1));
        for (let i = 0; i < count; i++) {
          burstQueueRef.current.push(now + i * SHOOT_STAGGER);
        }
        nextShootRef.current =
          now +
          SHOOT_INTERVAL_MIN +
          Math.random() * (SHOOT_INTERVAL_MAX - SHOOT_INTERVAL_MIN);
        burstZoneRef.current++;
      }

      while (
        burstQueueRef.current.length > 0 &&
        now >= burstQueueRef.current[0]
      ) {
        burstQueueRef.current.shift();
        shootingStarsRef.current.push(
          createShootingStar(cssW, cssH, burstZoneRef.current, starScale),
        );
      }

      const shooting = shootingStarsRef.current;
      let writeIdx = 0;
      for (let i = 0; i < shooting.length; i++) {
        const s = shooting[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life += dt;

        if (s.life >= s.maxLife) continue;

        const progress = s.life / s.maxLife;
        const fade =
          progress < 0.1
            ? progress / 0.1
            : 1 - ((progress - 0.1) / 0.9) * ((progress - 0.1) / 0.9);
        const opacity = Math.max(0, fade) * SHOOT_OPACITY;

        const tailX = s.x - (s.vx / s.speed) * s.length;
        const tailY = s.y - (s.vy / s.speed) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.1})`);
        grad.addColorStop(0.7, `rgba(255, 255, 255, ${opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 * starScale;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 5 * starScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 3 * starScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2 * starScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity * 1.5, 1)})`;
        ctx.fill();

        shooting[writeIdx++] = s;
      }
      shooting.length = writeIdx;

      if (visible) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        animFrameRef.current = 0;
      }
    }

    nextShootRef.current = performance.now() + 1000;
    animate();

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [starScale, refreshRateIndependent, still]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "cover",
      }}
    />
  );
}

function AnimatedStarfield({
  glowPosition,
  starScale,
  refreshRateIndependent,
  still,
}: AnimatedStarfieldProps) {
  const hasGlow = !!glowPosition;
  const { ref: glowRef, phase } = useGlowOnView(hasGlow, still);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Gates whether <StarfieldCanvas /> is actually rendered. When the
  // wrapper scrolls offscreen we unmount the canvas entirely — frees
  // its ~6MB backing buffer + tears down the rAF loop and IO it owns,
  // instead of just pausing rAF and leaving the canvas memory parked.
  // Critical on the landing page where 5 starfields would otherwise
  // pin ~30MB of GPU memory for the page lifetime.
  const [inViewport, setInViewport] = useState(false);

  if (hasGlow) ensureGlowKeyframes();

  // Synchronous initial check before paint so a starfield that mounts
  // already-in-viewport (e.g. the hero) gets its canvas on frame 1,
  // not after the IO callback fires asynchronously.
  useLayoutEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    if (
      rect.bottom > -200 &&
      rect.top < vh + 200 &&
      rect.right > 0 &&
      rect.left < vw
    ) {
      setInViewport(true);
    }
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInViewport(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      // 200px hysteresis so the canvas mounts slightly before it
      // scrolls into view and stays mounted briefly after it leaves —
      // avoids flapping on/off during fast scrolls.
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: 0 }}>
      {/* Starfield canvas — masked at bottom corners */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          ...(hasGlow
            ? {
                opacity: phase === "on" ? 1 : 0,
                animation:
                  phase === "on" && !still
                    ? "stars-fade-in 1.5s ease-in forwards"
                    : undefined,
              }
            : {}),
          ...cornerFadeMask,
        }}
      >
        {inViewport && (
          <StarfieldCanvas
            starScale={starScale}
            refreshRateIndependent={refreshRateIndependent}
            still={still}
          />
        )}
      </div>

      {/* Radial glow — only when glowPosition is set */}
      {hasGlow && (
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: phase === "off" ? 0 : undefined,
            animation:
              phase === "warming"
                ? "glow-power-on 1s ease-out forwards"
                : undefined,
            transformOrigin: "top center",
            WebkitMaskImage: `radial-gradient(500px 500px at ${GLOW_X[glowPosition]} -34%, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(500px 500px at ${GLOW_X[glowPosition]} -34%, black 0%, transparent 100%)`,
          }}
        >
          <CornerGlow inverted />
        </div>
      )}
    </div>
  );
}

export { AnimatedStarfield, type AnimatedStarfieldProps, type GlowPosition };

defineControls(AnimatedStarfield, {
  still: { type: "boolean", defaultValue: false },
  refreshRateIndependent: { type: "boolean", defaultValue: false },
  starScale: { type: "number", defaultValue: 1 },
  glowPosition: { type: "select", options: ["left", "center", "right"] },
});
