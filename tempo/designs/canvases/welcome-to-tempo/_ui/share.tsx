/**
 * Display-only replicas of the canvas Share UI the ShareHero uses:
 * `ShareButton`, `HowSharingWorksTooltip`, `ReadyState`. Faithful to the
 * SharePopover look; no Convex/Electron wiring.
 */
import { Link2, Copy, Globe, Lock, HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "./cn";

export function ShareButton() {
  return (
    <button
      type="button"
      className="button-accent-lavender inline-flex h-7 items-center gap-1.5 rounded-md bg-accent px-2.5 text-[13px] font-medium text-on-accent transition-colors hover:bg-accent/85"
    >
      <Link2 className="size-3.5" />
      Share
    </button>
  );
}

export function HowSharingWorksTooltip() {
  return (
    <span
      className="inline-flex size-4 items-center justify-center text-text-tertiary"
      title="How sharing works"
    >
      <HelpCircle className="size-3.5" />
    </span>
  );
}

export function ReadyState({
  shareLink,
  visibility = "public",
  canToggleVisibility,
  contentType = "canvas",
}: {
  shareLink: string;
  publicLink?: string;
  visibility?: "public" | "private";
  canToggleVisibility?: boolean;
  contentType?: string;
  onVisibilityChange?: (v: string) => void;
  onCopyLink?: () => void;
}) {
  const isPublic = visibility === "public";
  return (
    <div className="flex flex-col gap-3">
      {/* Visibility selector */}
      <div className="flex items-center justify-between rounded-lg border border-border-secondary bg-surface-container-lowest px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-full",
              isPublic ? "bg-success/15 text-success" : "bg-surface-container-high text-text-secondary",
            )}
          >
            {isPublic ? <Globe className="size-3.5" /> : <Lock className="size-3.5" />}
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-medium text-text-primary">
              {isPublic ? "Anyone with the link" : "Only invited people"}
            </div>
            <div className="text-[11px] text-text-tertiary">
              {isPublic
                ? `Anyone can view this ${contentType}`
                : `Restricted to your team`}
            </div>
          </div>
        </div>
        {canToggleVisibility ? (
          <ChevronDown className="size-4 text-text-tertiary" />
        ) : null}
      </div>

      {/* Link row */}
      <div className="flex items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border-secondary bg-surface-container-lowest px-3 py-2">
          <Link2 className="size-3.5 shrink-0 text-text-tertiary" />
          <span className="truncate text-[12px] text-text-secondary">{shareLink}</span>
        </div>
        <button
          type="button"
          className="button-accent-lavender inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3 text-[13px] font-medium text-on-accent transition-colors hover:bg-accent/85"
        >
          <Copy className="size-3.5" />
          Copy
        </button>
      </div>
    </div>
  );
}
