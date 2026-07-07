import { TitleSpread } from '@/design-system/canvas-chrome';

export default function CoverBoard() {
  return (
    <TitleSpread
      eyebrow="Workspace · 01"
      title={<>Color.</>}
      caption="Four surfaces, four text steps, one coral accent, four state pairs. Read top to bottom — Paper sets the canvas, text colours carry hierarchy, the accent fires the one important action per screen, system states flag the rest."
      meta={[
        { label: "Surfaces", value: "4" },
        { label: "Text steps", value: "4" },
        { label: "System states", value: "4" },
        { label: "Tiers", value: "2" },
      ]}
    />
  );
}
