# [Start here] Welcome to your tutorial workspace

> **This is a tutorial PRD.** Read this first to understand what's in this workspace and where to look next.

**Icon:** 👋
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

The magic is that **none of these are isolated**. A canvas references the same `<ListingCard />` component the production app uses. An issue links to its PRD and canvas. A PRD points at the relevant canvas frames. Edits flow between them.

## How this workspace is organized

We're modeling the **guest experience** of a travel booking product, organized into three feature areas:

1. **Discover & Search** — find a place to stay 
2. **Book a stay** — listing detail and booking
3. **Your trips** — manage upcoming and current trips

Each area has 3 child PRDs and a corresponding canvas. The kanban board (`demo-assets/issues/`) has 8 tickets in mixed states (Todo, In Progress, In Review, Done) — exactly what a real product team's board looks like mid-quarter.

## Try it yourself

- Open the Search experience canvas and look at the storyboards. Notice how each one is a real React component rendered in isolation with sample props.
- Find the file that backs `<ListingCard />` (hint: `src/design-system/components/ListingCard.tsx`). Change one line of styling. Watch the change appear in *every* place the card is used — the homepage, the search page, the canvas storyboards.

That's the loop. Welcome.
