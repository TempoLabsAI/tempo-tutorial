import { useState, type ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";
import { Code2, Sparkles, X } from "./_ui/icons";
import { Button, CodeBlock } from "./_ui/primitives";
import { CanvasContextMenu } from "./_ui/canvas-context-menu";
import { DesignDiscoveryPrompt } from "./_ui/design-discovery-prompt";
import { requestImportDesigns } from "./_tutorialBridge";
import { ChatComposer } from "./_chat";
import { Keycap } from "./_keycap";
import { CopyButton, TutorialStyles } from "./_bits";
import { SubtleSpace } from "./_introSpace";
import { THEME_BRIDGE } from "./_themeBridge";

const CHANGE_PROMPT =
  "Give the selected element softer corners and try a different color. Keep the layout simple.";
const SOURCE = `<Button variant="secondary" size="lg">\n  <Sparkles />\n  Make it yours\n</Button>`;

function LessonFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div
      data-theme="dark"
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-14 overflow-hidden rounded-[24px] border border-border-primary bg-surface-dim p-14 font-sans text-text-primary"
    >
      <TutorialStyles />
      <SubtleSpace />
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

function ChatLesson() {
  return (
    <div className="flex gap-10">
      <div className="flex w-[256px] shrink-0 flex-col gap-5 pt-2">
        <h3 className="text-[24px] font-semibold leading-[30px]">
          A little help from chat
        </h3>
        <p className="text-[16px] leading-6 text-text-secondary">
          Select an element on the canvas and press ⌘ L. Your selection travels
          with your message, so Tempo knows what to change.
        </p>
        <div className="flex gap-3">
          <Keycap label="command" wide>
            ⌘
          </Keycap>
          <Keycap>L</Keycap>
        </div>
      </div>
      <div className="otv-bg-lilac flex min-w-0 flex-1 flex-col justify-center gap-5 rounded-2xl p-6">
        <div className="rounded-xl bg-surface-container-low p-4">
          <ChatComposer
            text={CHANGE_PROMPT}
            contextItems={[
              {
                id: "selected-card",
                type: "canvas",
                label: "Selected element",
              },
            ]}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-surface-container-lowest">
            Try a small change. Then make it your own.
          </span>
          <CopyButton text={CHANGE_PROMPT} />
        </div>
      </div>
    </div>
  );
}

/**
 * Lesson 03: view the code behind an element, ask chat for a change, and
 * bring your own app's screens and design system onto the canvas. The import
 * cards open the app's real Import designs dialog (Play mode).
 */
export function UnderTheHood() {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const [codeVisible, setCodeVisible] = useState(true);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  return (
    <div ref={setHost} className="relative w-[1014px]">
      <LessonFrame
        title="A familiar canvas. Real code."
        description="Every element is part of your app. Edit it visually, inspect the source, or bring your existing screens onto the canvas."
      >
        <div className="flex gap-10">
          <div className="flex w-[256px] shrink-0 flex-col gap-4 pt-2">
            <h3 className="text-[24px] font-semibold leading-[30px]">
              Look under the hood
            </h3>
            <p className="text-[16px] leading-6 text-text-secondary">
              Select an element, right-click, and choose{" "}
              <strong className="font-medium text-text-primary">
                View Code
              </strong>
              . It opens the source behind what you see.
            </p>
            <p className="text-sm leading-6 text-text-tertiary">
              This is a real button. Press Play to try it.
            </p>
          </div>
          <div className="otv-bg-lilac flex min-w-0 flex-1 flex-col gap-5 rounded-2xl p-6">
            <div className="flex min-h-[100px] items-center justify-center rounded-xl border border-border-primary bg-surface-container-low">
              <span className="rounded-lg border-2 border-text-blueberry p-1.5">
                <Button
                  variant="secondary"
                  size="lg"
                  onContextMenu={(event) => {
                    event.preventDefault();
                    setMenu({ x: event.clientX, y: event.clientY });
                  }}
                  onClick={() => setCodeVisible(true)}
                >
                  <Sparkles className="size-4" />
                  Make it yours
                </Button>
              </span>
            </div>
            {codeVisible ? (
              <div className="overflow-hidden rounded-xl border border-border-primary bg-surface-container-low shadow-lg">
                <div className="flex items-center gap-2 border-b border-border-secondary px-4 py-2 text-xs text-text-secondary">
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
                <CodeBlock language="tsx">{SOURCE}</CodeBlock>
              </div>
            ) : (
              <Button variant="secondary" onClick={() => setCodeVisible(true)}>
                <Code2 className="size-4" />
                View Code
              </Button>
            )}
          </div>
        </div>
        <ChatLesson />
        <div className="flex gap-10">
          <div className="flex w-[256px] shrink-0 flex-col gap-4 pt-2">
            <h3 className="text-[24px] font-semibold leading-[30px]">
              Bring your app with you
            </h3>
            <p className="text-[16px] leading-6 text-text-secondary">
              After you connect a project, capture its screens and design
              system. Keep designing with the components your team already uses.
            </p>
          </div>
          <div className="otv-bg-sky min-w-0 flex-1 rounded-2xl p-6">
            <div className="rounded-xl bg-surface-container-low p-4">
              <DesignDiscoveryPrompt
                variant="chat"
                onImportDesigns={requestImportDesigns}
              />
            </div>
          </div>
        </div>
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

defineControls(UnderTheHood, {});
defineControls(LessonFrame, {
  title: { type: "text" },
  description: { type: "text" },
  children: false,
});
defineControls(ChatLesson, {});
