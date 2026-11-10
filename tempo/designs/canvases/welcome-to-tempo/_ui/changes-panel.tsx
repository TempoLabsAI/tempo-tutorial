/**
 * Display replica of the design-system Source Control `ChangesPanel`
 * (composites/changes-panel.tsx) for a branch with staged files: the same
 * toolbar, commit bar and file rows the real panel renders. The commit
 * message stays editable; committing, menus and the per-file actions are not
 * wired.
 */
import type { CSSProperties } from "react";
import {
  Check,
  ChevronDown,
  CircleCheck,
  CircleDot,
  Ellipsis,
  FileText,
  GitBranch,
  Minus,
  RotateCcw,
} from "./icons";

export type ChangesViewMode = "uncommitted" | "branch";

export interface ChangesFile {
  path: string;
  fileName: string;
  directory: string;
  additions: number;
  deletions: number;
  status: "modified" | "untracked" | "added" | "deleted";
  staged: boolean;
}

const STATUS_BADGE: Record<
  ChangesFile["status"],
  { letter: string; tone: string }
> = {
  modified: { letter: "M", tone: "text-info" },
  untracked: { letter: "U", tone: "text-warning" },
  added: { letter: "A", tone: "text-success" },
  deleted: { letter: "D", tone: "text-critical" },
};

const TREE_ROW_STYLE: CSSProperties = {
  paddingLeft: "calc(var(--tree-item-px) + calc(0 * var(--tree-item-indent)))",
  paddingRight: "var(--tree-item-pr, var(--tree-item-px))",
  paddingTop: "var(--tree-item-py)",
  paddingBottom: "var(--tree-item-py)",
  height: "var(--tree-item-height, auto)",
  transition: "background-color 150ms, color 150ms",
};

function ReactFileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="size-[var(--tree-icon-size)]"
    >
      <path
        fill="#2563EB"
        d="M12 13.677a1.677 1.677 0 100-3.354 1.677 1.677 0 000 3.354z"
      />
      <path
        stroke="#2563EB"
        d="M12 15.436c4.97 0 9-1.538 9-3.436s-4.03-3.436-9-3.436S3 10.102 3 12s4.03 3.436 9 3.436z"
      />
      <path
        stroke="#2563EB"
        d="M9.024 13.718c2.485 4.305 5.832 7.025 7.476 6.076 1.644-.949.961-5.208-1.524-9.512C12.491 5.977 9.144 3.257 7.5 4.206c-1.644.949-.961 5.208 1.524 9.512z"
      />
      <path
        stroke="#2563EB"
        d="M9.024 10.282c-2.485 4.304-3.168 8.563-1.524 9.512 1.644.95 4.99-1.771 7.476-6.076 2.485-4.304 3.168-8.563 1.524-9.512-1.644-.95-4.99 1.771-7.476 6.076z"
      />
    </svg>
  );
}

function CssFileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="size-[var(--tree-icon-size)]"
    >
      <path
        fill="#8B5CF6"
        d="M4.778 6.667A2.667 2.667 0 017.444 4a.889.889 0 010 1.778.889.889 0 00-.888.889v3.5c0 .701-.273 1.35-.73 1.833.457.483.73 1.132.73 1.832v3.501c0 .491.398.89.888.89a.889.889 0 010 1.777 2.667 2.667 0 01-2.666-2.667v-3.5a.889.889 0 00-.674-.863l-.43-.108a.889.889 0 010-1.724l.43-.108a.889.889 0 00.674-.862V6.667zm14.222 0A2.667 2.667 0 0016.333 4a.889.889 0 000 1.778c.491 0 .89.398.89.889v3.5c0 .701.272 1.35.729 1.833a2.664 2.664 0 00-.73 1.832v3.501a.889.889 0 01-.889.89.889.889 0 000 1.777A2.667 2.667 0 0019 17.333v-3.5c0-.408.278-.764.673-.863l.431-.108a.889.889 0 000-1.724l-.43-.108a.889.889 0 01-.674-.862V6.667z"
      />
    </svg>
  );
}

