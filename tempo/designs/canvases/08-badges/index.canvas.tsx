import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import BadgesBoard from './BadgesBoard';
import InSituBoard from './InSituBoard';

const config: TempoCanvasConfig = {
  name: "08 · Badges & Status",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1353, height: 200, intrinsicSizing: "root-element" },
};

/* ── 01 · Badges — page with all variant sections stacked ────────── */
export const Badges: TempoStoryboard = {
  render: () => <BadgesBoard />,
  name: "01 · Badges",
  layout: { x: 1773, y: 0, width: 1012, height: 3091, intrinsicSizing: "root-element" },
};

/* ── 02 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "02 · In situ",
  layout: { x: 3828, y: 0, width: 1155, height: 1372, intrinsicSizing: "root-element" },
};
