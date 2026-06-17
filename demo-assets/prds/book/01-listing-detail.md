# Listing detail page

**Parent:** [Book a stay](./00-parent-book-a-stay.md)
**Status:** Approved
**Linked canvases:** [Listing detail](../../../designs/pages/listing-detail/index.page.tsx)
**Linked issues:** *No active ticket — referenced via [Issue #4 Booking confirmation modal](../../issues/04-booking-modal.md) (which lives on this page)*

> **State note:** This PRD has no dedicated issue but is the foundation for [#4 Booking confirmation modal](../../issues/04-booking-modal.md). Some PRDs anchor a surface that other tickets touch — that's normal.

## Problem

A listing page has to be both glanceable (guests skim 5–10 listings before committing) and deep (the chosen one gets read carefully). Most travel sites pick one mode and lose at the other. Skim-only pages feel empty; deep-only pages feel exhausting.

The listing page should reward the skimmer with the answers to *"is this place right for me?"* in 5 seconds, and reward the careful reader with everything they could want to know in another 60.

## Goals

- Information hierarchy that satisfies the 5-second scan and the 60-second read.
- Photo gallery that lets guests see the place quickly without overwhelming.
- Booking widget always reachable without disrupting reading flow.
- Page loads in under 1.5s on 4G; LCP under 2.0s.

## Non-goals

- Editorial-style long-form content from the host (defer).
- Live chat embedded on the page (Messaging is a separate feature).
- Comparison-with-other-listings widget (out of scope here).

## User stories

- As a guest who's clicked into a listing from search, I want the hero image, title, and price visible immediately, so I can decide in 5 seconds whether to keep reading.
- As a guest seriously considering this place, I want to see *all* the photos, the amenities, the host, the reviews, and the location — without leaving the page.
- As a guest ready to book, I want the booking widget to be always reachable as I scroll, so I never have to hunt for it.

## Functional requirements

- **FR-1.** Hero section: large primary photo + 4 secondary thumbnails. Click any photo opens the full gallery (Radix Dialog). The gallery shows all photos in a vertical scroll with an image counter.
- **FR-2.** Below hero: title (large serif), location, primary metrics (rating + review count, beds, baths, max guests), host snippet with avatar.
- **FR-3.** Two-column layout below the fold: left = description, amenities, reviews, location. Right = sticky booking widget.
- **FR-4.** Amenities section shows the top 8 inline + a *Show all 22 amenities* button that opens a categorized modal.
- **FR-5.** Reviews section: 5-metric summary (cleanliness, accuracy, check-in, communication, location, value) with bar visualizations + grid of individual reviews. *Show all 47 reviews* button opens a modal.
- **FR-6.** Location section: small neighborhood map (no exact pin, just a circle of approximate area for privacy) + paragraph from the host about the area.
- **FR-7.** Sticky booking widget on desktop. On mobile, the widget collapses to a bottom bar with *Reserve* button — tap expands the full widget as a bottom sheet.
- **FR-8.** Page LCP target: < 2.0s. Hero image uses `<Image priority />` with explicit dimensions to avoid layout shift.

## UX notes

See [Listing detail canvas](../../../designs/pages/listing-detail/index.page.tsx) for storyboards:

- **Listing — above the fold** (hero + title + price)
- **Photo gallery (open)** — full-screen scroll-through
- **Amenities — inline (top 8)** and **Amenities — modal (all 22)**
- **Booking widget — default**, **— with dates selected**, **— sold out state**
- **Reviews summary** + **Reviews grid**
- **Location map** (privacy-circle, not exact pin)
- **Mobile bottom-bar booking** (collapsed and expanded)

## Open questions

- Where do *House rules* live? Inside booking widget on confirm, or as their own section before reviews? — *PM call.*
- How do we handle listings with < 3 reviews? Suppress the rating block? Show "New listing" badge? — *Open.*
