# Havn — Tempo Tutorial Demo

A fully built, Airbnb-style travel-booking app (guest side). This is the demo
workspace Tempo provisions for every new account so you can see what a mature
Tempo project looks like — real pages, a real design system, and design-system
canvases that render live from the same source code.

## Running the app

Dependencies install from the single root `package.json` (npm):

```bash
npm install
npm run dev
# → http://localhost:5173
```

Or use the convenience script: `./run.sh` (installs if needed, type-checks, then
starts the dev server).

> Inside Tempo you don't run anything by hand — the Tempo host dev server in
> `tempo/` is started for you (see `tempo/tempo.config.json`).

## Project structure

```
.
├── index.html              # Main app entry (Vite)
├── src/                     # The Havn app
│   ├── pages/               # 7 route pages
│   ├── design-system/       # primitives, components, layout
│   ├── data/                # sample listings, trips, messages
│   ├── styles/globals.css   # design tokens (source of truth)
│   └── main.tsx
├── tempo/                   # Tempo sidecar — the canvas/host workspace
│   ├── designs/canvases/    # 13 design-system tour canvases
│   ├── vite.config.ts       # Tempo host dev server config
│   └── tempo.config.json    # install/start scripts Tempo runs
├── tailwind.config.ts
└── package.json             # single manifest: app deps + tempo devDeps
```

Both the app and the Tempo host install from this one root `package.json` /
`node_modules` — there is no separate manifest inside `tempo/`.

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

Everything lives in `src/design-system/`:

- **primitives/** — `Avatar`, `Badge`, `Button`, `Input`
- **components/** — `BookingCard`, `FilterChip`, `HeartButton`, `ListingCard`, `RatingStars`, `SearchBar`
- **layout/** — `Container`, `Navbar`

Design tokens are defined as CSS custom properties in
`src/styles/globals.css` (the source of truth) and surfaced as Tailwind
utilities in `tailwind.config.ts` — surfaces (`--paper*`), text (`--ink*`), and
the brand accent (`--terracotta`, `#ff385c`).

**Fonts:** Geist (UI + display) and Geist Mono (code), loaded from Google Fonts
in `index.html`.

## Canvases

The 13 canvases in `tempo/designs/canvases/` are a guided tour of the design
system — open them in Tempo to see storyboards rendered live from the source
code. Editing a component updates its storyboards immediately.

| # | Canvas |
|---|---|
| 00 | Cover & Index |
| 01 | Template |
| 02 | Typography |
| 03 | Colors |
| 04 | Elevation |
| 05 | Grid |
| 06 | Icons & Imagery |
| 07 | Avatars & Identity |
| 08 | Badges & Status |
| 09 | Buttons |
| 10 | Components |
| 11 | Inputs & Forms |
| 12 | Modals & Dialogues |

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with custom design tokens
- **Radix UI** (Dialog, Popover, Tabs — accessible primitives)
- **Framer Motion v11** — animations, spring physics
- **Lucide** — icons
- **React Router v6** — routing
- **Recharts** — price histogram (filter chip)

Sample listings, trips, and conversations live in `src/data/`.
