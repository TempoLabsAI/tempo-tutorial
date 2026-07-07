import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import PlanBoard from './PlanBoard';
import DesignBoard from './DesignBoard';
import BuildBoard from './BuildBoard';
import TrackBoard from './TrackBoard';
import ModelsBoard from './ModelsBoard';
import ExploreTabsBoard from './ExploreTabsBoard';
import Storyboard3Board from './Storyboard3Board';

const config: TempoCanvasConfig = {
  name: "Welcome to Tempo",
};

export default config;

export const Plan: TempoStoryboard = {
  render: () => <PlanBoard />,
  name: "1 · Generate",
  layout: { x: 0, y: 0, width: 660, height: 1395 },
};

export const Design: TempoStoryboard = {
  render: () => <DesignBoard />,
  name: "2 · Docs",
  layout: { x: 690, y: 0, width: 660, height: 1252 },
};

export const Build: TempoStoryboard = {
  render: () => <BuildBoard />,
  name: "3 · Source control",
  layout: { x: 1383, y: 0, width: 660, height: 1221 },
};

export const Track: TempoStoryboard = {
  render: () => <TrackBoard />,
  name: "4 · People + agents",
  layout: { x: 2079, y: 0, width: 660, height: 913 },
};

export const Models: TempoStoryboard = {
  render: () => <ModelsBoard />,
  name: "6 · Models",
  layout: { x: 3470, y: 0, width: 660, height: 614 },
};

export const ExploreTabs: TempoStoryboard = {
  render: () => <ExploreTabsBoard />,
  name: "0 · Find your way around",
  layout: { x: 2774, y: 0, width: 660, height: 577 },
};

export const Storyboard3: TempoStoryboard = {
  render: () => <Storyboard3Board />,
  name: "Storyboard3",
  layout: { x: 0, y: -179, width: 533, height: 105 },
};
