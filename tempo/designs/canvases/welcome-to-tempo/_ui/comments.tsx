/**
 * Display replicas of the design-system canvas-comment primitives
 * (primitives/comment-pin.tsx, comment-thread.tsx, comment-message.tsx):
 * the same markup and classes they render for an unread pin and an open
 * thread. Menus, reactions and replying are not wired.
 */
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUp,
  CircleCheck,
  Ellipsis,
  Paperclip,
  SmilePlus,
  X,
} from "./icons";

type AvatarUser = { initials: string; color: string };

function Avatar({
  initials,
  color,
  className,
}: {
  initials: string;
  color: string;
  className: string;
}) {
  return (
    <div
      className={className}
      aria-label={initials}
      style={{ backgroundColor: color, color: "rgba(0, 0, 0, 0.75)" }}
    >
      <span className="block leading-none">{initials}</span>
    </div>
  );
}

export function CommentPin({
  users,
}: {
  users: AvatarUser[];
  status?: "unread" | "read";
}) {
  const [user] = users;
  return (
    <div className="relative w-max select-none">
      <div aria-hidden="true" style={{ width: "34px", height: "34px" }} />
      <div
        className="absolute bottom-0 left-0 z-10 overflow-hidden"
        style={{
          width: "34px",
          height: "34px",
          backgroundColor: "var(--lavender-800)",
          borderRadius: "17px 17px 17px 4px",
          filter: "var(--comment-pin-shadow)",
        }}
      />
      <div
        className="absolute left-0 top-0 z-20 flex items-center"
        style={
          {
            transform: "translate(4px, 4px)",
            "--avatar-ring": "var(--lavender-800)",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0" style={{ marginLeft: "0px" }}>
          <Avatar
            initials={user.initials}
            color={user.color}
            className="inline-flex items-center justify-center text-center font-bold select-none shrink-0 size-4 rounded-full size-[26px] text-[11px] shadow-[0_0_0_2px_var(--avatar-ring,var(--lavender))] aspect-square"
          />
        </div>
      </div>
    </div>
  );
}

export function CommentMessage({
  authorName,
  authorInitials,
  authorColor,
  timestamp,
  reactions = [],
  children,
}: {
  authorName: string;
  authorInitials: string;
  authorColor: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  onReactionClick?: (emoji: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-2">
      <div className="flex h-[24px] items-start gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <Avatar
            initials={authorInitials}
            color={authorColor}
            className="inline-flex items-center justify-center text-center font-bold select-none shrink-0 size-4 rounded-full size-[24px] text-[11px] aspect-square"
          />
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[14px] font-medium leading-4 text-text-primary">
              {authorName}
            </span>
            <span className="shrink-0 text-[11px] leading-4 text-text-tertiary">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-[32px]">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 whitespace-pre-wrap text-[13px] leading-4 text-text-primary">
            {children}
          </div>
          <button type="button" tabIndex={0}>
            <span
              role="button"
              aria-label="Add reaction"
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-tertiary opacity-0 transition-[color,opacity,background-color] hover:bg-surface-container-highest hover:text-text-secondary group-hover:opacity-100"
            >
              <SmilePlus className="size-4" />
            </span>
          </button>
        </div>
        {reactions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {reactions.map((reaction) => (
              <button
                key={reaction.emoji}
                type="button"
                aria-label={reaction.emoji}
                className="inline-flex items-center justify-center gap-1.5 rounded-md px-1.5 py-1.5 text-[10px] transition-colors bg-surface-container-highest text-text-primary hover:brightness-125"
              >
                <span className="leading-[13px] text-body">
                  {reaction.emoji}
                </span>
                <span className="font-semibold leading-[13px] text-label">
                  {reaction.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CommentThread({
  replyAuthor,
  children,
}: {
  replyAuthor: AvatarUser;
  showResolve?: boolean;
  onResolve?: () => void;
  onMarkUnread?: () => void;
  onCopyLink?: () => void;
  onDeleteThread?: () => void;
  replyInputProps?: { value: string };
  children: ReactNode;
}) {
  return (
    <div
      className="flex w-[340px] flex-col gap-px overflow-clip rounded-xl border-[0.5px] border-border-primary bg-surface-container-high shadow-popover"
      style={{ maxHeight: "calc(-144px + 100vh)" }}
    >
      <div className="flex shrink-0 items-end justify-between border-b-[0.5px] border-border-primary p-4">
        <span className="text-[12px] font-medium leading-[15px] text-text-secondary">
          Comments
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            tabIndex={0}
            aria-haspopup="menu"
            aria-label="Thread options"
            className="flex items-center justify-center rounded-md text-text-tertiary outline-none transition-colors hover:text-text-secondary data-[popup-open]:text-text-secondary"
            aria-expanded="false"
          >
            <Ellipsis className="size-4" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center transition-colors text-text-tertiary hover:text-text-secondary"
            aria-label="Resolve thread"
          >
            <CircleCheck className="size-4" />
          </button>
          <button
            type="button"
            className="text-text-tertiary hover:text-text-secondary transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-col gap-6 overflow-y-auto pt-[16px] px-4 pb-5 [scrollbar-width:thin] [scrollbar-color:var(--surface-container-highest)_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface-container-highest">
        <div className="flex flex-col gap-4">{children}</div>
        <div className="flex items-start gap-2.5">
          <Avatar
            initials={replyAuthor.initials}
            color={replyAuthor.color}
            className="inline-flex items-center justify-center text-center font-bold select-none size-4 rounded-full size-[24px] shrink-0 text-[11px] aspect-square"
          />
          <div className="flex flex-col gap-1.5 grow basis-[0%]">
            <div className="relative flex flex-col overflow-clip border-border-primary gap-0 rounded-[20px] shadow-[var(--shadow-popover)] flex-1 border-0 bg-surface-container-highest shadow-none p-2 py-[13px] pr-2 pl-[16px]">
              <div className="flex gap-2 items-center">
                <div className="relative min-w-0 flex-1">
                  <textarea
                    className="relative min-h-[20px] w-full resize-none overflow-hidden bg-transparent text-[13px] leading-5 outline-none placeholder:text-text-tertiary text-text-primary"
                    placeholder="Add your comment..."
                    rows={1}
                    style={{ height: "20px" }}
                  />
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <button
                    type="button"
                    className="flex items-center text-text-tertiary transition-colors hover:text-text-secondary"
                    aria-label="Attach file"
                  >
                    <Paperclip className="size-4" />
                  </button>
                  <button
                    type="button"
                    disabled
                    className="flex size-7 shrink-0 items-center justify-center transition-colors rounded-lg bg-surface-container-highest text-text-tertiary"
                    aria-label="Send comment"
                  >
                    <ArrowUp className="size-4" strokeWidth={2.25} />
                  </button>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-0 w-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
