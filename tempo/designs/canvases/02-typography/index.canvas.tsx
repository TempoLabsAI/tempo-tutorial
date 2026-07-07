import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import BasicsBoard from './BasicsBoard';
import ScaleBoard from './ScaleBoard';
import InSituBoard from './InSituBoard';

const config: TempoCanvasConfig = {
  name: "02 · Typography",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 540 },
};

/* ── 01 · Basics ─────────────────────────────────────────────────── */
export const Basics: TempoStoryboard = {
  render: () => <BasicsBoard />,
  name: "01 · Basics",
  layout: { x: 1330, y: 0, width: 1280, height: 2069, intrinsicSizing: "root-element" },
};

/* ── 02 · Type scale ─────────────────────────────────────────────── */
export const Scale: TempoStoryboard = {
  render: () => <ScaleBoard />,
  name: "02 · Type scale",
  layout: { x: 2660, y: 0, width: 1280, height: 2397, intrinsicSizing: "root-element" },
};

/* ── 03 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "03 · In situ",
  layout: { x: 3990, y: 0, width: 1280, height: 1565, intrinsicSizing: "root-element" },
};
