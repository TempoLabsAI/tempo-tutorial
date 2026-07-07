import { Search } from 'lucide-react';
import { Frame } from '@/design-system/canvas-chrome';
import { SearchPage } from '@/pages/SearchPage';
import { EmptyState, GroupHeader, SectionBlock, SkBlock, groupShell } from './_helpers';

function SkListingCard() {
  return (
    <div style={{ background: "#fff", padding: 0, borderRadius: 16, overflow: "hidden" }}>
      <SkBlock height={220} radius={0} />
      <div style={{ padding: "16px 4px", display: "flex", flexDirection: "column", gap: 8 }}>
        <SkBlock height={14} width="60%" />
        <SkBlock height={12} width="40%" />
        <SkBlock height={12} width="30%" />
      </div>
    </div>
  );
}

export default function SearchPageGroupBoard() {
  return (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="03 · Page"
        title="SearchPage · /search"
        subtext="The directory. Filter chips above a grid of ListingCards. When filters return nothing, the empty-state copy and a 'clear filters' action take over."
      />
      <SectionBlock
        index="State · 01"
        title="Filter bar"
        subtext="The compact navbar with FilterChips. Tap to toggle, count badge shows applied options."
      >
        <Frame route="/search"><SearchPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Results grid"
        subtext="Four-column grid of ListingCards. Saved cards show the coral heart; unsaved cards stay neutral."
      >
        <Frame route="/search"><SearchPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Loading"
        subtext="First load — masthead, filter row, and a grid of card skeletons. Same shape as the real results so the layout doesn't jump in."
      >
        <Frame route="/search">
          <div style={{ padding: "32px 40px", background: "#fff", minHeight: 760 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <SkBlock height={36} width={88} radius={999} />
              <SkBlock height={36} width={120} radius={999} />
              <SkBlock height={36} width={96} radius={999} />
              <SkBlock height={36} width={120} radius={999} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <SkListingCard />
              <SkListingCard />
              <SkListingCard />
              <SkListingCard />
            </div>
          </div>
        </Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 04"
        title="Empty · no results"
        subtext="When filters return nothing — quiet icon, one sentence, one action to clear and try again."
      >
        <Frame route="/search">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={Search}
                title="No matches for these dates"
                body="Try widening the date range or removing a filter."
                cta="Clear filters"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  );
}
