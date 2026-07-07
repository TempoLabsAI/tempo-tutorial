import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import AnatomyBoard from './AnatomyBoard';
import SizesBoard from './SizesBoard';
import HavnModalsBoard from './HavnModalsBoard';

const config: TempoCanvasConfig = {
  name: "12 · Modals & Dialogues",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: -63, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => <AnatomyBoard />,
  name: "01 · Anatomy",
  layout: { x: 1423, y: 0, width: 1280, height: 1707, intrinsicSizing: "root-element" },
};

/* ── 02 · Sizes ──────────────────────────────────────────────────── */
export const Sizes: TempoStoryboard = {
  render: () => <SizesBoard />,
  name: "02 · Sizes",
  layout: { x: 2660, y: 0, width: 1280, height: 2272, intrinsicSizing: "root-element" },
};

/* ── 03 · Havn modals ────────────────────────────────────────────── */
export const HavnModals: TempoStoryboard = {
  render: () => <HavnModalsBoard />,
  name: "03 · In-app modals",
  layout: { x: 3990, y: 0, width: 1280, height: 2757, intrinsicSizing: "root-element" },
};
