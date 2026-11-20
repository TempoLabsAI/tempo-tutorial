import { AsciiShape, type AsciiShapeKind } from "./_asciiShape";
import { usePlayMode } from "./_playMode";

// The lessons' shared backdrop: near-black, a sprinkle of stars in the top
// right corner, and one ASCII solid tucked behind the content.

// A sprinkle of stars in the top right corner, thinning out away from it.
// Fixed positions (seeded), so the board looks the same every time.
const STARS = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const stars: {
    x: number;
    y: number;
    ch: string;
    alpha: number;
    delay: number;
  }[] = [];
  while (stars.length < 26) {
    // squaring pulls the points towards the corner
    const x = 1000 - rand() ** 1.6 * 520;
    const y = 12 + rand() ** 1.6 * 300;
    const bright = rand();
    stars.push({
      x,
      y,
      ch: bright > 0.86 ? "+" : bright > 0.6 ? "·" : ".",
      alpha: 0.16 + bright * 0.34,
      delay: rand() * 5,
    });
  }
  return stars;
})();

export function Stars() {
  const inPlay = usePlayMode();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 font-mono text-[11px] leading-none text-[#f4f4fa]"
    >
      <style>{`@keyframes ascii-star { 0%, 100% { opacity: 1 } 50% { opacity: 0.25 } }`}</style>
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: star.x,
            top: star.y,
            opacity: star.alpha,
          }}
        >
          <span
            style={
              inPlay
                ? {
                    animation: `ascii-star 4.5s ease-in-out ${star.delay}s infinite`,
                  }
                : undefined
            }
          >
            {star.ch}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Sits behind a lesson's content (the lesson root needs `isolate`). `x` and
 * `y` are the solid's centre in the board, in px.
 */
export function LessonBackdrop({
  shape,
  x,
  y,
  size,
  opacity,
}: {
  shape: AsciiShapeKind;
  x: number;
  y: number;
  size: number;
  opacity: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Stars />
      <AsciiShape
        shape={shape}
        width={size}
        height={size}
        className="absolute"
        style={{ left: x - size / 2, top: y - size / 2, opacity }}
      />
    </div>
  );
}

/** The small mono label above a lesson's title, e.g. "02 / 05 · Your turn". */
export function StepLabel({ children }: { children: string }) {
  return (
    <span className="pointer-events-none absolute left-14 top-[52px] font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-tertiary">
      {children}
    </span>
  );
}
