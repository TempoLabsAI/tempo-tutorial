# Booking widget & checkout

**Parent:** [Book a stay](./00-parent-book-a-stay.md)
**Status:** In Progress
**Linked canvases:** [Listing detail](../../../designs/pages/listing-detail/index.page.tsx)
**Linked issues:** [#4 Booking confirmation modal](../../issues/04-booking-modal.md)

## Problem

The booking widget is where consideration becomes commitment. It has to handle a meaningful amount of complexity — dates, guest count, optional add-ons, dynamic pricing — without feeling like a form. Today the widget is functional but cold: it presents fees as a wall of line items, doesn't reassure on cancellation, and the *Reserve* button feels like jumping off a cliff.

We're redesigning the widget and adding a confirmation modal that catches the guest mid-air: a clear summary, a soft pause, and an obvious confirm.

## Goals

- Reduce booking-flow abandonment between *Reserve* click and final confirmation by 25%.
- Make pricing transparent: nightly rate, cleaning, service fee, taxes — all visible without expansion clicks.
- Add a confirmation modal that summarizes the booking before final commitment.

## Non-goals

- Payment method management (lives in account settings).
- Group splits (split bill among co-travelers) — separate feature.
- Travel insurance upsell — defer.

## User stories

- As a guest with selected dates, I want to see the total cost (including all fees and taxes) before committing, so I'm not surprised on the next screen.
- As a guest about to book, I want a confirmation step that summarizes everything (dates, guests, total, cancellation policy), so I can double-check before paying.
- As a guest who realized they made a mistake mid-flow, I want the confirmation modal to be cancellable without losing my dates and guests, so I don't have to start over.

## Functional requirements

- **FR-1.** The booking widget shows: nightly price (large), date pickers (check-in, check-out), guest count stepper, price breakdown (nightly × N + cleaning + service + taxes = total), *Reserve* button.
- **FR-2.** Price breakdown is visible by default. No "Show details" expand-click required.
- **FR-3.** *Reserve* button opens the [Booking confirmation modal](../../issues/04-booking-modal.md).
- **FR-4.** Confirmation modal contains: hero strip (listing photo + title), trip summary (dates, guests), price breakdown, cancellation policy summary (one sentence + "Read full policy" link), house rules acknowledgment checkbox, payment method picker, *Confirm and pay* button, *Back* button.
- **FR-5.** Cancellation policy is shown as a one-line summary derived from the full policy (e.g., *Free cancellation until Mar 12, then 50% refund until Mar 18*).
- **FR-6.** *Confirm and pay* triggers the payment flow (out of scope for this PRD; assume external payment screen).
- **FR-7.** *Back* button closes the modal and returns to the listing page with all selections preserved (dates, guests).
- **FR-8.** The widget on mobile is a bottom bar by default. Tapping *Reserve* expands the widget into a bottom sheet, then *Reserve* in the bottom sheet opens the confirmation modal as a full-screen sheet.

## UX notes

See [Listing detail canvas](../../../designs/pages/listing-detail/index.page.tsx) for storyboards:

- **Booking widget — default** (no dates)
- **Booking widget — with dates and guests**
- **Booking confirmation modal — default**
- **Booking confirmation modal — house rules expanded**
- **Booking widget — mobile bottom bar (collapsed)**
- **Booking widget — mobile bottom sheet (expanded)**

The modal uses Radix Dialog. Price breakdown rows use the `<PriceTag />` component. Cancellation policy line uses `<CancellationSummary />` (renders different copy for the policy types: flexible, moderate, strict).

## Open questions

- House rules acknowledgment: required checkbox before *Confirm*, or implicit acceptance? — *Legal call.*
- Currency display when guest's locale differs from listing's currency: convert + show original, or original only? — *Open.*
- Long stays (> 28 nights) get a different price breakdown structure (long-stay discount). Confirm we're handling that. — *Need spec extension.*
