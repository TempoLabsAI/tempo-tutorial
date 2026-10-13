import { Check, ChevronDown, ArrowUpRight } from "lucide-react";
import { FreeTierIcon } from "./_ui";
import chatBg from "./assets/chat-bg.png";

/**
 * The "use any model" strip's hero — the chat composer's model picker shown
 * OPEN, opening upward from its real trigger button.
 *
 * The picker's live dropdown is a Radix menu that portals to `document.body`,
 * so it can't render inside a static storyboard frame. We reproduce the
 * `DropdownMenuContent` chrome as a plain panel (canvas guide §5.1) and fill
 * it with the SAME pieces the production picker uses — the real `FreeTierIcon`
 * badge plus the provider brand marks copied verbatim from
 * `chat-input-richtext.tsx` (`ClaudeIcon` / `OpencodeIcon` / `OpenAIIcon`),
 * styled with the exact `DropdownMenuItem` / `DropdownMenuGroupLabel` classes.
 * The trigger underneath is the real design-system `Button`.
 *
 * The message: use Claude, Codex, or any other model — bring your own through
 * OpenCode.
 */

/* Provider brand marks — copied verbatim from
   `tempo-design-system/components/composites/chat-input-richtext.tsx`
   (those copies are module-local and not exported). 14×14, `className`
   for color overrides, matching the picker's contract. */
function ClaudeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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

function OpencodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="64" fill="#131010" />
      <path d="M320 224V352H192V224H320Z" fill="#5A5858" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z"
        fill="white"
      />
    </svg>
  );
}

function OpenAIIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="118 120 485 480"
      fill="#74AA9C"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M304.246 295.411V249.828C304.246 245.989 305.687 243.109 309.044 241.191L400.692 188.412C413.167 181.215 428.042 177.858 443.394 177.858C500.971 177.858 537.44 222.482 537.44 269.982C537.44 273.34 537.44 277.179 536.959 281.018L441.954 225.358C436.197 222 430.437 222 424.68 225.358L304.246 295.411ZM518.245 472.945V364.024C518.245 357.304 515.364 352.507 509.608 349.149L389.174 279.096L428.519 256.543C431.877 254.626 434.757 254.626 438.115 256.543L529.762 309.323C556.154 324.679 573.905 357.304 573.905 388.971C573.905 425.436 552.315 459.024 518.245 472.941V472.945ZM275.937 376.982L236.592 353.952C233.235 352.034 231.794 349.154 231.794 345.315V239.756C231.794 188.416 271.139 149.548 324.4 149.548C344.555 149.548 363.264 156.268 379.102 168.262L284.578 222.964C278.822 226.321 275.942 231.119 275.942 237.838V376.986L275.937 376.982ZM360.626 425.922L304.246 394.255V327.083L360.626 295.416L417.002 327.083V394.255L360.626 425.922ZM396.852 571.789C376.698 571.789 357.989 565.07 342.151 553.075L436.674 498.374C442.431 495.017 445.311 490.219 445.311 483.499V344.352L485.138 367.382C488.495 369.299 489.936 372.179 489.936 376.018V481.577C489.936 532.917 450.109 571.785 396.852 571.785V571.789ZM283.134 464.79L191.486 412.01C165.094 396.654 147.343 364.029 147.343 332.362C147.343 295.416 169.415 262.309 203.48 248.393V357.791C203.48 364.51 206.361 369.308 212.117 372.665L332.074 442.237L292.729 464.79C289.372 466.707 286.491 466.707 283.134 464.79ZM277.859 543.48C223.639 543.48 183.813 502.695 183.813 452.314C183.813 448.475 184.294 444.636 184.771 440.797L279.295 495.498C285.051 498.856 290.812 498.856 296.568 495.498L417.002 425.927V471.509C417.002 475.349 415.562 478.229 412.204 480.146L320.557 532.926C308.081 540.122 293.206 543.48 277.854 543.48H277.859ZM396.852 600.576C454.911 600.576 503.37 559.313 514.41 504.612C568.149 490.696 602.696 440.315 602.696 388.976C602.696 355.387 588.303 322.762 562.392 299.25C564.791 289.173 566.231 279.096 566.231 269.024C566.231 200.411 510.571 149.067 446.274 149.067C433.322 149.067 420.846 150.984 408.37 155.305C386.775 134.192 357.026 120.758 324.4 120.758C266.342 120.758 217.883 162.02 206.843 216.721C153.104 230.637 118.557 281.018 118.557 332.357C118.557 365.946 132.95 398.571 158.861 422.083C156.462 432.16 155.022 442.237 155.022 452.309C155.022 520.922 210.682 572.266 274.978 572.266C287.931 572.266 300.407 570.349 312.883 566.028C334.473 587.141 364.222 600.576 396.852 600.576Z" />
    </svg>
  );
}

