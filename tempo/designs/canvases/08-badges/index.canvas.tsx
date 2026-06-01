import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { BadgesBoard } from './BadgesBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "08 · Badges & Status",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 362, intrinsicSizing: "root-element" },
};

export const Badges: TempoStoryboard = {
  render: () => <BadgesBoard />,
  name: "01 · Badges",
  layout: { x: 1330, y: 0, width: 1012, height: 3091, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "02 · In situ",
  layout: { x: 2388, y: -4, width: 1155, height: 1370, intrinsicSizing: "root-element" },
};
