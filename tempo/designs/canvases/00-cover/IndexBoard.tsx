import type { ReactNode } from 'react';
import { Heart } from 'lucide-react';
import {
  DarkSheet,
  Eyebrow,
  MonoText,
  FONT_SANS,
  DARK,
} from '@/design-system/canvas-chrome';

function IndexCard({
  num,
  name,
  slug,
  blurb,
  preview,
  previewBg,
}: {
  num?: string;
  name: string;
  slug: string;
  blurb: string;
  preview?: ReactNode;
  previewBg?: string;
}) {
  return (
    <div
      style={{
        background: DARK.paperRaised,
        border: `1px solid ${DARK.hairline}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Preview area — replaced per canvas with a simple visual */}
      <div className="h-[200px]"
        style={{ borderBottom: `1px solid ${DARK.hairline}`, background: previewBg ?? DARK.paperSunken, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        {preview ?? <MonoText size={10} color={DARK.inkFaint}>{slug}.svg</MonoText>}
      </div>
      {/* Text */}
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
          <MonoText size={10} color={DARK.inkFaint}>{slug}</MonoText>
        </div>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 17,
            fontWeight: 600,
            color: DARK.ink,
            margin: 0,
            letterSpacing: "-0.015em",
          }}
        >
          {num ? `${num} · ${name}` : name}
        </p>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 12.5,
            color: DARK.inkQuiet,
            margin: "6px 0 0",
            lineHeight: 1.5,
          }}
        >
          {blurb}
        </p>
      </div>
    </div>
  );
}

export default function IndexBoard() {
  return (
    <div className="w-[1280px] h-[2276px]">
    <DarkSheet
      index="01"
      title="Index"
      caption="Every canvas in this workspace, grouped by what it's for. Context sets the stage. Primitives define the visual layer the product draws from. Components are the building blocks the product is made of."
    >
      <div className="py-[24px] flex flex-col gap-[4px] my-[52px]">
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          Context
        </h3>
        <div style={{ marginTop: 6 }}>
          <Eyebrow>2 canvases</Eyebrow>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div>
            <IndexCard
              num="00"
              name="Cover & Index"
              slug="00-cover"
              blurb="Workspace map and the visual conventions used across every canvas."
              previewBg="#fff"
              preview={
                <svg width="300" height="170" viewBox="0 0 300 170">
                  {/* Root node */}
                  <rect x="118" y="8" width="64" height="34" rx="5" fill="#222222" />
                  {/* Vertical line from root */}
                  <line x1="150" y1="42" x2="150" y2="80" stroke="#dddddd" strokeWidth="1.5" />
                  {/* Horizontal connector */}
                  <line x1="36" y1="80" x2="264" y2="80" stroke="#dddddd" strokeWidth="1.5" />
                  {/* Vertical lines down to each child */}
                  <line x1="36" y1="80" x2="36" y2="120" stroke="#dddddd" strokeWidth="1.5" />
                  <line x1="150" y1="80" x2="150" y2="120" stroke="#dddddd" strokeWidth="1.5" />
                  <line x1="264" y1="80" x2="264" y2="120" stroke="#dddddd" strokeWidth="1.5" />
                  {/* Three child nodes */}
                  <rect x="12" y="120" width="48" height="32" rx="4" fill="#dddddd" />
                  <rect x="126" y="120" width="48" height="32" rx="4" fill="#dddddd" />
                  <rect x="240" y="120" width="48" height="32" rx="4" fill="#dddddd" />
                </svg>
              }
            />
          </div>
          <div>
            <IndexCard
              num="01"
              name="Template"
              slug="01-template"
              blurb="Page templates — HomePage, SearchPage, ListingDetail, Trips, Messages, Wishlists."
              previewBg="#fff"
              preview={
                <div style={{ padding: 24, width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ height: 10, background: "#222", borderRadius: 2, width: "45%" }} />
                  <div style={{ height: 6, background: "#ddd", borderRadius: 2, width: "75%" }} />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1, height: 80, background: "#f7f7f7", borderRadius: 6 }} />
                    <div style={{ flex: 1, height: 80, background: "#f7f7f7", borderRadius: 6 }} />
                    <div style={{ flex: 1, height: 80, background: "#f7f7f7", borderRadius: 6 }} />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      <div className="my-[44px] py-[20px] flex flex-col gap-[4px] items-start justify-center">
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          Primitives
        </h3>
        <div style={{ marginTop: 6 }}>
          <Eyebrow>5 canvases</Eyebrow>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div>
            <IndexCard
              num="02"
              name="Typography"
              slug="02-typography"
              blurb="SF Pro · six steps, three weights."
              previewBg="#fff"
              preview={
                <p style={{ fontFamily: FONT_SANS, fontSize: 120, fontWeight: 600, letterSpacing: "-0.04em", color: "#222", margin: 0, lineHeight: 1 }}>
                  Aa
                </p>
              }
            />
          </div>
          <div>
            <IndexCard
              num="03"
              name="Colors"
              slug="03-colors"
              blurb="Surfaces, text, and the one coral accent."
              previewBg="#fff"
              preview={
                <div style={{ display: "flex", gap: 10, padding: 24 }}>
                  <div style={{ width: 38, height: 60, background: "#222222", borderRadius: 6, border: "none" }} />
                  <div style={{ width: 38, height: 60, background: "#717171", borderRadius: 6, border: "none" }} />
                  <div style={{ width: 38, height: 60, background: "#f7f7f7", borderRadius: 6, border: "1px solid #ebebeb" }} />
                  <div style={{ width: 38, height: 60, background: "#FF385C", borderRadius: 6, border: "none" }} />
                  <div style={{ width: 38, height: 60, background: "#fef7e0", borderRadius: 6, border: "1px solid #ebebeb" }} />
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="04"
              name="Elevation"
              slug="04-elevation"
              blurb="Three soft shadows — card, hover, modal."
              previewBg="#f7f7f7"
              preview={
                <div style={{ width: 110, height: 110, background: "#fff", borderRadius: 12, boxShadow: "0 6px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.12)" }} />
              }
            />
          </div>
          <div>
            <IndexCard
              num="05"
              name="Grid"
              slug="05-grid"
              blurb="Spacing and radius — the 4-pixel rhythm everything snaps to."
              previewBg="#fff"
              preview={
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: 4, padding: 24, width: "100%", height: "100%" }}>
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} style={{ background: "#f7f7f7", borderRadius: 2 }} />
                  ))}
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="06"
              name="Icons & Imagery"
              slug="06-icons"
              blurb="lucide-react glyphs at 16/20/24, plus aspect ratios and overlays for photography."
              previewBg="#fff"
              preview={
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
                  <Heart size={48} strokeWidth={1.75} color="#222" />
                  <div style={{ width: 64, height: 64, background: "#ddd", borderRadius: 8 }} />
                </div>
              }
            />
          </div>
        </div>
      </div>

      <div className="my-[52px] py-[20px] flex flex-col gap-[4px]">
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          Components
        </h3>
        <div style={{ marginTop: 6 }}>
          <Eyebrow>6 canvases</Eyebrow>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div>
            <IndexCard
              num="07"
              name="Avatars & Identity"
              slug="07-avatars"
              blurb="Sizes, fallbacks, host-pair, guest stacks."
              previewBg="#fff"
              preview={
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: "#FF385C", color: "#fff", border: "3px solid #fff", marginLeft: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_SANS, fontWeight: 600, fontSize: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    L
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: "#222", color: "#fff", border: "3px solid #fff", marginLeft: -18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_SANS, fontWeight: 600, fontSize: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    M
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: "#f7f7f7", color: "#222", border: "3px solid #fff", marginLeft: -18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_SANS, fontWeight: 600, fontSize: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    S
                  </div>
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="08"
              name="Badges & Status"
              slug="08-badges"
              blurb="Status pills across listings and trips."
              previewBg="#fff"
              preview={
                <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                  <span style={{ background: "#e8f5e9", color: "#1b5e20", padding: "6px 12px", borderRadius: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500 }}>Confirmed</span>
                  <span style={{ background: "#fff3e0", color: "#e65100", padding: "6px 12px", borderRadius: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500 }}>Check-in today</span>
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="09"
              name="Buttons"
              slug="09-buttons"
              blurb="Every variant, size and state, then buttons in situ."
              previewBg="#fff"
              preview={
                <div style={{ background: "#FF385C", color: "#fff", padding: "14px 30px", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}>
                  Reserve
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="10"
              name="Components"
              slug="10-components"
              blurb="Navbar, SearchBar, FilterChip, Cards — the composed pieces of the app."
              previewBg="#f7f7f7"
              preview={
                <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 999, padding: 4, paddingRight: 6, boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.08)", border: "1px solid #ebebeb" }}>
                  <div style={{ padding: "10px 18px", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, color: "#222" }}>Anywhere</span>
                  </div>
                  <div style={{ padding: "10px 18px", borderRight: "1px solid #ebebeb", display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, color: "#222" }}>Any week</span>
                  </div>
                  <div style={{ padding: "10px 18px", display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: "#717171" }}>Add guests</span>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 999, background: "#FF385C", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 6 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="11"
              name="Inputs & Forms"
              slug="11-inputs-forms"
              blurb="Input anatomy, states, and composed forms."
              previewBg="#fff"
              preview={
                <div style={{ width: "70%", height: 44, borderRadius: 8, border: "2px solid #222", boxShadow: "0 0 0 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
                  Lisbon, Portugal
                </div>
              }
            />
          </div>
          <div>
            <IndexCard
              num="12"
              name="Modals & Dialogues"
              slug="12-modals-and-dialogues"
              blurb="Sheets, dialogs, confirmation flows — what floats above the page."
              previewBg="rgba(0,0,0,0.5)"
              preview={
                <div style={{ width: 160, height: 100, background: "#fff", borderRadius: 12, boxShadow: "0 24px 60px rgba(0,0,0,0.5)", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ height: 8, background: "#222", borderRadius: 2, width: "70%" }} />
                  <div style={{ height: 6, background: "#ddd", borderRadius: 2, width: "85%" }} />
                  <div style={{ height: 6, background: "#ddd", borderRadius: 2, width: "55%" }} />
                  <div style={{ alignSelf: "flex-end", marginTop: "auto", background: "#FF385C", width: 60, height: 18, borderRadius: 4 }} />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </DarkSheet>
    </div>
  );
}
