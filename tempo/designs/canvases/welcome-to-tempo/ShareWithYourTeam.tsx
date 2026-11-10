import * as React from "react";
import { defineControls } from "tempo-sdk/assets";
import { HugeiconsIcon, Share01Icon } from "./_ui/icons";
import {
  ChangesPanel,
  type ChangesFile,
  type ChangesViewMode,
} from "./_ui/changes-panel";
import { CommentMessage, CommentPin, CommentThread } from "./_ui/comments";
import { InlineResourceChip } from "./_ui/primitives";
import { CheckingState, SHARE_POPOVER_SURFACE } from "./_ui/share-progress";
const shareBg = "https://raw.githubusercontent.com/TempoLabsAI/tempo-tutorial/0c865c0/tempo/designs/canvases/welcome-to-tempo/assets/share-bg.png";
const gitBg = "https://raw.githubusercontent.com/TempoLabsAI/tempo-tutorial/0c865c0/tempo/designs/canvases/welcome-to-tempo/assets/git-bg.png";
import { TutorialStyles } from "./_bits";
import { THEME_BRIDGE } from "./_themeBridge";
import { ShareCursors } from "./_shareCursors";
import { SubtleSpace } from "./_introSpace";

// Variant E: comment -> commit -> share as a zigzag path. Each step is a
// 560x330 photo card that alternates sides, joined by dashed connectors that
// leave one card's side edge and land on the next card's top edge.
//
// Geometry (content box is 902px wide):
//   card W=560, H=330, row gap G=48 -> rows start at y 0 / 378 / 756.
//   Row 2's card sits flush right, so it spans x 342..902.

const noop = () => {};

const FILES: ChangesFile[] = [
  {
    path: "src/pages/Playground.tsx",
    fileName: "Playground.tsx",
    directory: "src/pages",
    additions: 142,
    deletions: 0,
    status: "untracked",
    staged: true,
  },
  {
    path: "src/components/PlayCard.tsx",
    fileName: "PlayCard.tsx",
    directory: "src/components",
    additions: 38,
    deletions: 6,
    status: "modified",
    staged: true,
  },
  {
    path: "src/styles/tokens.css",
    fileName: "tokens.css",
    directory: "src/styles",
    additions: 4,
    deletions: 1,
    status: "modified",
    staged: true,
  },
];

