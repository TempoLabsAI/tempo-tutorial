import * as React from "react";

import {
  ChatInputRichtext,
  type ChatInputRichtextHandle,
  type ChatInputRichtextContextItem,
} from "./_ui";

const noop = () => {};

const DEFAULT_TEXT =
  "Design the listing page for havn, our stays-booking app — match our design system";

export interface ChatPreviewProps {
  /** Seed text shown in the composer. */
  text?: string;
  /** Context chips pre-attached above the input (e.g. a selected design layer). */
  contextItems?: ChatInputRichtextContextItem[];
  /** Which generate-mode pill is active. Defaults to "prototype". Pass null to hide it. */
  generateMode?: "design" | "prototype" | null;
}

/**
 * Renders Tempo's REAL chat composer — the design-system `ChatInputRichtext`
 * (rounded input, "+" menu, model picker, send button) — fed mock props with
 * NO Convex / auth / session wiring. Sits bare (no surrounding card frame).
 * Optionally seeds context chips so it reads like a layer was just added.
 * Mock-data harness per the canvas guide (§5.1).
 */
export function ChatPreview({ text, contextItems, generateMode = "prototype" }: ChatPreviewProps = {}) {
  const ref = React.useRef<ChatInputRichtextHandle>(null);

  React.useEffect(() => {
    // Best-effort seed so the composer reads like one in use (placeholder
    // shows otherwise — either way it's the real component).
    ref.current?.setText(text ?? DEFAULT_TEXT);
  }, [text]);

  return (
    <div className="w-full p-3">
      <ChatInputRichtext
        ref={ref}
        mentionItems={[]}
        mentionGroups={[]}
        contextItems={contextItems}
        generateMode={generateMode}
        onGenerateModeChange={noop}
        provider="claude"
        model="opus-4.8"
        modelDisplayName="Opus 4.8"
        onModelChange={noop}
        modelGroups={[
          {
            label: "Claude",
            models: [
              { id: "opus-4.8", shortName: "Opus 4.8", provider: "claude" },
              { id: "sonnet-4.6", shortName: "Sonnet 4.6", provider: "claude" },
            ],
          },
        ]}
        placeholder="Ask Tempo to design something…"
        onSend={noop}
        onTextChange={noop}
        onTokensChange={noop}
        onAddFiles={noop}
        onLinkPRDs={noop}
        onLinkCanvases={noop}
        onLinkIssues={noop}
      />
    </div>
  );
}
