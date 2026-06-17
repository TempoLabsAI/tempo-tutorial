# [Start here] Welcome to your tutorial workspace

> **This is a tutorial PRD.** Read this first to understand what's in this workspace and where to look next.

**Status:** Tutorial
**Linked canvases:** [Start here canvas](../../../designs/pages/start-here/index.page.tsx) · [Design system](../../../designs/pages/design-system/index.page.tsx)
**Linked issues:** [#1 Welcome to the tutorial](../../issues/01-welcome.md) · [#2 Edit a component on the canvas](../../issues/02-edit-a-component.md)

## What you're looking at

You're inside a **Tempo workspace**: a single git branch that holds production-quality React code, a kanban board of issues, a set of PRDs, and a visual canvas of your UI — all wired together.

This particular workspace is a **tutorial**. It's an Airbnb-style sample app (guest side only) seeded with realistic content so you can poke at every surface Tempo gives you.

## What you'll learn

- How **PRDs**, **issues**, and **canvases** reference each other
- How edits on the canvas become real code changes
- How the design system in `src/design-system/` powers both the live app and every canvas
- The lifecycle of a feature: spec → design → ticket → code

## The four surfaces

| Surface | What it's for | Where it lives |
|---|---|---|
| **PRDs** | The "why" and "what" — feature specs | `demo-assets/prds/` |
| **Issues** | The "now" — work in flight, bugs, polish | `demo-assets/issues/` |
| **Canvases** | The "how it looks" — visual UI exploration | `designs/pages/<slug>/index.page.tsx` |
| **Code** | The thing users actually use | `src/` |

The magic is that **none of these are isolated**. A canvas references the same `<ListingCard />` component the production app uses. An issue links to its PRD and canvas. A PRD points at the relevant canvas frames. Edits flow between them.

## How this workspace is organized

We're modeling the **guest experience** of a travel booking product, organized into three feature areas:

1. **Discover & Search** — find a place to stay → see [parent PRD](../discover/00-parent-discover-and-search.md)
2. **Book a stay** — listing detail and booking → see [parent PRD](../book/00-parent-book-a-stay.md)
3. **Your trips** — manage upcoming and current trips → see [parent PRD](../trips/00-parent-your-trips.md)

Each area has 3 child PRDs and a corresponding canvas. The kanban board (`demo-assets/issues/`) has 8 tickets in mixed states (Todo, In Progress, In Review, Done) — exactly what a real product team's board looks like mid-quarter.

## Where to go next

1. **Read [How to write a PRD in Tempo](./02-how-to-write-prds.md)** — the format conventions used here
2. **Read [How issues, PRDs, and canvases link together](./03-how-everything-links.md)** — the connective tissue
3. **Open [issue #2: Edit a component on the canvas](../../issues/02-edit-a-component.md)** — your first hands-on task
4. **Open the [Start here canvas](../../../designs/pages/start-here/index.page.tsx)** — see real storyboards alongside this guide

## Try it yourself

- Open the [Search experience canvas](../../../designs/pages/search-experience/index.page.tsx) and look at the storyboards. Notice how each one is a real React component rendered in isolation with sample props.
- Find the file that backs `<ListingCard />` (hint: `src/design-system/components/ListingCard.tsx`). Change one line of styling. Watch the change appear in *every* place the card is used — the homepage, the search page, the canvas storyboards.

That's the loop. Welcome.
