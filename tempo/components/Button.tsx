import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline-solid";
}

export function Button({ children, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center h-9 px-4 rounded-lg text-[13px] font-medium cursor-pointer font-[inherit] transition-opacity duration-150 ${
        isPrimary
          ? "border-none bg-gray-200 text-gray-900"
          : "border border-white/15 bg-transparent text-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
