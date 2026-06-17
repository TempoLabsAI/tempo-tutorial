# [Start here] How issues, PRDs, and canvases link together

> **This is a tutorial PRD.** It explains the connective tissue of a Tempo workspace and shows the link graph using real examples from this tutorial.

**Status:** Tutorial
**Linked canvases:** [Start here canvas](../../../designs/pages/start-here/index.page.tsx) · [Search experience](../../../designs/pages/search-experience/index.page.tsx) · [Listing detail](../../../designs/pages/listing-detail/index.page.tsx) · [Trip itinerary](../../../designs/pages/trip-itinerary/index.page.tsx)
**Linked issues:** [#2 Edit a component on the canvas](../../issues/02-edit-a-component.md)
**See also:** [Welcome](./01-welcome.md) · [How to write PRDs](./02-how-to-write-prds.md)

## The mental model

Think of each surface as a different *projection* of the same feature:

```
        ┌──────────────────────────┐
        │           PRD            │  the why + what
        └────────────┬─────────────┘
                     │
        ┌────────────┴─────────────┐
        │          Canvas          │  the how it looks
        └────────────┬─────────────┘
                     │
        ┌────────────┴─────────────┐
        │          Issue           │  the now (in-flight work)
        └────────────┬─────────────┘
                     │
        ┌────────────┴─────────────┐
        │           Code           │  the thing users use
        └──────────────────────────┘
```

The four surfaces are bidirectionally linked via the metadata block at the top of each artifact (and via canvas storyboards importing real code).

## Linkage isn't always 1:1 — and that's the point

A real product team's board has tickets in different states. Some have full specs and designs. Some are spec'd but not yet designed. Some are designs being explored before the spec is written. **This workspace deliberately models all those states** so you see how Tempo handles them.

## The four lifecycle states (with examples from this workspace)

### 1. Full spec + full design + active ticket

The mature case. PRD + canvas + issue all exist and reference each other.

**Example:** [Search & filters PRD](../discover/01-search-and-filters.md) ↔ [Search experience canvas](../../../designs/pages/search-experience/index.page.tsx) ↔ [Issue #3 Add price range filter](../../issues/03-price-filter.md).

### 2. Spec'd but not yet designed

A real workflow: PM writes the spec, designer hasn't started yet. The ticket exists to track that gap.

**Example:** [Map view PRD](../discover/02-map-view.md) ↔ [Issue #5 Add map view to search results](../../issues/05-map-view.md). **No canvas yet** — that's what the ticket is for.

### 3. Designed but spec is WIP

A real workflow: designer is exploring directions, PM hasn't formalized the spec. The canvas exists, the PRD is a stub.

**Example:** [Issue #6 Refresh messaging inbox](../../issues/06-inbox-refresh.md) → [Messaging canvas](../../../designs/pages/messaging/index.page.tsx). The [Messaging PRD](../trips/02-messaging.md) exists but is short.

### 4. Spec parked, no active work

A spec that's been written but no ticket has been opened to do the work. Useful — keeps intent captured even when prioritization hasn't gotten there yet.

**Example:** [Reviews on listing PRD](../book/03-reviews-on-listing.md). It lives on the [Listing detail canvas](../../../designs/pages/listing-detail/index.page.tsx) (the reviews section is part of the listing) but has no dedicated issue.

## How to navigate the graph

- **Top-down:** Open a parent PRD → click into a child PRD → click into the linked canvas or issue.
- **Bottom-up:** Open the kanban board → click an issue → follow links to its PRD and canvas.
- **Visual:** Open a canvas → use the storyboards as an index into PRDs and issues.

There's no "right" entry point. New users tend to start with the canvas (visual). Engineers tend to start with the issue (work-shaped). PMs tend to start with the parent PRD (strategic). Pick your lane.

## Try it yourself

1. Open [Issue #3 Add price range filter](../../issues/03-price-filter.md).
2. Click through to its linked PRD ([Search & filters](../discover/01-search-and-filters.md)).
3. From the PRD, click through to the linked canvas ([Search experience](../../../designs/pages/search-experience/index.page.tsx)).
4. On the canvas, find the *Filters drawer (open)* storyboard.
5. Open the file in `src/design-system/components/FilterChip.tsx` — the same component the storyboard renders.

You just round-tripped through all four surfaces. Every workspace works this way.
