import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { MemoryRouter } from 'react-router-dom';
import {
  Search,
  Heart,
  Star,
  MapPin,
  Calendar,
  Users,
  Wifi,
  Share,
  ChevronLeft,
  Send,
  Bookmark,
  Plus,
  Globe,
  Menu,
  Award,
} from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { Badge } from '@/design-system/primitives/Badge';
import { Avatar } from '@/design-system/primitives/Avatar';
import { Input } from '@/design-system/primitives/Input';
import { FilterChip } from '@/design-system/components/FilterChip';
import { HeartButton } from '@/design-system/components/HeartButton';
import { ListingCard } from '@/design-system/components/ListingCard';
import { RatingStars } from '@/design-system/components/RatingStars';
import { SearchBar } from '@/design-system/components/SearchBar';
import { BookingCard } from '@/design-system/components/BookingCard';
import { Navbar } from '@/design-system/layout/Navbar';
import { TitleSpread } from '@/design-system/canvas-chrome';
import { LISTINGS } from '@/data/listings';
import { TRIPS } from '@/data/trips';

const page: TempoPage = {
  name: "Foundations",
};

export default page;

/* ────────────────────────────────────────────────────────────────────────
   Foundations — the source of truth for the visual system.
   Read top → bottom: Color, Type, Primitives, Components, Layout (Navbar).
   ──────────────────────────────────────────────────────────────────────── */

function Sheet({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#ffffff", minHeight: "100%", padding: 40 }}>
      <div style={{ marginBottom: 28 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#717171",
            margin: 0,
          }}
        >
          {title}
        </p>
        {caption && (
          <p
            style={{
              fontSize: 14,
              color: "#717171",
              margin: "6px 0 0",
              maxWidth: 540,
              lineHeight: 1.5,
            }}
          >
            {caption}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          background: value,
          height: 96,
          borderRadius: 12,
          border: value === "#ffffff" ? "1px solid #ebebeb" : "none",
        }}
      />
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>
          {name}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#717171",
            margin: "2px 0 0",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #ebebeb",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#717171",
          margin: 0,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

/* ── 1 · Color ─────────────────────────────────────────────────────── */
export const Sheet1Color: TempoStoryboard = {
  render: () => (
    <Sheet title="01 · Color" caption="Surfaces, ink, and a single coral red accent. Three values do most of the work.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
        <Swatch name="Paper" value="#ffffff" />
        <Swatch name="Paper warm" value="#f7f7f7" />
        <Swatch name="Paper deep" value="#dddddd" />
        <Swatch name="Ink" value="#222222" />
        <Swatch name="Ink soft" value="#484848" />
        <Swatch name="Ink quiet" value="#717171" />
        <Swatch name="Accent" value="#FF385C" />
        <Swatch name="Accent hover" value="#E31C5F" />
      </div>
    </Sheet>
  ),
  name: "01 · Color",
  layout: { x: 0, y: 0, width: 900, height: 540 },
};

/* ── 2 · Type ──────────────────────────────────────────────────────── */
export const Sheet2Type: TempoStoryboard = {
  render: () => (
    <Sheet title="02 · Type" caption="Geist sans, set in a friendly scale. Semibold for headings, regular for body, medium for actions.">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontSize: 60, fontWeight: 600, letterSpacing: "-0.02em", color: "#222", margin: 0, lineHeight: 1.05 }}>
          Display · 60
        </p>
        <p style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: 0, lineHeight: 1.1 }}>
          Heading · 32
        </p>
        <p style={{ fontSize: 22, fontWeight: 600, color: "#222", margin: 0, lineHeight: 1.2 }}>
          Subheading · 22
        </p>
        <p style={{ fontSize: 16, color: "#222", margin: 0, lineHeight: 1.5 }}>
          Body · 16. Find your next favorite place to stay. Eight handpicked
          properties around the world.
        </p>
        <p style={{ fontSize: 14, color: "#717171", margin: 0 }}>
          Caption · 14 / Ink quiet
        </p>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
          Eyebrow · 12 / 8% tracked
        </p>
      </div>
    </Sheet>
  ),
  name: "02 · Type",
  layout: { x: 950, y: 0, width: 900, height: 540 },
};

