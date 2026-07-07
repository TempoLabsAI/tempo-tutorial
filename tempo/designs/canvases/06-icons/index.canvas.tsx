import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import IconsBoard from './IconsBoard';
import ImageryBoard from './ImageryBoard';

const config: TempoCanvasConfig = {
  name: "06 · Icons & Imagery",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: -2, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Icons ──────────────────────────────────────────────────── */
export const Icons: TempoStoryboard = {
  render: () => <IconsBoard />,
  name: "01 · Icons",
  layout: { x: 1557, y: 0, width: 1280, height: 2081, intrinsicSizing: "root-element" },
};

/* ── 02 · Imagery ────────────────────────────────────────────────── */
export const Imagery: TempoStoryboard = {
  render: () => <ImageryBoard />,
  name: "02 · Imagery",
  layout: { x: 2957, y: 0, width: 1280, height: 1665, intrinsicSizing: "root-element" },
};
