import { Strip } from './Strip';
import { IssuesBoardHero, IssueChatHero } from './IssuesHero';

export default function TrackBoard() {
  return (
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
  );
}
