import type { ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";
import { Circle, Frame, MousePointer2, Square, Type } from "./_ui/icons";
import {
  CanvasDesignToolbar,
  type CanvasToolbarItem,
} from "./_ui/canvas-design-toolbar";
import { ColumnIcon, PenToolIcon, RowIcon } from "./_ui/canvas-toolbar-icons";
import { Keycap } from "./_keycap";
import { LayoutOption, TutorialStyles, type Theme } from "./_bits";
import { THEME_BRIDGE } from "./_themeBridge";
import { LessonBackdrop, StepLabel } from "./_ascii";

const noop = () => {};

// Same tools, icons, and shortcuts as the canvas toolbar in
// tempo-modules/canvas/renderer/design-shell/CanvasCenterPanel.tsx.
const TOOLBAR_ITEMS: CanvasToolbarItem[] = [
  {
    type: "button",
    id: "select",
    icon: <MousePointer2 className="size-4" strokeWidth={1.5} />,
    label: "Select",
    shortcut: { key: "v" },
  },
  {
    type: "dropdown-button",
    options: [
      {
        id: "draw-div",
        icon: <Frame className="size-4" strokeWidth={1.5} />,
        label: "Div",
        shortcut: { key: "f" },
      },
      {
        id: "draw-row",
        icon: <RowIcon />,
        label: "Row",
        shortcut: { key: "r", shift: true },
      },
      {
        id: "draw-column",
        icon: <ColumnIcon />,
        label: "Column",
        shortcut: { key: "c", shift: true },
      },
    ],
  },
  {
    type: "dropdown-button",
    options: [
      {
        id: "draw-element",
        icon: <Square className="size-4" strokeWidth={1.5} />,
        label: "Rectangle",
        shortcut: { key: "r" },
      },
      {
        id: "draw-shape-ellipse",
        icon: <Circle className="size-4" strokeWidth={1.5} />,
        label: "Ellipse",
        shortcut: { key: "o" },
      },
    ],
  },
  {
    type: "button",
    id: "pen",
    icon: <PenToolIcon className="size-4" />,
    label: "Pen",
    shortcut: { key: "p" },
  },
  {
    type: "dropdown-button",
    options: [
      {
        id: "text",
        icon: <Type className="size-4" strokeWidth={1.5} />,
        label: "Text",
        shortcut: { key: "t" },
      },
    ],
  },
];

// Layout: three numbered lessons, stacked. Each has a header row (title and
// one line on the left, its shortcut keys at the right edge) and a full-width
// plate underneath holding a calm try-it area.

// The practice cards are monochrome and told apart by fill: one solid, one
// hatched, one outline only. Their classes are written out in full on each
// card so the canvas can edit them directly.

/** Lesson 02: draw, auto layout and positioning, each with a try-it area. */
export function YourTurnToPlay({
  theme = "dark",
  title = "Control every pixel by hand",
  subtitle = "Because sometimes taste is hard to prompt.",
  label = "By hand",
  footer,
}: {
  theme?: Theme;
  /** The words after the step count, above the title. */
  label?: string;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
}) {
  return (
    <div
      data-theme={theme}
      data-tutorial-token-scope=""
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-16 overflow-hidden rounded-[10px] border border-border-primary bg-[#050508] px-14 pb-14 pt-[88px] font-sans text-text-primary"
    >
      <TutorialStyles />
      <LessonBackdrop shape="frame" x={1010} y={840} size={640} opacity={0.3} />
      <StepLabel>{`02 / 05 · ${label}`}</StepLabel>

      <div className="flex flex-col gap-3">
        <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em]">
          {title}
        </h2>
        <p className="text-[17px] leading-[26px] text-text-secondary">
          {subtitle}
        </p>
        <p className="text-[14px] leading-[20px] text-text-tertiary">
          Play lets you click things like a real app. Turn it off for this
          screen: you're designing now.
        </p>
      </div>

      {/* Lesson 1 · Draw */}
      <div className="flex flex-col gap-7 border-t border-white/10 pt-5">
        <span className="font-mono text-[11px] tracking-[0.22em] text-text-tertiary">
          01
        </span>
        <div className="flex flex-row items-start gap-12">
          <div className="flex w-[240px] shrink-0 flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Draw anything
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Pick a tool, then drag in the box.
            </span>
          </div>
          <div className="ml-auto flex flex-row flex-wrap items-center justify-end gap-x-4 gap-y-3">
            <div className="flex flex-row items-center gap-2.5 text-[15px] font-medium">
              <Keycap size="sm">F</Keycap>
              Frame
            </div>
            <div className="flex flex-row items-center gap-2.5 text-[15px] font-medium">
              <Keycap size="sm">T</Keycap>
              Text
            </div>
            <div className="flex flex-row items-center gap-2.5 text-[15px] font-medium">
              <Keycap size="sm">R</Keycap>
              Rectangle
            </div>
            <div className="flex flex-row items-center gap-2.5 text-[15px] font-medium">
              <Keycap size="sm">O</Keycap>
              Ellipse
            </div>
            <div className="flex flex-row items-center gap-2.5 text-[15px] font-medium">
              <Keycap size="sm">P</Keycap>
              Pen
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="otv-bg-mint overflow-hidden rounded-none p-6">
            <div className="relative h-[260px] w-full rounded-[5px] border border-dashed border-white/25">
              <span className="absolute left-0 top-[118px] w-full text-center text-[14px] font-medium text-text-tertiary">
                Draw here
              </span>
              <div className="absolute box-border w-[157px] h-[87px] left-[120px] top-[42px]" />
            </div>
          </div>
          {/* Decorative: the real canvas toolbar, enlarged and tilted over the corner. */}
          <div className="pointer-events-none absolute -bottom-7 left-6 origin-bottom-left rotate-[-6deg] scale-[1.4] drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]">
            <CanvasDesignToolbar
              items={TOOLBAR_ITEMS}
              activeToolId="draw-div"
              onToolChange={noop}
            />
          </div>
        </div>
      </div>

      {/* Lesson 2 · Auto layout: loose cards become a row with ⇧A. */}
      <div className="flex flex-col gap-7 border-t border-white/10 pt-5">
        <span className="font-mono text-[11px] tracking-[0.22em] text-text-tertiary">
          02
        </span>
        <div className="flex flex-row items-start gap-12">
          <div className="flex w-[300px] shrink-0 flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Auto layout
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Drag a box around all three cards, then press ⇧A. They snap into a
              row!
            </span>
          </div>
          <div className="ml-auto flex flex-row items-center gap-2.5">
            <Keycap size="md">⇧</Keycap>
            <Keycap size="md">A</Keycap>
          </div>
        </div>
        <div className="otv-bg-gold overflow-hidden rounded-none p-6">
          <div data-otv-playground="" className="flex flex-col overflow-hidden">
            <div className="relative h-[220px]">
              <span className="absolute left-5 top-4 text-[11px] font-medium text-text-tertiary">
                Select these
              </span>
              <div className="p-0 gap-[150px] size-[max-content] flex flex-row flex-nowrap grid-cols-none grid-rows-none items-start justify-start box-border absolute [grid-template-areas:none] [grid-auto-flow:row] [grid-auto-columns:auto] [grid-auto-rows:auto] [align-content:start] [justify-items:start] left-1/2 -translate-x-1/2 top-[75px]">
                <div className="p-0 gap-[150px] size-[max-content] flex flex-row flex-nowrap grid-cols-none grid-rows-none items-start justify-start box-border [grid-template-areas:none] [grid-auto-flow:row] [grid-auto-columns:auto] [grid-auto-rows:auto] [align-content:start] [justify-items:start]">
                  <div
                    data-otv-watch="line-card"
                    className="left-auto top-auto relative [order:0] [grid-row-start:auto] [grid-row-end:auto] [grid-column-start:auto] [grid-column-end:auto] flex h-[70px] items-center px-7 text-[16px] flex-row font-mono font-medium uppercase tracking-[0.16em] bg-[#f4f4fa] text-[#0c0c10]"
                  >
                    One
                  </div>
                  <div className="left-auto top-auto relative [order:0] [grid-row-start:auto] [grid-row-end:auto] [grid-column-start:auto] [grid-column-end:auto] flex h-[70px] items-center px-7 text-[16px] flex-row font-mono font-medium uppercase tracking-[0.16em] bg-[#16161c] [background-image:repeating-linear-gradient(135deg,rgba(244,244,250,0.34)_0_1px,transparent_1px_6px)] text-[#f4f4fa] shadow-[inset_0_0_0_1px_rgba(244,244,250,0.6)] [text-shadow:0_0_3px_#16161c,0_0_6px_#16161c]">
                    Two
                  </div>
                  <div className="left-auto top-auto relative [order:0] [grid-row-start:auto] [grid-row-end:auto] [grid-column-start:auto] [grid-column-end:auto] flex h-[70px] items-center px-7 text-[16px] flex-row font-mono font-medium uppercase tracking-[0.16em] otv-tile-outline text-[#f4f4fa] shadow-[inset_0_0_0_1px_rgba(244,244,250,0.3)]">
                    Three
                  </div>
                </div>
              </div>
            </div>

            {/* Auto layout types; the one in use is lit once the cards are laid out. */}
            <div className="flex flex-row justify-center gap-14 border-t border-border-primary px-5 py-4 [zoom:1.25]">
              <LayoutOption watch="line-card" kind="row">
                <div className="flex h-[30px] w-[44px] flex-row items-center gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="text-[12px] font-semibold text-text-primary">
                  Row
                </div>
                <span className="text-[11px] text-text-tertiary">
                  ⇧R to draw a row
                </span>
              </LayoutOption>
              <LayoutOption watch="line-card" kind="column">
                <div className="flex h-[30px] w-[44px] flex-col gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="w-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="w-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="w-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="text-[12px] font-semibold text-text-primary">
                  Column
                </div>
                <span className="text-[11px] text-text-tertiary">
                  ⇧C to draw a column
                </span>
              </LayoutOption>
              <LayoutOption watch="line-card" kind="grid">
                <div className="grid h-[30px] w-[44px] grid-cols-2 gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="text-[12px] font-semibold text-text-primary">
                  Grid
                </div>
                <span className="text-[11px] text-text-tertiary">
                  ⇧G to draw a grid
                </span>
              </LayoutOption>
            </div>
          </div>
        </div>
        <span className="-mt-3 text-[14px] leading-[21px] text-text-tertiary">
          Then flip it to a column or change the gap in the style panel.
        </span>
      </div>

      {/* Lesson 3 · Positioning: pull a card out of the row and back in. */}
      <div className="flex flex-col gap-7 border-t border-white/10 pt-5">
        <span className="font-mono text-[11px] tracking-[0.22em] text-text-tertiary">
          03
        </span>
        <div className="flex flex-row items-start gap-12">
          <div className="flex w-[300px] shrink-0 flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Positioning
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              ⌘-click the purple card to select it inside the row. Drag it out
              and it floats free. Drop it back and it snaps into line.
            </span>
          </div>
          <div className="ml-auto flex flex-row items-center gap-3 text-[17px] font-medium text-text-primary">
            <Keycap size="md">⌘</Keycap>+ click
          </div>
        </div>
        <div className="otv-bg-lilac overflow-hidden rounded-none p-6">
          <div data-otv-playground="" className="flex flex-col overflow-hidden">
            <div className="relative h-[220px]">
              <span className="absolute left-5 top-4 text-[11px] font-medium text-text-tertiary">
                Auto layout row
              </span>
              <div className="absolute left-1/2 top-[50px] flex min-w-[420px] -translate-x-1/2 flex-row gap-3.5 border border-dashed border-white/30 bg-white/[0.03] p-3.5">
                <div className="flex h-[92px] w-[122px] items-center justify-center text-[15px] font-mono font-medium uppercase tracking-[0.16em] bg-[#16161c] [background-image:repeating-linear-gradient(135deg,rgba(244,244,250,0.34)_0_1px,transparent_1px_6px)] text-[#f4f4fa] shadow-[inset_0_0_0_1px_rgba(244,244,250,0.6)] [text-shadow:0_0_3px_#16161c,0_0_6px_#16161c]">
                  One
                </div>
                <div
                  data-otv-watch="float-card"
                  className="flex h-[92px] w-[122px] items-center justify-center bg-[#CD9DFA] text-[15px] text-[#141414] shadow-[0_10px_24px_rgba(0,0,0,0.35)] font-mono font-medium uppercase tracking-[0.16em]"
                >
                  Drag me
                </div>
                <div className="flex h-[92px] w-[122px] items-center justify-center text-[15px] font-mono font-medium uppercase tracking-[0.16em] otv-tile-outline text-[#f4f4fa] shadow-[inset_0_0_0_1px_rgba(244,244,250,0.3)]">
                  Three
                </div>
              </div>
            </div>

            {/* Position types; the one in use follows the purple card live. */}
            <div className="flex flex-row justify-center gap-14 border-t border-border-primary px-5 py-4 [zoom:1.25]">
              <LayoutOption watch="float-card" kind="static">
                <div className="flex h-[30px] w-[44px] flex-row items-center gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="h-full flex-1 rounded-[2px] bg-[#CD9DFA]" />
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="text-[12px] font-semibold text-text-primary">
                  In the flow
                </div>
                <span className="text-[11px] text-text-tertiary">
                  Follows the layout
                </span>
              </LayoutOption>
              <LayoutOption watch="float-card" kind="absolute">
                <div className="relative h-[30px] w-[44px] rounded-[5px] border border-border-secondary">
                  <span className="absolute left-[18px] top-[9px] h-[14px] w-[18px] rounded-[2px] bg-[#CD9DFA]" />
                </div>
                <div className="text-[12px] font-semibold text-text-primary">
                  Absolute
                </div>
                <span className="text-[11px] text-text-tertiary">
                  Floats free
                </span>
              </LayoutOption>
            </div>
          </div>
        </div>
      </div>
      {footer}
    </div>
  );
}

defineControls(YourTurnToPlay, {
  theme: { type: "select", options: ["dark", "light"] },
  title: { type: "text" },
  subtitle: { type: "text" },
  label: { type: "text" },
  footer: false,
});
