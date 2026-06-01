import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { IndexBoard } from './IndexBoard';
import { LegendBoard } from './LegendBoard';

const page: TempoPage = {
  name: "00 · Cover & Index",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1920, height: 1551 , intrinsicSizing: "root-element" },
};

export const Index: TempoStoryboard = {
  render: () => <IndexBoard />,
  name: "01 · Index",
  layout: { x: 1970, y: 0, width: 1280, height: 2276, intrinsicSizing: "root-element" },
};

export const Legend: TempoStoryboard = {
  render: () => <LegendBoard />,
  name: "02 · Legend",
  layout: { x: 3113, y: 3, width: 1280, height: 1217, intrinsicSizing: "root-element" },
};
