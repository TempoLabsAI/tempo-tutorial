import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { AnatomyBoard } from './AnatomyBoard';
import { VariantsBoard } from './VariantsBoard';
import { SizesBoard } from './SizesBoard';
import { IconsBoard } from './IconsBoard';
import { ContentBoard } from './ContentBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "09 · Buttons",
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
  layout: { x: 1330, y: 0, width: 1280, height: 1155, intrinsicSizing: "root-element" },
};

export const Variants: TempoStoryboard = {
  render: () => <VariantsBoard />,
  name: "02 · Variants",
  layout: { x: 2660, y: 0, width: 1280, height: 3208, intrinsicSizing: "root-element" },
};

export const Sizes: TempoStoryboard = {
  render: () => <SizesBoard />,
  name: "03 · Sizes",
  layout: { x: 3990, y: 0, width: 1280, height: 1938, intrinsicSizing: "root-element" },
};

export const Icons: TempoStoryboard = {
  render: () => <IconsBoard />,
  name: "04 · Icons",
  layout: { x: 5320, y: 0, width: 1280, height: 1521, intrinsicSizing: "root-element" },
};

export const Content: TempoStoryboard = {
  render: () => <ContentBoard />,
  name: "05 · Content",
  layout: { x: 6650, y: 0, width: 1280, height: 1631, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "06 · In situ",
  layout: { x: 7980, y: 0, width: 1020, height: 1914, intrinsicSizing: "root-element" },
};
