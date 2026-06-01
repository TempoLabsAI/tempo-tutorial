import { FilterChip } from '@/design-system/components/FilterChip';
import { DarkSheet } from '@/design-system/canvas-chrome';
import { ComponentSection } from './shared';

export function FilterChipShowcaseBoard() {
  return (
    <div className="w-[1280px]">
      <DarkSheet
        index="03"
        title="FilterChip"
        caption="The row that lives above search results. Tap to toggle, count badge shows applied options."
      >
        <ComponentSection title="Rest" description="The default chip. White surface, grey border, ink label.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" />
            <FilterChip label="Type of place" />
            <FilterChip label="Beds" />
            <FilterChip label="Amenities" />
          </div>
        </ComponentSection>

        <ComponentSection title="Hover" description="Border darkens to ink as the cursor hovers. Background stays white.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" className="!border-ink" />
            <FilterChip label="Type of place" className="!border-ink" />
            <FilterChip label="Beds" className="!border-ink" />
            <FilterChip label="Amenities" className="!border-ink" />
          </div>
        </ComponentSection>

        <ComponentSection title="Active" description="Selected state — warm paper fill, ink border. Signals an applied filter.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" active />
            <FilterChip label="Type of place" active />
            <FilterChip label="Beds" active />
            <FilterChip label="Amenities" active />
          </div>
        </ComponentSection>

        <ComponentSection title="With count" description="Numeric badge appears on the right when a chip has applied options. Coral on rest chips, ink on active ones.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Beds" count={2} />
            <FilterChip label="Amenities" count={5} />
            <FilterChip label="Beds" count={2} active />
            <FilterChip label="Amenities" count={5} active />
          </div>
        </ComponentSection>

        <ComponentSection title="Composed row" description="A realistic mix — three active, four resting. Wraps on narrow surfaces and stays single-row otherwise.">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <FilterChip label="Price" />
            <FilterChip label="Type of place" active />
            <FilterChip label="Beds" count={2} active />
            <FilterChip label="Amenities" count={5} active />
            <FilterChip label="Booking options" />
            <FilterChip label="Standout stays" />
            <FilterChip label="Property type" />
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  );
}
