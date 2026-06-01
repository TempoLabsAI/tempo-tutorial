import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { SizesBoard } from './SizesBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "07 · Avatars & Identity",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 362, intrinsicSizing: "root-element" },
};

export const Sizes: TempoStoryboard = {
  render: () => <SizesBoard />,
  name: "01 · Sizes",
  layout: { x: 1330, y: 0, width: 1280, height: 2395, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "02 · In situ",
  layout: { x: 2660, y: 0, width: 992, height: 975, intrinsicSizing: "root-element" },
};
