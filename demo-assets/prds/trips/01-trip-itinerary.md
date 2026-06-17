# Trip itinerary

**Parent:** [Your trips](./00-parent-your-trips.md)
**Status:** Approved
**Linked canvases:** [Trip itinerary](../../../designs/pages/trip-itinerary/index.page.tsx)
**Linked issues:** [#8 Bug: trip itinerary cards overflow on mobile](../../issues/08-itinerary-bug.md)

## Problem

After booking, the guest's confirmation email is the closest thing to a trip itinerary. That's the failure mode: a PDF-style wall of legalese, buried in an inbox, that nobody finds until the morning of check-in. By then they're on their phone, parked outside the property, trying to decode a 12-page PDF for the key lockbox code.

The trip itinerary needs to be the first thing a guest opens when they're preparing for a trip — a calm, well-organized page that tells them exactly what they need and when they need it.

## Goals

- Make the key pre-travel facts (address, check-in method, dates) accessible in one tap from the app.
- Display information progressively: what matters now (upcoming trips) is prominent; past trips are archived.
- Surface the host contact and messaging shortcut directly on the itinerary.
- Handle mobile layout properly — this page is most often opened on a phone, on arrival day.

## Non-goals

- Real-time navigation / maps integration — the address links to Maps, that's enough.
- Downloadable PDF version — not in scope.
- Modification requests (changing dates post-booking) — separate feature.

## User stories

- As a guest arriving at a rental, I want to see the check-in instructions and lockbox code without digging through my email, so I can get inside quickly.
- As a guest planning a trip two weeks out, I want to see my full trip at a glance (dates, location, host name), so I can feel organized.
- As a guest with three upcoming trips, I want them displayed in date order with the soonest at the top, so I always know what's next.

## Functional requirements

- **FR-1.** `/trips` shows a list of the guest's bookings, grouped: *Upcoming* (sorted soonest first) · *Past* (sorted most recent first). Each booking is a card: listing photo, destination, dates, status badge.
- **FR-2.** Tapping a booking card opens `/trips/[booking-id]` — the full itinerary.
- **FR-3.** The itinerary page has sections: *Your trip* (dates, guests, address with Maps link) · *Getting there* (check-in method + instructions) · *Your host* (avatar, name, message shortcut) · *The property* (listing title, thumbnail, link to original listing).
- **FR-4.** Check-in method badge: one of *Lockbox*, *Smart lock*, *Host greets you*, *Building staff*. Each has a distinct icon. Below the badge, the full check-in instructions from the host.
- **FR-5.** Unread message from host appears as a banner at the top of the itinerary: *"[Host] sent you a message"* with a *Read* button.
- **FR-6.** Status badge on the booking card: *Confirmed* (green) · *Check-in today* (amber, pulsing) · *Completed* · *Cancelled*.
- **FR-7.** Cancellation entry point: a *Cancel this reservation* text link at the bottom of the itinerary, below all content — visible but not prominent. Opens the [cancellation flow](./03-cancellation-flow.md).
- **FR-8.** Mobile: all sections stack vertically. The *Check-in today* status badge should be visible without scrolling. The cancel link must not be accidentally tappable.

## UX notes

See [Trip itinerary canvas](../../../designs/pages/trip-itinerary/index.page.tsx) for storyboards:

- **Trips list — upcoming** (2 upcoming trips, 1 confirmed + 1 check-in today)
- **Trips list — empty state** (no upcoming trips)
- **Itinerary — full view** (all sections)
- **Itinerary — check-in today state** (amber badge + host message banner)
- **Itinerary — mobile** (stacked layout)
- **Itinerary — past trip** (completed state, no cancellation link)

Booking cards use `<BookingCard />` from the design system. The host message banner uses `<MessageBanner />`.

## Open questions

- Check-in instructions: host-entered free text, or structured (step 1, step 2)? Current plan: structured, max 5 steps. — *Confirm with host product team.*
- For multi-night stays crossing month boundaries: should dates display as *Mar 28 – Apr 2* or *Mar 28 – Apr 2, 2026*? — *Use full year format always.*
