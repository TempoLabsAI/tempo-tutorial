# [Tutorial] Edit a component on the canvas

**Status:** Pinned · Tutorial
**Type:** Tutorial
**Linked PRDs:** [How everything links](../prds/tutorial/03-how-everything-links.md)
**Linked canvas:** [Design system](../../designs/pages/design-system/index.page.tsx)

## What you'll do

You'll make a real code change by editing a component on the canvas, and watch that change propagate everywhere the component is used. This is the core Tempo loop.

**Time to complete:** ~5 minutes.

## Step 1 — Open the Design system canvas

Open [`designs/pages/design-system/index.page.tsx`](../../designs/pages/design-system/index.page.tsx) in Tempo. You'll see storyboards for all the primitives: buttons, cards, badges, inputs, etc.

## Step 2 — Find the ListingCard storyboard

Scroll to the **ListingCard — default** storyboard. This is the card used on the search results page, the wishlists page, and the homepage featured listings grid.

## Step 3 — Change something

Try changing the card's border radius. Click on the card on the canvas. In the properties panel, find **Border radius** and change it from `12px` to `4px`.

Or open `src/design-system/components/ListingCard.tsx` directly and change:
```tsx
className="rounded-2xl" → "rounded-sm"
```

## Step 4 — Watch it propagate

Save. The change will appear in:
- The **Design system canvas** (you're already there)
- The **Search experience canvas** (open it — the result cards updated)
- The **Wishlists canvas** (same component, same change)
- The **live app** at `localhost:5173/search` (if you're running `pnpm dev`)

That's the loop: **one component, one change, all surfaces update**.

## Step 5 — Undo and explore

Revert the change (`Cmd+Z` or `git checkout src/design-system/components/ListingCard.tsx`). Then explore further:

- Change the `--terracotta` token in `src/styles/globals.css`
- Watch every button (and other terracotta accent) update across every canvas at once
- Note that the **search results page** and **listing detail page** both use `<Button />` — your token change hit production surfaces

## Acceptance criteria (for your own reference)

- [ ] Made a change to a design system component
- [ ] Observed that change in at least 2 different canvases
- [ ] Understood why: because canvases import from `src/design-system/`, not from a separate storybook

## Notes

This isn't a toy. The `src/design-system/` directory is the same one that powers the full app pages in `src/pages/`. Changes flow naturally from canvas to production and back. When you edit a component in production code, the canvas storyboard updates too.
