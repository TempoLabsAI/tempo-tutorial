import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import {
  Search,
  Heart,
  Plus,
  Send,
  Share,
  Bookmark,
  X,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Menu,
  MapPin,
  Globe,
  Award,
  Star,
  Users,
  Settings,
  Calendar,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Bell,
  Filter,
  Check,
  Building2,
  Castle,
  Mountain,
  Tent,
  TreePine,
  Waves,
  Wifi,
  Key,
  UtensilsCrossed,
  Smartphone,
  Lock,
} from 'lucide-react';
import {
  CanvasCover,
  HavnMark,
  MonoText,
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';
import { HeartButton } from '@/design-system/components/HeartButton';
import { LISTINGS } from '@/data/listings';

const page: TempoPage = {
  name: "06 · Icons & Imagery",
};

export default page;

/* ── 00 · Cover ──────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <CanvasCover
      workspace="Workspace · 12"
      slug="icons-and-imagery.svg"
      title="Icons & imagery."
      description="The visual atoms, ordered by what appears first when scrolling top to bottom. Icons — six lucide-react categories at 16, 20, and 24, stroke 2, inheriting label colour. Imagery — three approved aspect ratios, the listing-detail gallery grid, and the heart and 'Guest favourite' overlay pair."
    />
  ),
  name: "00 · Cover",
  layout: { x: 0, y: -2, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

/* ── Icon cell helper ────────────────────────────────────────────── */

function IconCell({ icon: Icon, name, size }: { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; name: string; size: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "24px 8px",
        border: `1px solid ${DARK.hairline}`,
        borderRadius: 10,
        background: DARK.paperRaised,
        aspectRatio: "1 / 1",
      }}
    >
      <Icon size={size} strokeWidth={2} />
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          color: DARK.inkQuiet,
          margin: 0,
          letterSpacing: "0",
        }}
      >
        {name}
      </p>
    </div>
  );
}

