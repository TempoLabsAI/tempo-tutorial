import { CursorMascot } from "./_ui/cursor-mascot";

// Shippy inside the orbit from the Tempo launch art (rocket.png), rebuilt in
// layers so the rings and sparkles can move on their own. Colors match the
// sparkles in that art.

const SIZE = 380;
const C = SIZE / 2;

const RINGS = [
  { rx: 176, ry: 79 },
  { rx: 138, ry: 61 },
  { rx: 100, ry: 44 },
];

const SPARKLES = [
  { ring: 0, at: 0.08, color: "#B57CF6", size: 13, dur: 14 },
  { ring: 0, at: 0.58, color: "#F2576E", size: 12, dur: 14 },
  { ring: 1, at: 0.3, color: "#5FD68A", size: 11, dur: 10 },
  { ring: 1, at: 0.78, color: "#3DA9F5", size: 11, dur: 10 },
  { ring: 2, at: 0.46, color: "#F6C445", size: 10, dur: 7 },
];

/** Clockwise loop around a ring, starting at its rightmost point. */
function ringPath(rx: number, ry: number) {
  return `M ${C + rx} ${C} A ${rx} ${ry} 0 1 1 ${C - rx} ${C} A ${rx} ${ry} 0 1 1 ${C + rx} ${C}`;
}

/** A four-point sparkle centred on the origin. */
function SparkleShape({ size, color }: { size: number; color: string }) {
  const s = size;
  const w = size * 0.32;
  return (
    <g>
      <circle
        r={s * 1.1}
        fill={color}
        opacity={0.25}
        filter="url(#otv-orbit-blur)"
      />
      <path
        d={`M 0 ${-s} Q ${w} ${-w} ${s} 0 Q ${w} ${w} 0 ${s} Q ${-w} ${w} ${-s} 0 Q ${-w} ${-w} 0 ${-s} Z`}
        fill={color}
      />
    </g>
  );
}

const ORBIT_STYLES = `
  @keyframes otv-orbit-precess { to { transform: rotate(360deg) } }
  @keyframes otv-shippy-pulse {
    0%, 100% { transform: translateY(0) scale(1) }
    50%      { transform: translateY(-14px) scale(1.05) }
  }
  @keyframes otv-shippy-glow {
    0%, 100% { opacity: 0.35; transform: scale(0.9) }
    50%      { opacity: 0.7; transform: scale(1.1) }
  }
  .otv-orbit-precess { animation: otv-orbit-precess 60s linear infinite; transform-origin: 50% 50% }
  .otv-shippy-pulse { animation: otv-shippy-pulse 1.6s ease-in-out infinite }
  .otv-shippy-glow { animation: otv-shippy-glow 1.6s ease-in-out infinite }
  @media (prefers-reduced-motion: reduce) {
    .otv-orbit-precess, .otv-shippy-pulse, .otv-shippy-glow { animation: none }
  }
`;

/**
 * Shippy in orbit. At rest nothing moves;
 * `spinning` sends the sparkles around their rings, slowly turns the whole
 * orbit and makes Shippy pulse.
 */
export function ShippyOrbit({ spinning = false }: { spinning?: boolean }) {
  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <style>{ORBIT_STYLES}</style>

      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={`absolute inset-0 overflow-visible ${spinning ? "otv-orbit-precess" : ""}`}
      >
        <defs>
          <filter
            id="otv-orbit-blur"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <g transform={`rotate(-58 ${C} ${C})`}>
          {RINGS.map((r, i) => (
            <ellipse
              key={i}
              cx={C}
              cy={C}
              rx={r.rx}
              ry={r.ry}
              fill="none"
              stroke="#F5F5F5"
              strokeOpacity={i === 0 ? 0.28 : 0.16}
              strokeWidth={1}
            />
          ))}
          {SPARKLES.map((s, i) => {
            const r = RINGS[s.ring];
            if (spinning) {
              return (
                <g key={i}>
                  <SparkleShape size={s.size} color={s.color} />
                  <animateMotion
                    dur={`${s.dur}s`}
                    begin={`${-s.at * s.dur}s`}
                    repeatCount="indefinite"
                    path={ringPath(r.rx, r.ry)}
                  />
                </g>
              );
            }
            const a = s.at * Math.PI * 2;
            const x = C + r.rx * Math.cos(a);
            const y = C + r.ry * Math.sin(a);
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <SparkleShape size={s.size} color={s.color} />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Shippy at the centre, with a soft glow that breathes while playing. */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 size-[140px] -translate-x-1/2 -translate-y-[62%] rounded-full bg-[radial-gradient(circle,rgba(170,180,255,0.45),transparent_65%)] ${spinning ? "otv-shippy-glow" : "opacity-40"}`}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[38%]">
        <div className={spinning ? "otv-shippy-pulse" : ""}>
          <div className="origin-center scale-[1.5]">
            <CursorMascot animated={spinning} />
          </div>
        </div>
      </div>
    </div>
  );
}
