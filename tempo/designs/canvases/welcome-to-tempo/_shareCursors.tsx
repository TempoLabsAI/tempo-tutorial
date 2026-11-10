// Live-collaboration cursors (pointer arrow + name pill) that drift around the
// "Share" frame so it reads as a multiplayer canvas. No presence-cursor
// component exists in the design system, so this is a small local one.

function TeammateCursor({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex flex-col items-start">
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
      >
        <path
          d="M1.5 1.5 L16 9.2 L9.4 10.6 L6.2 17.8 Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="-mt-1 ml-3 rounded-full px-2.5 py-0.5 text-[12px] font-medium leading-[18px] shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        style={{ backgroundColor: color, color: "#0f0f10" }}
      >
        {name}
      </span>
    </div>
  );
}

export function ShareCursors() {
  return (
    <>
      <style>{`
        @keyframes otv-cursor-a { 0%,100% { transform: translate(0,0) } 30% { transform: translate(14px,-10px) } 65% { transform: translate(-8px,8px) } }
        @keyframes otv-cursor-b { 0%,100% { transform: translate(0,0) } 40% { transform: translate(-12px,12px) } 75% { transform: translate(10px,4px) } }
        @keyframes otv-cursor-c { 0%,100% { transform: translate(0,0) } 35% { transform: translate(10px,10px) } 70% { transform: translate(-14px,-6px) } }
      `}</style>
      {/* Maya: empty space above the Comment caption (row 1, right) */}
      <div
        className="pointer-events-none absolute left-[860px] top-[262px] z-10"
        style={{ animation: "otv-cursor-a 7s ease-in-out infinite" }}
      >
        <TeammateCursor name="Maya" color="var(--salmon-700)" />
      </div>
      {/* Devon: empty space above the Commit caption (row 2, left) */}
      <div
        className="pointer-events-none absolute left-[110px] top-[632px] z-10"
        style={{ animation: "otv-cursor-b 9s ease-in-out -2s infinite" }}
      >
        <TeammateCursor name="Devon" color="var(--kiwi-700)" />
      </div>
      {/* Priya: below the Share caption (row 3, right) */}
      <div
        className="pointer-events-none absolute left-[720px] top-[1190px] z-10"
        style={{ animation: "otv-cursor-c 8s ease-in-out -4s infinite" }}
      >
        <TeammateCursor name="Priya" color="var(--blueberry-700)" />
      </div>
    </>
  );
}
