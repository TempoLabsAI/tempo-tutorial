# Book a stay

**Status:** Active
**Children:**
- [01 — Listing detail page](./01-listing-detail.md)
- [02 — Booking widget & checkout](./02-booking-widget.md)
- [03 — Reviews on listing](./03-reviews-on-listing.md)

**Linked canvases:** [Listing detail](../../../designs/pages/listing-detail/index.page.tsx)

## Why this area matters

The listing detail page is the **decision moment**. Everything in Discover & Search exists to deliver guests here. Everything in Your Trips exists because they decided to book here. If the listing page doesn't sell — clearly, calmly, with the right information at the right time — the entire funnel breaks.

The bar is high. Guests arrive with strong intent and high anxiety: they're about to spend hundreds or thousands of dollars on a place they've never seen, owned by a stranger. The page has to do three jobs simultaneously:

1. **Inform** — what's the place, who's the host, what's there, what's the location.
2. **Reassure** — reviews, host trust signals, transparent pricing, clear cancellation policy.
3. **Close** — booking widget that's always available, never blocking, never anxious.

## Scope

**In:**
- Photo gallery with a clear primary image and grid view
- Above-the-fold information density without clutter
- Sticky booking widget with date pickers, guest counter, price breakdown
- Reviews section with summary metrics and individual reviews
- Host snippet with photo, response rate, and link to host profile
- Map preview of the listing's neighborhood

**Out (for now):**
- Live availability calendar inside the gallery — defer
- Augmented reality tour — out of scope
- Multi-listing comparison — separate feature

## Success metrics

- **Page → booking start rate** > 12%
- **Time on page** > 90 seconds (suggests genuine consideration, not bounce)
- **Gallery scroll-through rate** > 60% (guests viewing more than the hero image)
- **Review section read rate** > 35%

## Cross-cutting decisions

- **Booking widget is sticky on desktop, bottom-bar on mobile.** Always reachable.
- **Pricing is shown nightly *and* total upfront.** No "fees revealed at checkout" — that's the death of trust.
- **Reviews are summarized at the top of the section.** Detail below for skeptics.
