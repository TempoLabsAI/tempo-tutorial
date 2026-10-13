import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import {
  Search,
  Heart,
  Send,
  Plus,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { HeartButton } from '@/design-system/components/HeartButton';
import {
  CanvasCover,
  HavnMark,
  Eyebrow,
  MonoText,
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "09 · Buttons",
};

export default page;

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
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

/* ── UI3-style section helpers ────────────────────────────────────── */

function ButtonSection({
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
          minHeight: 320,
          border: "1px solid #ebebeb",
          borderRadius: 8,
          padding: "24px 44px",
          background: "#f7f7f7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const ROW_LABEL_STYLE: React.CSSProperties = {
  fontFamily: FONT_MONO,
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#888",
  margin: 0,
};

function ButtonRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="h-full"
      style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "center", padding: "16px 0" }}
    >
      <p style={ROW_LABEL_STYLE}>{label}</p>
      <div className="w-[163px]" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

function ButtonRowVertical({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="[&_button]:w-[200px]!"
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "16px 0",
      }}
    >
      <p style={ROW_LABEL_STYLE}>{label}</p>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

function PageShell({
  title,
  description,
  width,
  children,
}: {
  title: string;
  description?: string;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ width, background: DARK.paper, color: DARK.ink, padding: "72px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
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
      {description && (
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 15,
            color: DARK.inkQuiet,
            margin: "16px 0 56px",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 03"
      slug="buttons.svg"
      title="Buttons."
      description="Six variants, three sizes, six states. Coral primary for the one important action, ink for confirmations, outline-solid and secondary for everything else, destructive for danger, ghost for quiet."
    />
  ),
  name: "00 · Cover",
  layout: { x: -53, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Anatomy"
      description="Every button is built from the same parts — a pill container, an optional icon, and a label. Padding scales with size; the corner radius is constant at 8px."
    >
      <ButtonSection
        title="The parts"
        description="A container holds the label and optional icon. The icon previews the action; the label promises a result."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
            padding: "32px 24px",
          }}
        >
          <HMarker width={150}>auto · width</HMarker>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button variant="primary">
              <Heart size={16} strokeWidth={2} /> Save listing
            </Button>
            <VMarker height={44}>44 · h-11</VMarker>
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
            <span><span style={{ color: "#FF385C" }}>● </span>Container · rounded-lg, 8px radius</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Icon · 16×16, strokeWidth 2</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Gap · 8px (gap-2)</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Label · 14px, font-semibold</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Horizontal padding · 20px (px-5)</span>
            <span><span style={{ color: "#FF385C" }}>● </span>Active · scale-98 on press</span>
          </div>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Padding scale"
        description="Horizontal padding is the only thing that changes between sizes — small uses px-4, medium px-5, large px-6. Vertical height controls visual weight."
      >
        <ButtonRow label="Small · px-4">
          <Button variant="primary" size="sm">Small</Button>
          <MonoText size={11} color="#717171">size="sm" · h-9 · 16px h</MonoText>
        </ButtonRow>
        <ButtonRow label="Medium · px-5">
          <Button variant="primary" size="md">Medium</Button>
          <MonoText size={11} color="#717171">size="md" · h-11 · 20px h</MonoText>
        </ButtonRow>
        <ButtonRow label="Large · px-6">
          <Button variant="primary" size="lg">Large</Button>
          <MonoText size={11} color="#717171">size="lg" · h-12 · 24px h</MonoText>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  ),
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 1156, intrinsicSizing: "root-element" },
};

