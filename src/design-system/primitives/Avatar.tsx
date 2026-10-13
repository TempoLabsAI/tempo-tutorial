import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
  /** Reserved for back-compat. No visual treatment in the Airbnb style. */
  framed?: boolean;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-[11px]",
  md: "w-10 h-10 text-[13px]",
  lg: "w-14 h-14 text-[15px]",
  xl: "w-20 h-20 text-[18px]",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-paper-warm flex items-center justify-center shrink-0",
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <span className="font-medium text-ink-soft">{getInitials(alt)}</span>
      )}
    </div>
  );
}
