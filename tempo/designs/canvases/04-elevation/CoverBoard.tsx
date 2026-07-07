import { TitleSpread } from '@/design-system/canvas-chrome';

export default function CoverBoard() {
  return (
    <TitleSpread
      eyebrow="Workspace · 04"
      title={<>Elevation.</>}
      caption="Three soft, multi-layered shadows. We never shadow-sm page chrome — only floating surfaces: resting cards, hover-lifted cards, and modal sheets. Each level is a stacked pair (or single, for modal) of shadows: a tight one for definition, a longer one for atmosphere."
      meta={[
        { label: "Levels", value: "3" },
        { label: "Layers", value: "Up to 2" },
        { label: "Used on", value: "Cards · Modals" },
        { label: "Owner", value: "Sasha · Design" },
      ]}
    />
  );
}
