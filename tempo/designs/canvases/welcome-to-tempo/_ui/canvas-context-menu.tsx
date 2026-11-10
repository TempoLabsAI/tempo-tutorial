/**
 * Replica of the canvas element context menu
 * (tempo-modules/canvas/renderer/design-shell/CanvasContextMenu.tsx) with
 * only its "View Code" row, drawn with the design-system dropdown classes
 * (primitives/dropdown-menu.tsx). It opens at the right-click point and
 * closes on Escape or a click elsewhere.
 */
import { useEffect, useRef, useState } from "react";
import { THEME_BRIDGE } from "../_themeBridge";
import { TutorialTokens } from "./tutorial-tokens";

const MENU_POPUP =
  // `shadow-dropdown`, spelled out: hosts that define their own
  // `--shadow-dropdown` (the tutorial repo does) would otherwise restyle it.
  "z-50 min-w-[160px] rounded-lg border border-border-primary bg-surface-menu px-1.5 py-1.5 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12),0px_6px_16px_0px_rgba(0,0,0,0.09)] outline-none overflow-hidden";
const MENU_ITEM =
  "flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 [font-size:var(--text-body)] [line-height:var(--leading-body)] font-medium outline-none transition-colors data-[highlighted]:bg-surface-menu-hover data-[disabled]:pointer-events-none data-[disabled]:text-text-tertiary data-[disabled]:opacity-50 text-text-secondary [[data-theme=light]_&]:text-text-primary";

export function CanvasContextMenu({
  position,
  filepath,
  onViewCode,
  onClose,
}: {
  position: { x: number; y: number };
  filepath: string | null;
  /** The menu renders inside the caller's subtree (its host element). */
  container?: HTMLElement | null;
  onViewCode?: () => void;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [onClose]);

  return (
    // The menu sits outside the lesson root, so it carries the lesson's
    // tokens and font itself (as the app's menus inherit them).
    <div
      data-theme="dark"
      className="z-50 font-sans"
      style={{
        ...THEME_BRIDGE,
        position: "fixed",
        left: position.x,
        top: position.y,
      }}
    >
      <TutorialTokens />
      <div ref={menuRef} role="menu" className={MENU_POPUP}>
        {onViewCode && (
          <div
            role="menuitem"
            tabIndex={-1}
            aria-disabled={!filepath || undefined}
            data-disabled={!filepath ? "" : undefined}
            data-highlighted={highlighted ? "" : undefined}
            className={MENU_ITEM}
            onPointerEnter={() => setHighlighted(true)}
            onPointerLeave={() => setHighlighted(false)}
            onClick={onViewCode}
          >
            View Code
          </div>
        )}
      </div>
    </div>
  );
}
