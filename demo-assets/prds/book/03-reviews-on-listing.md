# Reviews on listing

**Parent:** [Book a stay](./00-parent-book-a-stay.md)
**Status:** Draft
**Linked canvases:** [Listing detail](../../../designs/pages/listing-detail/index.page.tsx)
**Linked issues:** *No active ticket — spec parked, no work scheduled*

> **State note:** This is a "parked spec." Reviews are critical to the listing page (and live in the [Listing detail canvas](../../../designs/pages/listing-detail/index.page.tsx)) but no ticket has been opened yet to redesign or extend them. The PRD captures intent so it doesn't get lost.

## Problem

Reviews are the single highest-trust signal on a listing page. They're also a wall of text. Guests scan ratings and bail on the prose — but the prose is where the real signal is. Today's reviews section is undifferentiated: 47 reviews displayed in chronological order, no summary, no themes, no way to find the review that answers your specific concern ("is the wifi actually fast?").

We need a reviews section that surfaces structured signal first, then lets curious guests dive into specifics.

## Goals

- Make rating *signals* (cleanliness, location, value, etc.) immediately visible above the review prose.
- Surface review *themes* (clusters of similar mentions) to help guests find reviews about specific topics.
- Improve the review search/filter so guests can find reviews about specific concerns.

## Non-goals

- AI-generated review summaries — out of scope (separate proposal).
- Host responses inline — already exists; no changes needed.
- Review writing flow — see [Trip itinerary](../trips/01-trip-itinerary.md) (post-stay review prompt lives there).

## User stories

- As a guest scanning a listing, I want to see the overall rating broken into specific categories (cleanliness, communication, location), so I can quickly spot dimensions I care about.
- As a guest concerned about a specific issue (e.g., noise, wifi), I want to filter reviews by topic, so I don't have to read all 47.
- As a guest wanting depth, I want to read full review prose with reviewer photos and trip context (when they stayed, with whom), so I can judge relevance.

## Functional requirements

- **FR-1.** Reviews section opens with a 6-metric summary block: overall rating + 5 sub-ratings (cleanliness, accuracy, check-in, communication, location, value). Each sub-rating shows a horizontal bar and the numeric score.
- **FR-2.** Below the summary, show a row of "topic chips" derived from review prose (e.g., *Wifi · 12* · *Quiet · 8* · *Walkable · 14*). Tapping a chip filters the review list.
- **FR-3.** Review list shows 6 reviews inline. Each review: reviewer avatar, name, trip month/year, review prose, "helpful" count.
- **FR-4.** *Show all 47 reviews* opens a modal with the full list, search input, sort options (newest, highest, lowest), and the topic chip row.
- **FR-5.** Each review can be reported (overflow menu → *Report review*).
- **FR-6.** Long reviews (> 300 characters) collapse with *Read more* expand.

## UX notes

See [Listing detail canvas](../../../designs/pages/listing-detail/index.page.tsx) for storyboards:

- **Reviews — summary block** (6 metrics)
- **Reviews — topic chips row**
- **Reviews — inline list (6 reviews)**
- **Reviews — modal (full list with search)**
- **Reviews — empty state** (new listing, < 3 reviews)

Topic chips are powered by an embeddings-based clustering job that runs asynchronously when reviews are submitted. Implementation detail lives in `tempo-modules/reviews/` (out of scope for this PRD).

## Open questions

- Topic chip threshold — only show chips with > 5 mentions? Or always show top 5 regardless of count? — *Open.*
- Should the summary block link to a research-level page that shows the rating distribution (histogram per metric)? — *Defer.*
