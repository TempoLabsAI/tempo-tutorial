// @tempo-home — Tempo home canvas (the workspace Run button opens this). Managed marker; do not remove.
import { Canvas, RouteStoryboard } from "tempo-sdk/canvas";

export default function LinXuPortfolioCanvas() {
  return (
    <Canvas name="Lin Xu Portfolio" backgroundColor="#232323">
      <RouteStoryboard
        id="Desktop"
        name="设计师作品集 · 桌面"
        route="/"
        layout={{ x: 0, y: 0, width: 1440, height: 2780 }}
      />
      <RouteStoryboard
        id="Mobile"
        name="设计师作品集 · 移动端"
        route="/"
        layout={{ x: 1490, y: 0, width: 390, height: 3004 }}
      />
    </Canvas>
  );
}
