/**
 * Self-contained replicas of the DS kanban atoms the IssuesHero uses:
 * `KanbanIssue` (card), `StatusIcon`, `StageIcon`, `PriorityBarsIcon`,
 * `KanbanLabelPill`, `KanbanStatusGroupLabel`, `Avatar`. Display-only,
 * faithful to `components/kanban/*` markup/classes + prop contracts.
 */
import type { CSSProperties, ReactNode } from "react";
import { Paperclip } from "lucide-react";
import { cn } from "./cn";
import { Badge } from "./primitives";

export type KanbanStatus =
  | "triage"
  | "in-progress"
  | "in-review"
  | "done"
  | "cancelled";
export type KanbanIssueType = "feature" | "bug" | "chore" | "improvement" | "other";
export type KanbanPriority = "urgent" | "high" | "medium" | "low" | "none";

export interface KanbanAssignee {
  id: string;
  name: string;
  color: string;
}
export interface KanbanLabel {
  id: string;
  name: string;
  color: string;
}
export interface KanbanStageDef {
  id: string;
  label: string;
  color: string;
}
export interface KanbanIssueData {
  id: string;
  title: string;
  createdAt: string;
  type: KanbanIssueType;
  status: KanbanStatus;
  priority: KanbanPriority;
  stage: string;
  assigneeId?: string | null;
  labels?: string[];
  estimate?: number | null;
  documents?: readonly unknown[];
  canvases?: readonly unknown[];
  branches?: readonly unknown[];
}

// ── Avatar (kanban/avatar) — accepts explicit `initials` (DS contract) ───────
const AVATAR_SIZE: Record<string, string> = {
  "2xs": "size-4 text-[8px]",
  xs: "size-5 text-[9px]",
  sm: "size-6 text-[10px]",
};
export function Avatar({
  initials,
  name,
  color,
  size = "2xs",
  className,
}: {
  initials?: string;
  name?: string;
  color: string;
  size?: "2xs" | "xs" | "sm";
  className?: string;
}) {
  const text =
    initials ??
    (name
      ? name
          .split(/\s+/)
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase() ?? "")
          .join("")
      : "");
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white",
        AVATAR_SIZE[size],
        className,
      )}
      style={{ backgroundColor: color }}
      title={name}
    >
      {text}
    </span>
  );
}

// ── StatusIcon (kanban/kanban-icons) — `variant` is the status ───────────────
export function StatusIcon({
  variant,
  className,
  style,
}: {
  variant: KanbanStatus;
  className?: string;
  style?: CSSProperties;
}) {
  const c = cn("size-3.5 shrink-0", className);
  const stroke = "var(--icons-tertiary, #787878)";
  const common = { className: c, viewBox: "0 0 16 16", fill: "none" as const, style };
  if (variant === "triage")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="6.5" stroke={stroke} strokeDasharray="2 2" />
      </svg>
    );
  if (variant === "done")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
        <circle cx="8" cy="8" r="3.5" fill="currentColor" />
      </svg>
    );
  if (variant === "in-review")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
        <circle cx="8" cy="8" r="3.5" stroke="currentColor" />
      </svg>
    );
  if (variant === "cancelled")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="6.5" stroke={stroke} />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke={stroke} strokeLinecap="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" />
    </svg>
  );
}

// ── StageIcon (octagon) ──────────────────────────────────────────────────────
export function StageIcon({
  color = "currentColor",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg className={cn("size-2.5 shrink-0", className)} viewBox="0 0 10 10" fill="none">
      <path
        d="M3.1 0.5H6.9L9.5 3.1V6.9L6.9 9.5H3.1L0.5 6.9V3.1L3.1 0.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ── PriorityBarsIcon — `activeBars` (DS contract) ────────────────────────────
export function PriorityBarsIcon({
  activeBars,
  className,
}: {
  activeBars: number;
  className?: string;
}) {
  const on = "currentColor";
  const off = "var(--icons-tertiary, #787878)";
  if (activeBars <= 0)
    return (
      <svg className={cn("size-3.5 shrink-0", className)} viewBox="0 0 16 16" fill="none">
        {[3, 7, 11].map((x) => (
          <rect key={x} x={x} y="7" width="3" height="2" rx="1" fill={off} />
        ))}
      </svg>
    );
  const heights = [4, 8, 12];
  return (
    <svg className={cn("size-3.5 shrink-0", className)} viewBox="0 0 16 16" fill="none">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={3 + i * 4}
          y={14 - h}
          width="3"
          height={h}
          rx="1"
          fill={i < activeBars ? on : off}
        />
      ))}
    </svg>
  );
}

const PRIORITY_BARS: Record<KanbanPriority, number> = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
  urgent: 3,
};

