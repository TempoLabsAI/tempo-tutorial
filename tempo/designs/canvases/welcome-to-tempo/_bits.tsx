import { useEffect, useRef, useState } from "react";
import { Button } from "./_ui/primitives";
import { TutorialTokens } from "./_ui/tutorial-tokens";

// Shared pieces for the onboarding tutorial frames. Copy and layout stay in
// each StoryboardN.tsx so they remain editable on the canvas.
//
// Every frame root sets data-theme="dark" | "light" so the real Tempo
// components inside it (chat input, share popover, comments…) theme with it.

export type Theme = "dark" | "light";

/**
 * Keyframes plus the placeholder gradient backdrops (.otv-bg-*). The
 * backdrops stand in for the image backgrounds that will replace them, so
 * each one is a plain class on its panel.
 *
 * Also carries the lesson's design-system tokens (`TutorialTokens`), so it
 * must stay a direct child of each lesson root.
 */
export function TutorialStyles() {
  return (
    <>
      <TutorialTokens />
      <style>{`
      .otv-bg-lilac {
        background:
          radial-gradient(at 18% 22%, #D9C8FF 0, transparent 48%),
          radial-gradient(at 85% 8%, #9DD9FF 0, transparent 44%),
          radial-gradient(at 78% 96%, #FFB9CF 0, transparent 50%),
          #7467D0;
      }
      .otv-bg-sky {
        background:
          radial-gradient(at 28% 30%, #FFFFFF 0, transparent 42%),
          radial-gradient(at 72% 82%, #F8DDB8 0, transparent 50%),
          linear-gradient(180deg, #7DB0E6 0%, #CFE2F5 100%);
      }
      .otv-bg-dusk {
        background:
          radial-gradient(at 80% 90%, #F6A98B 0, transparent 50%),
          linear-gradient(160deg, #26355F 0%, #6E5A97 55%, #E79A8A 100%);
      }
      .otv-bg-mint {
        background:
          radial-gradient(at 20% 80%, #E6F7DE 0, transparent 50%),
          radial-gradient(at 82% 18%, #B2E0C2 0, transparent 50%),
          #6EA488;
      }
      .otv-bg-gold {
        background:
          radial-gradient(at 25% 20%, #FFF1C2 0, transparent 45%),
          linear-gradient(160deg, #F7CD72 0%, #EE9F5C 50%, #C76680 100%);
      }
      @keyframes otv-float { 0%,100% { transform: translateY(0) rotate(-8deg) } 50% { transform: translateY(-10px) rotate(-6deg) } }
      @keyframes otv-shimmer { 0% { background-position: -320px 0 } 100% { background-position: 320px 0 } }
      @keyframes otv-pulse { 0%,100% { opacity: .4 } 50% { opacity: 1 } }
      @media (prefers-reduced-motion: reduce) {
        [class*="otv-"] { animation: none !important }
      }
    `}</style>
    </>
  );
}

/** Copies `text` to the clipboard and confirms inline. */
export function CopyButton({
  text,
  label = "Copy prompt",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        void navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? "Copied!" : label}
    </Button>
  );
}

type LayoutInfo = {
  position: string;
  parentFlex: boolean;
  parentDirection: string;
  parentGrid: boolean;
  className: string;
};

function readLayout(el: HTMLElement): LayoutInfo {
  const cs = getComputedStyle(el);
  const parent = el.parentElement ? getComputedStyle(el.parentElement) : null;
  const parentDisplay = parent?.display ?? "block";
  return {
    position: cs.position,
    parentFlex:
      parentDisplay.includes("flex") || parentDisplay.includes("grid"),
    parentDirection: parent?.flexDirection ?? "row",
    parentGrid: parentDisplay.includes("grid"),
    className: el.getAttribute("class") ?? "",
  };
}

/**
 * Watches the element marked `data-otv-watch={watch}` inside the nearest
 * `[data-otv-playground]`. Edits made on the canvas (style panel, dragging
 * into a frame, Shift+A) land in the DOM, so this re-reads on every change.
 */
