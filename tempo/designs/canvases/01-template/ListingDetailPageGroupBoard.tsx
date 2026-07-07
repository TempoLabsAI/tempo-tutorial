import { Frame } from '@/design-system/canvas-chrome';
import { ListingDetailPage } from '@/pages/ListingDetailPage';
import { GroupHeader, SectionBlock, groupShell } from './_helpers';

export default function ListingDetailPageGroupBoard() {
  return (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="04 · Page"
        title="ListingDetailPage · /listing/:id"
        subtext="One listing, end-to-end. Photos first, then details, amenities, the sticky booking card on the right, and reviews + host below the fold."
      />
      <SectionBlock
        index="State · 01"
        title="Photo gallery"
        subtext="Hero photo on the left, three smaller photos stacked right. Heart overlay top-right, share top-left."
      >
        <Frame route="/listing/lst-001" path="/listing/:id"><ListingDetailPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Details & booking"
        subtext="Property title, host info, amenities list. The sticky BookingCard with date picker and Reserve button anchors to the right column."
      >
        <Frame route="/listing/lst-001" path="/listing/:id"><ListingDetailPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Reviews & host"
        subtext="Star rating breakdown, then individual review cards. The host section at the bottom features a Superhost badge when earned."
      >
        <Frame route="/listing/lst-001" path="/listing/:id"><ListingDetailPage /></Frame>
      </SectionBlock>
    </div>
  );
}
