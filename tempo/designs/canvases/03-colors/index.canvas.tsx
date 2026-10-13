import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { Heart, Search, Calendar, Check, Star } from 'lucide-react';
import { TitleSpread, HavnMark, MonoText, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';
import { Button } from '@/design-system/primitives/Button';
import { Badge } from '@/design-system/primitives/Badge';

const page: TempoPage = {
  name: "03 · Colors",
};

export default page;

/* ── Page shell — dark canvas with HavnMark, H1, intro ────────────── */
function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: 1280,
        background: DARK.paper,
        color: DARK.ink,
        padding: "72px 72px 56px",
        fontFamily: FONT_SANS,
        position: "relative",
      }}
    >
      <HavnMark />
      <h1
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily: FONT_SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: 0,
          lineHeight: 1.05,
          outline: "none",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          color: DARK.inkQuiet,
          margin: "16px 0 24px",
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      >
        {intro}
      </p>
      {children}
    </div>
  );
}

/* ── Section — label-left / panel-right ──────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "44px 0",
        borderTop: `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 8 }}>
        <h2
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13.5,
            color: DARK.inkQuiet,
            margin: "12px 0 0",
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          border: "1px solid #ebebeb",
          borderRadius: 8,
          padding: "32px 32px",
          background: "#f7f7f7",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Swatch — square color tile with name, hex, optional usage note ── */
function Swatch({
  name,
  value,
  note,
  textColor = "#222",
}: {
  name: string;
  value: string;
  note?: string;
  textColor?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: value,
          height: 120,
          borderRadius: 12,
          border: value === "#ffffff" ? "1px solid #ebebeb" : "none",
        }}
      />
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: textColor, margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>{value}</p>
        {note && (
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── PairSwatch — semantic pair (background + foreground) ────────── */
function PairSwatch({
  name,
  bg,
  fg,
  note,
}: {
  name: string;
  bg: string;
  fg: string;
  note: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: bg,
          color: fg,
          height: 120,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_SANS,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {name}
      </div>
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
          bg {bg} · fg {fg}
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
          {note}
        </p>
      </div>
    </div>
  );
}

/* ── MiniSwatch — compact tile used in the full-palette overview ───── */
function MiniSwatch({
  name,
  value,
  border,
  textColor = "#222",
}: {
  name: string;
  value: string;
  border?: boolean;
  textColor?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          background: value,
          height: 72,
          borderRadius: 10,
          border: border ? "1px solid #ebebeb" : "none",
        }}
      />
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 600, color: textColor, margin: 0, lineHeight: 1.2 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: "2px 0 0" }}>{value}</p>
      </div>
    </div>
  );
}

/* ── PaletteGroup — a labeled row of MiniSwatches in the full-palette view ── */
function PaletteGroup({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
          {label}
        </p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, color: "#717171", margin: 0 }}>
          {count} tokens
        </p>
      </div>
      {children}
    </div>
  );
}

