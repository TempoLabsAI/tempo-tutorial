/**
 * Self-contained replicas of the simple `@tempo-modules/tempo-design-system`
 * primitives the tutorial lessons use: Button, Kbd, CodeBlock and
 * InlineResourceChip. Each renders the SAME element and the same class list
 * the design-system component renders (after its tailwind-merge pass), so the
 * canvas looks identical without the private package. Sources:
 * primitives/{button,kbd,code-block,canvas-glyph}.tsx and
 * composites/inline-resource-chip.tsx.
 */
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "./cn";

// ── Button (primitives/button.tsx) ──────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "xs" | "sm" | "default" | "lg";

// The base list split where tailwind-merge drops entries: `xs` replaces the
// 13px text size, and ghost/link replace the filled disabled surface + ink.
const BUTTON_BASE_START =
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap ring-1 ring-inset ring-transparent";
const BUTTON_TEXT = "text-[13px]";
const BUTTON_BASE_MIDDLE =
  "font-medium outline-none transition-[colors,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus/60 disabled:cursor-default disabled:pointer-events-none";
const BUTTON_DISABLED_FILL =
  "disabled:bg-[var(--button-disabled-surface)] disabled:text-[var(--button-disabled-text)]";
const BUTTON_BASE_END =
  "disabled:ring-transparent disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/85 active:bg-accent/75",
  secondary: "bg-accent-subtle text-accent hover:bg-accent-subtle-hover",
  outline:
    "ring-accent/40 bg-surface text-accent hover:bg-accent/10 disabled:bg-transparent disabled:ring-1 disabled:ring-border-secondary disabled:text-text-tertiary",
  ghost:
    "text-accent hover:bg-accent/10 disabled:bg-transparent disabled:text-text-tertiary",
  link: "bg-transparent text-accent underline-offset-4 hover:text-accent/85 hover:underline disabled:bg-transparent disabled:text-text-tertiary",
};
const BUTTON_SIZE: Record<ButtonSize, string> = {
  xs: "h-6 gap-1 rounded px-2 text-xs",
  sm: "h-7 gap-1 rounded-md px-2.5",
  default: "h-8 gap-1.5 rounded-md px-3",
  lg: "h-9 gap-1.5 rounded-lg px-3.5",
};
const BUTTON_ICON_ONLY: Record<ButtonSize, string> = {
  xs: "w-6 px-0",
  sm: "w-7 px-0",
  default: "w-8 px-0",
  lg: "w-9 px-0",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "xs", icon, className, children, ...props },
    ref,
  ) {
    const isIconOnly = icon != null && children == null;
    const hasTransparentDisabled =
      variant === "ghost" || variant === "link" || variant === "outline";
    return (
      <button
        ref={ref}
        type="button"
        tabIndex={0}
        data-slot="button"
        className={cn(
          BUTTON_BASE_START,
          size !== "xs" && BUTTON_TEXT,
          BUTTON_BASE_MIDDLE,
          !hasTransparentDisabled && BUTTON_DISABLED_FILL,
          BUTTON_BASE_END,
          BUTTON_VARIANT[variant],
          BUTTON_SIZE[size],
          isIconOnly && BUTTON_ICON_ONLY[size],
          className,
          "[--tw-outline-style:none]",
        )}
        {...props}
      >
        {!isIconOnly && icon}
        {children}
        {isIconOnly && icon}
      </button>
    );
  },
);

// ── Kbd (primitives/kbd.tsx) ────────────────────────────────────────────────
type KbdVariant = "default" | "raised" | "large";
// Pre-merged: each variant's own text color replaces the base tertiary one.
const KBD_VARIANT: Record<KbdVariant, string> = {
  default:
    "inline-flex items-center justify-center font-mono text-text-tertiary h-5 min-w-5 rounded-md border border-border-secondary bg-surface-container-low px-1 text-label",
  raised:
    "inline-flex items-center justify-center font-mono min-w-5 rounded border border-border-secondary border-b-2 bg-surface-container px-1.5 py-0.5 text-micro leading-micro font-medium text-text-secondary shadow-sm",
  large:
    "inline-flex items-center justify-center font-mono h-8 min-w-8 rounded-md border border-border-primary bg-transparent px-2.5 text-[15px] font-medium text-text-secondary",
};

export function Kbd({
  variant = "default",
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { variant?: KbdVariant }) {
  return <kbd className={cn(KBD_VARIANT[variant], className)} {...props} />;
}

// ── CodeBlock (primitives/code-block.tsx) ───────────────────────────────────
export function CodeBlock({
  children,
  language,
  maxHeight,
  className,
}: {
  children: string;
  language?: string;
  maxHeight?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-lg border border-chat-tool-result-border bg-chat-tool-result-bg",
        className,
      )}
    >
      {language && (
        <div className="border-b border-chat-tool-result-border px-3 py-1.5 text-caption leading-caption text-text-tertiary font-mono">
          {language}
        </div>
      )}
      <pre
        className="overflow-auto p-3 text-caption leading-caption font-mono text-text-secondary"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ── InlineResourceChip (composites/inline-resource-chip.tsx) ────────────────
/** The canonical canvas glyph (2×2 grid), primitives/canvas-glyph.tsx. */
function CanvasGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={cn("size-4", className)}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <rect x="4" y="4" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.5" y="4" width="3.5" height="3.5" rx="0.5" />
      <rect x="4" y="8.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.5" y="8.5" width="3.5" height="3.5" rx="0.5" />
    </svg>
  );
}

/** Display-only: the tutorial only shows the canvas chip. */
export function InlineResourceChip({
  label,
}: {
  label: ReactNode;
  type: "canvas";
}) {
  return (
    <span
      className="group/inline-resource-chip relative inline-flex min-w-0 items-center gap-1 rounded-[4px] bg-[var(--md-container-high)] pl-[3px] pr-[4px] py-[1px] align-baseline button-accent-lavender"
      data-resource-type="canvas"
    >
      <span
        className="flex size-[14px] shrink-0 items-center justify-center rounded-[3px] bg-accent text-on-accent"
        aria-hidden="true"
      >
        <CanvasGlyph className="size-[10px]" />
      </span>
      <button
        type="button"
        className="inline-flex min-w-0 items-center truncate text-[0.88em] font-normal leading-normal transition-colors cursor-default text-accent"
        style={{ fontFamily: "var(--md-font-mono)" }}
        disabled
      >
        {label}
      </button>
    </span>
  );
}
