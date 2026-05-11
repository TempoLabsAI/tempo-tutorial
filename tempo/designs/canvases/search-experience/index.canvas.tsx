import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import {
  Frame,
  TitleSpread,
  Annotation,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "Search & discover",
};

export default page;

/* ────────────────────────────────────────────────────────────────────────
   Search & discover — blank slate → directory → refined → empty state.
   ──────────────────────────────────────────────────────────────────────── */

/* Cover ──────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Flow · 03 · Discovery"
      title={
        <>
          Find a place
          <br />
          worth the trip.
        </>
      }
      caption="Discovery starts on the homepage and narrows by destination, dates, and filters. Four desktop frames cover the spectrum: a blank slate, the full directory, a refined query, and the empty state."
      meta={[
        { label: "Frames", value: "5" },
        { label: "Personas", value: "Guest" },
        { label: "Surface", value: "Web · iOS" },
        { label: "Owner", value: "Maya · PM" },
      ]}
    />
  ),
  name: "Cover",
  layout: { x: 0, y: 0, width: 1240, height: 720 },
};

/* Step 1 — Start fresh on the homepage ──────────────────────────── */
export const Step1Start: TempoStoryboard = {
  render: () => (
    <Frame route="/">
      <HomePage />
    </Frame>
  ),
  name: "01 · Start fresh (homepage)",
  layout: { x: 1280, y: 0, width: 1480, height: 1600 },
};

/* Annotation 1 → 2 ───────────────────────────────────────────────── */
export const NoteStartToBrowse: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 01 → 02"
      title="Submit the search bar"
      body="A blank submit goes to the full directory. With a destination, it pre-fills the URL with ?q="
    />
  ),
  name: "→ Submit search",
  layout: { x: 0, y: 760, width: 1240, height: 280 },
};

/* Step 2 — Browse the full directory (desktop) ──────────────────────── */
export const Step2Browse: TempoStoryboard = {
  render: () => (
    <Frame route="/search">
      <SearchPage />
    </Frame>
  ),
  name: "02 · Browse the directory (desktop)",
  layout: { x: 0, y: 1080, width: 1740, height: 1100 },
};

/* Step 2 — Mobile companion ─────────────────────────────────────────── */
export const Step2BrowseMobile: TempoStoryboard = {
  render: () => (
    <Frame route="/search">
      <SearchPage />
    </Frame>
  ),
  name: "02 · Browse (mobile)",
  layout: { x: 1780, y: 1080, width: 420, height: 1100 },
};

/* Annotation 2 → 3 ───────────────────────────────────────────────── */
export const NoteBrowseToRefine: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 02 → 03"
      title="Type a destination"
      body="The compact search at the top of the rail submits as the URL ?q=. Filters live alongside but don't fire until the user explicitly applies them."
    />
  ),
  name: "→ Refine the query",
  layout: { x: 0, y: 2220, width: 1240, height: 280 },
};

/* Step 3 — Refine by destination ────────────────────────────────── */
export const Step3Refine: TempoStoryboard = {
  render: () => (
    <Frame route="/search?q=Italy">
      <SearchPage />
    </Frame>
  ),
  name: '03 · Refine ("Italy")',
  layout: { x: 0, y: 2540, width: 1740, height: 1000 },
};

/* Step 4 — No matches (empty state) ─────────────────────────────── */
export const Step4Empty: TempoStoryboard = {
  render: () => (
    <Frame route="/search?q=somewhere-that-doesnt-exist">
      <SearchPage />
    </Frame>
  ),
  name: "04 · No matches",
  layout: { x: 0, y: 3580, width: 1740, height: 900 },
};

/* Closing note ────────────────────────────────────────────────────── */
export const Closing: TempoStoryboard = {
  render: () => (
    <div className="h-full p-9 bg-paper-warm rounded-[14px] flex flex-col justify-between">
      <div>
        <p className="text-[10px] font-bold text-accent tracking-[0.18em] uppercase">
          Outcome
        </p>
        <p className="text-[28px] font-semibold text-ink mt-2 leading-tight tracking-tight">
          A short list,
          <br />
          and a clear next move.
        </p>
        <p className="text-[14px] text-ink-quiet mt-4 leading-relaxed">
          When the directory has matches, the next move is{" "}
          <strong className="text-ink">View the listing</strong> — picked up in
          the <strong className="text-ink">Booking flow</strong> canvas.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-paper-deep">
        <Stat label="Median search" value="3.2" />
        <Stat label="Filter use" value="38%" />
        <Stat label="Empty rate" value="4%" />
      </div>
    </div>
  ),
  name: "Outcome",
  layout: { x: 1780, y: 3580, width: 420, height: 900 },
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-ink-quiet tracking-[0.18em] uppercase">
        {label}
      </p>
      <p className="text-[20px] font-semibold text-ink mt-1 tabular-nums tracking-tight">
        {value}
      </p>
    </div>
  );
}
