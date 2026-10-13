/**
 * Self-contained replicas of the DS nav primitives the canvas uses:
 * `ChatNavIcon`, `StoryboardHeader`, and `AppNavbar` (+ `NavItem`).
 * Display-only. Faithful to the DS markup/classes.
 */
import type { ReactNode } from "react";
import { Play, Square, ExternalLink, Settings } from "lucide-react";
import { cn } from "./cn";

// ── ChatNavIcon (primitives/chat-nav-icon.tsx, no-indicator variant) ─────────
export function ChatNavIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-[18px]", className)}
      viewBox="-1 -3 27 27"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0045 12H12.0135M8.00903 12H8.018"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.448 11C21.4824 11.3286 21.5 11.6623 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C11.0876 21.5 10.2053 21.3714 9.37032 21.1316C9.05975 21.0424 8.90446 20.9979 8.79433 20.9813C8.68596 20.965 8.59719 20.9603 8.48748 20.9647C8.37604 20.9692 8.25681 20.9865 8.01834 21.0211L4.34948 21.5536C3.66021 21.6536 3.31558 21.7036 3.06601 21.5955C2.84777 21.5009 2.66961 21.3274 2.5677 21.1089C2.45117 20.859 2.49386 20.5132 2.57924 19.8216L3.02148 16.2392C3.05193 15.9924 3.06716 15.869 3.07071 15.7551C3.07385 15.6543 3.06889 15.5805 3.05245 15.4809C3.03386 15.3682 2.99104 15.2042 2.9054 14.8761C2.6535 13.9105 2.5 13.0066 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C12.3377 2.5 12.6714 2.51759 13 2.55198"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9693 2.52506C18.0167 2.29167 18.3493 2.29167 18.3967 2.52506C18.5466 3.26449 19.0855 3.80339 19.8249 3.95334C20.0583 4.00067 20.0583 4.33334 19.8249 4.38067C19.0855 4.53061 18.5466 5.06951 18.3967 5.80894C18.3493 6.04233 18.0167 6.04233 17.9693 5.80894C17.8194 5.06951 17.2805 4.53061 16.5411 4.38067C16.3077 4.33334 16.3077 4.00067 16.5411 3.95334C17.2805 3.80339 17.8194 3.26449 17.9693 2.52506Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── StoryboardHeader (composites/storyboard-header.tsx) ──────────────────────
export function StoryboardHeader({
  componentName,
  routeName,
  isRunning,
  toolbarButtons = [],
  onPlayStopClick,
}: {
  variant?: "component" | "route";
  componentName?: string;
  routeName?: string;
  active?: boolean;
  keepVisible?: boolean;
  isRunning?: boolean;
  toolbarButtons?: Array<{ type: string }>;
  onPlayStopClick?: () => void;
}) {
  const name = componentName ?? routeName ?? "";
  const btn =
    "flex size-6 items-center justify-center rounded-sm transition-all duration-200 cursor-pointer bg-[var(--blueberry-700-a20)] text-[var(--blueberry-200)] hover:bg-[var(--blueberry-800)] hover:text-white";
  return (
    <div className="flex items-center justify-between gap-2 pb-1.5">
      <span className="font-mono text-[11px] font-medium text-text-secondary">
        {name}
      </span>
      <div className="flex items-center gap-px">
        <button type="button" className={btn} onClick={onPlayStopClick} aria-label="Run">
          {isRunning ? <Square className="size-3" /> : <Play className="size-3" />}
        </button>
        {toolbarButtons.map((b, i) => (
          <button key={i} type="button" className={btn} aria-label={b.type}>
            <ExternalLink className="size-3" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── AppNavbar (composites/app-navbar.tsx) ────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  testId?: string;
  activeAccent?: "blueberry" | "kiwi" | "lavender" | "mustard" | "salmon" | "graphite";
  shortcutHint?: string;
}

export function AppNavbar({
  items,
  activeItem = "",
  userInitials = "",
  userColor = "#8b5cf6",
  showSettings = false,
}: {
  items: NavItem[];
  activeItem?: string;
  userInitials?: string;
  userColor?: string;
  testId?: string;
  showHelp?: boolean;
  showSettings?: boolean;
  onNavigate?: (id: string) => void;
}) {
  return (
    <div className="relative flex w-[52px] flex-col items-center bg-surface-dim select-none">
      {/* Org avatar block */}
      <div className="flex h-[46px] items-center justify-center">
        <div className="relative flex size-9 items-center justify-center rounded-[8px] border border-transparent p-[2px]">
          <div
            className="flex size-[30px] items-center justify-center rounded-[5px] text-[13px] font-bold text-white"
            style={{ backgroundColor: userColor }}
          >
            {userInitials}
          </div>
        </div>
      </div>
      {/* Nav list */}
      <div className="flex flex-col items-center gap-1 px-1 pt-1">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              type="button"
              data-testid={item.testId}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg transition-colors",
                `button-accent-${item.activeAccent ?? "graphite"}`,
                isActive
                  ? "bg-accent-subtle text-accent"
                  : "text-icons-tertiary hover:bg-surface-container-high",
              )}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
      {/* Settings pinned to the bottom */}
      {showSettings ? (
        <div className="mt-auto flex flex-col items-center gap-1 px-1 pb-2 pt-2">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-icons-tertiary transition-colors hover:bg-surface-container-high"
            aria-label="Settings"
          >
            <Settings className="size-[18px]" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