type Provider = "claude" | "opencode" | "openai";

interface Row {
  name: string;
  provider: Provider;
  current?: boolean;
  free?: boolean;
  /** Different provider than the active one — shows the cross-provider arrow. */
  cross?: boolean;
}

interface Group {
  label: string;
  rows: Row[];
}

/** Mirrors the production picker's grouping (provider sections, free flagged). */
const GROUPS: Group[] = [
  {
    label: "Claude",
    rows: [
      { name: "Opus 4.8", provider: "claude", current: true },
      { name: "Sonnet 4.6", provider: "claude" },
      { name: "Haiku 4.5", provider: "claude" },
    ],
  },
  {
    label: "Codex",
    rows: [
      { name: "GPT-5.4", provider: "openai", cross: true },
      { name: "GPT-5.4-mini", provider: "openai", cross: true },
    ],
  },
  {
    label: "OpenCode",
    rows: [
      { name: "Kimi K2", provider: "opencode", cross: true },
      { name: "Qwen3 Coder", provider: "opencode", cross: true },
      { name: "Grok Code", provider: "opencode", cross: true },
    ],
  },
];

function ProviderMark({ provider }: { provider: Provider }) {
  if (provider === "claude")
    return <ClaudeIcon className="text-text-tertiary shrink-0" />;
  if (provider === "opencode")
    return <OpencodeIcon className="text-text-tertiary shrink-0" />;
  return <OpenAIIcon className="text-text-tertiary shrink-0" />;
}

/**
 * Faithful reproduction of the model picker's `DropdownMenuContent` —
 * same panel chrome (`rounded-lg border bg-surface-container-high px-1.5
 * py-1.5 shadow-dropdown`) and the same per-row / group-label classes
 * lifted from `dropdown-menu.tsx`.
 */
function ModelPickerPanel() {
  return (
    <div className="min-w-[232px] rounded-lg border border-border-primary bg-surface-container-high px-1.5 py-1.5 shadow-dropdown">
      {GROUPS.map((group, gi) => (
        <div key={group.label}>
          {gi > 0 ? <div className="my-1 -mx-1.5 h-px bg-menu-divider" /> : null}
          <div className="px-2 py-1 [font-size:var(--text-label)] [line-height:var(--leading-label)] font-medium text-text-tertiary">
            {group.label}
          </div>
          {group.rows.map((row) => (
            <div
              key={row.name}
              className={`flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 [font-size:var(--text-body)] [line-height:var(--leading-body)] text-text-secondary transition-colors hover:bg-surface-container-highest ${
                row.current ? "bg-surface-container-highest" : ""
              }`}
            >
              <ProviderMark provider={row.provider} />
              <span className="flex-1">{row.name}</span>
              {row.free ? <FreeTierIcon className="shrink-0" /> : null}
              {row.current ? (
                <Check className="size-3.5 shrink-0 text-text-tertiary" />
              ) : null}
              {row.cross ? (
                <ArrowUpRight className="size-3.5 shrink-0 text-text-tertiary" />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ModelsHero() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="px-1 text-title-3 leading-relaxed text-text-secondary">
        Use Claude, Codex, or any other model through OpenCode. Switch any time.
      </p>

      {/* Scenic backdrop (chat-bg.png) with ONLY the model-picker graphic
          centered on top — the subtext above stays outside the card. */}
      <div
        className="flex items-center justify-center overflow-hidden rounded-2xl border border-border-primary bg-cover bg-center px-10 py-8 shadow-[0_14px_36px_rgba(0,0,0,0.42)]"
        style={{ backgroundImage: `url(${chatBg})` }}
      >
        {/* The model picker, opened from the composer's model button. The live
            menu portals out of the frame, so this is the reproduced panel
            centered in the card (guide §5.1). */}
        <ModelPickerPanel />
      </div>
    </div>
  );
}
