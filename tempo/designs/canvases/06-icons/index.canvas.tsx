import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { IconsBoard } from './IconsBoard';
import { ImageryBoard } from './ImageryBoard';

const page: TempoPage = {
  name: "06 · Icons & Imagery",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 362, intrinsicSizing: "root-element" },
};

export const Icons: TempoStoryboard = {
  render: () => <IconsBoard />,
  name: "01 · Icons",
  layout: { x: 1330, y: 0, width: 1280, height: 2080, intrinsicSizing: "root-element" },
};

export const Imagery: TempoStoryboard = {
  render: () => <ImageryBoard />,
  name: "02 · Imagery",
  layout: { x: 2660, y: 0, width: 1280, height: 1664, intrinsicSizing: "root-element" },
};
