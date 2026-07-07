import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import CardsGroupBoard from './CardsGroupBoard';
import SearchBarShowcaseBoard from './SearchBarShowcaseBoard';
import FilterChipShowcaseBoard from './FilterChipShowcaseBoard';
import NavbarShowcaseBoard from './NavbarShowcaseBoard';
import RatingStarsShowcaseBoard from './RatingStarsShowcaseBoard';
import HeartButtonShowcaseBoard from './HeartButtonShowcaseBoard';

const config: TempoCanvasConfig = {
  name: "10 · Components",
};

export default config;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: -218, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Cards ──────────────────────────────────────────────────── */
export const CardsGroup: TempoStoryboard = {
  render: () => <CardsGroupBoard />,
  name: "04 · Cards",
  layout: { x: 5320, y: 0, width: 1280, height: 2303, intrinsicSizing: "root-element" },
};

/* ── 02 · SearchBar ──────────────────────────────────────────────── */
export const SearchBarShowcase: TempoStoryboard = {
  render: () => <SearchBarShowcaseBoard />,
  name: "02 · SearchBar",
  layout: { x: 2660, y: 0, width: 1280, height: 2908, intrinsicSizing: "root-element" },
};

/* ── 03 · FilterChip ─────────────────────────────────────────────── */
export const FilterChipShowcase: TempoStoryboard = {
  render: () => <FilterChipShowcaseBoard />,
  name: "03 · FilterChip",
  layout: { x: 3990, y: 0, width: 1280, height: 1187, intrinsicSizing: "root-element" },
};

/* ── 04 · Navbar ─────────────────────────────────────────────────── */
export const NavbarShowcase: TempoStoryboard = {
  render: () => <NavbarShowcaseBoard />,
  name: "01 · Navbar",
  layout: { x: 1330, y: 0, width: 1280, height: 1335, intrinsicSizing: "root-element" },
};

/* ── 05 · RatingStars ────────────────────────────────────────────── */
export const RatingStarsShowcase: TempoStoryboard = {
  render: () => <RatingStarsShowcaseBoard />,
  name: "05 · RatingStars",
  layout: { x: 6650, y: 0, width: 1280, height: 1393, intrinsicSizing: "root-element" },
};

/* ── 06 · HeartButton ────────────────────────────────────────────── */
export const HeartButtonShowcase: TempoStoryboard = {
  render: () => <HeartButtonShowcaseBoard />,
  name: "06 · HeartButton",
  layout: { x: 7980, y: 0, width: 1280, height: 1384, intrinsicSizing: "root-element" },
};
