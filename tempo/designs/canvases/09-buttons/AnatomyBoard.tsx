import { Heart } from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { MonoText, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, ButtonSection, ButtonRow, HMarker, VMarker } from './shared';

export function AnatomyBoard() {
  return (
    <PageShell
      width={1280}
      title="Anatomy"
      description="Every button is built from the same parts — a pill container, an optional icon, and a label. Padding scales with size; the corner radius is constant at 8px."
    >
      <ButtonSection
        title="The parts"
        description="A container holds the label and optional icon. The icon previews the action; the label promises a result."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
            padding: "32px 24px",
          }}
        >
          <HMarker width={150}>auto · width</HMarker>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button variant="primary">
              <Heart size={16} strokeWidth={2} /> Save listing
            </Button>
            <VMarker height={44}>44 · h-11</VMarker>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 24px",
              marginTop: 16,
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: "#717171",
            }}
          >
            <span><span style={{ color: "#FF385C" }}>● </span>Container · rounded-lg, 8px radius</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Icon · 16×16, strokeWidth 2</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Gap · 8px (gap-2)</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Label · 14px, font-semibold</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Horizontal padding · 20px (px-5)</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Active · scale-98 on press</span>
          </div>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Padding scale"
        description="Horizontal padding is the only thing that changes between sizes — small uses px-4, medium px-5, large px-6. Vertical height controls visual weight."
      >
        <ButtonRow label="Small · px-4">
          <Button variant="primary" size="sm">Small</Button>
          <MonoText size={11} color="#717171">size="sm" · h-9 · 16px h</MonoText>
        </ButtonRow>
        <ButtonRow label="Medium · px-5">
          <Button variant="primary" size="md">Medium</Button>
          <MonoText size={11} color="#717171">size="md" · h-11 · 20px h</MonoText>
        </ButtonRow>
        <ButtonRow label="Large · px-6">
          <Button variant="primary" size="lg">Large</Button>
          <MonoText size={11} color="#717171">size="lg" · h-12 · 24px h</MonoText>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  );
}