function useWatchedLayout(watch: string) {
  const anchor = useRef<HTMLSpanElement>(null);
  const [info, setInfo] = useState<LayoutInfo | null>(null);
  useEffect(() => {
    const root = anchor.current?.closest<HTMLElement>("[data-otv-playground]");
    if (!root) return;
    const update = () => {
      const target = root.querySelector<HTMLElement>(
        `[data-otv-watch="${watch}"]`,
      );
      setInfo(target ? readLayout(target) : null);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [watch]);
  return { anchor, info };
}

/** Plain-words description of how the watched element is positioned. */
export function PositionReadout({ watch }: { watch: string }) {
  const { anchor, info } = useWatchedLayout(watch);

  let tone = "bg-surface-container-high text-text-secondary";
  let title = "Where did it go?";
  let body = "Drop the card back in this box.";
  if (info) {
    if (info.position === "absolute" || info.position === "fixed") {
      tone = "bg-surface-lavender text-text-lavender";
      title = "Absolute";
      body = "Floating free. Put it anywhere!";
    } else if (info.parentFlex) {
      tone = "bg-surface-blueberry text-text-blueberry";
      title = info.parentDirection.startsWith("column")
        ? "Static · in a column"
        : "Static · in a row";
      body = "Snapped in line with its neighbors.";
    } else {
      tone = "bg-surface-container-high text-text-primary";
      title = info.position === "relative" ? "Relative" : "Static";
      body = "Stacks with whatever's around it.";
    }
  }

  return (
    <span ref={anchor} className="flex flex-col gap-1.5">
      <span
        className={`self-start inline-flex items-center gap-1.5 h-6 px-2 rounded-full text-[12px] font-semibold ${tone}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {title}
      </span>
      <span className="text-[13px] leading-[18px] text-text-secondary">
        {body}
      </span>
    </span>
  );
}

export type LayoutKind = "row" | "column" | "grid" | "absolute" | "flow";

function layoutKind(info: LayoutInfo): LayoutKind {
  if (info.position === "absolute" || info.position === "fixed")
    return "absolute";
  if (info.parentGrid) return "grid";
  if (info.parentFlex) {
    return info.parentDirection.startsWith("column") ? "column" : "row";
  }
  return "flow";
}

/**
 * A small purple dot that shows only while the watched element is laid out
 * as `kind`. Sits next to a legend item so the matching type lights up live.
 */
export function PositionMatch({
  watch,
  kind,
}: {
  watch: string;
  /** "static" lights for anything laid out in the flow (not absolute). */
  kind: LayoutKind | "static";
}) {
  const { anchor, info } = useWatchedLayout(watch);
  const current = info === null ? null : layoutKind(info);
  const on =
    current !== null &&
    (kind === "static" ? current !== "absolute" : current === kind);
  return (
    <span ref={anchor} className="inline-flex h-2 w-2 shrink-0">
      {on ? (
        <span className="h-2 w-2 rounded-full bg-[#CD9DFA] shadow-[0_0_0_3px_rgba(205,157,250,0.25)]" />
      ) : null}
    </span>
  );
}

/** The watched element's real className, as it is right now. */
export function CodeReadout({ watch }: { watch: string }) {
  const { anchor, info } = useWatchedLayout(watch);
  const classes = (info?.className ?? "").split(/\s+/).filter(Boolean);
  const shown = classes.slice(0, 4).join(" ");
  return (
    <span
      ref={anchor}
      className="block whitespace-pre-wrap rounded-lg border border-border-primary bg-surface-container-low px-3 py-2.5 font-mono text-[11px] leading-[17px] text-text-secondary"
    >
      <span className="text-text-lavender">{"<div"}</span>
      {'\n  className="'}
      <span className="text-text-primary">
        {shown}
        {classes.length > 4 ? " …" : ""}
      </span>
      {'"\n'}
      <span className="text-text-lavender">{"/>"}</span>
    </span>
  );
}
