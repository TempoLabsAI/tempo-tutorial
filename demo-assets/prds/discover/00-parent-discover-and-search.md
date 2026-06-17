# Discover & Search

**Status:** Active
**Children:**
- [01 — Search & filters](./01-search-and-filters.md)
- [02 — Map view for search results](./02-map-view.md)
- [03 — Wishlists & favorites](./03-wishlists.md)

**Linked canvases:** [Search experience](../../../designs/pages/search-experience/index.page.tsx) · [Wishlists](../../../designs/pages/wishlists/index.page.tsx)

## Why this area matters

Search is where 80% of guest sessions begin. Every other surface (listing detail, booking, trips) is downstream of a successful search. If guests can't quickly narrow from "millions of places" to "the five I'm choosing between," nothing else we ship matters.

Two failure modes drive most lost sessions:
1. **Filter overwhelm.** Too many filters, presented flatly, and guests bounce before they refine.
2. **No spatial context.** Travelers think geographically ("near the beach", "walkable to old town") but search results are list-only.

Wishlists are the search-adjacent feature that converts browsing into commitment — the bridge from "I'm looking" to "I'm planning a trip."

## Scope

**In:**
- Free-text destination search with date and guest count
- Faceted filters (price, beds, amenities, property type)
- Map-based result viewing
- Saving listings to named wishlists for later

**Out (for now):**
- Search personalization based on past trips
- Collaborative wishlists (sharing with co-travelers)
- AI-driven destination recommendations

## Success metrics

- **Search → listing detail click rate** > 35%
- **Filters usage rate** (sessions that adjust at least one filter) > 50%
- **Wishlist save rate** (sessions that save ≥ 1 listing) > 20%
- **Search → booking conversion** > 4%

## Cross-cutting decisions

- **Filter chips, not a tall sidebar.** Mobile-first, but desktop benefits from the same horizontal scan.
- **Map is a peer view, not a modal.** Toggling between list and map preserves filters and scroll position.
- **Wishlists are public-by-default within the app, private from outside.** Anyone with the workspace can see your saves; nobody outside can.
