import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import SizesBoard from './SizesBoard';
import InSituBoard from './InSituBoard';

const config: TempoCanvasConfig = {
  name: "07 · Avatars & Identity",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1692, height: 200, intrinsicSizing: "root-element" },
};

/* ── 01 · Avatar — page with all sizes stacked ──────────────────── */
export const Sizes: TempoStoryboard = {
  render: () => <SizesBoard />,
  name: "01 · Sizes",
  layout: { x: 2028, y: 0, width: 1162, height: 2765, intrinsicSizing: "root-element" },
};

/* ── 02 · In situ — compositions ────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "02 · In situ",
  layout: { x: 3516, y: 0, width: 1159, height: 1453, intrinsicSizing: "root-element" },
};
