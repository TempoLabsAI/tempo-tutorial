/**
 * Display-only replica of the DS `ChatInputRichtext` composer chrome — the
 * rounded container, the (static) text area, and the bottom toolbar (+ menu,
 * model-picker pill, generate-mode pill, send button). No prosemirror/editor
 * internals: the canvas only needs the look, seeded with static text via the
 * imperative `setText` ref the mock harness (`ChatPreview`) calls.
 */
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ReactNode,
} from "react";
import { Plus, ArrowUp, ChevronDown, Wand2 } from "lucide-react";
import { cn } from "./cn";

export interface ChatInputRichtextHandle {
  setText: (text: string) => void;
}
export interface ChatInputRichtextContextItem {
  id: string;
  label: string;
  type?: "file" | "canvas" | "doc" | "issue" | "plan" | "link";
  accent?: "kiwi" | "lavender" | "mustard" | "salmon" | "blueberry";
}
type AnyFn = (...args: unknown[]) => void;

export interface ChatInputRichtextProps {
  contextItems?: ChatInputRichtextContextItem[];
  generateMode?: "design" | "prototype" | null;
  modelDisplayName?: string;
  placeholder?: string;
  // Remaining DS props the mock harness passes — accepted + ignored (this is a
  // display-only replica; no editor/session/Convex wiring).
  mentionItems?: unknown;
  mentionGroups?: unknown;
  modelGroups?: unknown;
  provider?: string;
  model?: string;
  onGenerateModeChange?: AnyFn;
  onModelChange?: AnyFn;
  onSend?: AnyFn;
  onTextChange?: AnyFn;
  onTokensChange?: AnyFn;
  onAddFiles?: AnyFn;
  onLinkPRDs?: AnyFn;
  onLinkCanvases?: AnyFn;
  onLinkIssues?: AnyFn;
}

const ACCENT_CLASS: Record<string, string> = {
  kiwi: "button-accent-kiwi",
  lavender: "button-accent-lavender",
  mustard: "button-accent-mustard",
  salmon: "button-accent-salmon",
  blueberry: "button-accent-blueberry",
};

function ContextChip({ item }: { item: ChatInputRichtextContextItem }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1 rounded-[4px] bg-[var(--md-container-high)] px-1.5 py-0.5",
        ACCENT_CLASS[item.accent ?? "kiwi"],
      )}
    >
      <span className="size-1.5 rounded-[2px] bg-accent" />
      <span className="truncate text-[11px] text-accent">{item.label}</span>
    </span>
  );
}

export const ChatInputRichtext = forwardRef<
  ChatInputRichtextHandle,
  ChatInputRichtextProps
>(function ChatInputRichtext(props, ref) {
  const {
    contextItems,
    generateMode = "prototype",
    modelDisplayName = "Opus 4.8",
    placeholder = "Ask Tempo to design something…",
  } = props;
  const [text, setText] = useState<string>("");
  useImperativeHandle(ref, () => ({ setText: (t: string) => setText(t) }), []);

  return (
    // The send button is the only bare-accent surface here → scope it lavender.
    <div className="button-accent-lavender flex flex-col overflow-hidden rounded-lg border border-border-secondary bg-surface-container">
      {contextItems && contextItems.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 px-3 pt-3">
          {contextItems.map((c) => (
            <ContextChip key={c.id} item={c} />
          ))}
        </div>
      ) : null}

      <div className="min-h-[60px] flex-1 px-4 py-3">
        <div
          className={cn(
            "text-[13px] leading-[18px]",
            text ? "text-text-primary" : "text-text-tertiary",
          )}
        >
          {text || placeholder}
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-t border-border-secondary bg-surface-container-high px-3 py-2">
        <button
          type="button"
          className="flex size-6 items-center justify-center rounded text-icons-secondary transition-colors hover:bg-surface-container-highest"
          aria-label="Add context"
        >
          <Plus className="size-4" />
        </button>

        <div className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-border-secondary bg-surface-container px-2 py-1 text-[12px] font-medium text-text-primary transition-colors hover:bg-surface-container-highest">
          <span>{modelDisplayName}</span>
          <ChevronDown className="size-3 text-text-tertiary" />
        </div>

        {generateMode ? (
          <button
            type="button"
            className="button-accent-kiwi inline-flex h-6 shrink-0 select-none items-center gap-1 rounded bg-accent-subtle px-2 text-xs font-medium text-accent capitalize"
          >
            <Wand2 className="size-3.5" />
            <span>{generateMode}</span>
          </button>
        ) : null}

        <button
          type="button"
          className="ml-auto flex size-6 items-center justify-center rounded bg-accent text-on-accent transition-colors hover:bg-accent/85"
          aria-label="Send"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </div>
  );
}) as React.ForwardRefExoticComponent<
  ChatInputRichtextProps & React.RefAttributes<ChatInputRichtextHandle>
> & { _brand?: never };

export type ChatInputRichtextComponent = typeof ChatInputRichtext;
export type { ReactNode };