function IconSection({
  title,
  description,
  continuation,
  children,
}: {
  title: string;
  description: string;
  /** When true, the section follows another of the same size — drop the divider and tighten the top padding so the group reads as one block. */
  continuation?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t"
      style={{ display: "flex", gap: 56, alignItems: "flex-start", padding: continuation ? "16px 0 44px" : "44px 0", borderTop: continuation ? "none" : `1px solid ${DARK.hairline}` }}
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
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Section helper — label-left / arbitrary-content-right (no grid enforced).
   Used by the Imagery storyboard whose sections have varying content layouts. */
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
          padding: "32px 44px",
          background: "#f7f7f7",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SizePage({
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
      <p className="mb-[52px] pb-[32px]"
        style={{ fontFamily: FONT_SANS, fontSize: 15, color: DARK.inkQuiet, margin: "16px 0 24px", lineHeight: 1.6, maxWidth: 540 }}
      >
        {intro}
      </p>
      {children}
    </div>
  );
}

/* Big size header (same scale as the page H1) — sits above each pair of sections. */
function SizeHeader({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    <div className="pt-[52px] pb-[24px] border-t"
      style={{ marginTop: first ? 0 : 24, borderTop: first ? "none" : `1px solid ${DARK.hairline}` }}
    >
      <h2
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily: FONT_SANS,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: 0,
          lineHeight: 1.05,
          outline: "none",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ── 01 · Icons ──────────────────────────────────────────────────── */
export const Icons: TempoStoryboard = {
  render: () => (
    <SizePage
      title="Icons"
      intro="Every icon in Havn comes from lucide-react. Three sizes — 16 inside buttons and dense rows, 20 in headers and filter chips, 24 in empty states and amenity rows. Stroke width 2, inheriting label colour."
    >
      <SizeHeader first>16</SizeHeader>
      <IconSection
        title="Actions · 16"
        description="Verbs paired with button labels. 16×16, used inside buttons and dense rows."
        continuation
      >
        <IconCell icon={Search} name="Search" size={16} />
        <IconCell icon={Heart} name="Heart" size={16} />
        <IconCell icon={Plus} name="Plus" size={16} />
        <IconCell icon={Send} name="Send" size={16} />
        <IconCell icon={Share} name="Share" size={16} />
        <IconCell icon={Bookmark} name="Bookmark" size={16} />
        <IconCell icon={X} name="X" size={16} />
        <IconCell icon={Check} name="Check" size={16} />
      </IconSection>

      <IconSection
        title="Navigation · 16"
        description="Chevrons, arrows, the menu trigger. The same 16×16 as actions — they share button rows."
        continuation
      >
        <IconCell icon={ChevronLeft} name="ChevronLeft" size={16} />
        <IconCell icon={ChevronRight} name="ChevronRight" size={16} />
        <IconCell icon={ChevronUp} name="ChevronUp" size={16} />
        <IconCell icon={ChevronDown} name="ChevronDown" size={16} />
        <IconCell icon={ArrowLeft} name="ArrowLeft" size={16} />
        <IconCell icon={ArrowRight} name="ArrowRight" size={16} />
        <IconCell icon={Menu} name="Menu" size={16} />
        <IconCell icon={MapPin} name="MapPin" size={16} />
        <IconCell icon={Globe} name="Globe" size={16} />
      </IconSection>

      <SizeHeader>20</SizeHeader>
      <IconSection
        title="Identity & status · 20"
        description="Tier, count, alerts. 20×20 — the size that lives in the navbar, filter chips, and other header chrome."
        continuation
      >
        <IconCell icon={Award} name="Award" size={20} />
        <IconCell icon={Star} name="Star" size={20} />
        <IconCell icon={Users} name="Users" size={20} />
        <IconCell icon={Settings} name="Settings" size={20} />
        <IconCell icon={Bell} name="Bell" size={20} />
        <IconCell icon={Filter} name="Filter" size={20} />
      </IconSection>

      <IconSection
        title="Content · 20"
        description="Dates and messages. Same 20×20 — used in section headers on the listing-detail page and the trips / messages routes."
        continuation
      >
        <IconCell icon={Calendar} name="Calendar" size={20} />
        <IconCell icon={MessageCircle} name="MessageCircle" size={20} />
        <IconCell icon={MessageSquare} name="MessageSquare" size={20} />
      </IconSection>

      <SizeHeader>24</SizeHeader>
      <IconSection
        title="Places & categories · 24"
        description="Home-page category rail. 24×24 — the display size for browsing surfaces and empty-state icons."
        continuation
      >
        <IconCell icon={Building2} name="Building2" size={24} />
        <IconCell icon={Castle} name="Castle" size={24} />
        <IconCell icon={Mountain} name="Mountain" size={24} />
        <IconCell icon={Tent} name="Tent" size={24} />
        <IconCell icon={TreePine} name="TreePine" size={24} />
        <IconCell icon={Waves} name="Waves" size={24} />
      </IconSection>

      <IconSection
        title="Amenities · 24"
        description="Listing detail amenities list. 24×24 — paired with a label, scanned in a vertical column."
        continuation
      >
        <IconCell icon={Wifi} name="Wifi" size={24} />
        <IconCell icon={Key} name="Key" size={24} />
        <IconCell icon={UtensilsCrossed} name="UtensilsCrossed" size={24} />
        <IconCell icon={Smartphone} name="Smartphone" size={24} />
        <IconCell icon={Lock} name="Lock" size={24} />
        <IconCell icon={Sparkles} name="Sparkles" size={24} />
      </IconSection>
    </SizePage>
  ),
  name: "01 · Icons",
  layout: { x: 1557, y: 0, width: 1280, height: 2081, intrinsicSizing: "root-element" },
};

/* ── 02 · Imagery ────────────────────────────────────────────────── */
export const Imagery: TempoStoryboard = {
  render: () => (
    <SizePage
      title="Imagery"
      intro="Photos are the loudest part of any Havn page. Three approved aspect ratios, generous 16px rounding, and one overlay treatment — the coral heart top-right, optionally a 'Guest favourite' pill top-left."
    >
      <Section
        title="Aspect ratios"
        description="Square for ListingCard photos, 4:3 for the listing-detail hero, 16:9 for gallery rows. Every frame rounds at 16px (rounded-2xl)."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <div>
            <div style={{ aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden", background: DARK.paperSunken }}>
              <img src={LISTINGS[0].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>Square · 1:1</p>
              <MonoText size={11} color="#717171">rounded-2xl · card photo</MonoText>
            </div>
          </div>
          <div>
            <div style={{ aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden", background: DARK.paperSunken }}>
              <img src={LISTINGS[1].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>Hero · 4:3</p>
              <MonoText size={11} color="#717171">rounded-2xl · listing hero</MonoText>
            </div>
          </div>
          <div>
            <div style={{ aspectRatio: "16 / 9", borderRadius: 16, overflow: "hidden", background: DARK.paperSunken }}>
              <img src={LISTINGS[2].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>Wide · 16:9</p>
              <MonoText size={11} color="#717171">rounded-2xl · gallery row</MonoText>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Gallery grid"
        description="The 5-image composite that anchors the listing-detail header. One hero photo (2:1, left) plus four supporting photos (1:1, right)."
      >
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8, height: 360, borderRadius: 16, overflow: "hidden" }}>
          <img src={LISTINGS[0].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1 / 3" }} />
          <img src={LISTINGS[0].images[1] ?? LISTINGS[1].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={LISTINGS[0].images[2] ?? LISTINGS[2].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={LISTINGS[0].images[3] ?? LISTINGS[3].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={LISTINGS[0].images[4] ?? LISTINGS[4].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </Section>

      <Section
        title="Overlays"
        description="The HeartButton sits top-right on every photo — white on dark imagery, coral when saved. The 'Guest favourite' pill is the only other overlay allowed; it sits top-left."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden" }}>
            <img src={LISTINGS[0].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 14, right: 14 }}>
              <HeartButton saved={false} size="md" surface="overlay" />
            </div>
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <span style={{ background: "rgba(255,255,255,0.9)", color: "#222", fontSize: 12, fontWeight: 600, padding: "6px 10px", borderRadius: 999, fontFamily: FONT_SANS }}>Guest favourite</span>
            </div>
          </div>
          <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden" }}>
            <img src={LISTINGS[4].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 14, right: 14 }}>
              <HeartButton saved={true} size="md" surface="overlay" />
            </div>
          </div>
        </div>
      </Section>
    </SizePage>
  ),
  name: "02 · Imagery",
  layout: { x: 2957, y: 0, width: 1280, height: 1665, intrinsicSizing: "root-element" },
};
