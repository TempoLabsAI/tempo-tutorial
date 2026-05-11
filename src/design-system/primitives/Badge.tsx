import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "muted"
  | "accent"
  | "ink"
  | "gold";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

/**
 * Badge — Airbnb-style label pill.
 * Tighter padding, subtle backgrounds, normal sentence casing.
 */
const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-paper-warm text-ink",
  success: "bg-[#e8f5e9] text-[#1b5e20]",
  warning: "bg-[#fff3e0] text-[#e65100]",
  error:   "bg-[#ffebee] text-[#b71c1c]",
  muted:   "bg-transparent text-ink-quiet border border-paper-deep",
  accent:  "bg-accent text-white",
  ink:     "bg-ink text-white",
  gold:    "bg-[#fef7e0] text-[#7d5a00]",
};

export function Badge({ children, variant = "default", className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md",
        "text-[12px] font-medium leading-none",
        variantClasses[variant],
        pulse && "animate-pulse-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
