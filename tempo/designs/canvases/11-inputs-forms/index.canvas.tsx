import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { AnatomyBoard } from './AnatomyBoard';
import { StatesBoard } from './StatesBoard';
import { AffixesBoard } from './AffixesBoard';
import { TypesBoard } from './TypesBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "11 · Inputs & Forms",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 362, intrinsicSizing: "root-element" },
};

export const Anatomy: TempoStoryboard = {
  render: () => <AnatomyBoard />,
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 1061, intrinsicSizing: "root-element" },
};

export const States: TempoStoryboard = {
  render: () => <StatesBoard />,
  name: "02 · States",
  layout: { x: 2660, y: 0, width: 1280, height: 2662, intrinsicSizing: "root-element" },
};

export const Affixes: TempoStoryboard = {
  render: () => <AffixesBoard />,
  name: "03 · Affixes",
  layout: { x: 3990, y: 0, width: 1280, height: 1519, intrinsicSizing: "root-element" },
};

export const Types: TempoStoryboard = {
  render: () => <TypesBoard />,
  name: "04 · Types",
  layout: { x: 5320, y: 0, width: 1280, height: 2621, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "05 · In situ",
  layout: { x: 6650, y: 0, width: 1280, height: 2459, intrinsicSizing: "root-element" },
};