/* ── 3 · Primitives ────────────────────────────────────────────────── */
export const Sheet3Primitives: TempoStoryboard = {
  render: () => (
    <Sheet title="03 · Primitives" caption="The smallest reusable parts. Buttons, badges, avatars, inputs.">
      <Row label="Button">
        <Button variant="primary">Reserve</Button>
        <Button variant="ink">Continue</Button>
        <Button variant="outline">Share</Button>
        <Button variant="secondary">Browse all</Button>
        <Button variant="destructive">Cancel</Button>
        <Button variant="ghost">Skip</Button>
      </Row>
      <Row label="Badge">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Confirmed</Badge>
        <Badge variant="warning" pulse>Check-in today</Badge>
        <Badge variant="error">Cancelled</Badge>
        <Badge variant="muted">Past</Badge>
        <Badge variant="accent">Guest favourite</Badge>
        <Badge variant="ink">Ink</Badge>
        <Badge variant="gold">Superhost</Badge>
      </Row>
      <Row label="Avatar">
        <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="xs" />
        <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="sm" />
        <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="md" />
        <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="lg" />
        <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="xl" />
        <Avatar alt="Tom Chen" size="md" />
      </Row>
      <Row label="Input">
        <div style={{ width: 320 }}>
          <Input label="Destination" placeholder="Search destinations" />
        </div>
        <div style={{ width: 320 }}>
          <Input label="Email" placeholder="you@example.com" error="Please enter a valid email" />
        </div>
      </Row>
    </Sheet>
  ),
  name: "03 · Primitives",
  layout: { x: 0, y: 590, width: 1850, height: 720 },
};

/* ── 4 · Components ────────────────────────────────────────────────── */
export const Sheet4Components: TempoStoryboard = {
  render: () => (
    <MemoryRouter initialEntries={["/"]}>
      <Sheet title="04 · Components" caption="Composed from primitives. Used across multiple screens.">
        <Row label="RatingStars">
          <RatingStars rating={4.97} count={184} />
          <RatingStars rating={4.92} count={1240} size="md" />
          <RatingStars rating={5.0} />
        </Row>
        <Row label="FilterChip">
          <FilterChip label="Price" />
          <FilterChip label="Type of place" />
          <FilterChip label="Beds" count={2} active />
          <FilterChip label="Amenities" count={5} active />
        </Row>
        <Row label="HeartButton">
          <div style={{ background: "#222222", padding: 12, borderRadius: 12 }}>
            <HeartButton saved={false} size="md" surface="overlay" />
          </div>
          <div style={{ background: "#222222", padding: 12, borderRadius: 12 }}>
            <HeartButton saved={true} size="md" surface="overlay" />
          </div>
          <HeartButton saved={false} size="md" surface="inline" />
          <HeartButton saved={true} size="md" surface="inline" />
        </Row>
        <Row label="SearchBar (compact)">
          <div style={{ width: 480 }}>
            <SearchBar compact />
          </div>
        </Row>
        <div style={{ marginTop: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: "0 0 16px" }}>
            ListingCard
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 320px)", gap: 24 }}>
            <ListingCard listing={LISTINGS[0]} />
            <ListingCard listing={LISTINGS[1]} />
            <ListingCard listing={LISTINGS[4]} saved />
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: "0 0 16px" }}>
            BookingCard
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
            <BookingCard trip={TRIPS[0]} />
            <BookingCard trip={TRIPS[2]} />
            <BookingCard trip={TRIPS[3]} />
          </div>
        </div>
      </Sheet>
    </MemoryRouter>
  ),
  name: "04 · Components",
  layout: { x: -1, y: 1356, width: 1850, height: 1704 },
};

/* ── 5 · Layout — Navbar ───────────────────────────────────────────── */
export const Sheet5Navbar: TempoStoryboard = {
  render: () => (
    <Sheet title="05 · Layout · Navbar" caption="Sticky white masthead. Renders compact search on inner pages, none on home.">
      <div style={{ marginTop: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: "0 0 8px" }}>
          On home
        </p>
        <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
          <MemoryRouter initialEntries={["/"]}>
            <Navbar />
          </MemoryRouter>
        </div>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: "0 0 8px" }}>
          On inner pages (with compact search)
        </p>
        <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
          <MemoryRouter initialEntries={["/search"]}>
            <Navbar />
          </MemoryRouter>
        </div>
      </div>
    </Sheet>
  ),
  name: "05 · Layout · Navbar",
  layout: { x: 0, y: 3110, width: 1850, height: 540 },
};

