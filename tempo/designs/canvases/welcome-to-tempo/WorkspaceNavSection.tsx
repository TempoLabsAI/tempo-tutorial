import type { ReactNode } from "react";
import { Files, Columns3, Paintbrush } from "lucide-react";
import {
  AppNavbar,
  type NavItem,
} from "./_ui";
import { ChatNavIcon } from "./_ui";
import navBg from "./assets/nav-bg.png";

/**
 * Section 0 of the welcome canvas: the REAL production `AppNavbar` rail
 * (mirroring `NAV_SECTIONS` in tempo-client/src/workspaces/components/Navbar.tsx)
 * shown as a rounded floating piece inside the section card, with a tonal chip
 * label beside each tab. Chip vertical positions track the rail's internal
 * geometry: top avatar block = 46px, nav list pad 4px, 40px buttons with 4px
 * gaps, so icon centers land at 70 / 114 / 158 / 202px from the rail's top.
 */
/** Force an icon to always paint in its tab's accent (the surrounding button
 *  carries `button-accent-*`, so `--color-accent` resolves per-item) — instead
 *  of the rail's default grey inactive color. */
function Accented({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--color-accent)" }}>{children}</span>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "chat",
    label: "Chat",
    activeAccent: "blueberry",
    icon: <Accented><ChatNavIcon /></Accented>,
    testId: "workspace-navbar-chat-button",
  },
  {
    id: "docs",
    label: "Docs",
    activeAccent: "kiwi",
    icon: <Accented><Files className="size-[18px]" /></Accented>,
    testId: "workspace-navbar-docs-button",
  },
  {
    id: "design",
    label: "Canvas",
    activeAccent: "lavender",
    icon: <Accented><Paintbrush className="size-[18px]" /></Accented>,
    testId: "workspace-navbar-design-button",
  },
  {
    id: "issues",
    label: "Issues",
    activeAccent: "mustard",
    icon: <Accented><Columns3 className="size-[18px]" /></Accented>,
    testId: "workspace-navbar-issues-button",
  },
];

type Label = {
  /** Vertical center of the card, measured from the body container's top.
   *  Centered on the icon block's center (142px) at an 80px pitch — wider than
   *  the 44px icon pitch so the cards keep a comfortable gap — AND, because the
   *  card block shares the icons' center, every connector trace mirrors
   *  top-to-bottom (vertical offsets ±54 / ±18) instead of fanning unevenly. */
  top: number;
  text: string;
  /** One-line description of what the tab is for. */
  description: string;
  /** Accent token name → drives the `button-accent-*` tonal classes. */
  accent: string;
};

const LABELS: Label[] = [
  { top: 22, text: "Chat", description: "Build with an AI agent on your real codebase", accent: "blueberry" },
  { top: 102, text: "Docs", description: "Write PRDs, specs, and project notes", accent: "kiwi" },
  { top: 182, text: "Canvas", description: "Design UI with live production components", accent: "lavender" },
  { top: 262, text: "Issues", description: "Track work, status, and ownership", accent: "mustard" },
];

/** Vertical center of each nav icon, measured from the top of the body row —
 *  the trace for each card stems from here so it connects to the icon's center.
 *  Rail wrapper pt 6px + top avatar block 46px + nav pad 4px + half of the first
 *  40px button (20px) = 76px for the first icon, then a 44px button pitch.
 *  Center of this block = (76 + 208) / 2 = 142px. */
const ICON_TOPS = [76, 120, 164, 208];

const ACCENT = "var(--lavender-600)";
const RAIL_HEIGHT = 320;

/** Horizontal width of the connector region (the gap between the rail and the
 *  cards' left edge that the circuit traces live in). Kept narrow so the cards
 *  start further left and have ample width to fit their one-line descriptions
 *  without clipping. */
const LINE_W = 72;
/** Corner radius for the 90° bends. */
const BEND = 12;
/** Line stroke color — a subtle grey trace from the design tokens. Kept light
 *  via a thin stroke + reduced opacity (see `NavConnectors`) so the traces read
 *  as a faint guide rather than a heavy circuit. */
const LINE_COLOR = "var(--border-secondary)";

/** Build an orthogonal (axis-aligned) SVG path through `pts` with rounded
 *  corners of radius `r`, clamped so it never overshoots a short segment. */
