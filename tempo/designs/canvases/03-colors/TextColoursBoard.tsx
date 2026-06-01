import { FONT_SANS } from '@/design-system/canvas-chrome';
import { PageShell, Section, Swatch } from './shared';

export function TextColoursBoard() {
  return (
    <PageShell
      title="Text colours"
      intro="Four steps of grey, top to bottom — the only colours text is ever rendered in. Each step has one job. For size, weight and family, see the Typography canvas; this page is strictly about colour."
    >
      <Section
        title="Text ramp"
        description="Strongest at the top, faintest at the bottom. Primary carries headings and body copy. Soft sits one step quieter for subheadings. Quiet is captions and metadata. Faint is disabled-only — never used for live content."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Swatch name="Primary" value="#222222" note="Body copy, headings, primary labels." />
          <Swatch name="Soft" value="#484848" note="Subheadings and supporting copy." />
          <Swatch name="Quiet" value="#717171" note="Captions, hints, metadata, placeholders." />
          <Swatch name="Faint" value="#bbbbbb" note="Disabled state only. Never used for live content." />
        </div>
      </Section>

      <Section
        title="Hierarchy in body copy"
        description="The four steps applied to real paragraphs at their typical sizes. Each step is a deliberate signal — heading, supporting copy, metadata, disabled. Avoid skipping steps (no Quiet directly under Primary) and never invent a fifth shade."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.015em" }}>
            Coastal stone cottage with sea views
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 15, color: "#484848", margin: 0, lineHeight: 1.5 }}>
            A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water.
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>
            Hosted by Lucia R. · Superhost · Cinque Terre, Italy
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#bbbbbb", margin: 0 }}>
            This listing is no longer available
          </p>
        </div>
      </Section>

      <Section
        title="On Paper warm"
        description="The same four steps shown against Paper warm. All four pass WCAG AA at the body sizes they're paired with — Faint only when accompanied by an obvious disabled treatment."
      >
        <div style={{ background: "#f7f7f7", padding: 24, borderRadius: 12, display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0 }}>Heading · Primary</p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 15, color: "#484848", margin: 0 }}>
            Subheading · Soft. One step quieter than the heading above it.
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#717171", margin: 0 }}>
            Caption · Quiet. Metadata and supporting hints sit here.
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#bbbbbb", margin: 0 }}>
            Disabled · Faint. Locked controls only.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
