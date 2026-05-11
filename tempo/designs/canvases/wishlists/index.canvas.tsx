import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { MemoryRouter, Link } from 'react-router-dom';
import { Heart, ChevronLeft, Plus } from 'lucide-react';
import { Navbar } from '@/design-system/layout/Navbar';
import { Container } from '@/design-system/layout/Container';
import { Button } from '@/design-system/primitives/Button';
import { ListingCard } from '@/design-system/components/ListingCard';
import { WishlistsPage } from '@/pages/WishlistsPage';
import { LISTINGS } from '@/data/listings';
import {
  Frame as ChromeFrame,
  TitleSpread,
  Annotation,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "Save & curate",
};

export default page;

/* ────────────────────────────────────────────────────────────────────────
   Save & curate — empty → populated → inside a folio → create new.
   ──────────────────────────────────────────────────────────────────────── */

const SAVED = LISTINGS.filter((_, i) => [0, 3].includes(i));

/* Cover ──────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Flow · 06 · Wishlists"
      title={
        <>
          Save the places
          <br />
          worth returning to.
        </>
      }
      caption="Wishlists let guests group properties into private folios. The flow covers a first-time empty state, the populated grid, the inside view, and the modal for creating a new one."
      meta={[
        { label: "Frames", value: "5" },
        { label: "Personas", value: "Guest" },
        { label: "States", value: "4" },
        { label: "Owner", value: "Maya · PM" },
      ]}
    />
  ),
  name: "Cover",
  layout: { x: 0, y: 0, width: 1240, height: 720 },
};

/* Step 1 — Empty state (first-time user) ────────────────────────── */
export const Step1Empty: TempoStoryboard = {
  render: () => (
    <MemoryRouter initialEntries={["/wishlists"]}>
      <div style={{ background: "#ffffff", minHeight: "100%" }}>
        <Navbar />
        <Container className="pt-8 max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <h1 className="text-[32px] font-semibold text-ink tracking-tight">Wishlists</h1>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus size={14} strokeWidth={2} /> Create
            </Button>
          </div>
          <div className="text-center py-24 border border-paper-deep rounded-2xl max-w-2xl mx-auto">
            <Heart size={40} className="text-ink-quiet mx-auto mb-4" />
            <p className="text-[20px] font-semibold text-ink">No wishlists yet</p>
            <p className="text-[14px] text-ink-quiet mt-2 mb-6">
              Create your first wishlist as you search.
            </p>
            <Button>Start exploring</Button>
          </div>
        </Container>
      </div>
    </MemoryRouter>
  ),
  name: "01 · Empty state",
  layout: { x: 1280, y: 0, width: 1480, height: 760 },
};

/* Annotation 1 → 2 ───────────────────────────────────────────────── */
export const NoteEmptyToGrid: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 01 → 02"
      title="Save your first place"
      body="Tapping the bookmark on any listing creates an unnamed folio and adds the property. Subsequent saves prompt to pick or create a folio."
    />
  ),
  name: "→ Save your first place",
  layout: { x: 0, y: 760, width: 1240, height: 280 },
};

/* Step 2 — Populated wishlists grid ─────────────────────────────── */
export const Step2Grid: TempoStoryboard = {
  render: () => (
    <ChromeFrame route="/wishlists">
      <WishlistsPage />
    </ChromeFrame>
  ),
  name: "02 · Wishlists · grid",
  layout: { x: 0, y: 1080, width: 1740, height: 900 },
};

/* Step 2 — Mobile companion ─────────────────────────────────────── */
export const Step2GridMobile: TempoStoryboard = {
  render: () => (
    <ChromeFrame route="/wishlists">
      <WishlistsPage />
    </ChromeFrame>
  ),
  name: "02 · Grid (mobile)",
  layout: { x: 1780, y: 1080, width: 420, height: 1100 },
};

/* Annotation 2 → 3 ───────────────────────────────────────────────── */
export const NoteGridToDetail: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 02 → 03"
      title="Open a folio"
      body="Tapping a folio cover slides into its detail view. The cover photo collage is composed from the first 4 saved properties."
    />
  ),
  name: "→ Open a folio",
  layout: { x: 0, y: 2020, width: 1240, height: 280 },
};

/* Step 3 — Inside a wishlist ────────────────────────────────────── */
export const Step3Detail: TempoStoryboard = {
  render: () => (
    <MemoryRouter initialEntries={["/wishlists"]}>
      <div style={{ background: "#ffffff", minHeight: "100%" }}>
        <Navbar />
        <div className="sticky top-[120px] z-30 bg-white border-b border-paper-deep">
          <Container className="flex items-center h-12">
            <Link
              to="/wishlists"
              className="flex items-center gap-1.5 text-[14px] font-medium text-ink hover:underline"
            >
              <ChevronLeft size={16} strokeWidth={2} /> All wishlists
            </Link>
          </Container>
        </div>
        <Container className="pt-8 max-w-6xl">
          <h1 className="text-[32px] font-semibold text-ink tracking-tight">
            Italy trip
          </h1>
          <p className="text-[14px] text-ink-quiet mt-1 mb-8">
            {SAVED.length} places saved
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {SAVED.map((listing) => (
              <ListingCard key={listing.id} listing={listing} saved />
            ))}
          </div>
        </Container>
      </div>
    </MemoryRouter>
  ),
  name: "03 · Inside a folio",
  layout: { x: 0, y: 2340, width: 1740, height: 900 },
};

/* Step 4 — Create new wishlist (modal) ──────────────────────────── */
export const Step4Create: TempoStoryboard = {
  render: () => (
    <div className="relative w-full h-full bg-black/50 flex items-center justify-center p-4 rounded-[14px] overflow-hidden">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[380px] shadow-modal">
        <h3 className="text-[20px] font-semibold text-ink tracking-tight mb-4">
          Create a new wishlist
        </h3>
        <div className="w-full h-12 rounded-lg border border-ink px-3.5 flex items-center text-[15px] text-ink mb-4 shadow-[0_0_0_2px_rgba(0,0,0,0.06)]">
          Italy 2027|
        </div>
        <Button className="w-full mb-2">Create</Button>
        <Button variant="ghost" className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  ),
  name: "04 · Create new folio",
  layout: { x: 1780, y: 2340, width: 420, height: 700 },
};