/* ── IconSwatch — icon rendered in the token's colour on a paper tile ── */
function IconSwatch({
  name,
  value,
  surface = "#ffffff",
  note,
  icon: Icon = Heart,
}: {
  name: string;
  value: string;
  surface?: string;
  note?: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: surface,
          height: 120,
          borderRadius: 12,
          border: surface === "#ffffff" ? "1px solid #ebebeb" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={28} strokeWidth={1.75} color={value} />
      </div>
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>{value}</p>
        {note && (
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── BorderSwatch — a paper card rendered with the token's border colour ── */
function BorderSwatch({
  name,
  value,
  note,
  weight = 1,
  ring,
}: {
  name: string;
  value: string;
  note?: string;
  weight?: number;
  ring?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: "#ffffff",
          height: 120,
          borderRadius: 12,
          border: `${weight}px solid ${value}`,
          boxShadow: ring ? `0 0 0 4px ${value}1A` : undefined,
        }}
      />
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>{value}</p>
        {note && (
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Workspace · 01"
      title={<>Color.</>}
      caption="Four surfaces, four text steps, one coral accent, four state pairs. Read top to bottom — Paper sets the canvas, text colours carry hierarchy, the accent fires the one important action per screen, system states flag the rest."
      meta={[
        { label: "Surfaces", value: "4" },
        { label: "Text steps", value: "4" },
        { label: "System states", value: "4" },
        { label: "Tiers", value: "2" },
      ]}
    />
  ),
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1280, height: 540 },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Anatomy"
      intro="Three roles. Surface holds the page, Text carries the words, Accent fires the one most-important action — and 'one' is the rule, captured in Restraint below. Every other colour is either a step within those roles or a system-state flag layered on top."
    >
      <Section
        title="Three roles"
        description="The minimum vocabulary for a page. Pick a surface, set the ink, place an accent — you have a button, a card, a screen."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
              Surface
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 600, color: "#222", margin: 0 }}>Paper</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>
              The page itself. Mostly white. Goes warmer to lift sections and deeper for chrome.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
              Text
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 600, color: "#222", margin: 0 }}>Words on the page</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>
              Four steps from the strongest body text down to a faint disabled state.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
              Accent
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 600, color: "#FF385C", margin: 0 }}>Coral, used sparingly</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0, lineHeight: 1.5 }}>
              One Reserve button per page. The single loudest mark on the screen.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Restraint"
        description="The rule that defines the Accent role. One coral per screen — Reserve is the canonical use. Everything else picks Ink or Outline so the accent stays the loudest mark on the page."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary">Reserve</Button>
          <Button variant="ink">Continue</Button>
          <Button variant="outline">Share</Button>
          <Button variant="ghost">Skip</Button>
          <MonoText size={11} color="#717171">↑ one primary · the rest are quieter</MonoText>
        </div>
      </Section>

      <Section
        title="Hierarchy by contrast"
        description="The text ramp shown at the sizes each step is paired with. Strongest on top, faintest on the bottom. The system never gets lighter than #bbbbbb on white — under that, the legibility falls off."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "#fff", padding: 24, borderRadius: 12 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, color: "#222222", margin: 0 }}>
            Primary · body & headings
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 500, color: "#484848", margin: 0 }}>
            Soft · supporting copy
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#717171", margin: 0 }}>
            Quiet · captions, hints, metadata
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#bbbbbb", margin: 0 }}>
            Faint · disabled state only
          </p>
        </div>
      </Section>

      <Section
        title="The full palette"
        description="Every token in the system on one screen. Four groups, eighteen colours. The detail sections that follow zoom in on each — here, you see the whole thing at once."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <PaletteGroup label="Surface" count={4}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Paper" value="#ffffff" border />
              <MiniSwatch name="Paper warm" value="#f7f7f7" />
              <MiniSwatch name="Paper deep" value="#dddddd" />
              <MiniSwatch name="Hairline" value="#ebebeb" />
            </div>
          </PaletteGroup>

          <PaletteGroup label="Text" count={4}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Primary" value="#222222" />
              <MiniSwatch name="Soft" value="#484848" />
              <MiniSwatch name="Quiet" value="#717171" />
              <MiniSwatch name="Faint" value="#bbbbbb" />
            </div>
          </PaletteGroup>

          <PaletteGroup label="Accent" count={2}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Accent" value="#FF385C" />
              <MiniSwatch name="Accent hover" value="#E31C5F" />
            </div>
            <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "12px 0 0", lineHeight: 1.55, maxWidth: 640 }}>
              Used sparingly — one coral per screen, only on the most important action (Reserve, Book, Send). The hover step is ~6% darker. Holds its weight on every surface, including imagery.
            </p>
          </PaletteGroup>

          <PaletteGroup label="System states · bg + fg pairs" count={8}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <MiniSwatch name="Success bg" value="#e8f5e9" />
              <MiniSwatch name="Warning bg" value="#fff3e0" />
              <MiniSwatch name="Error bg" value="#ffebee" />
              <MiniSwatch name="Gold bg" value="#fef7e0" />
              <MiniSwatch name="Success fg" value="#1b5e20" />
              <MiniSwatch name="Warning fg" value="#e65100" />
              <MiniSwatch name="Error fg" value="#b71c1c" />
              <MiniSwatch name="Gold fg" value="#7d5a00" />
            </div>
          </PaletteGroup>
        </div>
      </Section>
    </PageShell>
  ),
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 2409, intrinsicSizing: "root-element" },
};

/* ── 03 · Surfaces ───────────────────────────────────────────────── */
export const Surfaces: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Surfaces"
      intro="Four surface tokens cover every backdrop in the app. Paper is the default page. Paper warm lifts sections and cards. Paper deep is for chrome and the dark divisions inside images. Hairline is the one-pixel border that separates everything."
    >
      <Section
        title="Surface ramp"
        description="The four stops, lightest to deepest. Paper carries the page, Paper warm gives sections a quiet lift, Paper deep is reserved for chrome and decorative dividers."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Swatch name="Paper" value="#ffffff" note="The default page background." />
          <Swatch name="Paper warm" value="#f7f7f7" note="Section lifts · card hovers · inline panels." />
          <Swatch name="Paper deep" value="#dddddd" note="Chrome, image placeholders, dividers in dense rows." />
          <Swatch name="Hairline" value="#ebebeb" note="The one-pixel border. Used on cards, inputs, rows." />
        </div>
      </Section>

      <Section
        title="Paper warm in use"
        description="What it looks like when a section lifts off the page. Same content, just a warmer surface — enough to read as 'a different thing' without a heavy border."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
          <div style={{ background: "#f7f7f7", padding: 24, borderRadius: 10 }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>
              Things you might like
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "6px 0 0", lineHeight: 1.5 }}>
              A panel sitting on Paper warm. Reads as elevated without the cost of a shadow.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "03 · Surfaces",
  layout: { x: 3990, y: 0, width: 1280, height: 970, intrinsicSizing: "root-element" },
};