function FileRow({ file }: { file: ChangesFile }) {
  const badge = STATUS_BADGE[file.status];
  return (
    <div className="py-[0px]">
      <div className="contents">
        <div
          role="treeitem"
          tabIndex={-1}
          className="relative group flex w-full min-w-0 select-none items-center overflow-hidden rounded-md gap-[var(--tree-item-gap)] text-[length:var(--tree-label-size)] leading-[var(--tree-label-line-height)] outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-border-secondary text-text-secondary hover:bg-[var(--tree-item-hover-bg)] hover:text-text-primary data-[hovered=true]:bg-[var(--tree-item-hover-bg)] data-[hovered=true]:text-text-primary cursor-pointer"
          style={TREE_ROW_STYLE}
        >
          <span className="relative size-[var(--tree-icon-size)] shrink-0">
            <span className="leading-none">
              {file.fileName.endsWith(".css") ? (
                <CssFileIcon />
              ) : (
                <ReactFileIcon />
              )}
            </span>
          </span>
          <span className="min-w-0 flex-1 flex items-baseline gap-2 overflow-x-hidden overflow-y-visible">
            <span className="block truncate outline-none shrink-0 text-[length:var(--tree-label-size)] font-normal leading-tight text-text-secondary">
              {file.fileName}
            </span>
            <span className="truncate font-mono text-[length:var(--text-micro)] leading-tight text-text-tertiary">
              {file.directory}
            </span>
          </span>
          <span className="ml-auto flex min-w-0 self-stretch items-stretch gap-[var(--tree-meta-gap)] transition-opacity duration-75 group-hover:pointer-events-none group-hover:opacity-0">
            <span className="shrink-0">
              <span className="inline-flex shrink-0 items-center gap-1 rounded-sm px-1.5 py-px bg-surface-container-high text-text-secondary [font-size:var(--text-caption)] [line-height:var(--leading-caption)] !bg-transparent !text-caption !leading-caption !gap-1.5 outline outline-[0.5px] outline-border-secondary [[data-theme=light]_&]:!bg-surface-container-lowest font-sans">
                {file.additions !== 0 && (
                  <span className="text-success">+{file.additions}</span>
                )}
                {file.deletions !== 0 && (
                  <span className="text-critical">-{file.deletions}</span>
                )}
              </span>
            </span>
            <span className="shrink-0">
              <span
                className={`inline-flex size-4 shrink-0 items-center justify-center font-mono text-[9px] font-semibold leading-none ${badge.tone}`}
                title={file.status}
              >
                {badge.letter}
              </span>
            </span>
          </span>
          <span className="absolute right-[var(--tree-item-pr,var(--tree-item-px))] top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-sm bg-[var(--tree-item-actions-bg,transparent)] pl-2 opacity-0 transition-opacity duration-75 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-6 before:bg-gradient-to-l before:from-[var(--tree-item-actions-bg,transparent)] before:to-transparent before:content-['']">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="text-text-tertiary hover:text-text-primary"
              >
                <FileText className="size-3" />
              </button>
              <button
                type="button"
                className="text-text-tertiary hover:text-critical"
              >
                <RotateCcw className="size-3" />
              </button>
              <button
                type="button"
                className="text-text-tertiary hover:text-text-primary"
              >
                <Minus className="size-3" />
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  label,
  count,
  staged,
}: {
  label: string;
  count: number;
  staged: boolean;
}) {
  const StatusIcon = staged ? CircleCheck : CircleDot;
  return (
    <div className="group/section-header flex h-max w-full items-center gap-1.5 rounded-sm px-2 py-1.5">
      <button
        type="button"
        aria-expanded="true"
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5"
      >
        <span className="relative size-3.5 shrink-0">
          <span
            aria-hidden="true"
            className="absolute inset-0 text-text-tertiary group-hover/section-header:hidden"
          >
            <StatusIcon className="size-3.5" strokeWidth={2.25} />
          </span>
          <ChevronDown className="absolute inset-0 size-3.5 text-text-tertiary hidden group-hover/section-header:block" />
          {staged && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[calc(100%+3px)] h-[999px] w-px -translate-x-1/2 bg-border-secondary"
            />
          )}
        </span>
        <span className="font-medium leading-[14px] text-text-secondary text-body">
          {label}
        </span>
        <span className="inline-flex items-center rounded-full bg-surface-container-high px-1.5 py-px text-[10px] leading-[14px] text-text-tertiary">
          {count}
        </span>
      </button>
    </div>
  );
}

