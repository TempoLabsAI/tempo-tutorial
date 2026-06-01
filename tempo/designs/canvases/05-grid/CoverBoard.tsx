import { TitleSpread } from '@/design-system/canvas-chrome';

export function CoverBoard() {
  return (
    <TitleSpread
      eyebrow="Workspace · 05"
      title={<>Grid.</>}
      caption="The layout layer. Spacing tokens set the 4-px rhythm everything snaps to. Radius tokens round every corner against the same scale. Read together — spacing first, radius second — they describe how the surfaces fit and feel."
      meta={[
        { label: "Spacing steps", value: "9" },
        { label: "Radii", value: "6" },
        { label: "Base", value: "4px" },
        { label: "Most-used", value: "16 · 24" },
      ]}
    />
  );
}
