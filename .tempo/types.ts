import type { ComponentProps, ComponentType, ReactElement } from "react";

export interface TempoPage {
  name: string;
}

export interface StoryboardLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex?: number;
}

export interface TempoStoryboard<C extends ComponentType<any>> {
  component: C;
  name?: string;
  args?: Partial<ComponentProps<C>>;
  layout: StoryboardLayout;
  container?: (Story: ComponentType) => ReactElement;
}

export interface TempoRouteStoryboard {
  route: string;
  name?: string;
  layout: StoryboardLayout;
  container?: (Story: ComponentType) => ReactElement;
}
