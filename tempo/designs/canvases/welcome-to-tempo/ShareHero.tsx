import type { ReactNode } from "react";
import { X } from "lucide-react";
import {
  Button,
  ShareButton,
  HowSharingWorksTooltip,
  ReadyState,
} from "./_ui";
import { InlineResourceChip } from "./_ui";
import shareBg from "./assets/share-bg.png";

/**
 * The Source-control strip's second section: the REAL canvas Share UI
 * (`ShareButton` + `ReadyState`) — "a design is just a file, so sharing it is
 * one git-native link away". Real design-system components fed mock props
 * (canvas guide §5.1), since the live panels are wired to Convex/Electron the
 * canvas host lacks.
 */
const noop = () => {};

/** The real PopoverContent chrome the share popover renders into. */
function SharePanelFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[405px] self-center overflow-hidden rounded-xl border border-border-primary bg-surface-container p-4 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col gap-4">
        {/* Header — title + How-sharing-works + close (matches SharePopover) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-medium leading-[22px] text-text-primary">
              Share
            </span>
            <HowSharingWorksTooltip />
          </div>
          <Button variant="ghost" size="xs" icon={<X size={16} />} aria-label="Close" />
        </div>
        {children}
      </div>
    </div>
  );
}

/** A canvas tab bar with the real Share button pinned to the right. */
function CanvasBar() {
  return (
    <div className="mx-auto flex w-full max-w-[405px] items-center justify-between gap-2 self-center rounded-lg border border-border-primary bg-surface-container px-3 py-2">
      <InlineResourceChip type="canvas" label="checkout-flow" />
      <ShareButton />
    </div>
  );
}

export function ShareHero() {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-title-3 leading-relaxed text-text-secondary">Since canvases reflect real code in your repo, sharing is synced with your git changes. Share your canvas after pushing with a link.</p>
      <div
        className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-border-primary bg-cover bg-center p-7 shadow-[0_14px_36px_rgba(0,0,0,0.42)]"
        style={{ backgroundImage: `url(${shareBg})` }}
      >
        <CanvasBar />
        <SharePanelFrame>
          <ReadyState
            shareLink="https://auth.tempo.build/share/checkout-flow"
            publicLink="https://auth.tempo.build/share/checkout-flow?token=8f2a"
            visibility="public"
            canToggleVisibility
            contentType="canvas"
            onVisibilityChange={noop}
            onCopyLink={noop}
          />
        </SharePanelFrame>
      </div>
    </div>
  );
}
