import {
  KanbanIssue,
  type KanbanIssueData,
  type KanbanAssignee,
  type KanbanLabel,
  type KanbanStageDef,
  Avatar,
  StatusIcon,
  StageIcon,
  PriorityBarsIcon,
  KanbanLabelPill,
  KanbanStatusGroupLabel,
  Badge,
} from "./_ui";
import issuesBg from "./assets/issues-bg.png";
import { ChatPreview } from "./ChatPreview";

/**
 * Issues heroes for the "Track" strip — three graphics, all powered by REAL
 * design-system components fed mock data (canvas guide §5.1 mock-data harness),
 * NOT hand-rolled UI:
 *
 *  1. IssuesBoardHero       — two status columns of production `KanbanIssue`
 *                             cards: organize work + see properties + assignees
 *                             at a glance.
 *  2. IssuePropertiesHero   — the property rail for one issue, composed from the
 *                             same real atoms the app uses (`StatusIcon`,
 *                             `PriorityBarsIcon`, `Avatar`, `KanbanLabelPill`):
 *                             assign it to a teammate, set status / priority /
 *                             estimate / labels.
 *  3. IssueChatHero         — the REAL chat composer (`ChatInputRichtext` via
 *                             `ChatPreview`) with the issue attached as a context
 *                             chip: reference any issue straight into chat.
 *
 * `KanbanIssue` is fully controlled (no store / Convex), so it drops onto the
 * canvas with mock assignees, labels, and stages.
 */

// ---------------------------------------------------------------------------
// Shared mock data — a little "havn" (stays-booking app) team + backlog.
// ---------------------------------------------------------------------------

const ASSIGNEES: KanbanAssignee[] = [
  { id: "maya", name: "Maya Chen", color: "#6366F1" },
  { id: "leo", name: "Leo Park", color: "#10B981" },
  { id: "ava", name: "Ava Singh", color: "#A78BFA" },
  { id: "sam", name: "Sam Diaz", color: "#F472B6" },
];

const LABELS: KanbanLabel[] = [
  { id: "checkout", name: "checkout", color: "#3B82F6" },
  { id: "payments", name: "payments", color: "#10B981" },
  { id: "design", name: "design", color: "#A78BFA" },
  { id: "mobile", name: "mobile", color: "#F59E0B" },
];

const STAGES: KanbanStageDef[] = [
  { id: "in-progress", label: "In Progress", color: "var(--mustard-500)" },
  { id: "in-review", label: "In Review", color: "var(--lavender-500)" },
];

const noAttachments = { documents: [], canvases: [], branches: [] } as const;

const IN_PROGRESS: KanbanIssueData[] = [
  {
    id: "TEM-142",
    title: "Express one-tap checkout",
    createdAt: "2026-06-02",
    type: "feature",
    status: "in-progress",
    priority: "high",
    stage: "in-progress",
    assigneeId: "maya",
    labels: ["checkout"],
    estimate: 5,
    // Linked spec + design + branch — the feature graph in one chip.
    documents: [{ length: 1 }],
    canvases: [{ length: 1 }],
    branches: [{ length: 1 }],
  },
  {
    id: "TEM-151",
    title: "Trip cancellation & refunds flow",
    createdAt: "2026-06-05",
    type: "feature",
    status: "in-progress",
    priority: "medium",
    stage: "in-progress",
    assigneeId: "leo",
    labels: ["payments"],
    estimate: 8,
    ...noAttachments,
  },
  {
    id: "TEM-160",
    title: "Saved payment methods",
    createdAt: "2026-06-08",
    type: "feature",
    status: "in-progress",
    priority: "low",
    stage: "in-progress",
    assigneeId: "ava",
    labels: ["payments"],
    estimate: 3,
    ...noAttachments,
  },
  {
    id: "TEM-163",
    title: "Host calendar sync",
    createdAt: "2026-06-09",
    type: "feature",
    status: "in-progress",
    priority: "medium",
    stage: "in-progress",
    assigneeId: "sam",
    labels: ["checkout"],
    estimate: 5,
    ...noAttachments,
  },
];

