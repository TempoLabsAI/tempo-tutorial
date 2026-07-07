import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import AnatomyBoard from './AnatomyBoard';
import VariantsBoard from './VariantsBoard';
import SizesBoard from './SizesBoard';
import IconsBoard from './IconsBoard';
import ContentBoard from './ContentBoard';
import InSituBoard from './InSituBoard';

const config: TempoCanvasConfig = {
  name: "09 · Buttons",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: -53, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => <AnatomyBoard />,
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 1156, intrinsicSizing: "root-element" },
};

/* ── 02 · Variants ───────────────────────────────────────────────── */
export const Variants: TempoStoryboard = {
  render: () => <VariantsBoard />,
  name: "02 · Variants",
  layout: { x: 2660, y: 0, width: 1280, height: 3209, intrinsicSizing: "root-element" },
};

/* ── 03 · Sizes ──────────────────────────────────────────────────── */
export const Sizes: TempoStoryboard = {
  render: () => <SizesBoard />,
  name: "03 · Sizes",
  layout: { x: 3990, y: 0, width: 1280, height: 1939, intrinsicSizing: "root-element" },
};

/* ── 04 · Icons ──────────────────────────────────────────────────── */
export const Icons: TempoStoryboard = {
  render: () => <IconsBoard />,
  name: "04 · Icons",
  layout: { x: 5320, y: 0, width: 1280, height: 1522, intrinsicSizing: "root-element" },
};

/* ── 05 · Content ────────────────────────────────────────────────── */
export const Content: TempoStoryboard = {
  render: () => <ContentBoard />,
  name: "05 · Content",
  layout: { x: 6650, y: 0, width: 1280, height: 1632, intrinsicSizing: "root-element" },
};

/* ── 06 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "06 · In situ",
  layout: { x: 7980, y: 0, width: 1020, height: 1915, intrinsicSizing: "root-element" },
};
