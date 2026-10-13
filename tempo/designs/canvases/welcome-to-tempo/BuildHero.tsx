import { useState, type CSSProperties } from "react";
import { FileDiff, Lightbulb } from "lucide-react";
import {
  ChangesPanel,
  type ChangesFile,
  type ChangesViewMode,
  DiffCounter,
  WorkspaceTree,
  type TreeNode,
} from "./_ui";
import gitBg from "./assets/git-bg.png";

/**
 * The Source-control strip's first section: two staggered, overlapping
 * sidebars that say "every chat runs in its own workspace, and every edit
 * lands as a real git change". The REAL workspace sidebar (`WorkspaceTree`,
 * exactly how it renders in the app — workspaces with a promoted chat, nested
 * chats, git folder / count icons, and `PrBadgeGroup` PR badges) sits on
 * top-left; Tempo's REAL source-control panel (`ChangesPanel`) is offset 50%
 * down and to the right, overlapping underneath. A compact `gh` tip sits below.
 * All real design-system components fed mock props (canvas guide §5.1), since
 * the live panels are wired to git/Convex/Electron the canvas host lacks.
 */
const FILES: ChangesFile[] = [
  // — Staged —
  { path: "app/checkout/page.tsx", fileName: "page.tsx", directory: "app/checkout", additions: 84, deletions: 12, status: "modified", staged: true },
  { path: "components/checkout/express-pay.tsx", fileName: "express-pay.tsx", directory: "components/checkout", additions: 96, deletions: 0, status: "added", staged: true },
  { path: "lib/payments/stripe.ts", fileName: "stripe.ts", directory: "lib/payments", additions: 47, deletions: 0, status: "added", staged: true },
  { path: "styles/checkout.css", fileName: "checkout.css", directory: "styles", additions: 22, deletions: 6, status: "modified", staged: true },
  { path: "package.json", fileName: "package.json", directory: "", additions: 3, deletions: 1, status: "modified", staged: true },
  // — Unstaged —
  { path: "components/ui/button.tsx", fileName: "button.tsx", directory: "components/ui", additions: 18, deletions: 4, status: "modified", staged: false },
  { path: "designs/canvases/checkout-flow/index.canvas.tsx", fileName: "index.canvas.tsx", directory: "designs/canvases/checkout-flow", additions: 142, deletions: 0, status: "untracked", staged: false },
  { path: "lib/cart.ts", fileName: "cart.ts", directory: "lib", additions: 14, deletions: 22, status: "modified", staged: false },
];

const noop = () => {};

/**
 * Mock of the real workspace sidebar tree: each workspace is a git branch with
 * a promoted first chat in the header (git folder / count icon, PR badge,
 * timestamp); multi-chat workspaces expand to nested chats. Purple (merged) +
 * green (open/approved) PRs scattered across workspaces, one unread — the
 * resting states the app shows (no live streaming/loader state, so nothing
 * shimmers in the static canvas). Chats are conversations, not commits, so
 * they carry no diff counters.
 */