/** Lesson 04: comment, commit and share, joined as a zigzag path. */
export function ShareWithYourTeam() {
  const [viewMode, setViewMode] =
    React.useState<ChangesViewMode>("uncommitted");
  const [message, setMessage] = React.useState("Refine the playground");
  return (
    <div
      data-theme="dark"
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-12 overflow-hidden rounded-[24px] border border-border-primary bg-surface-dim px-14 py-14 font-sans text-text-primary"
    >
      <TutorialStyles />
      <SubtleSpace />
      <div className="flex flex-col gap-3">
        <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em]">
          Share it with your team
        </h2>
        <p className="text-[17px] leading-[26px] text-text-secondary">
          Feedback, commit, live link. All in one place.
        </p>
      </div>

      <div className="relative flex flex-col gap-12">
        {/* Comment */}
        <div className="flex h-[330px] flex-row items-center gap-10">
          <div className="otv-bg-sky relative h-[330px] w-[560px] shrink-0 overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
            {/* User content being reviewed: a simple card layout */}
            <div className="absolute left-[32px] top-[40px] flex w-[232px] flex-col rounded-lg bg-[#F7F5F0] p-4 shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
              <span className="block h-2.5 w-20 rounded-full bg-[#1F3A2E]/70" />
              <span className="mt-2 block h-1.5 w-32 rounded-full bg-[#1F3A2E]/25" />
              <div className="mt-4 flex flex-row gap-1.5">
                <span className="h-[150px] flex-1 rounded bg-[#1F3A2E]/10" />
                <span className="h-[150px] flex-1 rounded bg-[#D9654B]/85" />
                <span className="h-[150px] flex-1 rounded bg-[#1F3A2E]/10" />
              </div>
            </div>
            <div className="absolute left-[150px] top-[92px]">
              <CommentPin
                users={[{ initials: "M", color: "#ce5347" }]}
                status="unread"
              />
            </div>
            <div className="absolute right-[32px] top-[40px]">
              <CommentThread
                replyAuthor={{ initials: "V", color: "#7c6bd6" }}
                showResolve
                onResolve={noop}
                onMarkUnread={noop}
                onCopyLink={noop}
                onDeleteThread={noop}
                replyInputProps={{ value: "" }}
              >
                <CommentMessage
                  authorName="Maya"
                  authorInitials="M"
                  authorColor="#ce5347"
                  timestamp="2 min. ago"
                  onReactionClick={noop}
                  reactions={[{ emoji: "\u{1F440}", count: 1 }]}
                >
                  Can this card pop a bit more?
                </CommentMessage>
              </CommentThread>
            </div>
          </div>
          <div className="flex max-w-[280px] flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Comment
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Your team leaves feedback right on the canvas.
            </span>
          </div>
        </div>

        {/* Commit & deploy */}
        <div className="flex h-[330px] flex-row-reverse items-center gap-10">
          <div
            className="relative h-[330px] w-[560px] shrink-0 overflow-hidden rounded-2xl bg-cover bg-center shadow-[0_14px_36px_rgba(0,0,0,0.3)]"
            style={{ backgroundImage: `url(${gitBg})` }}
          >
            <div className="absolute left-[60px] top-[40px] flex h-[330px] w-[440px] flex-col overflow-hidden rounded-t-lg border-x border-t border-border-primary bg-surface-container-low shadow-[0_18px_44px_rgba(0,0,0,0.35)]">
              <ChangesPanel
                label="Changes"
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                files={FILES}
                currentBranch="playground"
                defaultBranch="main"
                branches={["main", "playground"]}
                onBranchChange={noop}
                hasRemote
                hasStagedFiles
                commitMessage={message}
                onCommitMessageChange={setMessage}
                onCommit={noop}
                onCommitAndPush={noop}
              />
            </div>
          </div>
          <div className="flex max-w-[280px] flex-col gap-2 text-right">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Commit &amp; deploy
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Connect your Git and ship in a click.
            </span>
          </div>
        </div>

        {/* Share */}
        <div className="flex h-[330px] flex-row items-center gap-10">
          <div
            className="relative h-[330px] w-[560px] shrink-0 overflow-hidden rounded-2xl bg-cover bg-center shadow-[0_14px_36px_rgba(0,0,0,0.3)]"
            style={{ backgroundImage: `url(${shareBg})` }}
          >
            <div className="absolute left-[72px] top-[34px] flex w-[416px] flex-col gap-2">
              <div className="flex items-center justify-between gap-2 rounded-lg border border-border-primary bg-surface-container py-1.5 pl-3 pr-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                <InlineResourceChip type="canvas" label="playground" />
                {/* ShareCanvasButton's trigger, verbatim classes + icon. The real
                    component wraps the live SharePopover (Convex-backed), so
                    only its trigger markup is rendered here. */}
                <span className="flex h-7 min-w-0 items-center gap-1.5 rounded-md bg-surface-lavender px-3 text-xs font-medium text-text-lavender">
                  <HugeiconsIcon
                    icon={Share01Icon}
                    size={14}
                    className="shrink-0"
                  />
                  <span className="truncate">Share</span>
                </span>
              </div>
              <div
                className={`rounded-lg border shadow-[0_22px_50px_rgba(0,0,0,0.4)] ${SHARE_POPOVER_SURFACE.className}`}
              >
                <div className="flex flex-col gap-3">
                  <CheckingState
                    detail="Creating share link..."
                    bleed={SHARE_POPOVER_SURFACE.bleedPx}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-w-[280px] flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Share
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              One click. Shippy handles the rest!
            </span>
          </div>
        </div>

        {/* Connectors, drawn over the gaps in exact content-box pixels */}
        <svg
          className="pointer-events-none absolute left-0 top-0"
          width="902"
          height="1086"
          viewBox="0 0 902 1086"
          fill="none"
        >
          <path
            d="M 560 250 C 690 250, 734 286, 734 378"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 8"
          />
          <circle cx="560" cy="250" r="4" fill="rgba(255,255,255,0.7)" />
          <circle cx="734" cy="378" r="4" fill="rgba(255,255,255,0.7)" />
          <path
            d="M 342 628 C 212 628, 168 664, 168 756"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 8"
          />
          <circle cx="342" cy="628" r="4" fill="rgba(255,255,255,0.7)" />
          <circle cx="168" cy="756" r="4" fill="rgba(255,255,255,0.7)" />
        </svg>
      </div>
      <ShareCursors />
    </div>
  );
}

defineControls(ShareWithYourTeam, {});