/* ── Cover ─────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Workspace · 00"
      title={
        <>
          Foundations
          <br />
          for the system.
        </>
      }
      caption="The source of truth for color, typography, primitives, components, and layout. Every other canvas in this workspace draws from the tokens defined here."
      meta={[
        { label: "Sheets", value: "10" },
        { label: "Tokens", value: "84" },
        { label: "Components", value: "11" },
        { label: "Owner", value: "Sasha · Design" },
      ]}
    />
  ),
  name: "Cover",
  layout: { x: 1900, y: 0, width: 1240, height: 540 },
};

/* ── 6 · Spacing ──────────────────────────────────────────────────── */
export const Sheet6Spacing: TempoStoryboard = {
  render: () => (
    <Sheet title="06 · Spacing" caption="A 4-pixel base scale. The system uses 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 most often.">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { name: "xs", token: "1", px: 4 },
          { name: "sm", token: "2", px: 8 },
          { name: "md", token: "3", px: 12 },
          { name: "lg", token: "4", px: 16 },
          { name: "xl", token: "5", px: 20 },
          { name: "2xl", token: "6", px: 24 },
          { name: "3xl", token: "8", px: 32 },
          { name: "4xl", token: "10", px: 40 },
          { name: "5xl", token: "14", px: 56 },
        ].map((s) => (
          <div
            key={s.name}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 60px 80px 1fr",
              gap: 16,
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #ebebeb",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{s.name}</span>
            <span style={{ fontSize: 12, color: "#717171", fontFamily: "ui-monospace, monospace" }}>
              p-{s.token}
            </span>
            <span style={{ fontSize: 12, color: "#717171", fontVariantNumeric: "tabular-nums" }}>
              {s.px}px
            </span>
            <div style={{ height: 14, background: "#FF385C", borderRadius: 3, width: s.px * 4, maxWidth: "100%" }} />
          </div>
        ))}
      </div>
    </Sheet>
  ),
  name: "06 · Spacing",
  layout: { x: 0, y: 3700, width: 900, height: 740 },
};

/* ── 7 · Radius ───────────────────────────────────────────────────── */
export const Sheet7Radius: TempoStoryboard = {
  render: () => (
    <Sheet title="07 · Radius" caption="Soft corners across the board. Cards round at 16, photos at 24, pills at 999.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {[
          { name: "sm", token: "rounded", px: 8 },
          { name: "md", token: "rounded-lg", px: 12 },
          { name: "lg", token: "rounded-xl", px: 16 },
          { name: "xl", token: "rounded-2xl", px: 24 },
          { name: "2xl", token: "rounded-3xl", px: 32 },
          { name: "pill", token: "rounded-full", px: 999 },
        ].map((r) => (
          <div key={r.name} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                background: "#222",
                height: 100,
                borderRadius: r.px,
              }}
            />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{r.name}</p>
              <p style={{ fontSize: 11, color: "#717171", margin: "2px 0 0", fontFamily: "ui-monospace, monospace" }}>
                {r.token} · {r.px === 999 ? "999px" : r.px + "px"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  ),
  name: "07 · Radius",
  layout: { x: 950, y: 3700, width: 900, height: 740 },
};

/* ── 8 · Shadow ───────────────────────────────────────────────────── */
export const Sheet8Shadow: TempoStoryboard = {
  render: () => (
    <Sheet title="08 · Shadow" caption="Soft, multi-layered. We don't shadow chrome — only floating surfaces.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {[
          {
            name: "card",
            token: "shadow-card",
            css: "0 2px 4px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.08)",
            note: "Resting cards & list rows",
          },
          {
            name: "card-hover",
            token: "shadow-card-hover",
            css: "0 6px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.12)",
            note: "Hovered listings, lifted cards",
          },
          {
            name: "modal",
            token: "shadow-modal",
            css: "0 24px 80px rgba(0,0,0,0.25)",
            note: "Sheets and dialogs",
          },
        ].map((s) => (
          <div key={s.name}>
            <div
              style={{
                background: "#fff",
                height: 120,
                borderRadius: 16,
                boxShadow: s.css,
                marginBottom: 12,
              }}
            />
            <p style={{ fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{s.name}</p>
            <p style={{ fontSize: 11, color: "#717171", margin: "2px 0 0", fontFamily: "ui-monospace, monospace" }}>
              {s.token}
            </p>
            <p style={{ fontSize: 12, color: "#717171", margin: "4px 0 0", lineHeight: 1.4 }}>
              {s.note}
            </p>
          </div>
        ))}
      </div>
    </Sheet>
  ),
  name: "08 · Shadow",
  layout: { x: 1900, y: 580, width: 1240, height: 480 },
};