const IN_REVIEW: KanbanIssueData[] = [
  {
    id: "TEM-138",
    title: "Listing page redesign",
    createdAt: "2026-05-29",
    type: "improvement",
    status: "in-review",
    priority: "medium",
    stage: "in-review",
    assigneeId: "ava",
    labels: ["design"],
    estimate: 3,
    documents: [],
    canvases: [{ length: 1 }],
    branches: [{ length: 1 }],
  },
  {
    id: "TEM-145",
    title: "Date-picker crashes on iOS Safari",
    createdAt: "2026-06-07",
    type: "bug",
    status: "in-review",
    priority: "urgent",
    stage: "in-review",
    assigneeId: "sam",
    labels: ["mobile"],
    estimate: 2,
    ...noAttachments,
  },
  {
    id: "TEM-149",
    title: "Map clustering on search",
    createdAt: "2026-06-06",
    type: "improvement",
    status: "in-review",
    priority: "low",
    stage: "in-review",
    assigneeId: "leo",
    labels: ["design"],
    estimate: 5,
    ...noAttachments,
  },
  {
    id: "TEM-155",
    title: "Wishlist sharing links",
    createdAt: "2026-06-07",
    type: "feature",
    status: "in-review",
    priority: "medium",
    stage: "in-review",
    assigneeId: "maya",
    labels: ["mobile"],
    estimate: 3,
    ...noAttachments,
  },
];

const DONE: KanbanIssueData[] = [
  {
    id: "TEM-129",
    title: "Booking confirmation emails",
    createdAt: "2026-05-24",
    type: "feature",
    status: "done",
    priority: "medium",
    stage: "done",
    assigneeId: "leo",
    labels: ["payments"],
    estimate: 3,
    ...noAttachments,
  },
  {
    id: "TEM-133",
    title: "Search filters polish",
    createdAt: "2026-05-26",
    type: "improvement",
    status: "done",
    priority: "low",
    stage: "done",
    assigneeId: "ava",
    labels: ["design"],
    estimate: 2,
    ...noAttachments,
  },
];

const noop = () => {};

/** A real `KanbanIssue` card, read-only (no popovers/context-menu in a static
 *  projection), with the shared mock assignees / labels / stages wired in. */
function Card({ issue }: { issue: KanbanIssueData }) {
  return (
    <KanbanIssue
      issue={issue}
      assignees={ASSIGNEES}
      labels={LABELS}
      stageDefs={STAGES}
      isSelected={false}
      readOnly
      onOpen={noop}
    />
  );
}

/**
 * Board geometry. The card's visible content box is 492px wide (548px graphic
 * − 56px backdrop pad). To fit THREE comfortable stage columns + the two-tier
 * header (status banners over stage headers), we lay the board out at a wider
 * *logical* width and scale it down to fit — the card stays the same size, the
 * content shrinks. We render columns at the REAL production width (264px, the
 * width `KanbanColumnHeader` is locked to) so the `KanbanIssue` cards keep their
 * faithful aspect ratio (one-line titles, true padding-to-content ratio) instead
 * of squishing taller at a narrower width. Three 264px columns + two 8px gaps +
 * the 12px board padding on each side = an 832px logical board, scaled to ~492px
 * (~0.59) — the on-canvas card footprint is unchanged, just truly proportioned.
 */
const COLUMN_WIDTH = 264;
const COLUMN_GAP = 8;
const BOARD_PAD = 12; // p-3
const LOGICAL_BOARD_WIDTH = COLUMN_WIDTH * 3 + COLUMN_GAP * 2 + BOARD_PAD * 2; // 616
const VISIBLE_BOARD_WIDTH = 492;
const BOARD_SCALE = VISIBLE_BOARD_WIDTH / LOGICAL_BOARD_WIDTH; // ~0.799

