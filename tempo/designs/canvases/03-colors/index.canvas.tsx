import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { CoverBoard } from './CoverBoard';
import { AnatomyBoard } from './AnatomyBoard';
import { SurfacesBoard } from './SurfacesBoard';
import { TextColoursBoard } from './TextColoursBoard';
import { SystemStatesBoard } from './SystemStatesBoard';
import { IconColoursBoard } from './IconColoursBoard';
import { BordersBoard } from './BordersBoard';
import { InSituBoard } from './InSituBoard';

const page: TempoPage = {
  name: "03 · Colors",
};

export default page;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 540 },
};

export const Anatomy: TempoStoryboard = {
  render: () => <AnatomyBoard />,
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 2409, intrinsicSizing: "root-element" },
};

export const Surfaces: TempoStoryboard = {
  render: () => <SurfacesBoard />,
  name: "03 · Surfaces",
  layout: { x: 3990, y: 0, width: 1280, height: 969, intrinsicSizing: "root-element" },
};

export const TextColours: TempoStoryboard = {
  render: () => <TextColoursBoard />,
  name: "04 · Text colours",
  layout: { x: 5320, y: 0, width: 1280, height: 1346, intrinsicSizing: "root-element" },
};

export const SystemStates: TempoStoryboard = {
  render: () => <SystemStatesBoard />,
  name: "02 · System states",
  layout: { x: 2660, y: 0, width: 1280, height: 890, intrinsicSizing: "root-element" },
};

export const IconColours: TempoStoryboard = {
  render: () => <IconColoursBoard />,
  name: "05 · Icon colours",
  layout: { x: 6650, y: 0, width: 1280, height: 1236, intrinsicSizing: "root-element" },
};

export const Borders: TempoStoryboard = {
  render: () => <BordersBoard />,
  name: "06 · Borders",
  layout: { x: 7980, y: 0, width: 1280, height: 1499, intrinsicSizing: "root-element" },
};

export const InSitu: TempoStoryboard = {
  render: () => <InSituBoard />,
  name: "07 · In situ",
  layout: { x: 9310, y: 0, width: 1280, height: 908, intrinsicSizing: "root-element" },
};