/* ── 02 · Variants ───────────────────────────────────────────────── */
export const Variants: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Variants"
      description="Each variant has a single job, and each carries the same set of states. Pair the right variant to the action and the page reads itself — never more than one primary per screen."
    >
      <ButtonSection
        title="Primary"
        description="Coral pink. The one most important action on a screen — Reserve, Book, Send. Use once per view, never more."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="primary">Reserve</Button>
          <MonoText size={11} color="#717171">bg-accent</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="primary" className="bg-accent-hover! shadow-sm!">Reserve</Button>
          <MonoText size={11} color="#717171">bg-accent-hover</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="primary" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Reserve</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="primary" disabled>Reserve</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Loading">
          <Button variant="primary" loading>Reserve</Button>
          <MonoText size={11} color="#717171">loading prop</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Ink"
        description="Charcoal. Confirmations and continue-style CTAs inside modals and flows where coral would be too loud."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="ink">Continue</Button>
          <MonoText size={11} color="#717171">bg-ink</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="ink" className="bg-ink-soft!">Continue</Button>
          <MonoText size={11} color="#717171">bg-ink-soft</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="ink" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Continue</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="ink" disabled>Continue</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Loading">
          <Button variant="ink" loading>Continue</Button>
          <MonoText size={11} color="#717171">loading prop</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Outline"
        description="Transparent with a grey border. Quiet secondary actions that don't need to compete — share, see all, learn more."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="outline">Share</Button>
          <MonoText size={11} color="#717171">border-paper-deep</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="outline" className="border-ink! bg-paper-warm/50!">Share</Button>
          <MonoText size={11} color="#717171">border-ink · bg-paper-warm/50</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="outline" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Share</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="outline" disabled>Share</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Secondary"
        description="Soft paper fill. For pairs of equal-weight options or filter controls where outline-solid reads as too wiry."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="secondary">Browse all</Button>
          <MonoText size={11} color="#717171">bg-paper-warm</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="secondary" className="bg-paper-dark!">Browse all</Button>
          <MonoText size={11} color="#717171">bg-paper-dark</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="secondary" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Browse all</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="secondary" disabled>Browse all</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Destructive"
        description="Same shape as ink. The label carries the warning — Cancel trip, Delete account. Always second to a confirm step."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="destructive">Cancel trip</Button>
          <MonoText size={11} color="#717171">bg-ink</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="destructive" className="bg-ink-soft!">Cancel trip</Button>
          <MonoText size={11} color="#717171">bg-ink-soft</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="destructive" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Cancel trip</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="destructive" disabled>Cancel trip</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Ghost"
        description="Transparent until hover. Inline links, dismissive actions, tertiary chrome that lives inside denser surfaces."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="ghost">Skip</Button>
          <MonoText size={11} color="#717171">transparent</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="ghost" className="bg-paper-warm!">Skip</Button>
          <MonoText size={11} color="#717171">bg-paper-warm</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="ghost" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Skip</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="ghost" disabled>Skip</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>
    </PageShell>
  ),
  name: "02 · Variants",
  layout: { x: 2660, y: 0, width: 1280, height: 3209, intrinsicSizing: "root-element" },
};

/* ── 03 · Sizes ──────────────────────────────────────────────────── */
export const Sizes: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Sizes"
      description="Three heights, scaled to context. Default to medium; reach for small in dense surfaces and large when a button needs to carry weight on its own."
    >
      <ButtonSection
        title="Small"
        description="36px tall. For dense surfaces — table rows, inline filter chips, secondary actions inside cards. The smallest target we ship."
      >
        <ButtonRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={92}>auto</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="primary" size="sm">Reserve</Button>
              <VMarker height={36}>36 · h-9</VMarker>
            </div>
          </div>
        </ButtonRow>
        <ButtonRow label="All variants">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="ink" size="sm">Ink</Button>
          <Button variant="outline" size="sm">Outline</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Medium"
        description="44px tall. The default. Use for nearly every action in the product — page CTAs, dialog footers, header actions."
      >
        <ButtonRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={104}>auto</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="primary" size="md">Reserve</Button>
              <VMarker height={44}>44 · h-11</VMarker>
            </div>
          </div>
        </ButtonRow>
        <ButtonRow label="All variants">
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="ink" size="md">Ink</Button>
          <Button variant="outline" size="md">Outline</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="ghost" size="md">Ghost</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Large"
        description="48px tall. Marketing rails, listing detail sticky CTAs, hero modules. Reach for it when a button needs to carry weight on its own."
      >
        <ButtonRow label="Measure">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <HMarker width={120}>auto</HMarker>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Button variant="primary" size="lg">Reserve</Button>
              <VMarker height={48}>48 · h-12</VMarker>
            </div>
          </div>
        </ButtonRow>
        <ButtonRow label="All variants">
          <Button variant="primary" size="lg">Primary</Button>
          <Button variant="ink" size="lg">Ink</Button>
          <Button variant="outline" size="lg">Outline</Button>
          <Button variant="secondary" size="lg">Secondary</Button>
          <Button variant="ghost" size="lg">Ghost</Button>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  ),
  name: "03 · Sizes",
  layout: { x: 3990, y: 0, width: 1280, height: 1939, intrinsicSizing: "root-element" },
};