const WORKSPACES: TreeNode[] = [
  {
    id: "ws-checkout",
    label: "checkout-express-pay",
    data: { kind: "workspace", workspaceId: "ws-checkout", isArchivable: true, prNumber: 482, prStatus: "merged", prReviewDecision: "approved", timestamp: "2h" },
    children: [
      { id: "c-checkout-1", label: "Checkout express pay", animateLabel: false, data: { kind: "thread", chatId: "c-checkout-1", workspaceId: "ws-checkout", threadIndicator: "none" } },
      { id: "c-checkout-2", label: "Wire Apple Pay sheet", animateLabel: false, data: { kind: "thread", chatId: "c-checkout-2", workspaceId: "ws-checkout", threadIndicator: "none", timestamp: "3h" } },
    ],
  },
  {
    id: "ws-cart",
    label: "refactor-cart-totals",
    data: { kind: "workspace", workspaceId: "ws-cart", isArchivable: true, prNumber: 479, prStatus: "open", prReviewDecision: "approved", timestamp: "4h" },
    children: [
      { id: "c-cart-1", label: "Refactor cart totals", animateLabel: false, data: { kind: "thread", chatId: "c-cart-1", workspaceId: "ws-cart", threadIndicator: "none" } },
      { id: "c-cart-2", label: "Fix rounding on subtotal", animateLabel: false, data: { kind: "thread", chatId: "c-cart-2", workspaceId: "ws-cart", threadIndicator: "none", timestamp: "5h" } },
      { id: "c-cart-3", label: "Update tax calculation", animateLabel: false, data: { kind: "thread", chatId: "c-cart-3", workspaceId: "ws-cart", threadIndicator: "none", timestamp: "6h" } },
    ],
  },
  {
    id: "ws-guest",
    label: "guest-checkout-flow",
    data: { kind: "workspace", workspaceId: "ws-guest", isArchivable: true, prNumber: 487, prStatus: "open", timestamp: "now" },
    children: [
      { id: "c-guest", label: "Guest checkout flow", animateLabel: false, data: { kind: "thread", chatId: "c-guest", workspaceId: "ws-guest", threadIndicator: "none" } },
    ],
  },
  {
    id: "ws-coupon",
    label: "fix-coupon-edge-case",
    data: { kind: "workspace", workspaceId: "ws-coupon", isArchivable: true, prNumber: 470, prStatus: "open", timestamp: "1d" },
    children: [
      { id: "c-coupon", label: "Fix coupon edge case", animateLabel: false, data: { kind: "thread", chatId: "c-coupon", workspaceId: "ws-coupon", threadIndicator: "none" } },
    ],
  },
  {
    id: "ws-address",
    label: "address-book-redesign",
    data: { kind: "workspace", workspaceId: "ws-address", isArchivable: true, prNumber: 465, prStatus: "merged", timestamp: "2d" },
    children: [
      { id: "c-address-1", label: "Address book redesign", animateLabel: false, data: { kind: "thread", chatId: "c-address-1", workspaceId: "ws-address", threadIndicator: "none" } },
      { id: "c-address-2", label: "Validate postal codes", animateLabel: false, data: { kind: "thread", chatId: "c-address-2", workspaceId: "ws-address", threadIndicator: "none", timestamp: "2d" } },
    ],
  },
  {
    id: "ws-button",
    label: "tidy-button-variants",
    data: { kind: "workspace", workspaceId: "ws-button", isArchivable: true, prNumber: 458, prStatus: "merged", prReviewDecision: "approved", timestamp: "4d" },
    children: [
      { id: "c-button", label: "Tidy button variants", animateLabel: false, data: { kind: "thread", chatId: "c-button", workspaceId: "ws-button", isUnread: true, threadIndicator: "dot" } },
    ],
  },
];

/** The real workspace sidebar — same footprint as the ChangesPanel card. */
function WorkspaceSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-3 pb-2 pt-3">
        <span className="text-[13px] font-medium text-text-primary">Chat</span>
        <span className="text-[11px] text-text-tertiary">checkout-app</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-1.5 pb-2">
        <WorkspaceTree
          items={WORKSPACES}
          showHeader={false}
          dense
          sortItems={false}
          defaultExpandedIds={["ws-checkout", "ws-cart", "ws-address"]}
          selectedIds={["c-checkout-1"]}
        />
      </div>
    </div>
  );
}