/* ── 9 · Motion ───────────────────────────────────────────────────── */
export const Sheet9Motion: TempoStoryboard = {
  render: () => (
    <Sheet title="09 · Motion" caption="Quiet, fast, never bouncy. Three durations and one ease curve do the work.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: "0 0 16px" }}>
            Duration
          </p>
          {[
            { name: "fast", token: "150ms", note: "Hover state changes" },
            { name: "base", token: "220ms", note: "Reveal, fade-in" },
            { name: "slow", token: "360ms", note: "Modal & sheet entry" },
          ].map((d) => (
            <div
              key={d.name}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 80px 1fr",
                gap: 16,
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #ebebeb",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{d.name}</span>
              <span style={{ fontSize: 12, color: "#717171", fontFamily: "ui-monospace, monospace" }}>
                {d.token}
              </span>
              <span style={{ fontSize: 12, color: "#717171" }}>{d.note}</span>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: "0 0 16px" }}>
            Easing
          </p>
          <div
            style={{
              border: "1px solid #ebebeb",
              borderRadius: 12,
              padding: 16,
              background: "#f7f7f7",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>ease-out</p>
            <p style={{ fontSize: 12, color: "#717171", margin: "2px 0 8px", fontFamily: "ui-monospace, monospace" }}>
              cubic-bezier(0.2, 0.8, 0.2, 1)
            </p>
            <svg width="100%" height="60" viewBox="0 0 100 60" preserveAspectRatio="none">
              <path
                d="M 0 60 C 20 60, 80 0, 100 0"
                stroke="#FF385C"
                strokeWidth="2"
                fill="none"
              />
              <line x1="0" y1="60" x2="100" y2="60" stroke="#dddddd" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="#dddddd" strokeWidth="0.5" />
            </svg>
            <p style={{ fontSize: 12, color: "#717171", margin: "8px 0 0", lineHeight: 1.4 }}>
              Decelerates into the resting state. Used for everything that
              isn't a continuous loop.
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  ),
  name: "09 · Motion",
  layout: { x: 1900, y: 1080, width: 1240, height: 540 },
};

/* ── 10 · Iconography ─────────────────────────────────────────────── */
export const Sheet10Iconography: TempoStoryboard = {
  render: () => (
    <Sheet title="10 · Iconography" caption="Lucide. Stroke 1.75 by default; bumped to 2 in dense areas. Icons sit at 14–22px.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 16 }}>
        {[
          { Icon: Search, name: "search" },
          { Icon: Heart, name: "heart" },
          { Icon: Bookmark, name: "bookmark" },
          { Icon: Star, name: "star" },
          { Icon: MapPin, name: "map-pin" },
          { Icon: Calendar, name: "calendar" },
          { Icon: Users, name: "users" },
          { Icon: Wifi, name: "wifi" },
          { Icon: Share, name: "share" },
          { Icon: ChevronLeft, name: "chevron-left" },
          { Icon: Send, name: "send" },
          { Icon: Plus, name: "plus" },
          { Icon: Globe, name: "globe" },
          { Icon: Menu, name: "menu" },
          { Icon: Award, name: "award" },
        ].map(({ Icon, name }) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "16px 8px",
              borderRadius: 8,
              border: "1px solid #ebebeb",
            }}
          >
            <Icon size={20} strokeWidth={1.75} color="#222" />
            <span style={{ fontSize: 10, color: "#717171", fontFamily: "ui-monospace, monospace" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </Sheet>
  ),
  name: "10 · Iconography",
  layout: { x: 1900, y: 1640, width: 1240, height: 540 },
};
