/**
 * Display replica of the design-system `CanvasDesignToolbar`
 * (composites/canvas-design-toolbar.tsx): the same toolbar markup and classes
 * for a static items list. The lesson tilts it over a corner as decoration,
 * so tooltips, shortcut handling and the option menus are left out.
 */
import type { ReactNode } from "react";
import { cn } from "./cn";

export type ToolbarShortcut = {
  key: string;
  shift?: boolean;
  meta?: boolean;
  alt?: boolean;
};

export type CanvasToolbarOption = {
  id: string;
  icon: ReactNode;
  label: string;
  shortcut?: ToolbarShortcut;
};

export type CanvasToolbarItem =
  | {
      type: "button";
      id: string;
      icon: ReactNode;
      label: string;
      shortcut?: ToolbarShortcut;
    }
  | { type: "dropdown-button"; options: CanvasToolbarOption[] };

const TOOL_BUTTON =
  "flex size-7 items-center justify-center rounded-md transition-colors";
const TOOL_ACTIVE =
  "button-accent-lavender bg-accent-subtle text-accent [[data-theme=light]_&]:bg-surface-lavender [[data-theme=light]_&]:text-text-lavender";
const TOOL_IDLE = "text-icons-primary hover:bg-surface-container-highest";

function ToolButton({
  option,
  active,
}: {
  option: { label: string; icon: ReactNode };
  active: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={option.label}
      aria-pressed={active}
      className={cn(TOOL_BUTTON, active ? TOOL_ACTIVE : TOOL_IDLE)}
    >
      {option.icon}
    </button>
  );
}

export function CanvasDesignToolbar({
  items,
  activeToolId,
  className,
}: {
  items: CanvasToolbarItem[];
  activeToolId?: string;
  onToolChange?: (toolId: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-lg bg-surface-container [[data-theme=light]_&]:bg-surface p-2.5 shadow-dialog",
        className,
      )}
      role="toolbar"
      aria-label="Design tools"
      style={{
        outline: "0.5px solid var(--border-secondary)",
        outlineOffset: "-0.5px",
      }}
    >
      {items.map((item, index) => {
        if (item.type === "button") {
          return (
            <ToolButton
              key={item.id}
              option={item}
              active={item.id === activeToolId}
            />
          );
        }
        const active = item.options.find((o) => o.id === activeToolId);
        const shown = active ?? item.options[0];
        return (
          <div key={`dropdown-${index}`}>
            <div className="flex items-center">
              <ToolButton option={shown} active={active !== undefined} />
              {item.options.length > 1 && (
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-label={`${shown.label} options`}
                  aria-expanded={false}
                  className="flex h-7 items-center rounded-md px-1 text-icons-tertiary transition-colors hover:bg-surface-container-highest hover:text-icons-secondary"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4.5L5.64645 7.14645C5.81311 7.31311 5.89645 7.39645 6 7.39645C6.10355 7.39645 6.18689 7.31311 6.35355 7.14645L9 4.5"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
