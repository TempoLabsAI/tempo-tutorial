import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { CardsGroupBoard } from './CardsGroupBoard';
import { SearchBarShowcaseBoard } from './SearchBarShowcaseBoard';
import { FilterChipShowcaseBoard } from './FilterChipShowcaseBoard';
import { NavbarShowcaseBoard } from './NavbarShowcaseBoard';
import { RatingStarsShowcaseBoard } from './RatingStarsShowcaseBoard';
import { HeartButtonShowcaseBoard } from './HeartButtonShowcaseBoard';

const page: TempoPage = {
  name: "10 · Components",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 362, intrinsicSizing: "root-element" },
};

export const CardsGroup: TempoStoryboard = {
  render: () => <CardsGroupBoard />,
  name: "04 · Cards",
  layout: { x: 5320, y: 0, width: 1280, height: 2303, intrinsicSizing: "root-element" },
};

export const SearchBarShowcase: TempoStoryboard = {
  render: () => <SearchBarShowcaseBoard />,
  name: "02 · SearchBar",
  layout: { x: 2660, y: 0, width: 1280, height: 2906, intrinsicSizing: "root-element" },
};

export const FilterChipShowcase: TempoStoryboard = {
  render: () => <FilterChipShowcaseBoard />,
  name: "03 · FilterChip",
  layout: { x: 3990, y: 0, width: 1280, height: 1185, intrinsicSizing: "root-element" },
};

export const NavbarShowcase: TempoStoryboard = {
  render: () => <NavbarShowcaseBoard />,
  name: "01 · Navbar",
  layout: { x: 1330, y: 0, width: 1280, height: 1333, intrinsicSizing: "root-element" },
};

export const RatingStarsShowcase: TempoStoryboard = {
  render: () => <RatingStarsShowcaseBoard />,
  name: "05 · RatingStars",
  layout: { x: 6650, y: 0, width: 1280, height: 1391, intrinsicSizing: "root-element" },
};

export const HeartButtonShowcase: TempoStoryboard = {
  render: () => <HeartButtonShowcaseBoard />,
  name: "06 · HeartButton",
  layout: { x: 7980, y: 0, width: 1280, height: 1382, intrinsicSizing: "root-element" },
};
