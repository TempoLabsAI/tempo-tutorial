import { FileText } from "lucide-react";
import { InlineResourceChip } from "./_ui";
import { ChatPreview } from "./ChatPreview";
import { CheckoutDesignMock } from "./CheckoutDesignMock";

/**
 * The Docs strip's second hero: "attach a spec → generate a design".
 *
 * The PRD spec is attached into the REAL design-system chat composer
 * (`ChatInputRichtext`, via the `ChatPreview` mock-harness) as a context chip;
 * an elbow connector drops DOWN then turns RIGHT into a freshly generated
 * canvas — a real checkout design (`CheckoutDesignMock`) built from that spec,
 * tagged with the REAL DS `InlineResourceChip type="canvas"`.
 */
export function DocsToDesignHero() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* subtitle for this section */}
      <p className="px-1 text-title-3 leading-relaxed text-text-secondary">Drop a spec into chat and Tempo generates a matching design. It pulls straight from your PRD, no handoff required.</p>

      <div className="relative h-[557px] w-full">
        {/* TOP — the real chat composer (narrowed from the right) with the spec attached */}
        <div
          className="absolute left-0 top-0 z-20 w-[456px]"
          style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.30))" }}
        >
          <ChatPreview
            text="Generate a checkout design from this spec — match our design system."
            generateMode="design"
            contextItems={[{ id: "prd", label: "checkout-v2-prd.md", type: "file", accent: "kiwi" }]}
          />
        </div>

        {/* ELBOW CONNECTOR — down from the composer, then right into the canvas */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          fill="none"
          opacity={0.6}
          aria-hidden
        >
          <defs>
            <linearGradient
              id="docsLineGrad2"
              gradientUnits="userSpaceOnUse"
              x1="58"
              y1="150"
              x2="266"
              y2="252"
            >
              {/* green → lavender, bridged through blueberry-400 so the
                  near-complementary hues don't pass through a muddy grey
                  midpoint */}
              <stop offset="0%" stopColor="var(--kiwi-600)" />
              <stop offset="35%" stopColor="var(--blueberry-400)" />
              <stop offset="100%" stopColor="var(--lavender-500)" />
            </linearGradient>
          </defs>
          <path
            d="M58 150 L58 240 Q58 252 70 252 L266 252"
            stroke="url(#docsLineGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* dot at the head, where the line meets the canvas */}
          <circle cx="266" cy="252" r="4" fill="var(--lavender-500)" />
        </svg>

        {/* BOTTOM-RIGHT — the freshly generated checkout canvas */}
        <div
          className="absolute top-[72px] left-[268px] z-20 w-[272px]"
          style={{ filter: "drop-shadow(0 22px 48px rgba(0,0,0,0.55))" }}
        >
          <div className="overflow-hidden rounded-2xl border border-border-primary bg-surface-container-lowest p-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
            <div className="mb-2 flex items-center justify-between px-0.5">
              <InlineResourceChip type="canvas" label="checkout-flow" />
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-text-tertiary">
                <FileText className="size-2.5" /> from checkout-v2-prd
              </span>
            </div>
            {/* REAL generated design, built from the PRD spec */}
            <div className="overflow-hidden rounded-xl border border-border-primary bg-white">
              <CheckoutDesignMock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
