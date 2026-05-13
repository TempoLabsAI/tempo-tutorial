import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "outline"
  | "ink";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

/**
 * Button — Airbnb-style.
 *  primary  → coral pink with gradient on hover
 *  ink      → dark grey/black, used for secondary CTAs and modals
 *  outline  → white with grey border (standard secondary)
 *  ghost    → transparent until hover (used for inline links)
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent hover:bg-accent-hover active:bg-accent-press text-white shadow-sm hover:shadow",
  ink:
    "bg-ink hover:bg-ink-soft active:bg-black text-white",
  secondary:
    "bg-paper-warm hover:bg-paper-dark text-ink",
  ghost:
    "bg-transparent hover:bg-paper-warm text-ink",
  destructive:
    "bg-ink hover:bg-ink-soft text-white",
  outline:
    "bg-transparent text-ink border border-paper-deep hover:border-ink hover:bg-paper-warm/50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[14px] rounded-lg gap-1.5 font-medium",
  md: "h-11 px-5 text-[14px] rounded-lg gap-2 font-semibold",
  lg: "h-12 px-6 text-[15px] rounded-lg gap-2 font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn("inline-flex items-center justify-center", "transition-[background-color,color,box-shadow,transform] duration-150 ease-out", "active:scale-[0.98]", "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100", "select-none whitespace-nowrap", variantClasses[variant], sizeClasses[size], className, "w-full")}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
