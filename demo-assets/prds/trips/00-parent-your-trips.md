# Your trips

**Status:** Active
**Children:**
- [01 — Trip itinerary](./01-trip-itinerary.md)
- [02 — Messaging with host](./02-messaging.md)
- [03 — Cancellation flow](./03-cancellation-flow.md)

**Linked canvases:** [Trip itinerary](../../../designs/pages/trip-itinerary/index.page.tsx) · [Messaging](../../../designs/pages/messaging/index.page.tsx)

## Why this area matters

Booking is not the end of the journey — it's the beginning of anxiety. Between *Confirm and pay* and check-in day, guests have a hundred small questions: *How do I get in? Where do I park? What if my flight is delayed? What are the house rules again?*

The **Your trips** surface is how we answer those questions before they become support tickets. Done well, it turns the post-booking window into a confidence-builder. Done poorly, it's a dead confirmation screen nobody reads until check-in day.

Beyond logistics, the post-stay experience matters too. A guest who had a great stay and writes a great review becomes a flywheel asset. Guests who had a problem and could reach the host quickly are more likely to return than guests who felt stuck.

## Scope

**In:**
- Trip itinerary: a clear, chronological view of what's coming (check-in instructions, dates, host contact, address)
- Messaging: a lightweight inbox for guest ↔ host direct messages
- Cancellation: a clear, low-panic path through cancellation with refund clarity upfront

**Out (for now):**
- Co-traveler trip sharing
- In-trip issue reporting / safety features
- Travel insurance or rebooking recommendations post-cancellation

## Success metrics

- **Pre-check-in message rate** (guests who message host at least once before arrival) > 40%
- **CSAT post-stay** > 4.5 / 5.0
- **Cancellation completion rate** (guests who start cancellation and complete it without contacting support) > 85%
- **Support ticket rate** for trip-logistics questions < 5% of bookings

## Cross-cutting decisions

- **Trip itinerary is the hub.** Messaging and cancellation are reachable from there — not from separate nav items.
- **Refund amount shown on step 1 of cancellation.** No bait-and-switch.
- **Messaging is ambient, not modal.** Guests should see new messages from the trips page without navigating away.
