# [Start here] How to write a PRD in Tempo

> **This is a tutorial PRD.** It teaches the PRD format used in this workspace by walking through a real example.

**Status:** Tutorial
**Linked canvases:** [Start here canvas](../../../designs/pages/start-here/index.page.tsx)
**Linked issues:** [#1 Welcome to the tutorial](../../issues/01-welcome.md)
**See also:** [Welcome](./01-welcome.md) · [How everything links](./03-how-everything-links.md)

## Why PRDs live in Tempo

PRDs that live next to the code they describe stay alive. PRDs that live in a separate doc tool die quietly six weeks after they're written. Tempo keeps the spec, the design, the ticket, and the code in one workspace so they evolve together.

## The two PRD shapes

This workspace uses two shapes:

### Parent PRDs

A **parent PRD** describes a feature *area* (a theme), not a single feature. It exists to:
- Frame the strategic intent for everything underneath
- Link to its child PRDs
- Capture cross-cutting decisions (information architecture, success metrics)

See [`discover/00-parent-discover-and-search.md`](../discover/00-parent-discover-and-search.md) for an example.

### Child PRDs

A **child PRD** describes a single shippable feature. It includes:
- The problem
- Goals and non-goals
- User stories
- Functional requirements (numbered for traceability)
- UX notes that reference specific canvas frames
- Open questions

See [`discover/01-search-and-filters.md`](../discover/01-search-and-filters.md) for an example.

## The frontmatter (metadata block)

Every PRD opens with a metadata block:

```markdown
**Parent:** [Discover & Search](../discover/00-parent-discover-and-search.md)
**Status:** Draft | In Review | Approved | Shipped
**Linked canvases:** [Search experience](../../../designs/pages/search-experience/index.page.tsx)
**Linked issues:** [#3 Add price range filter](../../issues/03-price-filter.md)
```

The metadata is the linkage. Keep it accurate — it's how the workspace stays connected.

## Conventions used in this workspace

- **Lengths.** Parent PRDs are short (~250 words). Child PRDs are 500–800 words. Anything longer is a sign the feature should be split.
- **Numbered requirements.** Functional requirements are numbered (`FR-1`, `FR-2`) so issues and PRs can reference them precisely.
- **No filler.** Skip sections that don't apply. An empty "Risks" header is worse than no header.
- **Real open questions.** If you don't have any, don't fake one. If you do, put names next to them.
- **Reference canvases by frame name.** Not "the design" — "the *Filters drawer (open)* storyboard in [Search experience canvas](../../../designs/pages/search-experience/index.page.tsx)".

## How this differs from a Notion PRD

| Notion PRD | Tempo PRD |
|---|---|
| Lives in a doc tool | Lives next to code |
| Links to Figma | Links to actual storyboard files |
| Goes stale silently | Diff appears in PRs that change the feature |
| Dies on ship | Updated as the feature evolves |

## Try it yourself

1. Open [`discover/01-search-and-filters.md`](../discover/01-search-and-filters.md) — read it end to end.
2. Click through to its linked canvas and one of its linked issues.
3. Open the canvas and look at the *Filters drawer (open)* storyboard.
4. Notice how the PRD's UX notes reference specific frames by name — and the frames are real, runnable React.

That round-trip is the whole point.
