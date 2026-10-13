/**
 * Display-only replicas of the DS source-control pieces the BuildHero uses:
 * `ChangesPanel` (+ `ChangesFile`, `ChangesViewMode`) and `WorkspaceTree`
 * (+ `TreeNode`). Faithful to the app's look; no git/Convex wiring.
 */
import { useState, type ReactNode } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  GitMerge,
  GitPullRequest,
  MessageSquare,
} from "lucide-react";
import { cn } from "./cn";
import { DiffCounter } from "./primitives";

// ── Types (match the DS surface BuildHero imports) ───────────────────────────
export type ChangesViewMode = "uncommitted" | "vs-target";
export type GitFileStatus = "modified" | "added" | "deleted" | "untracked" | "renamed";
export interface ChangesFile {
  path: string;
  fileName: string;
  directory: string;
  additions?: number;
  deletions?: number;
  status: GitFileStatus;
  staged?: boolean;
  binary?: boolean;
  repoPath?: string;
}
export interface TreeNode {
  id: string;
  label: string;
  animateLabel?: boolean;
  data?: {
    kind?: "workspace" | "thread" | "local" | "project";
    workspaceId?: string;
    chatId?: string;
    prNumber?: number;
    prStatus?: "open" | "merged" | "closed";
    prReviewDecision?: "approved" | "changes_requested" | "review_required";
    timestamp?: string;
    threadIndicator?: "none" | "dot" | "spinner";
    isUnread?: boolean;
    isArchivable?: boolean;
  };
  children?: TreeNode[];
}

// ── ChangesPanel ─────────────────────────────────────────────────────────────
const STATUS_GLYPH: Record<GitFileStatus, { ch: string; cls: string }> = {
  modified: { ch: "M", cls: "text-warning" },
  added: { ch: "A", cls: "text-success" },
  untracked: { ch: "U", cls: "text-success" },
  deleted: { ch: "D", cls: "text-critical" },
  renamed: { ch: "R", cls: "text-info" },
};

function FileRow({
  file,
  selected,
  onSelect,
}: {
  file: ChangesFile;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const g = STATUS_GLYPH[file.status];
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1",
        selected ? "bg-surface-container-high" : "hover:bg-surface-container-high",
      )}
    >
      <span className={cn("w-3 shrink-0 text-center font-mono text-[10px] font-semibold", g.cls)}>
        {g.ch}
      </span>
      <span className="truncate text-[12px] text-text-primary">{file.fileName}</span>
      {file.directory ? (
        <span className="truncate text-[10px] text-text-tertiary">{file.directory}</span>
      ) : null}
      <span className="ml-auto shrink-0">
        <DiffCounter added={file.additions} removed={file.deletions} emphasized />
      </span>
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <div className="px-1.5 pt-2">
      <div className="flex items-center gap-1.5 px-1 pb-1">
        <ChevronDown className="size-3 text-text-tertiary" />
        <span className="text-[11px] font-medium text-text-secondary">{title}</span>
        <span className="text-[11px] text-text-tertiary">{count}</span>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export function ChangesPanel({
  className,
  viewMode = "uncommitted",
  onViewModeChange,
  files,
  selectedFilePath,
  onFileSelect,
  currentBranch,
}: {
  className?: string;
  viewMode?: ChangesViewMode;
  onViewModeChange?: (m: ChangesViewMode) => void;
  files: ChangesFile[];
  selectedFilePath?: string;
  onFileSelect?: (f: ChangesFile) => void;
  onStageFile?: (f: ChangesFile) => void;
  onUnstageFile?: (f: ChangesFile) => void;
  onDiscardFile?: (f: ChangesFile) => void;
  currentBranch?: string;
  defaultBranch?: string;
  branches?: string[];
  onBranchChange?: (b: string) => void;
}) {
  const staged = files.filter((f) => f.staged);
  const unstaged = files.filter((f) => !f.staged);
  const toggle =
    "h-6 rounded-md px-2 text-[11px] font-medium transition-colors cursor-pointer";
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-col gap-3 border-b border-border-secondary px-2 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-medium text-text-primary">Source Control</span>
          {currentBranch ? (
            <span className="truncate text-[11px] text-text-tertiary">{currentBranch}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-surface-container-lowest p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange?.("uncommitted")}
            className={cn(
              toggle,
              viewMode === "uncommitted"
                ? "bg-surface-container-highest text-text-primary"
                : "text-text-tertiary",
            )}
          >
            Uncommitted
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange?.("vs-target")}
            className={cn(
              toggle,
              viewMode === "vs-target"
                ? "bg-surface-container-highest text-text-primary"
                : "text-text-tertiary",
            )}
          >
            vs main
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden pb-2">
        {staged.length > 0 ? (
          <Section title="Staged Changes" count={staged.length}>
            {staged.map((f) => (
              <FileRow
                key={f.path}
                file={f}
                selected={f.path === selectedFilePath}
                onSelect={() => onFileSelect?.(f)}
              />
            ))}
          </Section>
        ) : null}
        {unstaged.length > 0 ? (
          <Section title="Changes" count={unstaged.length}>
            {unstaged.map((f) => (
              <FileRow
                key={f.path}
                file={f}
                selected={f.path === selectedFilePath}
                onSelect={() => onFileSelect?.(f)}
              />
            ))}
          </Section>
        ) : null}
      </div>
    </div>
  );
}

