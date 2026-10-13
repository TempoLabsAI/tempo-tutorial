import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  /** Reserved for back-compat. */
  editorial?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, prefix, suffix, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[12px] font-semibold text-ink">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3.5 text-ink-quiet pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-12 bg-white border border-paper-deep rounded-lg px-3.5",
              "text-[14px] text-ink placeholder:text-ink-quiet",
              "transition-[border-color,box-shadow] duration-150 ease-out",
              "hover:border-ink-quiet",
              "focus:border-ink focus:outline-hidden focus:shadow-[0_0_0_2px_rgba(0,0,0,0.06)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              prefix && "pl-10",
              suffix && "pr-10",
              error && "border-accent focus:border-accent focus:shadow-[0_0_0_2px_rgba(255,56,92,0.10)]",
              className,
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3.5 text-ink-quiet pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        {hint && !error && <p className="text-[12px] text-ink-quiet">{hint}</p>}
        {error && <p className="text-[12px] text-accent">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
