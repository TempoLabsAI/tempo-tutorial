import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "./_ui/primitives";
import { TutorialTokens } from "./_ui/tutorial-tokens";

// Shared pieces for the onboarding tutorial frames. Copy and layout stay in
// each StoryboardN.tsx so they remain editable on the canvas.
//
// Every frame root sets data-theme="dark" | "light" so the real Tempo
// components inside it (chat input, share popover, comments…) theme with it.

export type Theme = "dark" | "light";

/**
 * Keyframes plus the plate every demo sits on (.otv-bg-*): flat near-black,
 * a hairline edge, a faint wash of light from the top left and a bracket in
 * each corner. The five names are kept so each panel still carries one
 * plain class. Also the outline practice tile and the layout legend's
 * lit/dim states.
 *
 * Includes the design-system tokens (`TutorialTokens`) scoped to the lesson
 * root marked with data-tutorial-token-scope.
 */
export function TutorialStyles() {
  return (
    <>
      <TutorialTokens />
      <style>{`
      .otv-bg-lilac,
      .otv-bg-sky,
      .otv-bg-dusk,
      .otv-bg-mint,
      .otv-bg-gold {
        background:
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) left top / 12px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) left top / 1px 12px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) right top / 12px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) right top / 1px 12px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) left bottom / 12px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) left bottom / 1px 12px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) right bottom / 12px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.5), rgba(244, 244, 250, 0.5)) right bottom / 1px 12px no-repeat,
          radial-gradient(120% 90% at 0% 0%, rgba(244, 244, 250, 0.05), rgba(244, 244, 250, 0) 60%),
          #121217;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
      }
      .otv-tile-outline {
        background:
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) left top / 7px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) left top / 1px 7px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) right top / 7px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) right top / 1px 7px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) left bottom / 7px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) left bottom / 1px 7px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) right bottom / 7px 1px no-repeat,
          linear-gradient(rgba(244, 244, 250, 0.9), rgba(244, 244, 250, 0.9)) right bottom / 1px 7px no-repeat;
      }
      .otv-option { opacity: 0.42; transition: opacity 160ms ease; }
      .otv-option[data-on="true"] { opacity: 1; }
      .otv-option[data-on="true"] > :first-child { border-color: rgba(244, 244, 250, 0.85); }
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

/**
 * One numbered lesson in the stacked layout: a rule and its number, the
 * title and text on the left with an optional aside (shortcut keys) at the
 * right edge, then the demo at full width. The number comes from a CSS
 * counter, so the parent sets `[counter-reset:lesson]`.
 */
export function StackedLesson({
  title,
  text,
  aside,
  children,
}: {
  title: string;
  text: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-7 border-t border-white/10 pt-5 [counter-increment:lesson]">
      <span className="font-mono text-[11px] tracking-[0.22em] text-text-tertiary before:content-[counter(lesson,decimal-leading-zero)]" />
      <div className="flex flex-row items-start gap-12">
        <div className="flex max-w-[560px] flex-col gap-2">
          <h3 className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
            {title}
          </h3>
          <div className="text-[16px] leading-[24px] text-text-secondary">
            {text}
          </div>
        </div>
        {aside ? (
          <div className="ml-auto flex flex-row items-center gap-2.5">
            {aside}
          </div>
        ) : null}
      </div>
      {children}
    </div>
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
 * One entry in a layout legend. It is lit while the watched element is laid
 * out as `kind` and sits back otherwise, so the matching type shows live.
 */
export function LayoutOption({
  watch,
  kind,
  children,
}: {
  watch: string;
  /** "static" lights for anything laid out in the flow (not absolute). */
  kind: LayoutKind | "static";
  children: ReactNode;
}) {
  const { anchor, info } = useWatchedLayout(watch);
  const current = info === null ? null : layoutKind(info);
  const on =
    current !== null &&
    (kind === "static" ? current !== "absolute" : current === kind);
  return (
    <div className="otv-option flex flex-col gap-2" data-on={on}>
      {children}
      <span ref={anchor} hidden />
    </div>
  );
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
