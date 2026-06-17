# [Start here] Welcome to the tutorial

**Status:** Pinned · Tutorial
**Type:** Tutorial
**Linked PRDs:** [Welcome](../prds/tutorial/01-welcome.md) · [How to write PRDs](../prds/tutorial/02-how-to-write-prds.md) · [How everything links](../prds/tutorial/03-how-everything-links.md)
**Linked canvas:** [Start here](../../designs/pages/start-here/index.page.tsx)

## What this is

This is your entry point. It's pinned to the top of the board so it's the first thing you see.

This workspace is a tutorial — a fully built Airbnb-style guest app with realistic PRDs, canvases, issues, and code, designed to show you what a mature Tempo workspace looks like and how the surfaces work together.

## Read these first

1. **[Welcome to your tutorial workspace](../prds/tutorial/01-welcome.md)** — the lay of the land, what's in here, where things live.
2. **[How to write a PRD in Tempo](../prds/tutorial/02-how-to-write-prds.md)** — the format and conventions used across the 15 PRDs in this workspace.
3. **[How issues, PRDs, and canvases link together](../prds/tutorial/03-how-everything-links.md)** — the connective tissue; how to navigate the graph.

## Then explore

Once you've oriented, explore the **[Start here canvas](../../designs/pages/start-here/index.page.tsx)** — it's an annotated visual map of the workspace with sample storyboards from each feature area.

From there, pick any thread:
- **Top-down:** Parent PRD → child PRD → canvas → issue
- **Bottom-up:** Pick any issue from this board → follow its links
- **Visual:** Open any canvas, pick any storyboard, find the component behind it

## Notes

- Issues are sorted by status: *In Progress* → *Todo* → *In Review* → *Done*. Tutorial tickets (#1, #2) are pinned to the top.
- The code in `src/` is a real, runnable Vite + React app. `pnpm dev` opens it on `localhost:5173`.
- The canvases in `designs/pages/<slug>/index.page.tsx` are Tempo storyboard files. Open them in Tempo to see live-rendered UI.
