# Search & filters

**Parent:** [Discover & Search](./00-parent-discover-and-search.md)
**Status:** In Review
**Linked canvases:** [Search experience](../../../designs/pages/search-experience/index.page.tsx)
**Linked issues:** [#3 Add price range filter](../../issues/03-price-filter.md)

## Problem

Today's search is a single text input and a results grid. Guests filter by price, dates, and amenities in their head — they scroll past 200 listings to find five they actually like. The browse experience punishes patience.

We need filters that are visible, fast to apply, and easy to clear. Mobile-first because 70% of search sessions start on phone.

## Goals

- Reduce time-to-first-meaningful-click (a click into a listing the guest will eventually book) by 30%.
- Make the most-used filters (price, dates, beds, property type) reachable in one tap.
- Preserve filters across navigation (search → listing → back).

## Non-goals

- Saved searches with notifications (separate feature, not in scope here).
- Personalized default filters based on history (not in scope here).
- Server-side ML ranking changes (search ranking is owned by the platform team).

## User stories

- As a guest planning a trip, I want to set a price range and see the results update immediately, so I can browse within my budget without scrolling past listings I can't afford.
- As a guest with a specific party size, I want to filter by minimum beds without opening a multi-step modal, so I can quickly narrow to listings that fit my group.
- As a guest who refined a search and clicked into a listing, I want to come back to my search with my filters intact, so I don't have to re-enter them.

## Functional requirements

- **FR-1.** Search bar accepts destination, dates, and guest count. All three are optional. Empty search returns featured listings.
- **FR-2.** Filter chips row appears below the search bar: *Price*, *Type of place*, *Beds*, *Amenities*, *More filters*. Each chip opens a popover with controls.
- **FR-3.** Active filters show a count badge on the chip (e.g., *Price · 2*) and a *Clear all* link appears at the right of the row when any filter is active.
- **FR-4.** Price filter is a histogram + range slider. Display median nightly price, and let guests drag handles or type values into the bounds.
- **FR-5.** Filter changes update the result list with a 250ms debounce. No "Apply" button.
- **FR-6.** Filters persist in URL query params so back-button works and filtered URLs are shareable.
- **FR-7.** On mobile (< 768px), the filter chip row is horizontally scrollable. The price popover becomes a bottom sheet.
- **FR-8.** Empty-result state offers actionable next steps: *Loosen price*, *Remove filters*, *Try nearby dates*.

## UX notes

See [Search experience canvas](../../../designs/pages/search-experience/index.page.tsx) for storyboards:

- **Search bar (default)** — empty state on the homepage hero.
- **Search bar (with query)** — typing triggers a destination autocomplete dropdown.
- **Filter chips (none active)** — neutral row with no badges.
- **Filter chips (3 active)** — chips show count badges, *Clear all* visible.
- **Filters drawer (open)** — the price filter histogram + slider expanded.
- **Empty results** — illustration + suggested actions.

The filter chip uses `<FilterChip />` from the design system. Histogram uses recharts under the hood. The bottom sheet on mobile uses Radix Dialog with a custom mobile variant.

## Open questions

- Should the *Type of place* filter use icons-only chips (Entire / Private / Shared room) or text? — *Shiranka, design call this week.*
- Default price range — derive from median of currently visible results, or fixed 0–500? — *Open.*
- Do we sort filters by usage data or keep alphabetical? — *Need analytics; tracking lives in PostHog event `filter_applied`.*
