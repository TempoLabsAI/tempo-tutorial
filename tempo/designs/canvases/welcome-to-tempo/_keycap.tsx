import type { ReactNode } from "react";

/**
 * A physical keyboard key (OS hardware, not Tempo UI), drawn at native size
 * so it stays crisp. The design-system Kbd is an inline shortcut hint and
 * gets blurry and thin-bordered when scaled up, so the big tutorial keys use
 * this instead.
 */

type KeycapTone = "dark" | "light";
type KeycapSize = "md" | "lg";

const TONE: Record<
  KeycapTone,
  { cap: string; face: string; glyph: string; label: string }
> = {
  dark: {
    cap: "bg-[linear-gradient(180deg,#3A3A3E_0%,#26262A_100%)] border border-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-3px_0_rgba(0,0,0,0.45),0_2px_0_#0E0E10,0_14px_28px_-6px_rgba(0,0,0,0.55)]",
    face: "bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_70%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
    glyph: "text-white/90",
    label: "text-white/50",
  },
  light: {
    cap: "bg-[linear-gradient(180deg,#FFFFFF_0%,#ECEAE6_100%)] border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_0_rgba(0,0,0,0.08),0_2px_0_rgba(0,0,0,0.12),0_14px_28px_-6px_rgba(0,0,0,0.3)]",
    face: "bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)]",
    glyph: "text-[#1C1C1E]",
    label: "text-black/45",
  },
};

const SIZE: Record<
  KeycapSize,
  {
    square: string;
    wide: string;
    radius: string;
    faceRadius: string;
    glyph: string;
    label: string;
  }
> = {
  md: {
    square: "h-[64px] w-[64px]",
    wide: "h-[64px] w-[80px]",
    radius: "rounded-[14px]",
    faceRadius: "rounded-[9px]",
    glyph: "text-[24px]",
    label: "text-[9px]",
  },
  lg: {
    square: "h-[76px] w-[76px]",
    wide: "h-[76px] w-[96px]",
    radius: "rounded-[16px]",
    faceRadius: "rounded-[11px]",
    glyph: "text-[28px]",
    label: "text-[10px]",
  },
};

export function KeycapStyles() {
  return (
    <style>{`
      @keyframes otv-keypress {
        0%, 14%, 46%, 100% { transform: translateY(0); filter: brightness(1) }
        20%, 40% { transform: translateY(2px); filter: brightness(0.9) }
      }
    `}</style>
  );
}

export function Keycap({
  children,
  label,
  tone = "dark",
  size = "lg",
  wide = false,
  press = "none",
}: {
  children: ReactNode;
  /** Small secondary legend under the glyph, e.g. "command". */
  label?: string;
  tone?: KeycapTone;
  size?: KeycapSize;
  wide?: boolean;
  /** Loop a subtle press. "first" goes down, "second" follows a beat later. */
  press?: "none" | "first" | "second";
}) {
  const t = TONE[tone];
  const s = SIZE[size];
  const pressClass =
    press === "first"
      ? "animate-[otv-keypress_2.8s_ease-in-out_infinite]"
      : press === "second"
        ? "animate-[otv-keypress_2.8s_ease-in-out_infinite] [animation-delay:180ms]"
        : "";
  return (
    <span
      className={`relative inline-flex shrink-0 select-none p-[5px] ${wide ? s.wide : s.square} ${s.radius} ${t.cap} ${pressClass}`}
    >
      <span
        className={`flex h-full w-full flex-col items-center justify-center gap-0.5 ${s.faceRadius} ${t.face}`}
      >
        <span
          className={`font-sans leading-none font-medium tracking-[-0.01em] ${s.glyph} ${t.glyph}`}
        >
          {children}
        </span>
        {label ? (
          <span
            className={`font-sans leading-none font-medium tracking-[0.02em] ${s.label} ${t.label}`}
          >
            {label}
          </span>
        ) : null}
      </span>
    </span>
  );
}
