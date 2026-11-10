import * as React from "react";
import {
  ChatInputRichtext,
  type ChatInputRichtextArtifactItem,
  type ChatInputRichtextHandle,
} from "./_ui/chat-input-richtext";

const noop = () => {};

/**
 * Tempo's real chat composer fed mock props (no Convex / session wiring),
 * seeded with `text` so it reads like a prompt is ready to send.
 */
export function ChatComposer({
  text,
  contextItems,
}: {
  text: string;
  contextItems?: ChatInputRichtextArtifactItem[];
}) {
  const ref = React.useRef<ChatInputRichtextHandle>(null);
  React.useEffect(() => {
    ref.current?.setText(text);
  }, [text]);

  return (
    <ChatInputRichtext
      ref={ref}
      mentionItems={[]}
      mentionGroups={[]}
      contextItems={contextItems}
      provider="claude"
      model="opus-4.8"
      modelDisplayName="Opus 4.8"
      onModelChange={noop}
      modelGroups={[
        {
          label: "Claude",
          models: [
            { id: "opus-4.8", shortName: "Opus 4.8", provider: "claude" },
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
  );
}