export function ChangesPanel({
  label,
  files,
  currentBranch,
  commitMessage,
  onCommitMessageChange,
}: {
  label: string;
  viewMode: ChangesViewMode;
  onViewModeChange?: (mode: ChangesViewMode) => void;
  files: ChangesFile[];
  currentBranch: string;
  defaultBranch?: string;
  branches?: string[];
  onBranchChange?: (branch: string) => void;
  hasRemote?: boolean;
  hasStagedFiles?: boolean;
  commitMessage: string;
  onCommitMessageChange: (message: string) => void;
  onCommit?: () => void;
  onCommitAndPush?: () => void;
}) {
  const sorted = [...files].sort((a, b) => a.path.localeCompare(b.path));
  const staged = sorted.filter((file) => file.staged);
  const unstaged = sorted.filter((file) => !file.staged);
  return (
    <div
      className="flex h-full flex-col"
      style={
        {
          "--tree-item-py": "5px",
          "--tree-item-actions-bg": "var(--tree-item-hover-bg)",
        } as CSSProperties
      }
    >
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="flex min-h-full flex-col">
            <div className="flex flex-col gap-1.5 px-3 pt-2 pb-1.5">
              <div className="flex min-h-6 items-center justify-between gap-2">
                <span className="shrink-0 font-medium text-text-secondary text-body">
                  {label}
                </span>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Commit"
                    className="inline-flex size-6 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-surface-container-high hover:text-text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-text-tertiary"
                  >
                    <Check className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label="More actions"
                    className="inline-flex size-6 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-surface-container-high hover:text-text-primary"
                    aria-expanded="false"
                  >
                    <Ellipsis className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex w-full min-w-0 items-center gap-2 rounded-md bg-surface-container py-0.5 pr-0.5 pl-[10px] text-[12px] font-normal text-text-tertiary h-[32px] border-solid border border-surface-menu">
                <GitBranch className="size-3.5 shrink-0 text-text-tertiary" />
                <span className="min-w-0 flex-1 truncate text-text-primary text-body">
                  {currentBranch}*
                </span>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-label="Switch changes view"
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-surface-container-high hover:text-text-primary"
                  aria-expanded="false"
                >
                  <ChevronDown className="size-3" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-0 border-b border-border-secondary px-3 pt-1 pb-3">
              <div className="flex flex-col gap-2.5">
                <div className="relative">
                  <textarea
                    placeholder="Message (⌘Enter to commit)"
                    rows={1}
                    className="block max-h-[7.5rem] w-full resize-none overflow-y-auto rounded bg-surface-container px-2 py-1.5 align-top text-[13px] leading-[18px] text-text-primary outline-none ring-1 ring-border-secondary transition-colors placeholder:text-text-tertiary focus:ring-border-primary"
                    style={{ height: "30px" }}
                    value={commitMessage}
                    onChange={(event) =>
                      onCommitMessageChange(event.target.value)
                    }
                  />
                </div>
                <div className="flex w-full items-stretch">
                  <button
                    type="button"
                    className="inline-flex h-7 flex-1 items-center justify-center gap-1.5 text-[12px] font-medium leading-[15px] transition-colors rounded-l bg-accent text-on-accent hover:bg-accent/85"
                  >
                    Commit
                  </button>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label="Commit options"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-r border-l transition-colors border-on-accent/20 bg-accent text-on-accent hover:bg-accent/85"
                    aria-expanded="false"
                  >
                    <ChevronDown className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex min-h-0 flex-1 flex-col px-2 pb-10">
              <div className="relative flex h-fit w-full flex-col overflow-hidden py-[0px] px-[4px] mt-[8px]">
                <SectionHeader label="Staged" count={staged.length} staged />
                <div className="grid" style={{ gridTemplateRows: "1fr" }}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="mt-[2px]">
                      {staged.map((file) => (
                        <FileRow key={file.path} file={file} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex h-fit w-full flex-col overflow-hidden py-[4px] px-[4px]">
                <SectionHeader
                  label="Unstaged"
                  count={unstaged.length}
                  staged={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
