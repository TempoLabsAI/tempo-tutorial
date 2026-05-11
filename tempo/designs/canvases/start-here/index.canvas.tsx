import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import { TitleSpread } from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "Templates",
};

export default page;

/**
 * Templates — the only route storyboards in the workspace.
 * Three hero pages that show whole-page composition, live and routed.
 * Every other canvas focuses on individual components or scenes.
 */

/* Cover ──────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Workspace · 01"
      title={
        <>
          Templates
          <br />
          for the journey.
        </>
      }
      caption="Live route storyboards rendered through the actual app router. Use these for end-to-end review or QA. Component storyboards live in the other canvases."
      meta={[
        { label: "Routes", value: "3" },
        { label: "Surface", value: "Web" },
        { label: "Status", value: "Live" },
        { label: "Owner", value: "Kevin · CEO" },
      ]}
    />
  ),
  name: "Cover",
  layout: { x: 0, y: 0, width: 1240, height: 720 },
};

export const Homepage: TempoRouteStoryboard = {
  route: "/",
  name: "Homepage — hero, categories, featured grid",
  layout: { x: 1280, y: 0, width: 1440, height: 1600 },
};

export const ListingDetail: TempoRouteStoryboard = {
  route: "/listing/lst-001",
  name: "Listing detail — full page",
  layout: { x: 0, y: 1650, width: 1440, height: 2200 },
};

export const SearchResults: TempoRouteStoryboard = {
  route: "/search",
  name: "Search results — directory grid",
  layout: { x: 1490, y: 1650, width: 1440, height: 1100 },
};
