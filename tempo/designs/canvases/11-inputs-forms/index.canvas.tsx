import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import AnatomyBoard from './AnatomyBoard';
import StatesBoard from './StatesBoard';
import AffixesBoard from './AffixesBoard';
import TypesBoard from './TypesBoard';
import InSituBoard from './InSituBoard';

const config: TempoCanvasConfig = {
  name: "11 · Inputs & Forms",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: -157, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => <AnatomyBoard />,
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 1062, intrinsicSizing: "root-element" },
};

/* ── 02 · States ─────────────────────────────────────────────────── */
export const States: TempoStoryboard = {
  render: () => <StatesBoard />,
  name: "02 · States",
  layout: { x: 2660, y: 0, width: 1280, height: 2663, intrinsicSizing: "root-element" },
};

/* ── 03 · Affixes ────────────────────────────────────────────────── */
export const Affixes: TempoStoryboard = {
  render: () => <AffixesBoard />,
  name: "03 · Affixes",
  layout: { x: 3990, y: 0, width: 1280, height: 1520, intrinsicSizing: "root-element" },
};

/* ── 04 · Types ──────────────────────────────────────────────────── */
export const Types: TempoStoryboard = {
  render: () => <TypesBoard />,
  name: "04 · Types",
  layout: { x: 5320, y: 0, width: 1280, height: 2622, intrinsicSizing: "root-element" },
};

/* ── 05 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "05 · In situ",
  layout: { x: 6650, y: 0, width: 1280, height: 2459, intrinsicSizing: "root-element" },
};
