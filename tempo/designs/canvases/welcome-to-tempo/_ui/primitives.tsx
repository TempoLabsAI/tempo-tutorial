/**
 * Self-contained replicas of the simple `@tempo-modules/tempo-design-system`
 * primitives the welcome-to-tempo canvas uses. Display-only (no interactivity
 * beyond hover styles) — faithful to the DS classes so the canvas renders
 * identically without the private package. See the DS sources:
 * primitives/{button,badge,kbd,free-tier-icon,diff-counter}.tsx and
 * composites/inline-resource-chip.tsx.
 */
import type { ReactNode } from "react";
import { cn } from "./cn";

// ── Button (primitives/button.tsx) ──────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "xs" | "sm" | "default" | "lg";

const BTN_BASE =
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap ring-1 ring-inset ring-transparent text-[13px] font-medium outline-none transition-[colors,transform] duration-150 ease-out active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:shrink-0";
const BTN_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/85 active:bg-accent/75",
  secondary: "bg-accent-subtle text-accent hover:bg-accent-subtle-hover",
  outline: "ring-accent/40 bg-surface text-accent hover:bg-accent/10",
  ghost: "text-accent hover:bg-accent/10",
  link: "bg-transparent text-accent underline-offset-4 hover:text-accent/85 hover:underline",
};
const BTN_SIZE: Record<ButtonSize, string> = {
  xs: "h-6 gap-1 rounded px-2 text-xs",
  sm: "h-7 gap-1 rounded-md px-2.5",
  default: "h-8 gap-1.5 rounded-md px-3",
  lg: "h-9 gap-1.5 rounded-lg px-3.5",
};
const BTN_ICON_ONLY: Record<ButtonSize, string> = {
  xs: "w-6 px-0",
  sm: "w-7 px-0",
  default: "w-8 px-0",
  lg: "w-9 px-0",
};

