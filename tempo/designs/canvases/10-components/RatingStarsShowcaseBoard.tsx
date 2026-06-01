import { MemoryRouter } from 'react-router-dom';
import { ListingCard } from '@/design-system/components/ListingCard';
import { RatingStars } from '@/design-system/components/RatingStars';
import { LISTINGS } from '@/data/listings';
import { DarkSheet } from '@/design-system/canvas-chrome';
import { ComponentSection } from './shared';

export function RatingStarsShowcaseBoard() {
  return (
    <div className="w-[1280px]">
      <DarkSheet
        index="05"
        title="RatingStars"
        caption="One filled ink star, the rating to two decimals, and an optional review count. Always inline, never standalone."
      >
        <ComponentSection title="Small (default)" description="The size used on cards and list rows — 12px star, 14px label. Reads quietly inside a dense card footer.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <RatingStars rating={4.97} count={184} />
            <RatingStars rating={4.92} count={1240} />
            <RatingStars rating={5.0} />
            <RatingStars rating={4.5} count={12} />
          </div>
        </ComponentSection>

        <ComponentSection title="Medium" description="Slightly larger — used on the listing detail header and reviews section, where rating is a primary signal.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <RatingStars rating={4.97} count={184} size="md" />
            <RatingStars rating={4.92} count={1240} size="md" />
            <RatingStars rating={5.0} size="md" />
          </div>
        </ComponentSection>

        <ComponentSection title="Without count" description="When a listing has fewer than five reviews, drop the count and show only the rating — keeps the chrome quiet.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <RatingStars rating={5.0} />
            <RatingStars rating={4.83} />
            <RatingStars rating={4.5} size="md" />
          </div>
        </ComponentSection>

        <ComponentSection title="In a card footer" description="Where it actually lives. Aligned with the title, sits to the right of the city name and above the price.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
            <div style={{ width: 320 }}>
              <MemoryRouter initialEntries={["/"]}>
                <ListingCard listing={LISTINGS[0]} />
              </MemoryRouter>
            </div>
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  );
}
