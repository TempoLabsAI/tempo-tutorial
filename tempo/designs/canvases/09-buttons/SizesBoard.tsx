import { Button } from '@/design-system/primitives/Button';
import { PageShell, ButtonSection, ButtonRow, HMarker, VMarker } from './_helpers';

export default function SizesBoard() {
  return (
    <PageShell
      width={1280}
      title="Sizes"
      description="Three heights, scaled to context. Default to medium; reach for small in dense surfaces and large when a button needs to carry weight on its own."
    >
      <ButtonSection
        title="Small"
        description="36px tall. For dense surfaces — table rows, inline filter chips, secondary actions inside cards. The smallest target we ship."
      >
        <ButtonRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={92}>auto</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="primary" size="sm">Reserve</Button>
              <VMarker height={36}>36 · h-9</VMarker>
            </div>
          </div>
        </ButtonRow>
        <ButtonRow label="All variants">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="ink" size="sm">Ink</Button>
          <Button variant="outline" size="sm">Outline</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Medium"
        description="44px tall. The default. Use for nearly every action in the product — page CTAs, dialog footers, header actions."
      >
        <ButtonRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={104}>auto</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="primary" size="md">Reserve</Button>
              <VMarker height={44}>44 · h-11</VMarker>
            </div>
          </div>
        </ButtonRow>
        <ButtonRow label="All variants">
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="ink" size="md">Ink</Button>
          <Button variant="outline" size="md">Outline</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="ghost" size="md">Ghost</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Large"
        description="48px tall. Marketing rails, listing detail sticky CTAs, hero modules. Reach for it when a button needs to carry weight on its own."
      >
        <ButtonRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={120}>auto</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="primary" size="lg">Reserve</Button>
              <VMarker height={48}>48 · h-12</VMarker>
            </div>
          </div>
        </ButtonRow>
        <ButtonRow label="All variants">
          <Button variant="primary" size="lg">Primary</Button>
          <Button variant="ink" size="lg">Ink</Button>
          <Button variant="outline" size="lg">Outline</Button>
          <Button variant="secondary" size="lg">Secondary</Button>
          <Button variant="ghost" size="lg">Ghost</Button>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  );
}
