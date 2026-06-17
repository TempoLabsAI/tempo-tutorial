# Bug: trip itinerary cards overflow on mobile

**Status:** Todo
**Type:** Bug
**Linked PRDs:** [Trip itinerary — FR-8](../prds/trips/01-trip-itinerary.md) · [Cancellation flow — FR-7](../prds/trips/03-cancellation-flow.md)
**Linked canvas:** [Trip itinerary — mobile storyboard](../../designs/pages/trip-itinerary/index.page.tsx)

## What

On viewports < 390px wide (iPhone SE, older Android), trip itinerary booking cards overflow their container. The listing title truncates inconsistently (sometimes 1 line, sometimes 3), and the *Cancel this reservation* link at the bottom of the itinerary falls partially off-screen, making it difficult to tap.

The overflow also affects the cancellation flow entry point — if the cancel link is clipped, guests can't start the cancellation flow reliably.

## Steps to reproduce

1. Open the app on a 375px-wide viewport (iPhone SE emulation in DevTools)
2. Navigate to `/trips` → tap any booking card
3. Observe: booking card right edge clips past the `padding-x` boundary
4. Scroll to bottom of the itinerary
5. Observe: *Cancel this reservation* link is partially off-screen or the tap target is < 44px

## Expected behavior

- Cards fit within the container with consistent 16px horizontal padding on all viewports ≥ 320px.
- Listing title: single line with `text-ellipsis` overflow, never wrapping to 3 lines.
- *Cancel this reservation* link: full tap target (min 44px height), fully on-screen.

## Acceptance criteria

- [ ] Booking card on `/trips` has no horizontal overflow at 375px, 390px, and 414px viewports
- [ ] Listing title on booking card is single-line with ellipsis truncation at all viewport widths
- [ ] *Cancel this reservation* link tap target is ≥ 44px tall and fully on-screen at 375px
- [ ] Mobile storyboard on [Trip itinerary canvas](../../designs/pages/trip-itinerary/index.page.tsx) is updated to reflect fixed layout
- [ ] No regression at desktop breakpoints (1280px, 1440px)

## Notes

**Root cause (suspected):** `<BookingCard />` uses a fixed `min-width` that doesn't account for the horizontal padding of the parent container. The cancel link uses `padding-y-2` (8px) which falls short of 44px touch target.

**Fix direction:**
- Replace fixed `min-width` with `w-full` + `overflow-hidden` on `<BookingCard />`
- Change title line clamp from `line-clamp-2` to `line-clamp-1`
- Change cancel link from `py-2` to `py-3` (12px × 2 = 24px + line height ≈ 44px)

**Test on:**
- 375px (iPhone SE / 12 mini)
- 390px (iPhone 14)
- 430px (iPhone 14 Pro Max)
- Chrome DevTools responsive mode

This bug affects two PRDs because the cancellation entry point is on the itinerary page. Both [Trip itinerary FR-8](../prds/trips/01-trip-itinerary.md) and [Cancellation flow FR-7](../prds/trips/03-cancellation-flow.md) have mobile layout requirements that this bug violates.
