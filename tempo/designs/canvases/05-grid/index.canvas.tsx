import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { BasicsBoard } from './BasicsBoard';
import { SpacingBoard } from './SpacingBoard';
import { RadiusBoard } from './RadiusBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "05 · Grid",
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
  layout: { x: 1330, y: 0, width: 1280, height: 1791, intrinsicSizing: "root-element" },
};

export const Spacing: TempoStoryboard = {
  render: () => <SpacingBoard />,
  name: "02 · Spacing",
  layout: { x: 2660, y: 0, width: 1280, height: 1796, intrinsicSizing: "root-element" },
};

export const Radius: TempoStoryboard = {
  render: () => <RadiusBoard />,
  name: "03 · Radius",
  layout: { x: 3990, y: 0, width: 1280, height: 1775, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "04 · In situ",
  layout: { x: 5320, y: 0, width: 1280, height: 1362, intrinsicSizing: "root-element" },
};
