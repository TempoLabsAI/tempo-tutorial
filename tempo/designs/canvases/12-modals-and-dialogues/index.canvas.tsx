import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { AnatomyBoard } from './AnatomyBoard';
import { SizesBoard } from './SizesBoard';
import { HavnModalsBoard } from './HavnModalsBoard';

const page: TempoPage = {
  name: "12 · Modals & Dialogues",
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
  layout: { x: 1330, y: 0, width: 1280, height: 1705, intrinsicSizing: "root-element" },
};

export const Sizes: TempoStoryboard = {
  render: () => <SizesBoard />,
  name: "02 · Sizes",
  layout: { x: 2660, y: 0, width: 1280, height: 2270, intrinsicSizing: "root-element" },
};

export const HavnModals: TempoStoryboard = {
  render: () => <HavnModalsBoard />,
  name: "03 · In-app modals",
  layout: { x: 3990, y: 0, width: 1280, height: 2755, intrinsicSizing: "root-element" },
};
