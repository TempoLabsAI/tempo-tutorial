# Add map view to search results

**Status:** Todo
**Type:** Feature
**Linked PRD:** [Map view for search results](../prds/discover/02-map-view.md)
**Linked canvas:** *Design not started — this ticket tracks that gap*

## What

Add a *Show map* toggle to the search results page that switches from the current list-only view to a split list-and-map view (desktop) or full-screen map with a list bottom sheet (mobile).

## Why

Search is inherently spatial. Guests think in neighborhoods, not list order. The map view lets guests answer "where?" before "which one?" — directly addressing a top driver of post-booking disappointment ("we didn't realize it was that far from…").

Full spec in [Map view PRD](../prds/discover/02-map-view.md).

## Acceptance criteria

- [ ] *Show map* toggle button in top-right of results header, sticky on scroll
- [ ] Toggle switches to split view (desktop: 50/50 list + map) or full-screen map (mobile)
- [ ] Each listing pin shows nightly price as label (e.g., "$240")
- [ ] Selected pin scales up + turns terracotta
- [ ] Hovering a list card highlights the corresponding pin (and vice versa)
- [ ] Clicking a pin shows an inline preview card (photo + price + rating + *View listing* button)
- [ ] Pins cluster when zoomed out; cluster shows count; clicking zooms in
- [ ] Map center + zoom persists in URL params alongside existing filter params
- [ ] 200 pins render at ≥ 50fps on iPhone 12 (per FR-7 in PRD)
- [ ] Map uses Mapbox GL JS with a custom cream-paper style matching app aesthetic

## Notes

**Status note:** Design hasn't started yet. The [Map view PRD](../prds/discover/02-map-view.md) is approved but the canvas frames don't exist. This ticket is the entry point for design work — the designer should create storyboards in `designs/pages/search-experience/index.page.tsx` (add new frames to the existing canvas) before implementation begins.

**Open before starting:** Map provider decision (Mapbox vs alternatives) — see PRD open questions.

**Components to build:**
- `<MapView />` in `src/design-system/components/MapView.tsx` (wraps Mapbox GL)
- `<ListingPin />` (price label, selected state)
- `<PinCluster />` (count badge, zoom-on-click)
- `<ListingPinPreview />` (inline popover on pin click)
