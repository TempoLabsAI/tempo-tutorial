import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import BasicsBoard from './BasicsBoard';
import SpacingBoard from './SpacingBoard';
import RadiusBoard from './RadiusBoard';
import InSituBoard from './InSituBoard';

const config: TempoCanvasConfig = {
  name: "05 · Grid",
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
  layout: { x: 1330, y: 0, width: 1280, height: 1792, intrinsicSizing: "root-element" },
};

/* ── 02 · Spacing ────────────────────────────────────────────────── */
export const Spacing: TempoStoryboard = {
  render: () => <SpacingBoard />,
  name: "02 · Spacing",
  layout: { x: 2660, y: 0, width: 1280, height: 1796, intrinsicSizing: "root-element" },
};

/* ── 03 · Radius ─────────────────────────────────────────────────── */
export const Radius: TempoStoryboard = {
  render: () => <RadiusBoard />,
  name: "03 · Radius",
  layout: { x: 3990, y: 0, width: 1280, height: 1776, intrinsicSizing: "root-element" },
};

/* ── 04 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "04 · In situ",
  layout: { x: 5320, y: 0, width: 1280, height: 1363, intrinsicSizing: "root-element" },
};