/* ── 04 · Icons ──────────────────────────────────────────────────── */
export const Icons: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Icons"
      description="All icons come from lucide-react at 16×16, strokeWidth 2. They inherit the label colour and sit on either side of the label — or stand alone."
    >
      <ButtonSection
        title="Leading icon"
        description="The most common pattern. The icon previews the action — search, save, send, add. Always 8px before the label."
      >
        <ButtonRow label="Default">
          <Button variant="primary"><Search size={16} strokeWidth={2} /> Search</Button>
          <Button variant="outline"><Heart size={16} strokeWidth={2} /> Save</Button>
          <Button variant="ink"><Send size={16} strokeWidth={2} /> Send</Button>
          <Button variant="ghost"><Plus size={16} strokeWidth={2} /> Add guest</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Trailing icon"
        description="Used when the icon points forward — Continue, Next, drop-down chevrons. Sits 8px after the label."
      >
        <ButtonRow label="Default">
          <Button variant="primary">Continue <ArrowRight size={16} strokeWidth={2} /></Button>
          <Button variant="ink">Next <ArrowRight size={16} strokeWidth={2} /></Button>
          <Button variant="outline">Filters <ChevronDown size={16} strokeWidth={2} /></Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Icon only"
        description="One exception to label-first buttons: the HeartButton. The heart is a universally read save action, so the icon alone carries the meaning. Every other action ships with a label. See the Components canvas for the full HeartButton breakdown."
      >
        <ButtonRow label="On imagery">
          <div style={{ background: "#222222", padding: 16, borderRadius: 12, display: "flex", gap: 16, alignItems: "center" }}>
            <HeartButton saved={false} size="md" surface="overlay" />
            <HeartButton saved={true} size="md" surface="overlay" />
          </div>
          <MonoText size={11} color="#717171">surface="overlay"</MonoText>
        </ButtonRow>
        <ButtonRow label="On paper">
          <div style={{ background: "#fff", padding: 12, borderRadius: 8, display: "flex", gap: 16, alignItems: "center", border: "1px solid #ebebeb" }}>
            <HeartButton saved={false} size="md" surface="inline" />
            <HeartButton saved={true} size="md" surface="inline" />
          </div>
          <MonoText size={11} color="#717171">surface="inline"</MonoText>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  ),
  name: "04 · Icons",
  layout: { x: 5320, y: 0, width: 1280, height: 1522, intrinsicSizing: "root-element" },
};

