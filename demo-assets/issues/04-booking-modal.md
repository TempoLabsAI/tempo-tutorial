# Booking confirmation modal

**Status:** In Review
**Type:** Feature
**Linked PRDs:** [Booking widget & checkout — FR-3, FR-4](../prds/book/02-booking-widget.md) · [Listing detail page](../prds/book/01-listing-detail.md)
**Linked canvas:** [Listing detail — Booking confirmation modal](../../designs/pages/listing-detail/index.page.tsx)

## What

Add a confirmation modal that appears when the guest clicks *Reserve* on the booking widget. The modal summarizes the full trip (listing, dates, guests, total price with breakdown, cancellation policy, house rules checkbox) before the guest commits to payment.

## Why

The *Reserve* button currently goes directly to the payment screen — no summary step. Guests who realize they have the wrong dates on the payment screen have to cancel their selections and start over, which kills conversion. A confirmation modal gives a pause point with full information and a safe off-ramp.

This implements FR-3 and FR-4 from the [Booking widget PRD](../prds/book/02-booking-widget.md).

## Acceptance criteria

- [ ] Clicking *Reserve* (in the sticky widget or mobile bottom sheet) opens a Radix Dialog modal
- [ ] Modal header: listing photo (thumbnail) + listing title
- [ ] Trip summary section: check-in date, check-out date, # of guests
- [ ] Price breakdown section: nightly rate × nights, cleaning fee, service fee, taxes, **total**
- [ ] Cancellation policy: one-line summary (derived from policy type) + *Read full policy* expand link
- [ ] House rules: checkbox acknowledging house rules, with *Read house rules* expand link
- [ ] Payment method section: shows saved payment method (last 4 digits) or a *+ Add payment method* prompt
- [ ] *Confirm and pay* button (primary, full-width) — triggers payment flow (out of scope: shows a success toast in the demo)
- [ ] *Back* button (ghost) — closes modal, returns to listing with all booking widget selections preserved
- [ ] Modal is dismissible via Escape and backdrop click on step 1 only (matches [Cancellation flow FR-7](../prds/trips/03-cancellation-flow.md) pattern)

## Notes

**Component:** `<BookingConfirmationModal />` in `src/design-system/components/BookingConfirmationModal.tsx`. Uses Radix `Dialog.Root` with `onOpenChange`.

**Storyboard:** *Booking confirmation modal — default* on the [Listing detail canvas](../../designs/pages/listing-detail/index.page.tsx). Also add *Booking confirmation modal — house rules expanded*.

**Demo shortcut:** For the tutorial app, *Confirm and pay* shows a `<ConfirmedToast />` rather than triggering a real payment flow. The component is ready to swap in a real payment handler.

**Currently blocked:** Waiting on design sign-off for the cancellation policy summary component (`<CancellationSummary />`). Placeholder text is in place.
