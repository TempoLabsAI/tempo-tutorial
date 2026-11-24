import * as React from "react";
import { defineControls } from "tempo-sdk/assets";
import { Check, HugeiconsIcon, Share01Icon } from "./_ui/icons";
import {
  ChangesPanel,
  type ChangesFile,
  type ChangesViewMode,
} from "./_ui/changes-panel";
import { CommentMessage, CommentPin, CommentThread } from "./_ui/comments";
import { Button, InlineResourceChip } from "./_ui/primitives";
import { CheckingState, SHARE_POPOVER_SURFACE } from "./_ui/share-progress";
import { TutorialStyles } from "./_bits";
import { THEME_BRIDGE } from "./_themeBridge";
import { ShareCursors } from "./_shareCursors";
import { LessonBackdrop, StepLabel } from "./_ascii";
import { SamplePricing } from "./_samplePricing";

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

/** The card under review, as on the Comment lesson: before, or with the
 *  middle column made to pop. `mark` outlines what changed. */
function ReviewedCard({ after = false }: { after?: boolean }) {
  return <SamplePricing lifted={after} width={186} />;
}

/** One side of the comparison: a mono label over the screenshot. */
function ReviewPane({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2.5 px-6 py-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-text-secondary">{label}</span>
        {note ? <span className="text-text-tertiary">{note}</span> : null}
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

/** New lesson: visual review. Continues the zigzag and its connector. */
function ReviewLesson() {
  return (
    <div className="relative flex h-[330px] flex-row-reverse items-center gap-10">
      {/* Connector from the Commit frame above, in this row's own pixels. */}
      <svg
        className="pointer-events-none absolute left-0 top-[-128px]"
        width="902"
        height="128"
        viewBox="0 0 902 128"
        fill="none"
      >
        <path
          d="M 560 0 H 722 Q 734 0 734 12 V 128"
          stroke="rgba(244,244,250,0.32)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="560" cy="2.5" r="2.5" fill="#f4f4fa" />
        <circle cx="734" cy="125.5" r="2.5" fill="#f4f4fa" />
      </svg>
      <div className="otv-bg-sky relative flex h-[330px] w-[560px] shrink-0 flex-col overflow-hidden rounded-none">
        {/* What changed, and on which pull request */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium text-text-primary">
              Refine the playground
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
              Pull request · 1 of 12 screens changed
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
            Needs your review
          </span>
        </div>
        {/* Before and after, side by side */}
        <div className="flex min-h-0 flex-1 divide-x divide-white/10">
          <ReviewPane label="Before">
            <ReviewedCard />
          </ReviewPane>
          <ReviewPane label="After" note="1 change">
            <ReviewedCard after />
          </ReviewPane>
        </div>
        {/* The decision */}
        <div className="flex items-center justify-end gap-2 border-t border-white/10 px-6 py-3">
          <Button variant="ghost" size="sm">
            Request changes
          </Button>
          <Button variant="primary" size="sm">
            <Check className="size-4" />
            Approve
          </Button>
        </div>
      </div>
      <div className="flex max-w-[280px] flex-col gap-2 text-right">
        <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
          Review
        </span>
        <span className="text-[16px] leading-[24px] text-text-secondary">
          Tempo screenshots your screens on every pull request and shows what
          changed. Nothing merges until you approve.
        </span>
      </div>
    </div>
  );
}

/** Lesson 04: share, comment, commit and review, joined as a zigzag path. */
export function ShareWithYourTeam({
  subtitle = "Live link, feedback, commit, review. All in one place.",
}: {
  subtitle?: string;
}) {
  const [viewMode, setViewMode] =
    React.useState<ChangesViewMode>("uncommitted");
  const [message, setMessage] = React.useState("Refine the playground");
  return (
    <div
      data-theme="dark"
      data-tutorial-token-scope=""
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-12 overflow-hidden rounded-[10px] border border-border-primary bg-[#050508] px-14 pb-14 pt-[88px] font-sans text-text-primary"
    >
      <TutorialStyles />
      <LessonBackdrop shape="link" x={70} y={905} size={420} opacity={0.45} />
      <StepLabel>04 / 05 · Share</StepLabel>
      <div className="flex flex-col gap-3">
        <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em]">
          Share it with your team
        </h2>
        <p className="text-[17px] leading-[26px] text-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className="relative flex flex-col gap-12">
        {/* Share */}
        <div className="flex h-[330px] flex-row items-center gap-10">
          <div className="otv-bg-sky relative h-[330px] w-[560px] shrink-0 overflow-hidden rounded-none">
            <div className="absolute left-[72px] top-[34px] flex w-[416px] flex-col gap-2">
              <div className="flex items-center justify-between gap-2 rounded-[4px] border border-border-primary bg-surface-container py-1.5 pl-3 pr-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
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
                className={`rounded-[4px] border shadow-[0_22px_50px_rgba(0,0,0,0.4)] ${SHARE_POPOVER_SURFACE.className}`}
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
              One click and the link is ready.
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="flex h-[330px] flex-row-reverse items-center gap-10">
          <div className="otv-bg-sky relative h-[330px] w-[560px] shrink-0 overflow-hidden rounded-none">
            {/* The design being reviewed: three plan cards */}
            <div className="absolute left-[20px] top-[48px] shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
              <SamplePricing width={300} />
            </div>
            <div className="absolute left-[150px] top-[112px]">
              <CommentPin
                users={[{ initials: "M", color: "#CD9DFA" }]}
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
                  authorColor="#CD9DFA"
                  timestamp="2 min. ago"
                  onReactionClick={noop}
                  reactions={[{ emoji: "\u{1F440}", count: 1 }]}
                >
                  Can this card pop a bit more?
                </CommentMessage>
              </CommentThread>
            </div>
          </div>
          <div className="flex max-w-[280px] flex-col gap-2 text-right">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Comment
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Your team leaves feedback right on the canvas.
            </span>
          </div>
        </div>

        {/* Commit & deploy */}
        <div className="flex h-[330px] flex-row items-center gap-10">
          <div className="otv-bg-sky relative h-[330px] w-[560px] shrink-0 overflow-hidden rounded-none">
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
          <div className="flex max-w-[280px] flex-col gap-2">
            <span className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em]">
              Commit &amp; deploy
            </span>
            <span className="text-[16px] leading-[24px] text-text-secondary">
              Connect your Git and ship in a click.
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
            d="M 560 250 H 722 Q 734 250 734 262 V 378"
            stroke="rgba(244,244,250,0.32)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="560" cy="250" r="2.5" fill="#f4f4fa" />
          <circle cx="734" cy="378" r="2.5" fill="#f4f4fa" />
          <path
            d="M 342 628 H 180 Q 168 628 168 640 V 756"
            stroke="rgba(244,244,250,0.32)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="342" cy="628" r="2.5" fill="#f4f4fa" />
          <circle cx="168" cy="756" r="2.5" fill="#f4f4fa" />
        </svg>
      </div>
      <ReviewLesson />
      <ShareCursors />
    </div>
  );
}

defineControls(ShareWithYourTeam, {
  subtitle: { type: "text" },
});
