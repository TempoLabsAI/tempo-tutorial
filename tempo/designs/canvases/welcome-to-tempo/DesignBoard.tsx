import { Strip } from './Strip';
import { DocsHero } from './DocsHero';
import { DocsToDesignHero } from './DocsToDesignHero';

export default function DesignBoard() {
  return (
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
  );
}
