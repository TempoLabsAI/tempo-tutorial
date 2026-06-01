import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { BasicsBoard } from './BasicsBoard';
import { LevelsBoard } from './LevelsBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "04 · Elevation",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 540 },
};

export const Basics: TempoStoryboard = {
  render: () => <BasicsBoard />,
  name: "01 · Basics",
  layout: { x: 1330, y: 0, width: 1280, height: 1443, intrinsicSizing: "root-element" },
};

export const Levels: TempoStoryboard = {
  render: () => <LevelsBoard />,
  name: "02 · Levels",
  layout: { x: 2660, y: 0, width: 1280, height: 1643, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "03 · In situ",
  layout: { x: 3990, y: 0, width: 1280, height: 1608, intrinsicSizing: "root-element" },
};
