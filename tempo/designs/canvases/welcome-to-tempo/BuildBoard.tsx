import { FileDiff } from 'lucide-react';
import { Strip } from './Strip';
import { BuildHero } from './BuildHero';
import { ShareHero } from './ShareHero';

export default function BuildBoard() {
  return (
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
  );
}
