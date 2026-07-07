import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import IndexBoard from './IndexBoard';
import LegendBoard from './LegendBoard';

const config: TempoCanvasConfig = {
  name: "00 · Cover & Index",
};

export default config;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1920, height: 1551 , intrinsicSizing: "root-element" },
};

export const Index: TempoStoryboard = {
  render: () => <IndexBoard />,
  name: "01 · Index",
  layout: { x: 2041, y: 0, width: 1280, height: 2276, intrinsicSizing: "root-element" },
};

export const Legend: TempoStoryboard = {
  render: () => <LegendBoard />,
  name: "02 · Legend",
  layout: { x: 3321, y: 1, width: 1280, height: 1137, intrinsicSizing: "root-element" },
};
