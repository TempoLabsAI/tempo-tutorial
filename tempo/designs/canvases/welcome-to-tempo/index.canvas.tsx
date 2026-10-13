import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { FileDiff } from 'lucide-react';
import { DocsHero } from './DocsHero';
import { DocsToDesignHero } from './DocsToDesignHero';
import { ContextHero } from './ContextHero';
import { Strip } from './Strip';
import { ChatHero } from './ChatHero';
import { WorkspaceNavSection } from "./WorkspaceNavSection";
import { RunHero } from "./RunHero";
import { BuildHero } from "./BuildHero";
import { ShareHero } from "./ShareHero";
import { IssuesBoardHero, IssuePropertiesHero, IssueChatHero } from "./IssuesHero";
import { ModelsHero } from "./ModelsHero";
import Storyboard3Component from "./Storyboard3";
import Storyboard1Component from "./Storyboard1";

const page: TempoPage = {
  name: "Welcome to Tempo",
};

export default page;

export const Plan: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <Strip
      number="1"
      accent="kiwi"
      title="Generate beautiful designs with Tempo"
      intro="Type up a brief and watch Tempo craft canvases that follow your design systems in seconds. Have the agent generate HTML designs or functional React prototypes, your pick."
      graphics={[
        { node: <ChatHero />, kind: "bare" },
        { node: <ContextHero />, kind: "bare" },
        { node: <RunHero />, kind: "bare" },
      ]}
      />
    </div>
  ),
  name: "1 · Generate",
  layout: { x: 0, y: 0, width: 660, height: 1395 },
};

export const Design: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <Strip
      number="2"
      accent="kiwi"
      title="Write the spec, then turn it into a design"
      intro="Draft PRDs and specs in a clean editor and keep them organized in one place — then collaborate with your team live, editing together in real time."
      graphics={[
        { node: <DocsHero />, kind: "bare" },
        { node: <DocsToDesignHero />, kind: "bare" },
      ]}
      />
    </div>
  ),
  name: "2 · Docs",
  layout: { x: 690, y: 0, width: 660, height: 1252 },
};

export const Build: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <Strip
      number="3"
      accent="blueberry"
      title="It's all real code in real git"
      intro={
        <>
          Each feature lives in its own workspace, a git branch with multiple
          chats.<br />
          Manage them under Chat, click{" "}
          <span className="whitespace-nowrap">
            <FileDiff className="mr-1 inline-block size-[1em] -translate-y-[1.5px] text-text-secondary" />
            Source Control
          </span>{" "}
          to track your file changes.
        </>
      }
      graphics={[
        { node: <BuildHero />, kind: "bare" },
        { node: <ShareHero />, kind: "bare" },
      ]}
      />
    </div>
  ),
  name: "3 · Source control",
  layout: { x: 1383, y: 0, width: 660, height: 1221 },
};

export const Track: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <Strip
      number="4"
      accent="kiwi"
      title="Organize the work as issues"
      graphics={[
        { node: <IssuesBoardHero />, kind: "bare" },
        { node: <IssueChatHero />, kind: "bare" },
      ]}
      />
    </div>
  ),
  name: "4 · People + agents",
  layout: { x: 2079, y: 0, width: 660, height: 913 },
};

export const Models: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <Strip
      number="6"
      accent="blueberry"
      title="Use any model through OpenCode"
      graphics={[{ node: <ModelsHero />, kind: "bare" }]}
      />
    </div>
  ),
  name: "6 · Models",
  layout: { x: 3470, y: 0, width: 660, height: 614 },
};

export const ExploreTabs: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <WorkspaceNavSection />
    </div>
  ),
  name: "0 · Find your way around",
  layout: { x: 2774, y: 0, width: 660, height: 577 },
};

export const Storyboard3: TempoStoryboard = {
  render: () => (
    <div className="wtt">
      <Storyboard3Component />
    </div>
  ),
  name: "Storyboard3",
  layout: { x: 0, y: -179, width: 533, height: 105 },
};

