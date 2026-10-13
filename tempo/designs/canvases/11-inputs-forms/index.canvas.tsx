import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import {
  Search,
  Mail,
  Lock,
  Eye,
  Calendar,
  MapPin,
  AtSign,
  Phone,
  User,
  DollarSign,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Input } from '@/design-system/primitives/Input';
import { Button } from '@/design-system/primitives/Button';
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
  name: "11 · Inputs & Forms",
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

/* ── UI3-style section helpers ────────────────────────────────────── */

function InputSection({
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
      <div className="w-max"
        style={{ flex: 1, minHeight: 240, border: "1px solid #ebebeb", borderRadius: 8, padding: "32px 44px", background: "#f7f7f7", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}
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

function InputRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 200px",
        gap: 24,
        alignItems: "center",
        padding: "12px 0",
      }}
    >
      <p style={ROW_LABEL_STYLE}>{label}</p>
      <div style={{ width: 320 }}>{children}</div>
    </div>
  );
}

function InputRowWithCaption({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 200px",
        gap: 24,
        alignItems: "center",
        padding: "12px 0",
      }}
    >
      <p style={ROW_LABEL_STYLE}>{label}</p>
      <div style={{ width: 320 }}>{children}</div>
      <MonoText size={11} color="#717171">{caption}</MonoText>
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
      workspace="Workspace · 04"
      slug="inputs-forms.svg"
      title="Inputs & forms."
      description="One input primitive, six states, three affix patterns, and the forms composed from it. Labels above, help text below, errors in coral."
    />
  ),
  name: "00 · Cover",
  layout: { x: -157, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── 01 · Anatomy ────────────────────────────────────────────────── */
export const Anatomy: TempoStoryboard = {
  render: () => (
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
  ),
  name: "01 · Anatomy",
  layout: { x: 1330, y: 0, width: 1280, height: 1062, intrinsicSizing: "root-element" },
};

/* ── 02 · States ─────────────────────────────────────────────────── */
export const States: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="States"
      description="Six visual states — default, hover, focus, filled, disabled, error — plus the with-hint variant that wraps the field with help copy below."
    >
      <InputSection
        title="Default"
        description="The resting state. Light grey border, ink label above, ink-quiet placeholder inside."
      >
        <InputRowWithCaption label="Rest" caption="border-paper-deep">
          <Input label="Destination" placeholder="Search destinations" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Hover"
        description="Border darkens to ink-quiet as the cursor enters. Background stays white — the change is subtle on purpose."
      >
        <InputRowWithCaption label="Hover" caption="hover:border-ink-quiet">
          <Input label="Destination" placeholder="Search destinations" className="border-ink-quiet!" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Focus"
        description="Border goes ink, a 2px ring-3 of 6% black halo lifts the field off the surface. The single strongest signal in the system that this is where input goes."
      >
        <InputRowWithCaption label="Focus" caption="focus:border-ink + ring-3">
          <Input
            label="Destination"
            defaultValue="Lis"
            className="border-ink! shadow-[0_0_0_2px_rgba(0,0,0,0.06)]!"
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Filled"
        description="When a value is present. Same border weight as default — value alone signals progress."
      >
        <InputRowWithCaption label="Filled" caption="value present">
          <Input label="Destination" defaultValue="Lisbon, Portugal" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Disabled"
        description="50% opacity, cursor not-allowed. Used for fields locked by context — recipient on a message reply, promo not yet active."
      >
        <InputRowWithCaption label="Disabled" caption="opacity-50">
          <Input label="Promo code" placeholder="Coming soon" disabled />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Error"
        description="Border turns coral, error text replaces hint below. Reserve for genuine input errors — never for missing-required-field nags during typing."
      >
        <InputRowWithCaption label="Error · rest" caption="border-accent">
          <Input label="Email" defaultValue="not-an-email" error="Please enter a valid email" />
        </InputRowWithCaption>
        <InputRowWithCaption label="Error · focus" caption="ring 10% coral">
          <Input
            label="Email"
            defaultValue="not-an-email"
            error="Please enter a valid email"
            className="shadow-[0_0_0_2px_rgba(255,56,92,0.10)]!"
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="With hint"
        description="A short line of help under the field. 12px, ink-quiet — quieter than the input itself so it never competes."
      >
        <InputRowWithCaption label="Rest" caption="hint prop">
          <Input
            label="Phone number"
            placeholder="+1 555 0123"
            hint="We'll only use this to confirm your booking."
          />
        </InputRowWithCaption>
      </InputSection>
    </PageShell>
  ),
  name: "02 · States",
  layout: { x: 2660, y: 0, width: 1280, height: 2663, intrinsicSizing: "root-element" },
};

