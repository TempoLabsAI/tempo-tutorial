import { Calendar } from 'lucide-react';
import { Frame } from '@/design-system/canvas-chrome';
import { TripsPage } from '@/pages/TripsPage';
import { EmptyState, GroupHeader, SectionBlock, groupShell } from './shared';

export function TripsPageGroupBoard() {
  return (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="05 · Page"
        title="TripsPage · /trips"
        subtext="The traveller's itinerary. Upcoming, today, and past trips — each rendered as a BookingCard row with the appropriate status badge."
      />
      <SectionBlock
        index="State · 01"
        title="Itinerary"
        subtext="Vertical list of BookingCards. Status badges (Confirmed, Check-in today, Past, Cancelled) signal where each trip is in its lifecycle."
      >
        <Frame route="/trips"><TripsPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Empty · no trips"
        subtext="Before the first booking — a quiet prompt to start a search."
      >
        <Frame route="/trips">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={Calendar}
                title="No trips booked yet"
                body="Time to dust off your bags and start planning your next adventure."
                cta="Start searching"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  );
}
