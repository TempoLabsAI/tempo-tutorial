# Add price range filter to search

**Status:** In Progress
**Type:** Feature
**Linked PRD:** [Search & filters — FR-2, FR-4, FR-5](../prds/discover/01-search-and-filters.md)
**Linked canvas:** [Search experience — Filters drawer (open)](../../designs/pages/search-experience/index.page.tsx)

## What

Add a price range filter to the search filters chip row. Clicking the *Price* chip opens a popover containing a histogram of listing prices at the current results set and a dual-handle range slider.

## Why

Price is the #1 filter guests apply manually (by scrolling past listings they can't afford). Making it a first-class filter reduces scroll time, increases listing click rate, and surfaces relevant results faster.

Covered by FR-2 (chip row) and FR-4 (price histogram + slider) in the [Search & filters PRD](../prds/discover/01-search-and-filters.md).

## Acceptance criteria

- [ ] *Price* chip appears in the filter row between *Type of place* and *Beds*
- [ ] Clicking *Price* opens a popover with a price histogram and range slider
- [ ] Histogram reflects the current result set (recalculates when other filters change)
- [ ] Slider handles are draggable and accept direct input via number fields
- [ ] Applying a price range updates the result list within 250ms (debounced, per FR-5)
- [ ] Active price filter shows count badge on chip: *Price · 1*
- [ ] Filter state is preserved in URL params: `?price_min=50&price_max=200`
- [ ] On mobile, the popover becomes a bottom sheet (per FR-7)
- [ ] Clearing the price filter via *Clear all* resets range to min/max

## Notes

**Histogram implementation:** Use Recharts `BarChart`. Data comes from the `listings` array — bucket by $25 increments, count listings per bucket. Render as a sparkline-style bar behind the slider.

**Component:** `<PriceFilterPopover />` in `src/design-system/components/PriceFilterPopover.tsx`. Shares the `<FilterChip />` wrapper pattern from the existing chips.

**Storyboard to update:** *Filters drawer (open)* on the [Search experience canvas](../../designs/pages/search-experience/index.page.tsx) — the price histogram is shown there.

**Currently blocked:** None.
