# Wishlists & favorites

**Parent:** [Discover & Search](./00-parent-discover-and-search.md)
**Status:** Shipped
**Linked canvases:** [Wishlists](../../../designs/pages/wishlists/index.page.tsx)
**Linked issues:** [#7 Wishlist heart animation polish](../../issues/07-wishlist-polish.md)

> **State note:** This feature has shipped. The linked issue is a polish-pass on the heart-button animation — the kind of issue that exists when a feature is live but a designer wants the interaction tightened.

## Problem

Most travel decisions take days, not minutes. A guest browsing Tuesday won't book until Saturday — and in between they need a place to put the listings they're considering. Without a save mechanism, that "consideration set" lives in browser tabs and screenshots. Tabs get closed; screenshots get lost.

Wishlists let guests save listings into named collections (*Italy June*, *Anniversary trip*) so they can compare and decide over time.

## Goals

- Make saving a listing a single tap from any surface (search card, listing detail page, map preview).
- Let guests create multiple named wishlists.
- Surface wishlists from the global navigation so saved listings are easy to return to.

## Non-goals

- Sharing or collaborative wishlists with other users — defer (separate PRD).
- Notifications when a saved listing's price drops — defer.
- Auto-categorization of saves into themed lists — defer.

## User stories

- As a guest browsing search results, I want to tap a heart icon on a listing card to save it, so I can come back to it later without opening it now.
- As a guest planning two trips at once, I want to save listings into different named lists, so my Italy options don't mix with my Tokyo options.
- As a guest returning to the app, I want my wishlists in an obvious place in the navigation, so I can pick up where I left off.

## Functional requirements

- **FR-1.** Every listing card and listing detail page shows a heart button. Default state: outline. Saved state: filled with terracotta.
- **FR-2.** Tapping the heart on a listing that's not in any wishlist opens a popover: "Save to…" with the user's existing wishlists + a *Create new list* option.
- **FR-3.** Tapping the heart on a listing that's already saved removes it from all wishlists with a confirmation toast (*Removed from Italy June*).
- **FR-4.** Wishlists are accessible from the global navigation (`/wishlists`). The page shows a grid of list covers (4-photo collage from the listings inside).
- **FR-5.** Each wishlist has its own page (`/wishlists/[slug]`) showing the saved listings as cards with a notes field per listing.
- **FR-6.** A guest can rename or delete a wishlist. Deleting prompts for confirmation.
- **FR-7.** Heart animation: on save, the heart fills with a 250ms spring + a subtle particle burst.

## UX notes

See [Wishlists canvas](../../../designs/pages/wishlists/index.page.tsx) for storyboards:

- **Heart button — outline (default)**
- **Heart button — filled (saved)**
- **Heart button — animating (mid-save)**
- **Save popover — pick a list**
- **Save popover — create new list**
- **Wishlists grid — empty state**
- **Wishlists grid — populated**
- **Wishlist detail — list of saves with notes**

The `<HeartButton />` component lives in `src/design-system/components/HeartButton.tsx`. The animation uses Motion's `animate` with a custom spring config.

## Open questions

None — feature has shipped. Polish work is tracked in [issue #7](../../issues/07-wishlist-polish.md).