// ── WorkspaceTree ────────────────────────────────────────────────────────────
function PrBadge({
  prNumber,
  prStatus,
  prReviewDecision,
}: {
  prNumber: number;
  prStatus?: string;
  prReviewDecision?: string;
}) {
  const merged = prStatus === "merged";
  const approved = prReviewDecision === "approved";
  const cls = merged
    ? "text-[var(--lavender-400)] bg-[var(--lavender-900)]"
    : approved
      ? "text-[var(--kiwi-600)] bg-[color-mix(in_srgb,var(--kiwi-600)_18%,transparent)]"
      : "text-text-secondary bg-surface-container-highest";
  const Icon = merged ? GitMerge : GitPullRequest;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-medium leading-none",
        cls,
      )}
    >
      <Icon className="size-2.5" />
      {prNumber}
    </span>
  );
}

function WorktreeCountIcon({ count }: { count: number }) {
  return (
    <div className="relative flex size-4 items-center justify-center">
      <Folder className="size-4 text-icons-tertiary" />
      <div className="absolute -right-[3px] bottom-0 flex min-w-[10px] items-center justify-center rounded-full bg-surface-container-lowest px-[2px] text-[7px] font-semibold leading-[10px] text-icons-tertiary">
        {count}
      </div>
    </div>
  );
}

function ThreadRow({ node, selected }: { node: TreeNode; selected?: boolean }) {
  const unread = node.data?.isUnread || node.data?.threadIndicator === "dot";
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-[4px] py-1 pl-[26px] pr-1 text-[12px]",
        selected
          ? "bg-surface-container-high text-text-primary"
          : "text-text-secondary hover:bg-surface-container-high",
      )}
    >
      <MessageSquare className="size-3 shrink-0 text-icons-tertiary" />
      <span className="truncate">{node.label}</span>
      {node.data?.timestamp ? (
        <span className="ml-auto shrink-0 text-[10px] text-text-tertiary">
          {node.data.timestamp}
        </span>
      ) : null}
      {unread ? <span className="size-1.5 shrink-0 rounded-full bg-icons-primary" /> : null}
    </div>
  );
}

function WorkspaceRow({
  node,
  expanded,
  onToggle,
  selectedIds,
}: {
  node: TreeNode;
  expanded: boolean;
  onToggle: () => void;
  selectedIds: string[];
}) {
  const childCount = node.children?.length ?? 0;
  return (
    <div className="flex flex-col">
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-1.5 rounded-[4px] py-1 pl-1 pr-1 text-[12px] text-text-primary hover:bg-surface-container-high"
      >
        {expanded ? (
          <ChevronDown className="size-3 shrink-0 text-text-tertiary" />
        ) : (
          <ChevronRight className="size-3 shrink-0 text-text-tertiary" />
        )}
        <WorktreeCountIcon count={childCount} />
        <span className="truncate font-medium">{node.label}</span>
        {node.data?.prNumber ? (
          <PrBadge
            prNumber={node.data.prNumber}
            prStatus={node.data.prStatus}
            prReviewDecision={node.data.prReviewDecision}
          />
        ) : null}
        {node.data?.timestamp ? (
          <span className="ml-auto shrink-0 text-[10px] text-text-tertiary">
            {node.data.timestamp}
          </span>
        ) : null}
      </div>
      {expanded
        ? node.children?.map((child) => (
            <ThreadRow key={child.id} node={child} selected={selectedIds.includes(child.id)} />
          ))
        : null}
    </div>
  );
}

export function WorkspaceTree({
  items,
  defaultExpandedIds = [],
  selectedIds = [],
}: {
  items: TreeNode[];
  showHeader?: boolean;
  dense?: boolean;
  sortItems?: boolean;
  defaultExpandedIds?: string[];
  selectedIds?: string[];
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpandedIds));
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return (
    <div className="flex flex-col gap-1">
      {items.map((node) => (
        <WorkspaceRow
          key={node.id}
          node={node}
          expanded={expanded.has(node.id)}
          onToggle={() => toggle(node.id)}
          selectedIds={selectedIds}
        />
      ))}
    </div>
  );
}
