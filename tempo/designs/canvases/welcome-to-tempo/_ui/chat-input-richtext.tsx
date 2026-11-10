/**
 * Display replica of the design-system chat composer
 * (composites/chat-input-richtext.tsx) in its idle state: the same markup and
 * classes the real composer renders for a context chip, a prompt and the
 * attach / model / send footer. The editor is a plain contentEditable seeded
 * through `setText` (the real one is a TipTap editor); menus, mentions and
 * sending are not wired — the tutorial only shows what a prompt looks like.
 */
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ReactNode,
} from "react";

export interface ChatInputRichtextArtifactItem {
  id: string;
  label: string;
  type: "canvas" | "doc" | "issue";
}

export interface ChatInputRichtextHandle {
  setText: (text: string) => void;
}

interface ChatInputModelGroup {
  label: string;
  models: { id: string; shortName: string; provider: string }[];
}

export interface ChatInputRichtextProps {
  mentionItems?: unknown[];
  mentionGroups?: unknown[];
  contextItems?: ChatInputRichtextArtifactItem[];
  provider?: string;
  model?: string;
  modelDisplayName?: string;
  onModelChange?: (model: string) => void;
  modelGroups?: ChatInputModelGroup[];
  crossProviderOpensNewChat?: boolean;
  placeholder?: string;
  onSend?: () => void;
  onTextChange?: () => void;
  onTokensChange?: () => void;
  onAddFiles?: () => void;
  onLinkPRDs?: () => void;
  onLinkCanvases?: () => void;
  onLinkIssues?: () => void;
}

/** Claude's spark, as the model selector draws it. */
function ClaudeMark() {
  return (
    <svg
      className=""
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#DE7356"
      fillRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
    </svg>
  );
}

/** The canvas context chip (`DismissablePill` in its resting state). */
function ContextChip({ label }: { label: string }) {
  return (
    <span className="inline-flex select-none items-center whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-border-primary bg-transparent text-text-primary gap-1.5 p-1 pr-1.5 [font-size:10px] [line-height:13px] rounded-lg group relative max-w-[112px]">
      <span className="flex shrink-0 items-center justify-center rounded size-4 bg-icons-tertiary text-surface">
        <svg
          className="size-3 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 3v18" />
        </svg>
      </span>
      <span className="min-w-0 truncate">{label}</span>
    </span>
  );
}

// The footer buttons are design-system `Button`s whose call-site classes
// replace some of the base ones (tailwind-merge); these are the merged lists.
const ATTACH_BUTTON =
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap ring-1 ring-inset ring-transparent font-medium outline-none transition-[colors,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus/60 disabled:cursor-default disabled:pointer-events-none disabled:ring-transparent disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/10 disabled:bg-transparent disabled:text-text-tertiary h-6 gap-1 rounded text-xs w-6 px-0 text-text-tertiary [--tw-outline-style:none]";
const MODEL_BUTTON =
  "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap ring-1 ring-inset ring-transparent font-medium outline-none transition-[colors,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus/60 disabled:cursor-default disabled:pointer-events-none disabled:ring-transparent disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/10 disabled:bg-transparent disabled:text-text-tertiary h-6 rounded px-2 text-xs gap-2 text-text-tertiary min-w-0 shrink [--tw-outline-style:none]";
const SEND_BUTTON =
  "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap ring-1 ring-inset ring-transparent font-medium outline-none transition-[colors,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus/60 disabled:cursor-default disabled:pointer-events-none disabled:bg-[var(--button-disabled-surface)] disabled:text-[var(--button-disabled-text)] disabled:ring-transparent disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-accent text-on-accent hover:bg-accent/85 active:bg-accent/75 h-6 gap-1 rounded text-xs w-6 px-0 shrink-0 [--tw-outline-style:none]";

const EDITOR_STYLES = `
  .chat-input-prosemirror > p {
    margin: 0 !important;
    font-size: inherit !important;
    font-weight: 400 !important;
    line-height: inherit !important;
  }
`;

export const ChatInputRichtext = forwardRef<
  ChatInputRichtextHandle,
  ChatInputRichtextProps
>(function ChatInputRichtext(
  { contextItems, provider, modelDisplayName, placeholder },
  ref,
) {
  const [text, setText] = useState("");
  // Re-key the editable surface on every programmatic set so the DOM the user
  // may have typed into is replaced, like the real editor's setContent.
  const [revision, setRevision] = useState(0);
  useImperativeHandle(
    ref,
    () => ({
      setText: (next: string) => {
        setText(next);
        setRevision((r) => r + 1);
      },
    }),
    [],
  );

  let attachments: ReactNode = null;
  if (contextItems && contextItems.length > 0) {
    attachments = (
      <div
        className="flex flex-wrap items-start gap-1.5"
        style={{ padding: "4px 8px" }}
      >
        <div style={{ display: "contents" }}>
          {contextItems.map((item) => (
            <ContextChip key={item.id} label={item.label} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col w-full">
      <div className="relative">
        <div
          className="relative"
          style={{
            padding: "0.5px",
            borderRadius: "8px",
            width: "100%",
            flexShrink: 0,
            background: "transparent",
          }}
        >
          <div
            className="relative"
            style={{
              backgroundColor: "var(--chat-input-bg, #191919)",
              borderRadius: "inherit",
              border: "1px solid var(--border-secondary, #232323)",
            }}
          >
            <div className="flex flex-col" style={{ padding: "8.5px" }}>
              {attachments}
              <style>{EDITOR_STYLES}</style>
              <div className="min-w-0" style={{ padding: "4px 8px 0px" }}>
                <div
                  className="relative min-w-0 max-h-[290px] overflow-y-auto"
                  style={{ minHeight: "72px" }}
                >
                  <div style={{ color: "var(--text-primary, #fafafa)" }}>
                    <div
                      key={revision}
                      contentEditable
                      suppressContentEditableWarning
                      role="textbox"
                      aria-multiline="true"
                      aria-label="Message input"
                      aria-placeholder={placeholder}
                      translate="no"
                      className="outline-none min-h-[72px] break-words chat-input-prosemirror"
                      tabIndex={0}
                      style={{
                        position: "relative",
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: 400,
                        whiteSpace: "break-spaces",
                        wordWrap: "break-word",
                        fontVariantLigatures: "none",
                        fontFeatureSettings: '"liga" 0',
                        caretColor: "var(--text-primary)",
                      }}
                    >
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between w-full gap-1">
                <div className="flex min-w-0 flex-1 items-center gap-0.5">
                  <div className="flex min-w-0 items-center gap-0.5 overflow-hidden">
                    <span className="flex items-center shrink-0">
                      <button
                        type="button"
                        tabIndex={0}
                        data-slot="button"
                        aria-label="Attach"
                        aria-haspopup="menu"
                        className={ATTACH_BUTTON}
                      >
                        <svg
                          className=""
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </span>
                    <span
                      className="flex items-center min-w-0 shrink"
                      style={{ maxWidth: "110px" }}
                    >
                      <button
                        type="button"
                        tabIndex={0}
                        data-slot="button"
                        aria-haspopup="menu"
                        className={MODEL_BUTTON}
                      >
                        {provider === "claude" ? <ClaudeMark /> : null}
                        <span className="min-w-0 truncate">
                          {modelDisplayName}
                        </span>
                        <svg
                          className=""
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  tabIndex={0}
                  data-slot="button"
                  aria-label="Send message"
                  className={SEND_BUTTON}
                >
                  <svg
                    className=""
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
