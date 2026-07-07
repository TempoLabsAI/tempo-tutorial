import { Input } from '@/design-system/primitives/Input';
import { FONT_MONO } from '@/design-system/canvas-chrome';
import { InputSection, PageShell } from './_helpers';

/* ── Measurement markers — coral chip + bracket, UI3 style ────────── */

const MARKER_CHIP: React.CSSProperties = {
  background: "#FF385C",
  color: "#fff",
  fontFamily: FONT_MONO,
  fontSize: 10,
  fontWeight: 600,
  padding: "1px 6px",
  borderRadius: 2,
  lineHeight: 1.3,
};

function HMarker({ width, children }: { width: number; children: React.ReactNode }) {
  return (
    <div className="w-max" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span style={MARKER_CHIP}>{children}</span>
      <div style={{ width, display: "flex", alignItems: "center" }}>
        <div style={{ width: 1, height: 5, background: "#FF385C" }} />
        <div style={{ flex: 1, height: 1, background: "#FF385C" }} />
        <div style={{ width: 1, height: 5, background: "#FF385C" }} />
      </div>
    </div>
  );
}

function VMarker({ height, children }: { height: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ height, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 5, height: 1, background: "#FF385C" }} />
        <div style={{ flex: 1, width: 1, background: "#FF385C" }} />
        <div style={{ width: 5, height: 1, background: "#FF385C" }} />
      </div>
      <span style={MARKER_CHIP}>{children}</span>
    </div>
  );
}

export default function AnatomyBoard() {
  return (
    <PageShell
      width={1280}
      title="Anatomy"
      description="Four parts, top to bottom: label, field, and either a hint or an error. The field is a 48px-tall pill with 14px horizontal padding and an 8px corner radius."
    >
      <InputSection
        title="The parts"
        description="Label sits above. The field is the input itself. Hint or error sits below — never both at once."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
            padding: "16px 24px",
          }}
        >
          <HMarker width={320}>320 · w-80</HMarker>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 320 }}>
              <Input label="Destination" placeholder="Search destinations" hint="Where are you going?" />
            </div>
            <VMarker height={84}>84 · stacked</VMarker>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 24px",
              marginTop: 16,
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: "#717171",
            }}
          >
            <span><span style={{ color: "#FF385C" }}>● </span>Label · 12px, font-semibold, text-ink</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Field · h-12, rounded-lg, border-paper-deep</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Padding · 14px horizontal (px-3.5)</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Text · 14px, text-ink</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Placeholder · text-ink-quiet</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Hint · 12px, text-ink-quiet</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Label↔field gap · 6px (gap-1.5)</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Focus · ring 2px / 6% black</span>
          </div>
        </div>
      </InputSection>

      <InputSection
        title="Dimensions"
        description="The field is 48px tall everywhere it appears. Width flexes to the column it lives in — narrow on a sign-in card, wide in profile settings."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 320 }}>
              <Input label="Email" placeholder="you@example.com" />
            </div>
            <VMarker height={48}>48 · h-12</VMarker>
          </div>
          <HMarker width={320}>w · flexes to column</HMarker>
        </div>
      </InputSection>
    </PageShell>
  );
}