/* ── 04 · Text colours ───────────────────────────────────────────── */
export const TextColours: TempoStoryboard = {
  render: () => (
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
  ),
  name: "04 · Text colours",
  layout: { x: 5320, y: 0, width: 1280, height: 1346, intrinsicSizing: "root-element" },
};

/* ── 02 · System states ──────────────────────────────────────────── */
export const SystemStates: TempoStoryboard = {
  render: () => (
    <PageShell
      title="System states"
      intro="Four background/foreground pairs that flag a state. Success for confirmed, Warning for time-sensitive, Error for failure, Gold for Superhost identity. They live almost entirely inside Badges — chrome and body text never adopt them."
    >
      <Section
        title="State pairs"
        description="Each pair is one tint and one ink darker than 4.5:1 contrast. Designed to be readable at 12px in a pill, against the bright surface of the badge."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <PairSwatch
            name="Success"
            bg="#e8f5e9"
            fg="#1b5e20"
            note="Confirmed bookings · payment received · 'check-in complete'."
          />
          <PairSwatch
            name="Warning"
            bg="#fff3e0"
            fg="#e65100"
            note="Time-sensitive — 'check-in today', 'expires soon', incomplete profile."
          />
          <PairSwatch
            name="Error"
            bg="#ffebee"
            fg="#b71c1c"
            note="Cancelled bookings · payment failed · validation errors."
          />
          <PairSwatch
            name="Gold"
            bg="#fef7e0"
            fg="#7d5a00"
            note="Superhost identity — host-tier signal. Never used for state."
          />
        </div>
      </Section>

      <Section
        title="In badges"
        description="Where the state pairs actually live. The badge is the only chrome that adopts a state colour — outside of it, status is communicated with copy alone."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <Badge variant="success">Confirmed</Badge>
          <Badge variant="warning" pulse>Check-in today</Badge>
          <Badge variant="error">Cancelled</Badge>
          <Badge variant="gold">Superhost</Badge>
          <Badge variant="accent">Guest favourite</Badge>
          <Badge variant="ink">Ink</Badge>
          <Badge variant="muted">Past</Badge>
          <Badge variant="default">Default</Badge>
        </div>
      </Section>
    </PageShell>
  ),
  name: "02 · System states",
  layout: { x: 2660, y: 0, width: 1280, height: 890, intrinsicSizing: "root-element" },
};

/* ── 05 · Icon colours ───────────────────────────────────────────── */
export const IconColours: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Icon colours"
      intro="Icons inherit colour from the label they sit beside — there isn't a separate icon palette. The five tokens below are the only colours an icon is ever rendered in. Stroke width 1.75–2, never filled (except the saved heart and rating star)."
    >
      <Section
        title="The five tokens"
        description="Default for primary actions, soft and quiet for supporting roles, accent for the one important saved state, on-dark for icons that overlay imagery. Disabled is a deliberate fifth — only used on locked controls."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          <IconSwatch icon={Search} name="Default" value="#222222" note="Buttons, input affixes, primary nav. The same as Ink." />
          <IconSwatch icon={Calendar} name="Soft" value="#484848" note="Section headers, dense rows beside a label." />
          <IconSwatch icon={Star} name="Quiet" value="#717171" note="Captions, hints, metadata. The same as Ink quiet." />
          <IconSwatch icon={Heart} name="Accent" value="#FF385C" note="The saved heart, error states, the one CTA per page." />
          <IconSwatch icon={Heart} name="On dark" value="#ffffff" surface="#222222" note="Icons on imagery or the dark chrome of an overlay button." />
        </div>
      </Section>

      <Section
        title="Inheriting label colour"
        description="In practice every icon is paired with text. The icon almost always picks up the text's colour — never the other way around. If the label is Ink soft, the icon is Ink soft."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#222", fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600 }}>
            <Search size={18} strokeWidth={1.75} /> Search destinations
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#484848", fontFamily: FONT_SANS, fontSize: 14 }}>
            <Calendar size={16} strokeWidth={1.75} /> Jun 8 – 13 · 5 nights
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#717171", fontFamily: FONT_SANS, fontSize: 13 }}>
            <Star size={14} strokeWidth={1.75} /> 4.97 · 184 reviews
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#FF385C", fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600 }}>
            <Heart size={14} strokeWidth={2} fill="#FF385C" /> Saved to wishlist
          </div>
        </div>
      </Section>

      <Section
        title="Filled exceptions"
        description="Two icons break the stroke-only rule because their meaning depends on it. The heart fills with Accent when saved, and the rating star is always filled Ink."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Heart size={24} strokeWidth={2} fill="#FF385C" color="#FF385C" />
            <MonoText size={11} color="#717171">heart · fill-accent</MonoText>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Star size={24} strokeWidth={2} fill="#222" color="#222" />
            <MonoText size={11} color="#717171">star · fill-ink</MonoText>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Check size={24} strokeWidth={2.5} color="#1b5e20" />
            <MonoText size={11} color="#717171">check · success fg</MonoText>
          </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "05 · Icon colours",
  layout: { x: 6650, y: 0, width: 1280, height: 1236, intrinsicSizing: "root-element" },
};