// ── TypeIcon (diamond) ───────────────────────────────────────────────────────
function TypeIcon({ type }: { type: KanbanIssueType }) {
  const stroke = "var(--icons-tertiary, #787878)";
  const glyph =
    type === "feature" ? (
      <path d="M8 5.5v5M5.5 8h5" stroke={stroke} strokeLinecap="round" />
    ) : type === "improvement" ? (
      <path d="M8 10.5v-5M6 7.5L8 5.5l2 2" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M6 10l4-4" stroke={stroke} strokeLinecap="round" />
    );
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
      <rect
        x="1.64"
        y="1.64"
        width="12.73"
        height="12.73"
        rx="4"
        transform="rotate(45 8 8)"
        stroke={stroke}
      />
      {glyph}
    </svg>
  );
}

// ── KanbanLabelPill — accepts a `label` OR explicit `name`+`color` ───────────
export function KanbanLabelPill({
  label,
  name,
  color,
  size = "sm",
}: {
  label?: KanbanLabel;
  name?: string;
  color?: string;
  size?: "xs" | "sm";
}) {
  const text = label?.name ?? name ?? "";
  const c = label?.color ?? color ?? "#888";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-medium",
        size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-1.5 py-0.5 text-[11px]",
      )}
      style={{ backgroundColor: `${c}20`, color: c }}
    >
      {text}
    </span>
  );
}

// ── KanbanStatusGroupLabel — banner spanning its stage columns ───────────────
export function KanbanStatusGroupLabel({
  statusLabel,
  icon,
  stageCount = 1,
  columnWidth,
  innerGap = 0,
}: {
  statusLabel: string;
  statusId?: string;
  stageCount?: number;
  columnWidth?: number;
  innerGap?: number;
  icon?: ReactNode;
}) {
  const width =
    columnWidth != null
      ? columnWidth * stageCount + innerGap * Math.max(0, stageCount - 1)
      : undefined;
  return (
    <div className="flex h-full items-center gap-2" style={{ width }}>
      <div className="flex shrink-0 items-center gap-1.5 bg-[var(--base-925)] pr-2">
        {icon}
        <span className="whitespace-nowrap text-[12px] font-medium text-text-secondary">
          {statusLabel}
        </span>
      </div>
      <div className="h-px flex-1" style={{ backgroundColor: "var(--border-secondary)" }} />
    </div>
  );
}

// ── KanbanIssue (the card) ───────────────────────────────────────────────────
function MetaButton({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center rounded border-[0.5px] border-border-primary px-1 py-0.5 text-text-tertiary">
      {children}
    </span>
  );
}
export function KanbanIssue({
  issue,
  assignees = [],
  labels = [],
  isSelected,
}: {
  issue: KanbanIssueData;
  assignees?: KanbanAssignee[];
  labels?: KanbanLabel[];
  stageDefs?: KanbanStageDef[];
  isSelected?: boolean;
  readOnly?: boolean;
  onOpen?: () => void;
}) {
  const assignee = assignees.find((a) => a.id === issue.assigneeId);
  const issueLabels = (issue.labels ?? [])
    .map((id) => labels.find((l) => l.id === id))
    .filter((l): l is KanbanLabel => l != null);
  const attachmentCount =
    (issue.documents?.length ?? 0) +
    (issue.canvases?.length ?? 0) +
    (issue.branches?.length ?? 0);
  return (
    <div
      className={cn(
        "group relative rounded-lg bg-surface-container p-3 transition-[background-color,box-shadow] duration-200",
        isSelected ? "ring-1 ring-accent" : "",
      )}
      style={{ outline: "0.5px solid var(--color-border-secondary)" } as CSSProperties}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="text-[11px] font-medium text-text-secondary">{issue.id}</span>
        <span className="text-[11px] text-text-tertiary">{issue.createdAt}</span>
        {assignee ? (
          <Avatar name={assignee.name} color={assignee.color} size="2xs" className="ml-auto shrink-0" />
        ) : null}
      </div>
      <div className="mb-2 flex gap-1.5">
        <span className="mt-[1px] flex size-4 shrink-0 items-center justify-center rounded text-text-tertiary">
          <StatusIcon variant={issue.status} />
        </span>
        <span className="line-clamp-2 text-[13px] font-medium leading-[16px] text-text-primary">
          {issue.title}
        </span>
      </div>
      <div className="mb-2 flex items-center gap-1.5">
        <MetaButton>
          <PriorityBarsIcon activeBars={PRIORITY_BARS[issue.priority]} />
        </MetaButton>
        <MetaButton>
          <TypeIcon type={issue.type} />
        </MetaButton>
        {issue.estimate != null ? (
          <span className="flex items-center rounded border-[0.5px] border-border-primary px-1 py-0.5 text-[11px] leading-[14px] text-text-tertiary">
            {issue.estimate}
          </span>
        ) : null}
        {attachmentCount > 0 ? (
          <span className="flex items-center gap-1 rounded border-[0.5px] border-border-primary px-1 py-0.5 text-[11px] text-text-tertiary">
            <Paperclip className="size-3" /> {attachmentCount}
          </span>
        ) : null}
      </div>
      {issueLabels.length > 0 ? (
        <div className="flex items-center gap-1.5">
          {issueLabels.map((l) => (
            <KanbanLabelPill key={l.id} label={l} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
