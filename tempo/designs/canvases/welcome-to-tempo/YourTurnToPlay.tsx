import type { ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";
import { Circle, Frame, MousePointer2, Square, Type } from "./_ui/icons";
import {
  CanvasDesignToolbar,
  type CanvasToolbarItem,
} from "./_ui/canvas-design-toolbar";
import { ColumnIcon, RowIcon } from "./_ui/canvas-toolbar-icons";
import { Kbd } from "./_ui/primitives";
import { PositionMatch, TutorialStyles, type Theme } from "./_bits";
import { THEME_BRIDGE } from "./_themeBridge";
import { SubtleSpace } from "./_introSpace";

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

// Layout: three lessons, each a teach column on the left (title, one line,
// keycaps) and a colorful panel on the right holding a calm try-it area.

/** Lesson 02: draw, auto layout and positioning, each with a try-it area. */
export function YourTurnToPlay({
  theme = "dark",
  footer,
}: {
  theme?: Theme;
  footer?: ReactNode;
}) {
  return (
    <div
      data-theme={theme}
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-14 overflow-hidden rounded-[24px] border border-border-primary bg-surface-dim px-14 py-14 font-sans text-text-primary"
    >
      <TutorialStyles />
      <SubtleSpace />

      <div className="flex flex-col gap-3">
        <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em]">
          Your turn to play
        </h2>
        <p className="text-[17px] leading-[26px] text-text-secondary">
          A familiar canvas. Draw, arrange, and make it yours.
        </p>
      </div>

      {/* Lesson 1 · Draw */}
      <div className="flex flex-row gap-10">
        <div className="flex w-[256px] shrink-0 flex-col gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Draw anything
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Pick a tool, then drag in the box.
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center gap-3 text-[15px] font-medium">
              <Kbd variant="large" className="w-8">
                F
              </Kbd>
              Frame
            </div>
            <div className="flex flex-row items-center gap-3 text-[15px] font-medium">
              <Kbd variant="large" className="w-8">
                T
              </Kbd>
              Text
            </div>
            <div className="flex flex-row items-center gap-3 text-[15px] font-medium">
              <Kbd variant="large" className="w-8">
                R
              </Kbd>
              Rectangle
            </div>
            <div className="flex flex-row items-center gap-3 text-[15px] font-medium">
              <Kbd variant="large" className="w-8">
                O
              </Kbd>
              Ellipse
            </div>
          </div>
        </div>
        <div className="relative flex-1">
          <div className="otv-bg-mint overflow-hidden rounded-2xl p-6 shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
            <div className="relative h-[260px] w-full rounded-xl border border-dashed border-white/25 bg-surface-container">
              <span className="absolute left-0 top-[118px] w-full text-center text-[14px] font-medium text-text-tertiary">
                Draw here
              </span>
              <div className="absolute box-border w-[157px] h-[87px] left-[120px] top-[42px]" />
            </div>
          </div>
          {/* Decorative: the real canvas toolbar, enlarged and tilted over the corner. */}
          <div className="pointer-events-none absolute -bottom-7 -left-8 origin-bottom-left rotate-[-6deg] scale-[1.4] drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]">
            <CanvasDesignToolbar
              items={TOOLBAR_ITEMS}
              activeToolId="draw-div"
              onToolChange={noop}
            />
          </div>
        </div>
      </div>

      {/* Lesson 2 · Auto layout: loose cards become a row with ⇧A. */}
      <div className="flex flex-row gap-10">
        <div className="flex w-[256px] shrink-0 flex-col gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Auto layout
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Select all three cards and press ⇧A. They snap into a row!
            </span>
          </div>
          <div className="flex flex-row items-center gap-1.5">
            <Kbd variant="large" className="w-8">
              ⇧
            </Kbd>
            <Kbd variant="large" className="w-8">
              A
            </Kbd>
          </div>
          <span className="text-[14px] leading-[21px] text-text-tertiary">
            Then flip it to a column or change the gap in the style panel.
          </span>
        </div>
        <div className="otv-bg-gold flex-1 overflow-hidden rounded-2xl p-6 shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
          <div
            data-otv-playground=""
            className="flex flex-col overflow-hidden rounded-xl bg-surface-container"
          >
            <div className="relative h-[190px]">
              <span className="absolute left-5 top-4 text-[11px] font-medium text-text-tertiary">
                Select these
              </span>
              <div className="p-0 gap-[103px] size-[max-content] flex flex-row flex-nowrap grid-cols-none grid-rows-none items-start justify-start box-border absolute [grid-template-areas:none] [grid-auto-flow:row] [grid-auto-columns:auto] [grid-auto-rows:auto] [align-content:start] [justify-items:start] left-[64px] top-[46px]">
                <div className="p-0 gap-[103px] size-[max-content] flex flex-row flex-nowrap grid-cols-none grid-rows-none items-start justify-start box-border [grid-template-areas:none] [grid-auto-flow:row] [grid-auto-columns:auto] [grid-auto-rows:auto] [align-content:start] [justify-items:start]">
                  <div
                    data-otv-watch="line-card"
                    className="left-auto top-auto relative [order:0] [grid-row-start:auto] [grid-row-end:auto] [grid-column-start:auto] [grid-column-end:auto] flex h-[48px] items-center rounded-xl px-5 text-[15px] font-semibold text-[#141414] bg-[#CD9DFA] flex-row"
                  >
                    One
                  </div>
                  <div className="left-auto top-auto relative [order:0] [grid-row-start:auto] [grid-row-end:auto] [grid-column-start:auto] [grid-column-end:auto] flex h-[48px] items-center rounded-xl px-5 text-[15px] font-semibold text-[#141414] bg-[#99DFFE] flex-row">
                    Two
                  </div>
                  <div className="left-auto top-auto relative [order:0] [grid-row-start:auto] [grid-row-end:auto] [grid-column-start:auto] [grid-column-end:auto] flex h-[48px] items-center rounded-xl px-5 text-[15px] font-semibold text-[#141414] bg-[#F5C26B] flex-row">
                    Three
                  </div>
                </div>
              </div>
            </div>

            {/* Auto layout types; the dot lights up once the cards are laid out. */}
            <div className="flex flex-row gap-14 border-t border-border-primary bg-surface-container-low px-5 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex h-[30px] w-[44px] flex-row items-center gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="flex flex-row items-center gap-1.5 text-[12px] font-semibold text-text-primary">
                  Row
                  <PositionMatch watch="line-card" kind="row" />
                </div>
                <span className="text-[11px] text-text-tertiary">
                  ⇧R draws one
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex h-[30px] w-[44px] flex-col gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="w-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="w-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="w-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="flex flex-row items-center gap-1.5 text-[12px] font-semibold text-text-primary">
                  Column
                  <PositionMatch watch="line-card" kind="column" />
                </div>
                <span className="text-[11px] text-text-tertiary">
                  ⇧C draws one
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid h-[30px] w-[44px] grid-cols-2 gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                  <span className="rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="flex flex-row items-center gap-1.5 text-[12px] font-semibold text-text-primary">
                  Grid
                  <PositionMatch watch="line-card" kind="grid" />
                </div>
                <span className="text-[11px] text-text-tertiary">
                  ⇧G draws one
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson 3 · Positioning: pull a card out of the row and back in. */}
      <div className="flex flex-row gap-10">
        <div className="flex w-[256px] shrink-0 flex-col gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Positioning
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              ⌘-click the purple card to select it inside the row. Drag it out
              and it floats free. Drop it back and it snaps into line.
            </span>
          </div>
          <div className="flex flex-row items-center gap-1.5 text-[14px] font-medium text-text-secondary">
            <Kbd variant="large" className="w-8">
              ⌘
            </Kbd>
            + click
          </div>
        </div>
        <div className="otv-bg-lilac flex-1 overflow-hidden rounded-2xl p-6 shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
          <div
            data-otv-playground=""
            className="flex flex-col overflow-hidden rounded-xl bg-surface-container"
          >
            <div className="relative h-[190px]">
              <span className="absolute left-5 top-4 text-[11px] font-medium text-text-tertiary">
                Auto layout row
              </span>
              <div className="absolute left-5 top-[40px] flex min-w-[300px] flex-row gap-2.5 rounded-xl border border-dashed border-[#99DFFE] bg-surface-blueberry p-2.5">
                <div className="flex h-[64px] w-[84px] items-center justify-center rounded-lg bg-[#99DFFE] text-[13px] font-semibold text-[#141414]">
                  One
                </div>
                <div
                  data-otv-watch="float-card"
                  className="flex h-[64px] w-[84px] items-center justify-center rounded-lg bg-[#CD9DFA] text-[13px] font-semibold text-[#141414] shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                >
                  Drag me
                </div>
                <div className="flex h-[64px] w-[84px] items-center justify-center rounded-lg bg-[#F5C26B] text-[13px] font-semibold text-[#141414]">
                  Three
                </div>
              </div>
            </div>

            {/* Position types; the dot follows the purple card live. */}
            <div className="flex flex-row gap-14 border-t border-border-primary bg-surface-container-low px-5 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex h-[30px] w-[44px] flex-row items-center gap-[3px] rounded-[5px] border border-border-secondary p-[4px]">
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                  <span className="h-full flex-1 rounded-[2px] bg-[#CD9DFA]" />
                  <span className="h-full flex-1 rounded-[2px] bg-text-tertiary/50" />
                </div>
                <div className="flex flex-row items-center gap-1.5 text-[12px] font-semibold text-text-primary">
                  In the flow
                  <PositionMatch watch="float-card" kind="static" />
                </div>
                <span className="text-[11px] text-text-tertiary">
                  Follows the layout
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative h-[30px] w-[44px] rounded-[5px] border border-border-secondary">
                  <span className="absolute left-[18px] top-[9px] h-[14px] w-[18px] rounded-[2px] bg-[#CD9DFA]" />
                </div>
                <div className="flex flex-row items-center gap-1.5 text-[12px] font-semibold text-text-primary">
                  Absolute
                  <PositionMatch watch="float-card" kind="absolute" />
                </div>
                <span className="text-[11px] text-text-tertiary">
                  Floats free
                </span>
              </div>
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
  footer: false,
});