/* ── 06 · Borders ────────────────────────────────────────────────── */
export const Borders: TempoStoryboard = {
  render: () => (
    <PageShell
      title="Borders"
      intro="Five border tokens. Hairline is the default everywhere — cards, inputs, list rows. Stronger steps appear only when state changes: focus turns the border ink and adds a faint ring; error turns it coral; selected fills the surface. Deep is reserved for decorative dividers."
    >
      <Section
        title="The ramp"
        description="From lightest to strongest. Hairline lives on resting components. Paper deep is one step heavier for decorative use. Ink quiet is the hover state. Ink is focus. Accent is the error border."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          <BorderSwatch name="Hairline" value="#ebebeb" note="The default border. Cards, inputs, table rows." />
          <BorderSwatch name="Paper deep" value="#dddddd" note="Decorative dividers. Slightly heavier than hairline." />
          <BorderSwatch name="Ink quiet" value="#717171" note="Hover state on inputs and outline-solid buttons." />
          <BorderSwatch name="Ink" value="#222222" weight={2} ring note="Focus state. 2px border plus a 6%-black ring." />
          <BorderSwatch name="Accent" value="#FF385C" weight={2} ring note="Error border. 2px coral plus a 10%-coral ring." />
        </div>
      </Section>

      <Section
        title="Default → hover → focus"
        description="The same input rendered in three states. Hairline at rest, Ink quiet on hover, Ink + ring-3 on focus. The border is the entire state signal — nothing else changes."
      >
        <div style={{ background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Rest</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
              Search destinations
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Hover</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "1px solid #717171", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
              Search destinations
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Focus</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "2px solid #222222", boxShadow: "0 0 0 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
              Lis
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: 0, width: 80 }}>Error</p>
            <div style={{ width: 320, height: 44, borderRadius: 10, border: "2px solid #FF385C", boxShadow: "0 0 0 2px rgba(255,56,92,0.10)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
              not-an-email
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="On the page"
        description="A small composition that uses four border tokens at once — Hairline on the card, Hairline on the input, Ink on the focused input, Paper deep on the decorative divider."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #ebebeb", display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>Where to?</p>
            <div style={{ width: "100%", height: 44, borderRadius: 10, border: "2px solid #222222", boxShadow: "0 0 0 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
              Lisbon, Portugal
            </div>
            <div style={{ height: 1, background: "#dddddd", margin: "8px 0" }} />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, height: 44, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
                Jun 8
              </div>
              <div style={{ flex: 1, height: 44, borderRadius: 10, border: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#717171" }}>
                Jun 13
              </div>
            </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "06 · Borders",
  layout: { x: 7980, y: 0, width: 1280, height: 1499, intrinsicSizing: "root-element" },
};

/* ── 07 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <PageShell
      title="In situ"
      intro="The full system on a single card — the place where every token earns its keep. Surface holds the panel, Text carries the title and host name, Accent fires the Reserve button, System states flag the status."
    >
      <Section
        title="A booking card"
        description="One real composition. Try counting the tokens: four surfaces, three text steps, one accent button, two state badges. Nothing else is invented."
      >
        <div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
          <div style={{ width: 420, background: "#fff", border: "1px solid #ebebeb", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ height: 220, background: "#dddddd", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
                <Badge variant="gold">Superhost</Badge>
                <Badge variant="accent">Guest favourite</Badge>
              </div>
            </div>
            <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0 }}>
                Coastal stone cottage with sea views
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#484848", margin: 0 }}>Cinque Terre, Italy</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>Hosted by Lucia R.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 15, color: "#222", margin: 0 }}>
                  <span style={{ fontWeight: 600 }}>$248</span>{" "}
                  <span style={{ color: "#717171" }}>· night</span>
                </p>
                <Button variant="primary">Reserve</Button>
              </div>
              <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#bbbbbb", margin: "12px 0 0" }}>
                Disabled · Ink faint
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  ),
  name: "07 · In situ",
  layout: { x: 9310, y: 0, width: 1280, height: 909, intrinsicSizing: "root-element" },
};
