import { MemoryRouter } from 'react-router-dom';
import { MapPin, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { SearchBar } from '@/design-system/components/SearchBar';
import { DarkSheet } from '@/design-system/canvas-chrome';
import { ComponentSection } from './shared';

/* ── SearchBar modal mockups ─────────────────────────────────────── */

function ModalPopover({ children, width = 720 }: { children: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        width,
        background: "#fff",
        borderRadius: 32,
        boxShadow: "0 16px 40px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.06)",
        padding: 24,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function DestinationRow({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: "#f3f3f3",
          display: "grid",
          placeItems: "center",
          color: "#717171",
          flexShrink: 0,
        }}
      >
        <MapPin size={20} strokeWidth={1.75} />
      </div>
      <div>
        <p style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>
          {title}
        </p>
        <p style={{ fontFamily: "inherit", fontSize: 13, color: "#717171", margin: "2px 0 0" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function MiniCalendar({ monthLabel }: { monthLabel: string }) {
  return (
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#222", margin: "0 0 12px", textAlign: "center" }}>{monthLabel}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontFamily: "inherit", fontSize: 11, color: "#717171", textAlign: "center", marginBottom: 4 }}>
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        <CalCell n="" />
        <CalCell n="" />
        <CalCell n="1" />
        <CalCell n="2" />
        <CalCell n="3" />
        <CalCell n="4" />
        <CalCell n="5" />
        <CalCell n="6" />
        <CalCell n="7" />
        <CalCell n="8" />
        <CalCell n="9" />
        <CalCell n="10" />
        <CalCell n="11" />
        <CalCell n="12" />
        <CalCell n="13" />
        <CalCell n="14" highlight="start" />
        <CalCell n="15" inRange />
        <CalCell n="16" inRange />
        <CalCell n="17" inRange />
        <CalCell n="18" highlight="end" />
        <CalCell n="19" />
        <CalCell n="20" />
        <CalCell n="21" />
        <CalCell n="22" />
        <CalCell n="23" />
        <CalCell n="24" />
        <CalCell n="25" />
        <CalCell n="26" />
        <CalCell n="27" />
        <CalCell n="28" />
        <CalCell n="29" />
        <CalCell n="30" />
      </div>
    </div>
  );
}

function CalCell({ n, highlight, inRange }: { n: string; highlight?: "start" | "end"; inRange?: boolean }) {
  const bg = highlight ? "#222" : inRange ? "#f7f7f7" : "transparent";
  const color = highlight ? "#fff" : "#222";
  return (
    <div
      style={{
        height: 32,
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        fontWeight: highlight ? 600 : 400,
        color,
        background: bg,
        borderRadius: highlight ? 999 : 4,
      }}
    >
      {n}
    </div>
  );
}

function GuestRow({ label, sub, count }: { label: string; sub: string; count: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        borderBottom: "1px solid #ebebeb",
      }}
    >
      <div>
        <p style={{ fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>{label}</p>
        <p style={{ fontFamily: "inherit", fontSize: 13, color: "#717171", margin: "2px 0 0" }}>{sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          aria-label={`Decrease ${label}`}
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: "1px solid #b0b0b0",
            background: "transparent",
            color: count === 0 ? "#ddd" : "#717171",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <Minus size={16} strokeWidth={2} />
        </button>
        <span style={{ fontFamily: "inherit", fontSize: 15, color: "#222", minWidth: 16, textAlign: "center" }}>
          {count}
        </span>
        <button
          aria-label={`Increase ${label}`}
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            border: "1px solid #222",
            background: "transparent",
            color: "#222",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <Plus size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export function SearchBarShowcaseBoard() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <div className="w-[1280px]">
        <DarkSheet
          index="02"
          title="SearchBar"
          caption="Compact for the navbar, expanded on the hero. Click any segment to open a modal — destination search, date picker, or guest counter."
        >
          <ComponentSection title="Compact" description="Single pill for the inner-page navbar. Rest, filled with a destination, and on hover (soft shadow lift).">
            <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 28, maxWidth: 520 }}>
              <SearchBar compact />
              <SearchBar compact defaultDestination="Lisbon" />
              <div style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.12))" }}>
                <SearchBar compact />
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Expanded" description="Full pill with Where / Check in / Check out / Who segments. Rest, on hover (shadow lift), and with a destination filled.">
            <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 28 }}>
              <SearchBar />
              <div style={{ filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.14))" }}>
                <SearchBar />
              </div>
              <SearchBar defaultDestination="Lisbon, Portugal" />
            </div>
          </ComponentSection>

          <ComponentSection title="Modal · Where" description="Tapping the Where segment opens a popover with the destination input and a suggested-destinations list.">
            <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
              <div style={{ marginBottom: 18 }}>
                <SearchBar />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <ModalPopover width={420}>
                  <p style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#717171", margin: "0 0 12px" }}>
                    Suggested destinations
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <DestinationRow title="Nearby" body="Find what's around you" />
                    <DestinationRow title="Lisbon, Portugal" body="For sights like Praça do Comércio" />
                    <DestinationRow title="Algarve, Portugal" body="Sun, sand, and seaside towns" />
                    <DestinationRow title="Madeira, Portugal" body="Mountain hikes and ocean cliffs" />
                    <DestinationRow title="Porto, Portugal" body="Riverside city, port wine country" />
                  </div>
                </ModalPopover>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Modal · Check in / out" description="Two-month date picker. Start and end dates anchor the range; mid-range days take a soft fill.">
            <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
              <div style={{ marginBottom: 18 }}>
                <SearchBar />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ModalPopover width={780}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18, padding: "0 4px" }}>
                    <button aria-label="Previous month" style={{ width: 32, height: 32, borderRadius: 999, border: "none", background: "transparent", color: "#222", display: "grid", placeItems: "center", cursor: "pointer" }}>
                      <ChevronLeft size={18} strokeWidth={2} />
                    </button>
                    <div style={{ flex: 1 }} />
                    <button aria-label="Next month" style={{ width: 32, height: 32, borderRadius: 999, border: "none", background: "transparent", color: "#222", display: "grid", placeItems: "center", cursor: "pointer" }}>
                      <ChevronRight size={18} strokeWidth={2} />
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 48, padding: "0 12px" }}>
                    <MiniCalendar monthLabel="April 2026" />
                    <MiniCalendar monthLabel="May 2026" />
                  </div>
                </ModalPopover>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection title="Modal · Who" description="Guest counter with adults, children, infants, and pets. Each row has independent ± controls.">
            <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
              <div style={{ marginBottom: 18 }}>
                <SearchBar />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ModalPopover width={420}>
                  <GuestRow label="Adults" sub="Ages 13 or above" count={2} />
                  <GuestRow label="Children" sub="Ages 2–12" count={0} />
                  <GuestRow label="Infants" sub="Under 2" count={0} />
                  <GuestRow label="Pets" sub="Bringing a service animal?" count={0} />
                </ModalPopover>
              </div>
            </div>
          </ComponentSection>
        </DarkSheet>
      </div>
    </MemoryRouter>
  );
}
