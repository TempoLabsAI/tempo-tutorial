# Cancellation flow

**Parent:** [Your trips](./00-parent-your-trips.md)
**Status:** In Review
**Linked canvases:** [Trip itinerary](../../../designs/pages/trip-itinerary/index.page.tsx)
**Linked issues:** [#8 Bug: trip itinerary cards overflow on mobile](../../issues/08-itinerary-bug.md)

> **State note:** This PRD shares a canvas with [Trip itinerary](./01-trip-itinerary.md) — the cancellation flow is entered from the itinerary page and lives within its canvas as a dedicated frame set. Issue #8 references both PRDs because the mobile overflow bug affects both the itinerary cards and the cancel button tap target.

## Problem

Cancelling a booking is a high-anxiety, high-stakes action. Guests who need to cancel are already stressed (travel plans changed, emergency, etc.). The current flow makes it worse: the refund amount isn't shown until the final confirmation screen, the policy language is dense legalese, and there's no clear undo path if the guest cancels by mistake.

A guest who cancels cleanly and gets the expected refund is likely to rebook. A guest who feels tricked or confused by the cancellation process is lost.

## Goals

- Show the refund amount on step 1 — before the guest commits to anything.
- Plain-language policy summary (not legalese).
- Clear, recoverable flow with an obvious off-ramp.
- < 3 taps from *Cancel this reservation* to confirmed cancellation.

## Non-goals

- Modification flow (change dates instead of cancelling) — separate feature.
- Instant rebooking suggestions post-cancel — defer.
- Host-initiated cancellations — different flow, not in scope here.

## User stories

- As a guest who needs to cancel, I want to see exactly how much I'll get back before I click confirm, so I can make the decision with full information.
- As a guest who started cancellation by accident, I want a clear way to go back without cancelling, so I don't lose my reservation.
- As a guest who has cancelled, I want a clear confirmation of what happens next (when the refund hits, how it arrives), so I'm not left wondering.

## Functional requirements

- **FR-1.** Entry point: *Cancel this reservation* text link at the bottom of the trip itinerary page. Small text, not destructive-red — the UI should not panic the guest before they've even seen the refund amount.
- **FR-2.** Step 1 — *Cancellation summary*: shows the listing name, dates, and **refund amount prominently** (large number, green). Below: one-sentence cancellation policy summary (*You're eligible for a full refund since check-in is 14+ days away*). Two buttons: *Continue to cancel* and *Keep my reservation* (primary).
- **FR-3.** Step 2 — *Reason*: optional single-select reason (Plans changed · Dates wrong · Found a better option · Emergency · Other). Skip link available. This data informs product decisions and host feedback — never shared publicly.
- **FR-4.** Step 3 — *Confirm*: final summary of what's being cancelled and the exact refund, with a *Confirm cancellation* button. Irreversible action gets a destructive-red button only at this step.
- **FR-5.** Post-confirmation: full-screen confirmation state: checkmark illustration, *Reservation cancelled*, refund timeline (*You'll receive $[X] within 5–10 business days to [payment method]*). Two CTAs: *Back to trips* and *Browse more places*.
- **FR-6.** If the guest is in a partial-refund or no-refund period, step 1 must make this explicit with the non-refunded amount in a muted style. No hiding of fees.
- **FR-7.** The flow is a full-screen sheet (not inline on the itinerary page) that can be dismissed by swiping down from step 1 or step 2, but NOT from step 3 (confirm) — swipe-to-dismiss is disabled on the final confirm step.

## UX notes

See [Trip itinerary canvas](../../../designs/pages/trip-itinerary/index.page.tsx) for storyboards:

- **Cancellation — step 1 (full refund eligible)**
- **Cancellation — step 1 (partial refund)**
- **Cancellation — step 1 (no refund)**
- **Cancellation — step 2 (reason select)**
- **Cancellation — step 3 (confirm — destructive)**
- **Cancellation — confirmed (post-cancel state)**

The sheet uses Radix Dialog with `preventClose` enabled on step 3. The refund amount uses `<PriceTag size="xl" />` with `variant="positive"`.

## Open questions

- Should refund amount be shown *net of service fee* or gross? (i.e., does the service fee get refunded too?) — *Need finance input; assumed yes for full refund, no for partial.*
- Email confirmation of cancellation: sent immediately or after processing delay? — *Platform team owns this; assume immediate.*
