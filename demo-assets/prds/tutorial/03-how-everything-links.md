# [Start here] How issues, PRDs, and canvases link together

> **This is a tutorial PRD.** It explains the connective tissue of a Tempo workspace and shows the link graph using real examples from this tutorial.

**Icon:** 🔗
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

### 2. Spec'd but not yet designed

A real workflow: PM writes the spec, designer hasn't started yet. The ticket exists to track that gap.

### 3. Designed but spec is WIP

A real workflow: designer is exploring directions, PM hasn't formalized the spec. The canvas exists, the PRD is a stub.

### 4. Spec parked, no active work

A spec that's been written but no ticket has been opened to do the work. Useful — keeps intent captured even when prioritization hasn't gotten there yet.

## How to navigate the graph

- **Top-down:** Open a parent PRD → click into a child PRD → click into the linked canvas or issue.
- **Bottom-up:** Open the kanban board → click an issue → follow links to its PRD and canvas.
- **Visual:** Open a canvas → use the storyboards as an index into PRDs and issues.

There's no "right" entry point. New users tend to start with the canvas (visual). Engineers tend to start with the issue (work-shaped). PMs tend to start with the parent PRD (strategic). Pick your lane.

You just round-tripped through all four surfaces. Every workspace works this way.