/** Stage definition for one column: id + label + accent color + its issues. */
interface StageCol {
  id: string;
  label: string;
  color: string;
  issues: KanbanIssueData[];
}

/** Status banner spanning one or more stage columns (the coarse *status* tier). */
interface StatusSpan {
  status: KanbanIssueData["status"];
  label: string;
  color: string;
  stageCount: number;
}

/**
 * Compact stage header — the real `StageIcon` + label + count `Badge`, the same
 * atoms the production `KanbanColumnHeader` composes (that component is locked to
 * a 264px width, so we mirror it at our narrower column width per the canvas
 * guide's "compose real atoms" rule).
 */
function StageHeader({ label, color, count }: { label: string; color: string; count: number }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1.5"
      style={{ width: COLUMN_WIDTH, minWidth: COLUMN_WIDTH }}
    >
      <StageIcon color={color} />
      <span className="text-[13px] font-medium text-text-primary">{label}</span>
      <Badge variant="filled" intent="neutral" className="ml-0.5 text-[10px]">
        {count}
      </Badge>
    </div>
  );
}

/** One stage column: just the stack of real `KanbanIssue` cards. */
function StageColumn({ issues }: { issues: KanbanIssueData[] }) {
  return (
    <div
      className="flex shrink-0 flex-col gap-2"
      style={{ width: COLUMN_WIDTH, minWidth: COLUMN_WIDTH }}
    >
      {issues.map((issue) => (
        <Card key={issue.id} issue={issue} />
      ))}
    </div>
  );
}

// Three stage columns under two statuses: "In Progress" spans the first two
// stages, "Done" spans the third. Cards under one status share that status.
const STAGE_COLUMNS: StageCol[] = [
  {
    id: "in-progress",
    label: "In Progress",
    color: "var(--mustard-500)",
    issues: IN_PROGRESS.slice(0, 3),
  },
  {
    id: "in-review",
    label: "In Review",
    color: "var(--lavender-500)",
    issues: IN_REVIEW.slice(0, 3).map((i) => ({ ...i, status: "in-progress" as const })),
  },
  {
    id: "done",
    label: "Done",
    color: "var(--kiwi-500)",
    issues: DONE,
  },
];

const STATUS_SPANS: StatusSpan[] = [
  { status: "in-progress", label: "In Progress", color: "var(--mustard-500)", stageCount: 2 },
  { status: "done", label: "Done", color: "var(--kiwi-500)", stageCount: 1 },
];

// ---------------------------------------------------------------------------
// 1 · The board
// ---------------------------------------------------------------------------

