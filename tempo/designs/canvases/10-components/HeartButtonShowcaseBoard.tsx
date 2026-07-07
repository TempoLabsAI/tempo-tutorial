import { MemoryRouter } from 'react-router-dom';
import { ListingCard } from '@/design-system/components/ListingCard';
import { HeartButton } from '@/design-system/components/HeartButton';
import { LISTINGS } from '@/data/listings';
import {
  DarkSheet,
  DARK,
} from '@/design-system/canvas-chrome';
import { ComponentSection } from './_helpers';

export default function HeartButtonShowcaseBoard() {
  return (
    <div className="w-[1280px]">
      <DarkSheet
        index="06"
        title="HeartButton"
        caption="The save-to-wishlist toggle. Two surface treatments — overlay on top of imagery, inline on paper — and a confirmed coral fill when active."
      >
        <ComponentSection title="Overlay · rest" description="Sits on a listing photo. Translucent black fill, white stroke, a soft drop shadow-sm so the heart reads on any image.">
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={false} size="sm" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={false} size="md" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={false} size="lg" surface="overlay" />
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Overlay · saved" description="Coral fills the heart on tap. The shape pulses once — quiet confirmation, no toast.">
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={true} size="sm" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={true} size="md" surface="overlay" />
            </div>
            <div style={{ background: "#222222", padding: 20, borderRadius: 12 }}>
              <HeartButton saved={true} size="lg" surface="overlay" />
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Inline" description="Used in lists where the heart sits beside text on paper. Transparent fill, ink stroke at rest — same coral fill when saved.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", gap: 24, alignItems: "center" }}>
            <HeartButton saved={false} size="sm" surface="inline" />
            <HeartButton saved={false} size="md" surface="inline" />
            <HeartButton saved={false} size="lg" surface="inline" />
            <div style={{ width: 1, height: 32, background: DARK.hairline }} />
            <HeartButton saved={true} size="sm" surface="inline" />
            <HeartButton saved={true} size="md" surface="inline" />
            <HeartButton saved={true} size="lg" surface="inline" />
          </div>
        </ComponentSection>

        <ComponentSection title="On a listing card" description="Where it lives in production — top-right of the cover image, overlay surface, sm size.">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
            <div style={{ width: 320 }}>
              <MemoryRouter initialEntries={["/"]}>
                <ListingCard listing={LISTINGS[2]} saved />
              </MemoryRouter>
            </div>
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  );
}
