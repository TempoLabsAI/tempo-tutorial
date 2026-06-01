import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { BasicsBoard } from './BasicsBoard';
import { ScaleBoard } from './ScaleBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "02 · Typography",
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
  layout: { x: 1330, y: 0, width: 1280, height: 2068, intrinsicSizing: "root-element" },
};

export const Scale: TempoStoryboard = {
  render: () => <ScaleBoard />,
  name: "02 · Type scale",
  layout: { x: 2660, y: 0, width: 1280, height: 2397, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "03 · In situ",
  layout: { x: 3990, y: 0, width: 1280, height: 1565, intrinsicSizing: "root-element" },
};
