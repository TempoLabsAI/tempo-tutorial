import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { SearchPage } from '@/pages/SearchPage';
import { ListingDetailPage } from '@/pages/ListingDetailPage';
import { Button } from '@/design-system/primitives/Button';
import { Avatar } from '@/design-system/primitives/Avatar';
import { LISTINGS } from '@/data/listings';
import { formatPrice } from '@/lib/utils';
import {
  Frame,
  TitleSpread,
  Annotation,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "Booking flow",
};

export default page;

/* ────────────────────────────────────────────────────────────────────────
   Booking flow — discovery → listing → reservation → confirmation.
   ──────────────────────────────────────────────────────────────────────── */

const listing = LISTINGS[0];
const nights = 5;
const subtotal = listing.pricePerNight * nights;
const cleaning = 85;
const service = Math.round(subtotal * 0.12);
const taxes = Math.round(subtotal * 0.08);
const total = subtotal + cleaning + service + taxes;

/* Cover ──────────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Flow · 02 · Booking"
      title={
        <>
          From browsing
          <br />
          to booked.
        </>
      }
      caption="The end-to-end flow a guest moves through to reserve a stay. Browse the directory, open a listing, confirm dates, pay, and land on a confirmation. Four desktop frames and one mobile companion."
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

/* Step 1 — Browse the directory ──────────────────────────────────── */
export const Step1Browse: TempoStoryboard = {
  render: () => (
    <Frame route="/search">
      <SearchPage />
    </Frame>
  ),
  name: "01 · Browse the directory",
  layout: { x: 1280, y: 0, width: 1480, height: 1100 },
};

/* Annotation 1 → 2 ───────────────────────────────────────────────── */
export const NoteBrowseToView: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 01 → 02"
      title="Tap a card to open"
      body="The full image area is the click target. Hover lifts the photo and underlines the price; the heart toggles independently."
    />
  ),
  name: "→ Tap a card to open",
  layout: { x: 0, y: 760, width: 1240, height: 280 },
};

/* Step 2 — View the listing (desktop) ─────────────────────────────── */
export const Step2View: TempoStoryboard = {
  render: () => (
    <Frame route="/listing/lst-001" path="/listing/:id">
      <ListingDetailPage />
    </Frame>
  ),
  name: "02 · View the listing (desktop)",
  layout: { x: 0, y: 1080, width: 1740, height: 2200 },
};

/* Step 2 — View the listing (mobile companion) ─────────────────────── */
export const Step2ViewMobile: TempoStoryboard = {
  render: () => (
    <Frame route="/listing/lst-001" path="/listing/:id">
      <ListingDetailPage />
    </Frame>
  ),
  name: "02 · View the listing (mobile)",
  layout: { x: 1780, y: 1080, width: 420, height: 1800 },
};

/* Annotation 2 → 3 ───────────────────────────────────────────────── */
export const NoteViewToReserve: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 02 → 03"
      title="Tap Reserve"
      body="Reserve sits in a sticky right-rail on desktop and a fixed bottom bar on mobile. Tapping it lifts the confirm sheet from the bottom."
    />
  ),
  name: "→ Tap Reserve",
  layout: { x: 1780, y: 1980, width: 420, height: 280 },
};

/* Step 3 — Confirm reservation modal ────────────────────────────────── */
export const Step3Reserve: TempoStoryboard = {
  render: () => (
    <ModalFrame>
      <div className="bg-white rounded-2xl p-7 w-full max-w-[440px] shadow-modal">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={listing.images[0]}
            alt=""
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-ink line-clamp-1">
              {listing.title}
            </p>
            <p className="text-[13px] text-ink-quiet">{listing.location}</p>
          </div>
        </div>
        <div className="space-y-3 text-[14px] mb-6">
          <KV label="Dates" value={listing.dateRange} />
          <KV label="Guests" value="2" />
          <div className="border-t border-paper-deep pt-3 flex justify-between font-semibold text-ink">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
        <p className="text-[12px] text-ink-quiet mb-5 bg-paper-warm rounded-xl p-3 leading-snug">
          <strong className="text-ink">Cancellation policy:</strong> Free
          cancellation until 14 days before check-in, then 50% refund until 7
          days before.
        </p>
        <Button size="lg" className="w-full mb-2">
          Confirm and pay
        </Button>
        <Button variant="ghost" className="w-full">
          Cancel
        </Button>
      </div>
    </ModalFrame>
  ),
  name: "03 · Confirm reservation",
  layout: { x: 0, y: 3320, width: 700, height: 760 },
};

/* Annotation 3 → 4 ───────────────────────────────────────────────── */
export const NoteReserveToBooked: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 03 → 04"
      title="Confirm and pay"
      body="The same sheet morphs in place — no page navigation. Avoids losing context and gives the confirmation a clear arrival moment."
      arrow="right"
    />
  ),
  name: "→ Confirm",
  layout: { x: 720, y: 3320, width: 280, height: 760 },
};

/* Step 4 — Booked & confirmed ───────────────────────────────────────── */
export const Step4Confirmed: TempoStoryboard = {
  render: () => (
    <ModalFrame>
      <div className="bg-white rounded-2xl p-9 w-full max-w-[440px] text-center shadow-modal">
        <div className="text-[56px] mb-4 leading-none">🎉</div>
        <p className="text-[24px] font-semibold text-ink tracking-tight">
          Trip booked!
        </p>
        <p className="text-[14px] text-ink-quiet mt-2">
          Confirmation code:{" "}
          <span className="text-ink font-mono">HMXK9W</span>
        </p>
        <div className="flex items-center gap-3 bg-paper-warm rounded-xl p-3 my-6 text-left">
          <Avatar src={listing.host.avatar} alt={listing.host.name} size="md" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink">{listing.host.name}</p>
            <p className="text-[12px] text-ink-quiet">
              Will message you 48 hrs before check-in.
            </p>
          </div>
        </div>
        <Button size="lg" className="w-full">
          Done
        </Button>
      </div>
    </ModalFrame>
  ),
  name: "04 · Trip booked",
  layout: { x: 1020, y: 3320, width: 700, height: 760 },
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
          Booking confirmed.
          <br />
          Host notified.
        </p>
        <p className="text-[14px] text-ink-quiet mt-4 leading-relaxed">
          The trip lands in the guest's <strong className="text-ink">Logbook</strong>{" "}
          and a thread opens with the host. We pick up that story in the{" "}
          <strong className="text-ink">Trip lifecycle</strong> canvas.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-paper-deep">
        <Stat label="Time on flow" value="≈ 4m" />
        <Stat label="Drop-off" value="6%" />
        <Stat label="CSAT" value="4.8" />
      </div>
    </div>
  ),
  name: "Outcome",
  layout: { x: 1740, y: 3320, width: 460, height: 760 },
};

/* ── Helpers ──────────────────────────────────────────────────────── */
function ModalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-black/50 flex items-center justify-center p-4 rounded-[14px] overflow-hidden">
      {children}
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-ink">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

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