export function Button({
  variant = "primary",
  size = "default",
  icon,
  children,
  className,
  ...rest
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const isIconOnly = icon != null && children == null;
  return (
    <button
      type="button"
      className={cn(
        BTN_BASE,
        BTN_VARIANT[variant],
        BTN_SIZE[size],
        isIconOnly && BTN_ICON_ONLY[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

// ── Badge (primitives/badge.tsx) ────────────────────────────────────────────
type BadgeVariant = "filled" | "outlined" | "status";
type BadgeIntent = "neutral" | "success" | "critical" | "warning" | "info";

const BADGE_BASE =
  "inline-flex shrink-0 items-center gap-1 rounded-sm px-1.5 py-px [font-size:var(--text-label)] [line-height:var(--leading-label)]";
const BADGE_VARIANT: Record<BadgeVariant, string> = {
  filled: "bg-surface-container-high",
  outlined: "border border-border-primary bg-surface-container-lowest",
  status:
    "rounded-[4px] px-1.5 py-0.5 gap-[3px] font-mono [font-size:var(--text-caption)] [line-height:var(--leading-caption)]",
};
const BADGE_INTENT: Record<BadgeIntent, string> = {
  neutral: "text-text-secondary",
  success: "text-success",
  critical: "text-critical",
  warning: "text-warning",
  info: "text-info",
};
const BADGE_STATUS_INTENT: Record<BadgeIntent, string> = {
  neutral: "bg-surface-container-high text-text-secondary",
  success: "border-[0.5px] border-success/20 bg-success/20 text-success",
  critical: "border-[0.5px] border-critical/20 bg-critical/20 text-critical",
  warning: "bg-warning/20 text-warning",
  info: "border-[0.5px] border-info/20 bg-info/20 text-info",
};

export function Badge({
  variant = "filled",
  intent = "neutral",
  mono,
  className,
  children,
}: {
  variant?: BadgeVariant;
  intent?: BadgeIntent;
  mono?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={cn(
        BADGE_BASE,
        BADGE_VARIANT[variant],
        variant === "status" ? BADGE_STATUS_INTENT[intent] : BADGE_INTENT[intent],
        mono &&
          "font-mono [font-size:var(--text-caption)] [line-height:var(--leading-caption)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ── Kbd (primitives/kbd.tsx) ────────────────────────────────────────────────
type KbdVariant = "default" | "raised" | "large";
const KBD_BASE = "inline-flex items-center justify-center font-mono text-text-tertiary";
const KBD_VARIANT: Record<KbdVariant, string> = {
  default:
    "h-5 min-w-5 rounded-md border border-border-secondary bg-surface-container-low px-1 [font-size:var(--text-label)]",
  raised:
    "min-w-5 rounded border border-border-secondary border-b-2 bg-surface-container px-1.5 py-0.5 [font-size:var(--text-micro)] leading-[var(--leading-micro)] font-medium text-text-secondary shadow-sm",
  large:
    "h-8 min-w-8 rounded-md border border-border-primary bg-transparent px-2.5 text-[15px] font-medium text-text-secondary",
};
export function Kbd({
  variant = "default",
  className,
  children,
}: {
  variant?: KbdVariant;
  className?: string;
  children?: ReactNode;
}) {
  return <kbd className={cn(KBD_BASE, KBD_VARIANT[variant], className)}>{children}</kbd>;
}

// ── FreeTierIcon (primitives/free-tier-icon.tsx) — a status/success Badge ────
export function FreeTierIcon({ className }: { className?: string }) {
  return (
    <Badge variant="status" intent="success" className={className}>
      free
    </Badge>
  );
}

// ── DiffCounter (primitives/diff-counter.tsx) ───────────────────────────────
export function DiffCounter({
  added,
  removed,
  emphasized,
  className,
}: {
  added?: number | null;
  removed?: number | null;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant="filled"
      mono
      className={cn(
        "!bg-transparent [font-size:var(--text-caption)] [line-height:var(--leading-caption)] !gap-1.5 outline outline-[0.5px] outline-surface-container-high",
        className,
      )}
    >
      {added != null && added !== 0 ? (
        <span className={emphasized ? "text-success" : "text-text-tertiary"}>
          +{added}
        </span>
      ) : null}
      {removed != null && removed !== 0 ? (
        <span className={emphasized ? "text-critical" : "text-text-tertiary"}>
          -{removed}
        </span>
      ) : null}
    </Badge>
  );
}

// ── InlineResourceChip (composites/inline-resource-chip.tsx) ─────────────────
type ChipType = "canvas" | "doc" | "plan" | "issue" | "file";
const CHIP_ACCENT: Record<ChipType, string> = {
  canvas: "button-accent-lavender",
  doc: "button-accent-kiwi",
  plan: "button-accent-kiwi",
  issue: "button-accent-mustard",
  file: "button-accent-kiwi",
};
function ChipGlyph({ type }: { type: ChipType }) {
  // 10×10 mark inside a 14px accent badge. Simple per-type glyph.
  const common = { width: 10, height: 10, viewBox: "0 0 16 16", fill: "none" as const };
  if (type === "issue")
    return (
      <svg {...common}>
        <rect x="2.5" y="2.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  if (type === "canvas")
    return (
      <svg {...common}>
        <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path
        d="M4 2.5h5l3 3v8a0 0 0 0 1 0 0H4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function InlineResourceChip({
  type,
  label,
}: {
  type: ChipType;
  label: string;
  accent?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex min-w-0 items-center gap-1 rounded-[4px] bg-[var(--md-container-high)] pl-[3px] pr-[4px] py-[1px] align-baseline",
        CHIP_ACCENT[type],
      )}
    >
      <span className="flex size-[14px] shrink-0 items-center justify-center rounded-[3px] bg-accent text-on-accent">
        <ChipGlyph type={type} />
      </span>
      <span className="inline-flex min-w-0 items-center truncate text-[0.88em] font-normal leading-normal text-accent">
        {label}
      </span>
    </span>
  );
}