/* ── 03 · Affixes ────────────────────────────────────────────────── */
export const Affixes: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Affixes"
      description="Icons or short tokens sit inside the field. Prefix on the left previews context — Search, $, @. Suffix on the right signals state or an action — currency, eye toggle, check."
    >
      <InputSection
        title="Prefix"
        description="A 16px lucide icon at 14px from the left edge. Padding shifts to 40px so the value clears the icon. Always ink-quiet, never coral."
      >
        <InputRowWithCaption label="Search" caption="prefix · Search">
          <Input placeholder="Search destinations" prefix={<Search size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
        <InputRowWithCaption label="Currency" caption="prefix · $">
          <Input label="Nightly rate" defaultValue="180" prefix={<DollarSign size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
        <InputRowWithCaption label="Username" caption="prefix · @">
          <Input label="Username" defaultValue="maria.lisbon" prefix={<AtSign size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Suffix"
        description="An icon or short token on the right. Used for unit hints (nights, guests), state markers (check, error), or interactive togglers (eye for password reveal)."
      >
        <InputRowWithCaption label="Validated" caption="suffix · Check">
          <Input
            label="Email"
            defaultValue="maria@havn.com"
            suffix={<Check size={16} strokeWidth={2} className="text-emerald-500" />}
          />
        </InputRowWithCaption>
        <InputRowWithCaption label="Reveal" caption="suffix · Eye">
          <Input
            label="Password"
            type="password"
            defaultValue="••••••••"
            suffix={<Eye size={16} strokeWidth={1.75} />}
          />
        </InputRowWithCaption>
        <InputRowWithCaption label="Unit" caption="suffix · text">
          <Input label="Guests" defaultValue="4" suffix={<span style={{ fontSize: 13 }}>people</span>} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Prefix + suffix"
        description="Both ends styled. Padding adjusts to 40px on both sides. Common when a field carries unit context on one side and validation on the other."
      >
        <InputRowWithCaption label="Currency + check" caption="both ends">
          <Input
            label="Nightly rate"
            defaultValue="180"
            prefix={<DollarSign size={16} strokeWidth={1.75} />}
            suffix={<Check size={16} strokeWidth={2} className="text-emerald-500" />}
          />
        </InputRowWithCaption>
        <InputRowWithCaption label="Search + clear" caption="composed">
          <Input
            placeholder="Search"
            defaultValue="Lis"
            prefix={<Search size={16} strokeWidth={1.75} />}
            suffix={<span style={{ fontSize: 11, fontFamily: FONT_MONO }}>⌘ K</span>}
          />
        </InputRowWithCaption>
      </InputSection>
    </PageShell>
  ),
  name: "03 · Affixes",
  layout: { x: 3990, y: 0, width: 1280, height: 1520, intrinsicSizing: "root-element" },
};

/* ── 04 · Types ──────────────────────────────────────────────────── */
export const Types: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="Types"
      description="Native HTML input types, all wearing the same chrome. The browser handles keyboard, validation, and the OS-level helpers (autofill, datepicker, numeric keypad) — the design layer doesn't change."
    >
      <InputSection
        title="Text"
        description="The default. Plain text input — destinations, names, anything free-form."
      >
        <InputRowWithCaption label="Text" caption='type="text"'>
          <Input label="Full name" placeholder="Maria Costa" prefix={<User size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Email"
        description='type="email" — surfaces the @ key on mobile keyboards and enables browser-level email validation.'
      >
        <InputRowWithCaption label="Email" caption='type="email"'>
          <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Password"
        description='type="password" — characters mask as bullets. Pair with an eye suffix for a reveal toggle.'
      >
        <InputRowWithCaption label="Password" caption='type="password"'>
          <Input
            label="Password"
            type="password"
            defaultValue="••••••••••"
            prefix={<Lock size={16} strokeWidth={1.75} />}
            suffix={<Eye size={16} strokeWidth={1.75} />}
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Search"
        description='type="search" — UA-styled clear button on some browsers, "Search" enter key on mobile.'
      >
        <InputRowWithCaption label="Search" caption='type="search"'>
          <Input
            type="search"
            placeholder="Search destinations"
            prefix={<Search size={16} strokeWidth={1.75} />}
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Number"
        description='type="number" — numeric keypad on mobile, native spinner controls (hidden by Tailwind base styles by default).'
      >
        <InputRowWithCaption label="Number" caption='type="number"'>
          <Input label="Guests" type="number" defaultValue="2" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Tel"
        description='type="tel" — surfaces the dial pad on mobile. No format validation — pair with a format hint below.'
      >
        <InputRowWithCaption label="Tel" caption='type="tel"'>
          <Input
            label="Phone number"
            type="tel"
            placeholder="+1 555 0123"
            prefix={<Phone size={16} strokeWidth={1.75} />}
            hint="Include country code."
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Date"
        description='type="date" — opens the native datepicker. Use sparingly; the booking flow uses a custom calendar instead.'
      >
        <InputRowWithCaption label="Date" caption='type="date"'>
          <Input label="Check-in" type="date" defaultValue="2026-06-12" prefix={<Calendar size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>
    </PageShell>
  ),
  name: "04 · Types",
  layout: { x: 5320, y: 0, width: 1280, height: 2622, intrinsicSizing: "root-element" },
};

/* ── 05 · In situ ────────────────────────────────────────────────── */
export const InSitu: TempoStoryboard = {
  render: () => (
    <PageShell
      width={1280}
      title="In situ"
      description="Four real forms from the app. Each shows how labels, inputs, hints, and a primary action stack — and how the rhythm holds even as field count grows."
    >
      <InputSection
        title="Sign in"
        description="Two fields, primary action, ghost secondary. The simplest possible form — what most marketing pages settle on."
      >
        <div style={{ width: 380, background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
            Welcome back
          </p>
          <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={16} strokeWidth={1.75} />} />
          <Input label="Password" type="password" placeholder="••••••••" prefix={<Lock size={16} strokeWidth={1.75} />} suffix={<Eye size={16} strokeWidth={1.75} />} />
          <Button variant="primary">Continue</Button>
          <Button variant="ghost">Forgot password?</Button>
        </div>
      </InputSection>

      <InputSection
        title="Sign up"
        description="Four fields, one hint to set expectations on password strength, one primary CTA. Inline error on email if it's already taken."
      >
        <div style={{ width: 380, background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
            Create your account
          </p>
          <Input label="Full name" placeholder="Maria Costa" prefix={<User size={16} strokeWidth={1.75} />} />
          <Input
            label="Email"
            type="email"
            defaultValue="maria@havn.com"
            prefix={<Mail size={16} strokeWidth={1.75} />}
            error="Looks like you already have an account."
          />
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            prefix={<Lock size={16} strokeWidth={1.75} />}
            hint="Mix letters, numbers, and one symbol."
          />
          <Button variant="primary">Create account</Button>
        </div>
      </InputSection>

      <InputSection
        title="Send a host message"
        description="Recipient is locked (disabled), message is free-form, primary action sends. The shape that lives inside every booking conversation."
      >
        <div style={{ width: 460, background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <Eyebrow>Send a message</Eyebrow>
          <Input label="To" defaultValue="Maria · Lisbon host" disabled />
          <Input
            label="Message"
            placeholder="Hi Maria — quick question about check-in…"
            hint="Hosts usually reply within an hour."
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="ink">Send</Button>
          </div>
        </div>
      </InputSection>

      <InputSection
        title="Edit profile"
        description="A heavier form — six fields in a two-column grid. Affixes carry context: $ for rate, MapPin for city, @ for username."
      >
        <div style={{ width: 640, background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
            Edit your profile
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="First name" defaultValue="Maria" />
            <Input label="Last name" defaultValue="Costa" />
            <Input label="Username" defaultValue="maria.lisbon" prefix={<AtSign size={16} strokeWidth={1.75} />} />
            <Input label="City" defaultValue="Lisbon" prefix={<MapPin size={16} strokeWidth={1.75} />} />
            <Input label="Email" type="email" defaultValue="maria@havn.com" prefix={<Mail size={16} strokeWidth={1.75} />} suffix={<Check size={16} strokeWidth={2} className="text-emerald-500" />} />
            <Input label="Phone" type="tel" defaultValue="+351 912 345 678" prefix={<Phone size={16} strokeWidth={1.75} />} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button variant="ghost">Cancel</Button>
            <Button variant="ink">Save changes</Button>
          </div>
        </div>
      </InputSection>
    </PageShell>
  ),
  name: "05 · In situ",
  layout: { x: 6650, y: 0, width: 1280, height: 2459, intrinsicSizing: "root-element" },
};