function orthoRoundedPath(pts: Array<[number, number]>, r: number): string {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const d1 = Math.hypot(x1 - x0, y1 - y0);
    const d2 = Math.hypot(x2 - x1, y2 - y1);
    if (d1 === 0 || d2 === 0) {
      d += ` L ${x1} ${y1}`;
      continue;
    }
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const ax = x1 + ((x0 - x1) / d1) * rr;
    const ay = y1 + ((y0 - y1) / d1) * rr;
    const bx = x1 + ((x2 - x1) / d2) * rr;
    const by = y1 + ((y2 - y1) / d2) * rr;
    d += ` L ${ax} ${ay} Q ${x1} ${y1} ${bx} ${by}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

/** Circuit-board style connectors: one independent trace per tab, each stemming
 *  from its own nav icon (left edge, at `iconTops[i]`) and routing with only 90°
 *  rounded bends — in its own vertical channel so they never converge — into the
 *  card at `cardTops[i]`. */
function NavConnectors({
  iconTops,
  cardTops,
}: {
  iconTops: number[];
  cardTops: number[];
}) {
  const end = LINE_W;
  return (
    <svg
      width={LINE_W}
      height={RAIL_HEIGHT}
      viewBox={`0 0 ${LINE_W} ${RAIL_HEIGHT}`}
      fill="none"
      className="absolute left-0 top-0"
      style={{ overflow: "visible" }}
    >
      {cardTops.map((cy, i) => {
        const iy = iconTops[i];
        // Each trace bends in its own vertical channel so they stay parallel.
        // Channels mirror about the center (|i - 1.5| → 1.5,0.5,0.5,1.5): the
        // two outer traces share the far channel (44), the two inner traces the
        // near one (36), so the whole bundle reads as symmetric top-to-bottom.
        // Kept well inside LINE_W so a clean horizontal stub remains after the
        // turn before the trace meets the card.
        const bend = 32 + Math.abs(i - 1.5) * 8;
        const d = orthoRoundedPath(
          [
            [0, iy],
            [bend, iy],
            [bend, cy],
            [end, cy],
          ],
          BEND,
        );
        return (
          <path
            key={`trace${i}`}
            d={d}
            stroke={LINE_COLOR}
            strokeOpacity={1}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

export function WorkspaceNavSection() {
  return (
    <div className="flex w-[660px] flex-col overflow-hidden rounded-[16px] border border-border-primary bg-surface">
      {/* HEADER — title + subtitle. Padding mirrors `Strip`. */}
      <div className="flex flex-col items-start gap-3.5 px-14 pt-14 pb-[30px]">
        <div className="flex items-center gap-3">
          <h2 className="text-[23px] leading-[1.08] tracking-normal text-text-primary h-[25px]">Find your way around Tempo</h2>
        </div>
        <p className="text-title-3 leading-relaxed text-text-secondary">Access all what we have to offer through the left navigation bar.</p>
      </div>

      {/* BODY — the nav rail + cards float on a scenic backdrop (nav-bg.png),
          mirroring how `DocsHero` floats the doc UI on `doc-bg`. The section
          sizes to its content (like `Strip`) so the full rail shows with the
          same `pb-14` bottom padding as the other strips. */}
      <div className="flex px-14 pb-14">
        <div
          className="relative flex flex-1 items-start gap-0 overflow-hidden rounded-2xl bg-cover bg-center px-20 pt-11 pb-7 shadow-[0_14px_36px_rgba(0,0,0,0.42)] h-[369px]"
          style={{ backgroundImage: `url(${navBg})` }}
        >
        {/* The real rail as a rounded, floating piece. Sizes to its natural
            content height — forcing `h-full` against a constrained wrapper
            collapses the nav and drops the tab list, so we don't. */}
        <div className="shrink-0 self-start overflow-hidden rounded-xl border border-border-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)] bg-[oklch(12.2%_0_18.435)] pt-[6px] pb-[0px] h-[435px]">
          <AppNavbar
            testId="workspace-navbar"
            activeItem=""
            items={NAV_ITEMS}
            userInitials="AF"
            userColor="#8b5cf6"
            showHelp={false}
            showSettings
            onNavigate={() => {}}
          />
        </div>

        {/* Circuit-style connectors stem from each nav icon and route — with
            only 90° rounded bends, in their own channels — into each card. The
            cards stem from the connector region's right edge (`right: 0`), which
            is the backdrop's inner content edge — so the gap to the right of the
            cards equals the rail's left inset (the backdrop's `p-7` = 28px). */}
        <div className="relative flex-1" style={{ height: RAIL_HEIGHT }}>
          <NavConnectors iconTops={ICON_TOPS} cardTops={LABELS.map((l) => l.top)} />
          {LABELS.map((l) => (
            <div
              key={l.text}
              className={`button-accent-${l.accent} absolute -translate-y-1/2`}
              style={{ top: l.top, left: LINE_W, right: 0 }}
            >
              <div className="flex flex-col gap-1 rounded-xl border border-border-secondary bg-surface-container-high px-4 py-3 shadow-sm size-[max-content]">
                <div className="text-body font-semibold leading-tight text-[var(--color-accent)]">
                  {l.text}
                </div>
                <div className="whitespace-nowrap text-caption leading-snug text-text-secondary">
                  {l.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
