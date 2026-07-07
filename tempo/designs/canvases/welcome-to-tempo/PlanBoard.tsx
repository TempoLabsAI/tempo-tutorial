import { Strip } from './Strip';
import { ChatHero } from './ChatHero';
import { ContextHero } from './ContextHero';
import { RunHero } from './RunHero';

export default function PlanBoard() {
  return (
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
  );
}
