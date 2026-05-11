import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { TripsPage } from '@/pages/TripsPage';
import { TripDetailPage } from '@/pages/TripDetailPage';
import { Button } from '@/design-system/primitives/Button';
import { TRIPS } from '@/data/trips';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  Frame,
  TitleSpread,
  Annotation,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "Trip lifecycle",
};

export default page;

/* ────────────────────────────────────────────────────────────────────────
   Trip lifecycle — booked → check-in → past, with cancellation as a branch.
   ──────────────────────────────────────────────────────────────────────── */

const trip = TRIPS[0];
const refundAmount =
  trip.cancellationPolicy === "flexible"
    ? trip.totalPrice
    : trip.cancellationPolicy === "moderate"
      ? Math.round(trip.totalPrice * 0.5)
      : 0;

/* Cover ──────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Flow · 04 · Trips"
      title={
        <>
          Six weeks until
          <br />
          check-in.
        </>
      }
      caption="The lifecycle of a confirmed booking. Logbook overview, the trip detail in two key states (confirmed, check-in today), the cancellation branch, and the read-only past trip."
      meta={[
        { label: "Frames", value: "6" },
        { label: "Personas", value: "Guest" },
        { label: "States", value: "4" },
        { label: "Owner", value: "Maya · PM" },
      ]}
    />
  ),
  name: "Cover",
  layout: { x: 0, y: 0, width: 1240, height: 720 },
};

/* Step 1 — Logbook (all trips) ──────────────────────────────────── */
export const Step1Logbook: TempoStoryboard = {
  render: () => (
    <Frame route="/trips">
      <TripsPage />
    </Frame>
  ),
  name: "01 · Logbook · all trips",
  layout: { x: 1280, y: 0, width: 1480, height: 1100 },
};

/* Annotation 1 → 2 ───────────────────────────────────────────────── */
export const NoteLogbookToConfirmed: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 01 → 02"
      title="Open an upcoming trip"
      body="Cards in the logbook are static representations of the booking — opening one shows the live itinerary."
    />
  ),
  name: "→ Open a trip",
  layout: { x: 0, y: 760, width: 1240, height: 280 },
};

/* Step 2 — A confirmed reservation (desktop) ─────────────────────── */
export const Step2Confirmed: TempoStoryboard = {
  render: () => (
    <Frame route="/trips/trp-001" path="/trips/:id">
      <TripDetailPage />
    </Frame>
  ),
  name: "02 · Confirmed reservation (desktop)",
  layout: { x: 0, y: 1080, width: 1740, height: 1400 },
};

/* Step 2 — Mobile companion ─────────────────────────────────────── */
export const Step2ConfirmedMobile: TempoStoryboard = {
  render: () => (
    <Frame route="/trips/trp-001" path="/trips/:id">
      <TripDetailPage />
    </Frame>
  ),
  name: "02 · Confirmed (mobile)",
  layout: { x: 1780, y: 1080, width: 420, height: 1400 },
};

/* Annotation 2 → 3 ───────────────────────────────────────────────── */
export const NoteConfirmedToCheckIn: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Status change"
      title="The day arrives"
      body="Status auto-flips to 'Check-in today' on the morning of the booking. The same page renders with a warning banner and pulsing badge."
    />
  ),
  name: "→ Status change",
  layout: { x: 1780, y: 1980, width: 420, height: 280 },
};

/* Step 3 — Check-in today ───────────────────────────────────────── */
export const Step3CheckIn: TempoStoryboard = {
  render: () => (
    <Frame route="/trips/trp-003" path="/trips/:id">
      <TripDetailPage />
    </Frame>
  ),
  name: "03 · Check-in today (warning banner)",
  layout: { x: 0, y: 2520, width: 1740, height: 1400 },
};

/* Annotation 3 → 4 ───────────────────────────────────────────────── */
export const NoteCheckInToCancel: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Branch · Cancellation"
      title="Or — the trip is called off"
      body="The cancel link sits below the itinerary. Tapping it opens a 3-step sheet that surfaces refund clarity before any commitment."
      arrow="right"
    />
  ),
  name: "→ Cancellation branch",
  layout: { x: 0, y: 3960, width: 460, height: 760 },
};

/* Step 4 — Cancellation modal ───────────────────────────────────── */
export const Step4Cancel: TempoStoryboard = {
  render: () => (
    <ModalFrame>
      <div className="bg-white rounded-2xl p-7 w-full max-w-[440px] shadow-modal">
        <h3 className="text-[22px] font-semibold text-ink tracking-tight mb-1">
          Cancel this reservation?
        </h3>
        <p className="text-[13px] text-ink-quiet mb-5">
          {trip.listing.title} · {formatDate(trip.checkIn)} – {formatDate(trip.checkOut)}
        </p>
        <div className="bg-paper-warm rounded-xl p-5 mb-5 text-center">
          <p className="text-[12px] text-ink-quiet">Your refund</p>
          <p className="text-[32px] font-semibold text-moss tracking-tight tabular-nums">
            {formatPrice(refundAmount)}
          </p>
          <p className="text-[12px] text-ink-quiet">50% refund — moderate window</p>
        </div>
        <Button className="w-full mb-2">Continue to cancel</Button>
        <Button variant="ghost" className="w-full">
          Keep reservation
        </Button>
      </div>
    </ModalFrame>
  ),
  name: "04 · Cancellation modal",
  layout: { x: 480, y: 3960, width: 700, height: 760 },
};

/* Step 5 — Past trip (read-only) ────────────────────────────────── */
export const Step5Past: TempoStoryboard = {
  render: () => (
    <Frame route="/trips/trp-004" path="/trips/:id">
      <TripDetailPage />
    </Frame>
  ),
  name: "05 · Past trip (read-only)",
  layout: { x: 1200, y: 3960, width: 1560, height: 1300 },
};

/* ── Helpers ──────────────────────────────────────────────────────── */
function ModalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-black/50 flex items-center justify-center p-4 rounded-[14px] overflow-hidden">
      {children}
    </div>
  );
}
