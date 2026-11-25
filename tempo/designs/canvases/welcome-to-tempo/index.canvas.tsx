import { Canvas, Storyboard } from "tempo-sdk/canvas";
import { DesignWithCode } from "./DesignWithCode";
import { YourTurnToPlay } from "./YourTurnToPlay";
import { UnderTheHood } from "./UnderTheHood";
import { ShareWithYourTeam } from "./ShareWithYourTeam";
import { YourProject } from "./YourProject";

export default function WelcomeCanvas() {
  return (
    <Canvas name="Welcome to Tempo" backgroundColor="#232323">
      <Storyboard
        id="DesignWithCode"
        name="01 — Design with code"
        component={DesignWithCode}
        layout={{ x: 0, y: 250, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="YourTurnToPlay"
        name="02 — By hand"
        component={YourTurnToPlay}
        layout={{ x: 1134, y: 250, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="UnderTheHood"
        name="03 — Real code"
        component={UnderTheHood}
        layout={{ x: 2268, y: 250, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="ShareWithYourTeam"
        name="04 — Share and review"
        component={ShareWithYourTeam}
        layout={{ x: 3402, y: 250, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="YourProject"
        name="05 — Your project and your designs"
        component={YourProject}
        layout={{ x: 4536, y: 250, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}
