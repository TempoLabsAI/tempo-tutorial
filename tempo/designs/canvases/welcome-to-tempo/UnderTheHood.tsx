import { useState, type CSSProperties, type ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";
import { Code2, Sparkles, X } from "./_ui/icons";
import { Button } from "./_ui/primitives";
import { CanvasContextMenu } from "./_ui/canvas-context-menu";
import { ChatComposer } from "./_chat";
import { Avatar } from "@/design-system/primitives/Avatar";
import { Badge } from "@/design-system/primitives/Badge";
import { Button as AppButton } from "@/design-system/primitives/Button";
import { Keycap } from "./_keycap";
import { StackedLesson, TutorialStyles } from "./_bits";
import { LessonBackdrop, StepLabel } from "./_ascii";
import { THEME_BRIDGE } from "./_themeBridge";

const CHANGE_PROMPT =
  "Give the selected element softer corners and try a different color. Keep the layout simple.";
type ButtonPart = "button" | "icon" | "label";

// The button's source, a line at a time, with the part each line draws.
const CODE_LINES: { text: string; part: ButtonPart }[] = [
  { text: '<Button variant="secondary" size="lg">', part: "button" },
  { text: "  <Sparkles />", part: "icon" },
  { text: "  Make it yours", part: "label" },
  { text: "</Button>", part: "button" },
];
// Where each line sits in the code panel: header, top padding, 22px rows.
const FIRST_LINE_Y = 65;
const LINE_H = 22;
const SELECTED = "shadow-[0_0_0_1px_var(--blueberry-700)]";

function LayerTag({ children }: { children: string }) {
  return (
    <span className="absolute -top-[19px] left-[-1px] whitespace-nowrap bg-[var(--blueberry-700)] px-1.5 text-[10px] font-medium leading-[18px] text-[#04121a]">
      {children}
    </span>
  );
}

function LessonFrame({
  title,
  description,
  label,
  children,
}: {
  title: string;
  description: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      data-theme="dark"
      data-tutorial-token-scope=""
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-16 overflow-hidden rounded-[10px] border border-border-primary bg-[#050508] px-14 pb-14 pt-[88px] [counter-reset:lesson] font-sans text-text-primary"
    >
      <TutorialStyles />
      <LessonBackdrop shape="torus" x={965} y={75} size={420} opacity={0.5} />
      <StepLabel>{`03 / 05 · ${label}`}</StepLabel>
      <div className="flex flex-col gap-3">
        <h2 className="text-[40px] font-semibold leading-[46px] tracking-[-0.025em]">
          {title}
        </h2>
        <p className="max-w-[780px] text-[17px] leading-[26px] text-text-secondary">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

const APP_ACCENT = {
  "--color-accent": "var(--accent)",
  "--color-accent-hover": "var(--accent-hover)",
  "--color-accent-press": "var(--accent-press)",
} as CSSProperties;

/** One component from the codebase, as a tile: the real thing and its file. */
function ComponentTile({
  file,
  children,
}: {
  file: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-[5px] border border-border-primary p-4">
      {/* The tutorial's own theme recolours the accent inside its lessons.
          Hand it back to the app here, so these look as they do in the app. */}
      <div className="flex h-[72px] items-center justify-center" style={APP_ACCENT}>
        {children}
      </div>
      <span className="font-mono text-[10px] text-text-secondary">{file}</span>
    </div>
  );
}

/** New lesson: the components already in the codebase, ready on the canvas. */
function DesignSystemLesson() {
  return (
    <StackedLesson
      title="Real components, not copies"
      text="This sample project comes with its own components. These are the ones its app uses: restyle one here and the app changes too. Connect your project later and yours show up the same way."
    >
      <div className="otv-bg-mint flex flex-col gap-4 rounded-none p-6">
        <span className="text-[11px] font-medium text-text-secondary">
          Assets · from this project's code
        </span>
        {/* The sample app's own components, imported from where the app
            imports them, so a change made here is a change to the app. */}
        <div className="flex gap-3">
          <ComponentTile file="src/design-system/primitives/Button.tsx">
            <div className="w-[150px]">
              <AppButton variant="primary" size="md">
                Reserve
              </AppButton>
            </div>
          </ComponentTile>
          <ComponentTile file="src/design-system/primitives/Badge.tsx">
            <Badge variant="gold">Guest favorite</Badge>
          </ComponentTile>
          <ComponentTile file="src/design-system/primitives/Avatar.tsx">
            <Avatar alt="Maya Chen" size="lg" />
          </ComponentTile>
        </div>
      </div>
    </StackedLesson>
  );
}

function ChatLesson() {
  return (
    <StackedLesson
      title="A little help from chat"
      text="⌘-click an element to select it, then press ⌘ L. Your selection travels with your message, so Tempo knows what to change."
      aside={
        <>
          <Keycap size="md">⌘</Keycap>
          <Keycap size="md">L</Keycap>
        </>
      }
    >
      <div className="otv-bg-lilac flex flex-col gap-5 rounded-none p-6">
        <div className="rounded-[5px] p-4">
          <ChatComposer
            text={CHANGE_PROMPT}
            contextItems={[
              {
                id: "selected-card",
                type: "canvas",
                label: "Button",
              },
            ]}
          />
        </div>
        <span className="text-sm text-text-secondary">
          Try a small change. Then make it your own.
        </span>
      </div>
    </StackedLesson>
  );
}

/**
 * Lesson 03: the project's real components, the code behind an element, and
 * asking chat for a change.
 * Importing your own designs is the last screen's job.
 */
export function UnderTheHood({
  title = "A familiar canvas. Real code.",
  description = "Every element is part of your app. Edit it visually, inspect the source, or ask chat for a change.",
  label = "Real code",
}: {
  title?: string;
  description?: string;
  /** The words after the step count, above the title. */
  label?: string;
}) {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const [codeVisible, setCodeVisible] = useState(true);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [part, setPart] = useState<ButtonPart>("button");
  const lineY =
    FIRST_LINE_Y + LINE_H * CODE_LINES.findIndex((line) => line.part === part);
  return (
    <div ref={setHost} className="relative w-[1014px]">
      <LessonFrame title={title} description={description} label={label}>
        <DesignSystemLesson />
        <StackedLesson
          title="Look under the hood"
          text={
            <>
              ⌘-click the button to select it, right-click, and choose{" "}
              <strong className="font-medium text-text-primary">
                View Code
              </strong>
              . In Play, point at the icon or the label and its line of code
              lights up.
            </>
          }
        >
          <div className="otv-bg-lilac rounded-none p-6">
            <div className="relative flex flex-row items-stretch gap-5">
              <div className="flex h-[170px] w-[340px] shrink-0 items-center justify-center rounded-[5px] border border-border-primary">
                {/* Drawn as the canvas draws a selected layer: a hairline
                    round the element and its name on a tag. Pointing at the
                    icon or the label selects that part instead. */}
                <span
                  className={`relative inline-flex ${part === "button" ? SELECTED : ""}`}
                  onMouseLeave={() => setPart("button")}
                >
                  {part === "button" ? <LayerTag>Button</LayerTag> : null}
                  <Button
                    variant="secondary"
                    size="lg"
                    onContextMenu={(event) => {
                      event.preventDefault();
                      setMenu({ x: event.clientX, y: event.clientY });
                    }}
                    onClick={() => setCodeVisible(true)}
                  >
                    <span
                      className={`relative inline-flex ${part === "icon" ? SELECTED : ""}`}
                      onMouseEnter={() => setPart("icon")}
                    >
                      {part === "icon" ? <LayerTag>Sparkles</LayerTag> : null}
                      <Sparkles className="size-4" />
                    </span>
                    <span
                      className={`relative inline-flex ${part === "label" ? SELECTED : ""}`}
                      onMouseEnter={() => setPart("label")}
                    >
                      {part === "label" ? <LayerTag>Text</LayerTag> : null}
                      Make it yours
                    </span>
                  </Button>
                </span>
              </div>
              {codeVisible ? (
                <div className="flex h-[170px] min-w-0 flex-1 flex-col overflow-hidden rounded-[5px] border border-border-primary bg-[#0b0b0f] shadow-lg">
                  <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border-secondary px-4 text-xs text-text-secondary">
                    <Code2 className="size-3.5" />
                    Button.tsx
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      aria-label="Hide code"
                      onClick={() => setCodeVisible(false)}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                  {/* The source, with the selected part's lines lit. */}
                  <div className="flex flex-col pt-3 font-mono text-[12px] leading-[22px]">
                    {CODE_LINES.map((line, index) => {
                      const lit = line.part === part;
                      return (
                        <div
                          key={line.text}
                          className="flex h-[22px] flex-row"
                          style={{
                            backgroundColor: lit
                              ? "rgba(2,175,252,0.12)"
                              : "transparent",
                            boxShadow: lit
                              ? "inset 2px 0 0 var(--blueberry-700)"
                              : "none",
                          }}
                        >
                          <span className="w-9 shrink-0 select-none pr-3 text-right text-text-tertiary">
                            {index + 1}
                          </span>
                          <span
                            className="whitespace-pre"
                            style={{
                              color: lit
                                ? "var(--text-primary, #f4f4fa)"
                                : "rgba(244,244,250,0.55)",
                            }}
                          >
                            {line.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => setCodeVisible(true)}
                  >
                    <Code2 className="size-4" />
                    View Code
                  </Button>
                </div>
              )}
              {/* The thread from the selected element to its line of code. */}
              {codeVisible ? (
                <svg
                  className="pointer-events-none absolute left-0 top-0"
                  width="380"
                  height="170"
                  viewBox="0 0 380 170"
                  fill="none"
                >
                  <path
                    d={`M 238 85 C 300 85, 300 ${lineY}, 360 ${lineY}`}
                    stroke="var(--blueberry-700)"
                    strokeWidth="1.25"
                  />
                  <circle cx="238" cy="85" r="3" fill="var(--blueberry-700)" />
                  <circle
                    cx="360"
                    cy={lineY}
                    r="3"
                    fill="var(--blueberry-700)"
                  />
                </svg>
              ) : null}
            </div>
          </div>
        </StackedLesson>
        <ChatLesson />
      </LessonFrame>
      {menu && host && (
        <CanvasContextMenu
          position={menu}
          filepath="Button.tsx"
          container={host}
          onViewCode={() => {
            setCodeVisible(true);
            setMenu(null);
          }}
          onClose={() => setMenu(null)}
        />
      )}
    </div>
  );
}

defineControls(UnderTheHood, {
  title: { type: "text" },
  description: { type: "text" },
  label: { type: "text" },
});
defineControls(LessonFrame, {
  title: { type: "text" },
  description: { type: "text" },
  label: { type: "text" },
  children: false,
});
defineControls(ChatLesson, {});
