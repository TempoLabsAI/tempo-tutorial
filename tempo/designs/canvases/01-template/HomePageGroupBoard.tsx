import { Frame } from '@/design-system/canvas-chrome';
import { HomePage } from '@/pages/HomePage';
import { GroupHeader, SectionBlock, groupShell } from './_helpers';

export default function HomePageGroupBoard() {
  return (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="02 · Page"
        title="HomePage · /"
        subtext="The default page when the app opens. A big hero with the SearchBar, a category rail, then handpicked listings in a four-up grid. This is where every guest starts."
      />
      <SectionBlock
        index="State · 01"
        title="Hero"
        subtext="Big display title, supporting copy, the SearchBar. The widest part of the funnel — every guest passes through here."
      >
        <Frame route="/"><HomePage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Popular homes"
        subtext="Featured grid below the category rail. Four ListingCards in a row, each with photo, location, price, rating."
      >
        <Frame route="/"><HomePage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 03"
        title="Inspiration & footer"
        subtext="Inspiration tiles for further browsing, then the four-column footer. The quiet exit of the page."
      >
        <Frame route="/"><HomePage /></Frame>
      </SectionBlock>
    </div>
  );
}
