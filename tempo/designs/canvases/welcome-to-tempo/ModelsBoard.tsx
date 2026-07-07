import { Strip } from './Strip';
import { ModelsHero } from './ModelsHero';

export default function ModelsBoard() {
  return (
    <div className="wtt">
      <Strip
      number="6"
      accent="blueberry"
      title="Use any model through OpenCode"
      graphics={[{ node: <ModelsHero />, kind: "bare" }]}
      />
    </div>
  );
}
