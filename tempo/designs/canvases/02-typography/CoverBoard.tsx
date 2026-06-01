import { TitleSpread } from '@/design-system/canvas-chrome';

export function CoverBoard() {
  return (
    <TitleSpread
      eyebrow="Workspace · 02"
      title={<>Typography.</>}
      caption="One sans family across the whole product. Semibold for headings, medium for actions, regular for body. Six steps from a 60px display down to a 12px eyebrow — tighter tracking up top, looser line-height down below."
      meta={[
        { label: "Family", value: "SF Pro" },
        { label: "Sizes", value: "6" },
        { label: "Weights", value: "3" },
        { label: "Owner", value: "Sasha · Design" },
      ]}
    />
  );
}
