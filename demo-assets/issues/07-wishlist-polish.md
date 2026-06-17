# Wishlist heart animation polish

**Status:** Done
**Type:** Polish
**Linked PRD:** [Wishlists & favorites — FR-7](../prds/discover/03-wishlists.md)
**Linked canvas:** [Wishlists — Heart button storyboards](../../designs/pages/wishlists/index.page.tsx)

## What

Polish the heart-button save animation on listing cards. The initial implementation uses a simple opacity + scale transition. This pass replaced it with a spring-physics bounce + a particle burst on save (FR-7 in the Wishlists PRD).

## Why

The heart button is one of the most frequently triggered micro-interactions in the app. A satisfying animation at this touchpoint builds the sense that the product is well-crafted — a feeling that compounds across every session. Low effort, high impression-per-pixel.

## What was done

- Replaced CSS transition on `<HeartButton />` with a Motion `animate()` spring: `stiffness: 600, damping: 12`, scale `1 → 1.4 → 1` on save.
- Added a particle burst (6 small terracotta dots radiating outward on save, fading out at 300ms).
- Fill color transition: outline gray → solid terracotta, 150ms.
- Unsave animation: reverse fill (no particle burst — removing a save should feel quiet).
- Added `<HeartButton />` storyboards to [Wishlists canvas](../../designs/pages/wishlists/index.page.tsx): default, saving (mid-animation), saved, unsaving.

## Acceptance criteria *(all completed)*

- [x] Heart fills with spring animation (no abrupt snap)
- [x] Particle burst on save, not on unsave
- [x] Animation duration: 300ms total
- [x] Animation respects `prefers-reduced-motion` (no animation when enabled; instant fill only)
- [x] Works on mobile (touch event fires on tap, no hover delay)
- [x] Canvas storyboards updated with all 4 states

## Notes

Animation lives in `src/design-system/components/HeartButton.tsx`. The `prefersReducedMotion` check uses the `useReducedMotion()` hook from Motion.

Shipped in the main branch. No follow-up tickets.
