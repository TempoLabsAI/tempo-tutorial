import type { ReactNode } from "react";
import { ChevronDown, FileText, Folder, Plus, Search } from "lucide-react";
import docBg from "./assets/doc-bg.png";

/**
 * The Docs strip's first hero: "write specs, stay organized".
 *
 * A doc card floats on a scenic backdrop: an organized doc tree on the left and
 * the open PRD spec on the right, with live collaborator cursors editing inside
 * the text. The spec is rendered as real text flow (not an overlay) so the
 * `InlineCursor` carets sit *between characters* and stay aligned no matter how
 * the text wraps. The sidebar is a stable, presentational mirror of the real
 * `DocSidebar` chrome — the live component flickered in the projection.
 */

/** One row of the (static) doc tree. */
function Row({
  label,
  kind,
  indent,
  selected,
}: {
  label: string;
  kind: "folder" | "file";
  indent?: boolean;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md py-1 text-[11px] ${
        indent ? "pl-[26px] pr-2" : "px-2"
      } ${
        selected
          ? "bg-surface-container-high font-medium text-text-primary"
          : "text-text-secondary"
      }`}
    >
      {kind === "folder" ? (
        <>
          <ChevronDown className="size-3 shrink-0 text-text-tertiary" />
          <Folder className="size-3 shrink-0 text-text-tertiary" />
        </>
      ) : (
        <FileText className="size-3 shrink-0 text-text-tertiary" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
}

/**
 * A live collaborator caret that lives INLINE in the text flow (zero width), so
 * it always sits exactly between the characters it's placed between — the name
 * tag floats just above without disturbing layout.
 */
function InlineCursor({
  name,
  color,
  textColor,
}: {
  name: string;
  color: string;
  textColor: string;
}) {
  return (
    <span className="relative inline-block w-0 align-baseline" aria-hidden>
      <span
        className="absolute bottom-[-1px] left-0 h-[1.2em] w-[1.5px] rounded-sm"
        style={{ background: color }}
      />
      <span
        className="absolute bottom-[1.15em] left-0 whitespace-nowrap rounded-[3px] rounded-bl-none px-1 text-[7.5px] font-semibold leading-[1.55]"
        style={{ background: color, color: textColor }}
      >
        {name}
      </span>
    </span>
  );
}

export function DocsHero(): ReactNode {
  return (
    // Scenic backdrop (doc-bg.png, 3:2) with the doc card floating on top.
    <div
      className="h-[354px] overflow-hidden rounded-2xl border-border-primary bg-cover bg-center p-7 shadow-[0_14px_36px_rgba(0,0,0,0.42)]"
      style={{ backgroundImage: `url(${docBg})` }}
    >
      <div
        className="overflow-hidden rounded-xl border border-border-primary shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
        style={{ backgroundColor: "#0e0e0e" }}
      >
        <div className="flex h-[392px]">
          {/* Static doc sidebar — organized tree of specs (stable, no flicker) */}
          <aside className="flex w-[176px] shrink-0 flex-col border-r border-border-secondary bg-surface-sidebar-base">
            <div className="flex h-9 items-center justify-between px-3">
              <span className="text-[12px] font-medium text-text-primary">Docs</span>
              <Plus className="size-3.5 text-text-tertiary" />
            </div>
            <div className="px-2">
              <div className="flex items-center gap-1.5 rounded-md bg-surface-container-high px-2 py-1 text-[10px] text-text-tertiary">
                <Search className="size-2.5" /> Search
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-px px-2">
              <Row kind="folder" label="Checkout redesign" />
              <Row kind="file" label="PRD — Checkout v2" indent selected />
              <Row kind="file" label="API spec" indent />
              <Row kind="file" label="Edge cases" indent />
              <Row kind="folder" label="Growth" />
              <Row kind="file" label="Onboarding revamp" indent />
              <Row kind="file" label="Referral loops" indent />
              <Row kind="file" label="User research notes" />
              <Row kind="file" label="Q3 roadmap" />
            </div>
          </aside>

          {/* The open document — title + spec text with inline live cursors */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--surface)] px-6 pt-5">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-text-tertiary">
              Checkout redesign
              <span className="opacity-50">/</span>
              PRD — Checkout v2
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] leading-none">📄</span>
              <h3 className="text-[15px] font-semibold leading-tight text-text-primary">
                PRD — Checkout v2
              </h3>
            </div>

            <div className="mt-3 min-h-0 flex-1 overflow-hidden text-[8.5px] leading-[1.7] text-text-secondary">
              <h4 className="mb-1 text-[10.5px] font-semibold text-text-primary">Problem</h4>
              <p>
                Guest checkout drops{" "}
                <strong className="font-semibold text-text-primary">38% of carts</strong> at the
                address step
                <InlineCursor name="Maya" color="var(--lavender-400)" textColor="var(--lavender-900)" /> — too many fields, no
                autofill, and a full-page error on every typo.
              </p>

              <h4 className="mb-1 mt-2.5 text-[10.5px] font-semibold text-text-primary">Goals</h4>
              <ul className="ml-3.5 flex list-disc flex-col gap-0.5 marker:text-text-tertiary">
                <li>One-screen checkout with smart autofill</li>
                <li>Express pay (Apple Pay, Link) above the fold</li>
                <li>Inline validation — never a full-page error</li>
              </ul>

              <h4 className="mb-1 mt-2.5 text-[10.5px] font-semibold text-text-primary">
                Requirements
              </h4>
              <ol className="ml-3.5 flex list-decimal flex-col gap-0.5 marker:text-text-tertiary">
                <li>Collapse address and payment into a single step</li>
                <li>
                  Persist the cart for 30 days
                  <InlineCursor name="Devon" color="var(--kiwi-400)" textColor="var(--kiwi-900)" /> across devices
                </li>
                <li>Show the delivery estimate before payment</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
