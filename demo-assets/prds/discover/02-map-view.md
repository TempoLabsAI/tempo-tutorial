# Map view for search results

**Parent:** [Discover & Search](./00-parent-discover-and-search.md)
**Status:** Approved
**Linked canvases:** *Design pending — see linked issue*
**Linked issues:** [#5 Add map view to search results](../../issues/05-map-view.md)

> **State note:** This PRD is approved but design hasn't started yet. The linked issue tracks that design + implementation work. This PRD demonstrates a real workflow state in Tempo: spec'd, but the canvas doesn't exist yet.

## Problem

Travel decisions are spatial. Guests think "near the beach", "5 minutes from the metro", "walkable to the old town." A list view forces them to translate addresses into mental maps — and they get it wrong, costing booking confidence and increasing post-booking complaints ("we didn't realize it was so far from…").

A map view lets guests answer "where" before "which one."

## Goals

- Add a map toggle to the search results page that preserves all active filters.
- Cluster nearby pins so dense markets (Paris, Tokyo) don't become a wall of overlapping markers.
- Sync map and list scroll: hovering a list card highlights its pin; clicking a pin scrolls the list.

## Non-goals

- Drawing custom search areas (lasso/polygon selection) — defer to v2.
- "Search this area" button when the user pans — defer to v2.
- Indoor maps for hotels with multiple buildings — out of scope.

## User stories

- As a guest visiting a city for the first time, I want to see all results on a map, so I can understand which neighborhood each listing is in before opening it.
- As a guest who knows the city, I want to drag the map to a specific neighborhood and see only listings there, so I can filter geographically.
- As a guest comparing two listings, I want to see how far apart they are on the map, so I can judge their relative proximity to landmarks.

## Functional requirements

- **FR-1.** A *Show map* toggle button in the top-right of the results header, sticky on scroll. On click, the page splits into a 50/50 list-and-map view (desktop) or full-screen map with list as bottom sheet (mobile).
- **FR-2.** Each pin shows the nightly price as its label (e.g., "$240"). Selected pin scales up and changes color to terracotta accent.
- **FR-3.** Hovering a list card highlights its pin and vice versa. Clicking a pin opens a small inline preview card with image + price + rating, with a *View listing* button.
- **FR-4.** Pins cluster when zoomed out. Cluster shows count; clicking a cluster zooms in.
- **FR-5.** Map state (center, zoom) persists in URL query params alongside filters.
- **FR-6.** Map provider: Mapbox GL JS. Style: a custom Tempo theme that matches the cream paper aesthetic of the app.
- **FR-7.** Performance: rendering 200 pins should not drop frame rate below 50fps on a baseline iPhone 12.

## UX notes

Design hasn't started. When it does, expect frames in `designs/pages/search-experience/index.page.tsx`:

- **Search results — list view** (already exists)
- **Search results — split view (list + map)** (new)
- **Search results — full map (mobile)** (new)
- **Pin — default**, **Pin — selected**, **Pin — cluster** (new)
- **Listing preview popover** (new)

## Open questions

- Mapbox vs Google Maps vs Leaflet+OSM? Default Mapbox for styling control. *Open with eng.*
- Do we re-query as the user pans, or keep the current "filtered set" pinned regardless of viewport? Current PRD assumes the latter.
- What's the right cluster threshold? — *Defer to design; depends on pin styling.*