export function IssuesBoardHero() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="px-1 text-title-3 leading-relaxed text-text-secondary">
        Break the work into issues and organize it as a team. Status, priority,
        type, estimates, and assignees all live on the card.
      </p>

      {/* Scenic backdrop (issues-bg.png, like DocsHero) with the board card
          floating on top. The board is taller than the visible window so the
          stack of issues is cut off — there's always more work below. */}
      <div
        className="h-[328px] overflow-hidden rounded-2xl border-border-primary bg-cover bg-center p-7 shadow-[0_14px_36px_rgba(0,0,0,0.42)]"
        style={{ backgroundImage: `url(${issuesBg})` }}
      >
        {/* Scale wrapper — clamps the wider logical board down into the card's
            visible width so three columns fit without resizing the card. */}
        <div style={{ width: VISIBLE_BOARD_WIDTH, overflow: "hidden" }}>
          <div
            className="overflow-hidden rounded-xl border border-border-primary shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
            style={{
              backgroundColor: "var(--base-925)",
              width: LOGICAL_BOARD_WIDTH,
              transform: `scale(${BOARD_SCALE})`,
              transformOrigin: "top left",
            }}
          >
            <div className="flex flex-col gap-1.5 p-5">
              {/* Status tier — real `KanbanStatusGroupLabel` banners, each
                  spanning its stage columns. */}
              <div className="flex gap-2">
                {STATUS_SPANS.map((s) => (
                  <KanbanStatusGroupLabel
                    key={s.status}
                    statusLabel={s.label}
                    statusId={s.status}
                    stageCount={s.stageCount}
                    columnWidth={COLUMN_WIDTH}
                    innerGap={COLUMN_GAP}
                    icon={
                      <StatusIcon
                        variant={s.status}
                        className="size-3.5"
                        style={{ color: s.color }}
                      />
                    }
                  />
                ))}
              </div>

              {/* Stage tier — per-column stage headers. */}
              <div className="flex gap-2">
                {STAGE_COLUMNS.map((c) => (
                  <StageHeader
                    key={c.id}
                    label={c.label}
                    color={c.color}
                    count={c.issues.length}
                  />
                ))}
              </div>

              {/* Cards. */}
              <div className="flex gap-2">
                {STAGE_COLUMNS.map((c) => (
                  <StageColumn key={c.id} issues={c.issues} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2 · The property rail — assign to people + set properties
// ---------------------------------------------------------------------------

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="w-[78px] shrink-0 text-[12px] text-text-tertiary">{label}</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
    </div>
  );
}

const initialsOf = (name: string) =>
  name.split(" ").map((n) => n[0]).join("");

/** The landing-page arrow cursor (exact `tempo-landing` mouse.svg path) — the
 *  same pointer used across the other strips. */
function Cursor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 39 40" width="30" height="31" fill="none" aria-hidden className={className}>
      <path
        d="M5.71829 2.87558C5.56251 2.30534 6.44481 1.51223 6.98048 1.74094L32.186 12.5025C32.8912 12.8036 32.803 13.8507 32.0427 14.2041L20.9091 18.8186C20.7141 18.9092 20.5472 19.0592 20.4347 19.245L15.0018 29.5241C14.563 30.2488 13.5326 30.2073 13.3275 29.4566L5.71829 2.87558Z"
        fill="black"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Open "assign to" menu floating off the right of the card, mid-pick — the
 *  second teammate is highlighted with the cursor hovering it. */
function AssigneeMenu() {
  return (
    <div className="absolute right-[-6px] top-[92px] z-20 w-[141px]">
      <div className="overflow-hidden rounded-[6px] border border-border-primary bg-surface-container-high shadow-[0_18px_46px_rgba(0,0,0,0.6)] w-[141px]">
        <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
          Assign to
        </div>
        <div className="pb-1.5">
          {ASSIGNEES.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-center gap-2.5 px-3 py-1.5 ${
                i === 1 ? "bg-surface-container-highest" : ""
              }`}
            >
              <Avatar size="2xs" initials={initialsOf(a.name)} color={a.color} />
              <span className="text-[12.5px] text-text-primary">{a.name}</span>
              {i === 0 && (
                <svg
                  viewBox="0 0 16 16"
                  className="ml-auto size-3.5 text-text-tertiary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5L6.5 12L13 4" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* cursor hovering the row being picked */}
      <Cursor className="pointer-events-none absolute left-[146px] top-[56px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />
    </div>
  );
}

export function IssuePropertiesHero() {
  const maya = ASSIGNEES[0];
  const checkout = LABELS[0];

  return (
    <div className="flex w-full flex-col gap-4 h-[315px]">
      <p className="px-1 text-title-3 leading-relaxed text-text-secondary">
        Open any issue to assign it to a teammate and set its properties —
        status, priority, estimate, and labels.
      </p>

      <div className="relative flex items-start gap-5">
        {/* left — the real ticket card, same `KanbanIssue` as the board */}
        <div className="w-[252px] shrink-0 pt-1">
          <Card issue={IN_PROGRESS[0]} />
        </div>

        {/* right — the property rail, vertical and thin */}
        <div className="relative flex-1 rounded-[8px] border border-border-primary bg-surface-container px-4 py-2 shadow-[0_14px_34px_-16px_rgba(0,0,0,0.55)]">
          <div className="flex flex-col">
          <PropertyRow label="Status">
            <StatusIcon
              variant="in-progress"
              className="size-4"
              style={{ color: "var(--mustard-500)" }}
            />
            <span className="text-[12.5px] text-text-primary">In Progress</span>
          </PropertyRow>

          {/* Stage — nested under Status with the real "tree-branch" connector
              lifted verbatim from IssuesDetailView's PropertyDropdownRow. */}
          <PropertyRow label="Stage">
            <div className="relative flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -top-[18px] left-[6px] overflow-visible"
                width="13"
                height="24"
                viewBox="0 0 65 116"
                fill="none"
              >
                <path
                  d="M0 64.3564V5C0 2.23857 2.23858 0 5 0C7.76142 0 10 2.23858 10 5V64.3564C10 71.859 14.0026 78.7917 20.5 82.543L61.8584 106.422C64.2499 107.803 65.0692 110.861 63.6885 113.252C62.3078 115.643 59.2498 116.463 56.8584 115.082L15.5 91.2031C5.90862 85.6655 0 75.4316 0 64.3564Z"
                  fill="var(--border-primary)"
                />
              </svg>
              <span className="ml-[22px] flex items-center gap-2">
                <StageIcon color="var(--lavender-500)" />
                <span className="text-[12.5px] text-text-primary">In Review</span>
              </span>
            </div>
          </PropertyRow>

          <PropertyRow label="Priority">
            <span style={{ color: "#F97316" }} className="flex items-center">
              <PriorityBarsIcon activeBars={3} className="size-4" />
            </span>
            <span className="text-[12.5px] text-text-primary">High</span>
          </PropertyRow>

          <PropertyRow label="Assignee">
            <Avatar
              size="xs"
              initials="MC"
              color={maya.color}
            />
            <span className="text-[12.5px] text-text-primary">{maya.name}</span>
          </PropertyRow>

          <PropertyRow label="Estimate">
            <span className="text-[12.5px] text-text-primary">5 points</span>
          </PropertyRow>

          <PropertyRow label="Labels">
            <KanbanLabelPill name={checkout.name} color={checkout.color} />
          </PropertyRow>
          </div>
        </div>

        {/* open assignee picker, mid-choose — overlays the rail */}
        <AssigneeMenu />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3 · Reference the issue in chat
// ---------------------------------------------------------------------------

export function IssueChatHero() {
  return (
    <div className="flex w-full flex-col gap-x-4 gap-y-[36px]">
      <p className="px-1 text-title-3 leading-relaxed text-text-secondary">
        Add an issue as context in chat and Tempo picks up the work — every
        spec, design, and branch already attached and linked back to that ticket.
      </p>

      {/* The real ticket peeks in from the top as if dragged in (same
          composition as the Plan strip's ChatHero), with the REAL chat
          composer in front — the issue and its linked spec / design / branch
          already attached as context chips, agent prompt seeded. */}
      <div className="relative w-full pt-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-0 z-0 w-[244px] rotate-[5deg]"
          style={{ filter: "brightness(0.96) drop-shadow(0 16px 26px rgba(0,0,0,0.5))" }}
        >
          <Card issue={IN_PROGRESS[0]} />
        </div>
        <Cursor className="pointer-events-none absolute right-[58px] top-[66px] z-20 origin-top-left scale-[1.33] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />

        <div
          className="relative z-10"
          style={{ filter: "drop-shadow(0 -12px 18px rgba(0,0,0,0.28))" }}
        >
          <ChatPreview
            text="Pick this up — build express one-tap checkout end to end"
            generateMode={null}
            contextItems={[
              { id: "issue", label: "TEM-142 Express one-tap checkout", type: "link", accent: "mustard" },
              { id: "spec", label: "Checkout spec", type: "file" },
              { id: "design", label: "Checkout flow", type: "canvas", accent: "lavender" },
              { id: "branch", label: "feat/one-tap-checkout", type: "link", accent: "kiwi" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