/* ── 05 · Content ────────────────────────────────────────────────── */
export const Content: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Content"
      description="A button label is a promise. Start with a verb, keep it under three words, and write what happens next."
    >
      <ButtonSection
        title="Use action verbs"
        description="Start with a verb that names the result — Reserve, Send, Continue. Avoid 'Click here', 'Submit', or vague nouns."
      >
        <ButtonRow label="Do">
          <Button variant="primary">Reserve</Button>
          <Button variant="ink">Send message</Button>
          <Button variant="outline">Save listing</Button>
        </ButtonRow>
        <ButtonRow label="Don't">
          <Button variant="primary" className="opacity-60!">Submit</Button>
          <Button variant="ink" className="opacity-60!">OK</Button>
          <Button variant="outline" className="opacity-60!">Click here</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Keep it short"
        description="One to three words. If the label needs more, the page needs a sentence around it — not a longer button."
      >
        <ButtonRow label="Do">
          <Button variant="primary">Confirm trip</Button>
          <Button variant="ink">Add guests</Button>
        </ButtonRow>
        <ButtonRow label="Don't">
          <Button variant="primary" className="opacity-60!">Confirm your trip details now</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Sentence case"
        description="Capitalise only the first word, plus proper nouns. No title case, no all caps — buttons read as quiet directives, not headlines."
      >
        <ButtonRow label="Do">
          <Button variant="primary">Reserve stay</Button>
          <Button variant="ink">Add to wishlist</Button>
        </ButtonRow>
        <ButtonRow label="Don't">
          <Button variant="primary" className="opacity-60!">Reserve Stay</Button>
          <Button variant="ink" className="opacity-60!">ADD TO WISHLIST</Button>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  ),
  name: "05 · Content",
  layout: { x: 6650, y: 0, width: 1280, height: 1632, intrinsicSizing: "root-element" },
};

/* ── 06 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <div
      className="w-[1020px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: "72px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
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
          margin: "0 0 16px",
          lineHeight: 1.05,
          outline: "none",
        }}
      >
        In situ
      </h1>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          color: DARK.inkQuiet,
          margin: "0 0 40px",
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      >
        Where each variant lives in the product. Primary on the booking card; ink in empty states; destructive in confirms; ghost as inline cancel.
      </p>

      <ButtonSection
        title="With icon"
        description="Most action buttons in the app pair a lucide icon with the label. The icon sits 8px before the text and matches the label colour."
      >
        <div className="w-[200px]" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="primary"><Search size={16} strokeWidth={2} /> Search</Button>
          <Button variant="outline"><Heart size={16} strokeWidth={2} /> Save</Button>
          <Button variant="ink"><Send size={16} strokeWidth={2} /> Send</Button>
          <Button variant="ghost"><Plus size={16} strokeWidth={2} /> Add guest</Button>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Booking card"
        description="The Reserve action — the most important coral primary button in the app. Pinned to the bottom of the sticky booking card on every listing detail page."
      >
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, width: 320 }}>
          <p style={{ fontSize: 13, color: "#717171", margin: 0, fontFamily: FONT_SANS }}>Apr 12 — Apr 18 · 2 guests</p>
          <p style={{ fontSize: 22, fontWeight: 600, color: "#222", margin: "4px 0 14px", fontFamily: FONT_SANS }}>$1,284 total</p>
          <Button variant="primary">Reserve</Button>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Empty state"
        description="A single ink button under the icon + copy. Sits at the bottom of every empty wishlist, message inbox, and trips list — the way back to action."
      >
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 360, textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>No saved places yet</p>
          <p style={{ fontSize: 13, color: "#717171", margin: "6px 0 16px", fontFamily: FONT_SANS }}>Tap the heart on a listing to save it here.</p>
          <Button variant="ink">Browse stays</Button>
        </div>
      </ButtonSection>

      <ButtonSection
        title="Destructive confirm"
        description="A destructive primary inside a modal, always paired with a ghost or outline-solid cancel. Cancel sits on the left, the destructive action on the right."
      >
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, width: 380 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>Cancel this trip?</p>
          <p style={{ fontSize: 13, color: "#717171", margin: "6px 0 18px", fontFamily: FONT_SANS }}>You'll get a full refund. Your host will be notified right away.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="ghost">Keep trip</Button>
            <Button variant="destructive">Cancel trip</Button>
          </div>
        </div>
      </ButtonSection>
    </div>
  ),
  name: "06 · In situ",
  layout: { x: 7980, y: 0, width: 1020, height: 1915, intrinsicSizing: "root-element" },
};
