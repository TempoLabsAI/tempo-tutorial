# Havn — Tempo Tutorial Workspace

A fully built travel booking app (Airbnb-style, guest side) designed to show you what a mature Tempo workspace looks like.

## Where the demo PRDs & issues live (`demo-assets` branch)

> **`main` intentionally has no `demo-assets/` folder.** The seed PRDs and
> issues live on the dedicated permanent **[`demo-assets`](../../tree/demo-assets/demo-assets)**
> branch instead.
>
> During onboarding, Tempo fetches that branch and seeds its
> `demo-assets/{prds,issues}` into the cloud (the Docs and Issues tabs) — so
> the agent working in your cloned workspace sees them as real cloud
> docs/issues, **not** as duplicate markdown files sitting in the repo (which
> previously confused the agent). Nothing needs to be auto-deleted from your
> clone because `main` never carried them.
>
> To browse the raw seed markdown, check out the `demo-assets` branch.

## Start here

After onboarding, open the **[Start here] Welcome** doc in the Docs tab (seeded
from `demo-assets/prds/tutorial/01-welcome.md`), or pin the **[Start here]
Welcome** ticket on the kanban board.

## What's in this workspace

| Surface | Count | Location |
|---|---|---|
| PRDs | 15 | `demo-assets/prds/` (on the `demo-assets` branch) |
| Issues | 8 | `demo-assets/issues/` (on the `demo-assets` branch) |
| Canvases | 14+ | `tempo/designs/canvases/` |
| Pages | 7 | `src/pages/` |
| Design system | 14 components | `src/design-system/` |

## Running the app

```bash
pnpm install
pnpm dev
# → http://localhost:5173
```

## Routes

| Route | Page |
|---|---|
| `/` | Homepage — hero + featured listings |
| `/search` | Search results with filter chips |
| `/listing/:id` | Listing detail + booking widget |
| `/trips` | Your trips (upcoming + past) |
| `/trips/:id` | Trip itinerary + cancellation flow |
| `/messages` | Messaging inbox + thread view |
| `/wishlists` | Saved listings |

## Design system

All components are in `src/design-system/`. The canvases in `designs/pages/` import from the same files — so editing a component in code updates the canvas storyboards immediately.

### Tokens (`src/design-system/`)

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#1a1815` | Primary text, dark backgrounds |
| `--paper` | `#f7f3ee` | Background, light surfaces |
| `--terracotta` | `#c75d3f` | Accent, primary buttons, hearts |
| `--moss` | `#5c6f4a` | Success, positive refund amounts |
| `--stone` | `#b8afa3` | Secondary text, muted UI |

### Fonts

- **Display:** Fraunces (variable serif, italic, warm) — headlines, hero text
- **Body:** Geist (clean modernist sans) — all UI copy
- **Mono:** Geist Mono — confirmation codes, inline code

## PRD structure

```
demo-assets/prds/
├── tutorial/       # 3 tutorial PRDs (start here)
├── discover/       # Parent + 3 children (search, map, wishlists)
├── book/           # Parent + 3 children (listing, booking, reviews)
└── trips/          # Parent + 3 children (itinerary, messaging, cancellation)
```

## Issue states

| # | Title | Status | Linked PRD | Linked Canvas |
|---|---|---|---|---|
| 1 | [Tutorial] Welcome | Pinned | Tutorial PRDs | Start here |
| 2 | [Tutorial] Edit a component | Pinned | How everything links | Design system |
| 3 | Add price range filter | In Progress | Search & filters | Search experience |
| 4 | Booking confirmation modal | In Review | Booking widget | Listing detail |
| 5 | Add map view | Todo | Map view | *(design pending)* |
| 6 | Refresh messaging inbox | In Design | *(spec WIP)* | Messaging |
| 7 | Wishlist heart animation | Done | Wishlists | Wishlists |
| 8 | Bug: itinerary mobile overflow | Todo (Bug) | Trip itinerary + Cancellation | Trip itinerary |

## Canvases

Open any canvas in Tempo to see storyboards rendered live from the source code.

| Canvas | What's in it |
|---|---|
| Start here | Tour of the workspace — sample storyboards from each area |
| Design system | All primitives and components; great for the "edit a component" tutorial |
| Search experience | List view, filter chip states, search bar variants |
| Listing detail | Full listing, booking modal, mobile bottom bar |
| Trip itinerary | Trips list, booking cards, itinerary, cancellation flow |
| Messaging | Inbox (unread/read), thread view, mobile |
| Wishlists | Grid, empty state, heart button states |

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with custom design tokens
- **Radix UI** (Dialog, Popover, Tabs — accessible primitives)
- **Motion** (Framer Motion v11) — animations, spring physics
- **Lucide** — icons
- **React Router v6** — routing
- **Recharts** — price histogram (filter chip)

## Sample data

- 8 listings across 7 countries (`src/data/listings.ts`)
- 4 trips in mixed states (`src/data/trips.ts`)
- 3 conversations with sample messages (`src/data/messages.ts`)
