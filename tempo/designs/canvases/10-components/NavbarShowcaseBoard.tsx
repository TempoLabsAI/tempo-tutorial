import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '@/design-system/layout/Navbar';
import { DarkSheet, DARK } from '@/design-system/canvas-chrome';
import { ComponentSection } from './shared';

export function NavbarShowcaseBoard() {
  return (
    <div className="w-[1280px]">
      <DarkSheet
        index="01"
        title="Navbar"
        caption="One sticky white masthead. Compact search appears on every inner route; tabs underline the section the guest is in."
      >
        <ComponentSection title="Home · /" description="No compact search — the hero on the home page owns the SearchBar. Stays is the implicit landing tab.">
          <div style={{ border: `1px solid ${DARK.hairline}`, borderRadius: 12, overflow: "hidden" }}>
            <MemoryRouter initialEntries={["/"]}>
              <Navbar />
            </MemoryRouter>
          </div>
        </ComponentSection>

        <ComponentSection title="Section tabs" description="The four section routes share the same chrome — compact SearchBar beside the wordmark, and one tab underlined (Stays / Wishlists / Trips / Messages).">
          <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/search"]}>
                <Navbar />
              </MemoryRouter>
            </div>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/wishlists"]}>
                <Navbar />
              </MemoryRouter>
            </div>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/trips"]}>
                <Navbar />
              </MemoryRouter>
            </div>
            <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
              <MemoryRouter initialEntries={["/messages"]}>
                <Navbar />
              </MemoryRouter>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Listing detail · /listing/:id" description="Same compact SearchBar so a guest can jump back to results without losing context. No tab underline — the listing isn't a section root.">
          <div style={{ border: `1px solid ${DARK.hairline}`, borderRadius: 12, overflow: "hidden" }}>
            <MemoryRouter initialEntries={["/listing/1"]}>
              <Navbar />
            </MemoryRouter>
          </div>
        </ComponentSection>
      </DarkSheet>
    </div>
  );
}