/** The same macOS-style arrow cursor used across the other heroes in this canvas. */
function Cursor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 39 40" width="38" height="39" fill="none" aria-hidden className={className}>
      <path
        d="M5.71829 2.87558C5.56251 2.30534 6.44481 1.51223 6.98048 1.74094L32.186 12.5025C32.8912 12.8036 32.803 13.8507 32.0427 14.2041L20.9091 18.8186C20.7141 18.9092 20.5472 19.0592 20.4347 19.245L15.0018 29.5241C14.563 30.2488 13.5326 30.2073 13.3275 29.4566L5.71829 2.87558Z"
        fill="black"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BuildHero() {
  const [viewMode, setViewMode] = useState<ChangesViewMode>("uncommitted");
  const [selected, setSelected] = useState<string | undefined>("app/checkout/page.tsx");

  // Two staggered, overlapping sidebars of equal size. The chat tree sits
  // top-left on top; the uncommitted ChangesPanel is offset down + right, tucked
  // underneath. The pair lives in a fixed-width group that's centered in the
  // strip, so thinning the cards keeps the cluster horizontally centered.
  const CARD = "absolute w-[248px] h-[360px] overflow-hidden rounded-2xl border border-border-primary shadow-[0_18px_44px_-16px_rgba(0,0,0,0.6)]";

  // The ChangesPanel paints a bottom scroll-fade keyed to --surface-container-lowest;
  // since this card sits on --surface-container (brighter), the fade reads as a dark
  // inner shadow. Remap the token locally so the fade blends into the card bg.
  const KILL_INNER_FADE = { "--surface-container-lowest": "var(--surface-container)" } as CSSProperties;

  return (
    <div className="flex flex-col gap-x-5 gap-y-[22px]">
      {/* Scenic backdrop (git-bg.png) with the staggered chat + source-control
          cards floating on top — the same card-on-backdrop convention the Docs,
          Issues, and Share heroes use (outer bg-cover frame + p-7 inset). */}
      <div
        className="overflow-hidden rounded-2xl border border-border-primary bg-cover bg-center p-7 shadow-[0_14px_36px_rgba(0,0,0,0.42)]"
        style={{ backgroundImage: `url(${gitBg})` }}
      >
      <div className="relative flex h-[416px] w-full justify-center">
        {/* TOP-RIGHT — the real source-control diff-stat counter; an elbow
            connector leaves it heading left, then turns down into the panel */}
        <div className="absolute right-0 top-0 z-40 inline-flex items-center gap-1.5 rounded-md border border-border-secondary bg-surface-container-high px-2 py-1">
          <FileDiff className="size-3.5 text-text-tertiary" />
          <DiffCounter added={426} removed={45} className="!outline-none" />
        </div>

        {/* Cursor resting on the source-control counter */}
        <Cursor className="pointer-events-none absolute right-[4px] top-[24px] z-50 rotate-12 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />

        {/* ELBOW CONNECTOR — out of the counter, LEFT, then DOWN onto the changes panel */}
        <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full" fill="none" aria-hidden>
          <path
            d="M428 16 L372 16 Q364 16 364 24 L364 56"
            stroke="var(--border-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

       <div className="relative h-full w-[472px]">
        {/* UNDERNEATH — uncommitted changes, offset down + right, same bg as the chat card; inner scroll-fade neutralized. Opaque (no opacity) so the scenic backdrop doesn't bleed through the card, per the card convention. */}
        <div className={`${CARD} right-0 top-[56px] z-10 bg-surface-container rounded-[8px]`} style={KILL_INNER_FADE}>
          <ChangesPanel
            className="h-full"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            files={FILES}
            selectedFilePath={selected}
            onFileSelect={(f) => setSelected(f.path)}
            onStageFile={noop}
            onUnstageFile={noop}
            onDiscardFile={noop}
            currentBranch="affan/checkout-v2"
            defaultBranch="main"
            branches={["main", "affan/checkout-v2"]}
            onBranchChange={noop}
          />
        </div>

        {/* ON TOP — chat sidebar, top-left, lifted above the strip */}
        <div className={`${CARD} left-0 top-0 z-20 bg-surface-container rounded-lg`}>
          <WorkspaceSidebar />
        </div>
       </div>
      </div>
      </div>

      {/* Compact tip — install gh CLI to surface PR numbers on workspaces */}
      <div className="mx-auto flex max-w-[380px] items-start gap-2 rounded-lg border border-border-primary px-3 py-2 text-[11px] leading-snug text-text-tertiary border-[#212121]">
        <Lightbulb className="mt-[1px] size-3.5 shrink-0" />
        <span className="text-text-tertiary"><span className="font-medium text-text-primary">Tempo Tip:</span> Install the GitHub CLI <code className="rounded border border-border-primary bg-surface-base px-1 py-0.5 font-mono text-[10px] text-text-secondary">gh</code> to show live PR tracking on your workspaces.</span>
      </div>
    </div>
  );
}
