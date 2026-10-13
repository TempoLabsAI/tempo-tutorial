import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import type { ReactNode } from 'react';
import { Heart, Search, Star, MapPin, Check, ArrowRight, ArrowDown, Eye, Send } from 'lucide-react';
import {
  TitleSpread,
  DarkSheet,
  Eyebrow,
  MonoText,
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "00 · Cover & Index",
};

export default page;

/* ── 00 · Cover — UI3 overview-style hero with image placeholder ──── */
export const Cover: TempoStoryboard = {
  render: () => (
    <div className="flex-col w-[1920px] h-[1551px]"
      style={{ background: DARK.paper, color: DARK.ink, display: "flex", fontFamily: FONT_SANS }}
    >
      {/* Hero montage — Havn's design system pieces scattered across the top */}
      <div className="h-[1312px] mb-[2px] py-[24px]"
        style={{ width: "100%", background: DARK.paperSunken, borderRadius: 16, position: "relative", overflow: "hidden" }}
      >
        {/* ── Centered title + subtitle ─────────────────────────── */}
        <div className="w-[1326px] gap-[24px]"
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 2, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            style={{ fontFamily: FONT_SANS, fontSize: 216, fontWeight: 600, letterSpacing: "-0.045em", color: DARK.ink, margin: 0, lineHeight: 0.94, outline: "none", pointerEvents: "auto" }}
          >
            Havn Library
          </h2>
          <div className="absolute rotate-[-20deg] top-[-120px]" style={{ borderRadius: 16, padding: 8, position: "absolute" }}>
            <svg width="84" height="88" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.2152 1.14563C23.7044 0.133294 25.9605 0.098493 26.4429 1.09578L49.1387 48.022C49.7737 49.3349 48.3388 50.7262 46.8071 50.2828L25.0764 42.9879C24.6837 42.8742 24.2568 42.8808 23.8633 43.0067L3.22904 50.9574C1.69416 51.4483 0.268563 50.1013 0.912526 48.7686L23.2152 1.14563Z" fill="#E8E8E8" />
              <circle cx="29.9212" cy="22.068" r="1.37947" transform="rotate(-0.886958 29.9212 22.068)" fill="#3A3A3A" />
              <circle cx="19.5764" cy="22.2276" r="1.37947" transform="rotate(-0.886958 19.5764 22.2276)" fill="#3A3A3A" />
              <path d="M22.3759 24.9429C23.4012 26.9165 26.2397 26.8726 27.2034 24.8681" stroke="#3A3A3A" strokeWidth="1.88315" strokeLinecap="round" />
            </svg>
          </div>
          <div className="[font-family:jetbrains_mono]" style={{ display: "flex", alignItems: "center", gap: 18, pointerEvents: "auto" }}>
            {/* Shippy mark — Tempo mascot */}
            <p
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: FONT_MONO,
                fontSize: 28,
                fontWeight: 500,
                color: DARK.inkSoft,
                margin: 0,
                outline: "none",
                letterSpacing: "-0.01em",
              }}
            >
              a demo project presented by Tempo
            </p>
          </div>
        </div>

        {/* ── Top — coral progress bar peeking left ─────────────── */}
        <div
          style={{
            position: "absolute",
            top: 90,
            left: -120,
            width: 1080,
            height: 64,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            boxShadow: "0 0 0 18px #1f1f1f",
          }}
        >
          <div style={{ width: "78%", height: "100%", background: "#FF385C", borderRadius: 999 }} />
        </div>

        {/* ── Top — stacked avatars pair ────────────────────────── */}
        <div style={{ position: "absolute", top: 70, left: 1180, display: "flex", alignItems: "center" }}>
          {[
            { bg: "#FF385C", fg: "#fff", initial: "L" },
            { bg: "#222222", fg: "#fff", initial: "M" },
          ].map((a, i) => (
            <div
              key={a.initial}
              style={{
                width: 110,
                height: 110,
                borderRadius: 999,
                background: a.bg,
                color: a.fg,
                border: "5px solid #ffffff",
                marginLeft: i === 0 ? 0 : -30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 40,
                boxShadow: "0 0 0 18px #1f1f1f",
              }}
            >
              {a.initial}
            </div>
          ))}
        </div>

        {/* ── Top right — Guest favourite pill peeking right ───── */}
        <div style={{ position: "absolute", top: 100, right: -60, background: "#fff", padding: "18px 44px", borderRadius: 999, boxShadow: "0 0 0 18px #1f1f1f, 0 10px 30px rgba(255,255,255,0.20), 0 2px 8px rgba(255,255,255,0.12)" }}>
          <span
            contentEditable
            suppressContentEditableWarning
            style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 600, color: "#222", outline: "none" }}
          >
            Guest favourite
          </span>
        </div>

        {/* ── Upper-left — arrow icon toolbar ───────────────────── */}
        <div style={{ position: "absolute", top: "217px", left: "68px", display: "flex", gap: 18, background: "#fff", padding: 20, borderRadius: 18, boxShadow: "0 0 0 18px #1f1f1f, 0 4px 8px rgba(255,255,255,0.10), 0 12px 32px rgba(255,255,255,0.18)" }}>
          {[ArrowDown, ArrowRight, Send].map((Icon, i) => (
            <div key={i} style={{ width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, background: i === 0 ? "#f7f7f7" : "transparent" }}>
              <Icon size={40} strokeWidth={1.75} color="#222" />
            </div>
          ))}
        </div>

        {/* ── Upper-mid — Eye icon button ───────────────────────── */}
        <div style={{ position: "absolute", top: "231px", left: "461px", width: 112, height: 112, background: "#fff", border: "4px solid #FF385C", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 18px #1f1f1f, 0 4px 8px rgba(255,255,255,0.10), 0 12px 32px rgba(255,255,255,0.18)" }}>
          <Eye size={52} strokeWidth={2} color="#FF385C" />
        </div>

        {/* ── Upper-right — color token pill ────────────────────── */}
        <div style={{ position: "absolute", top: "258px", display: "flex", alignItems: "center", gap: 22, background: "#fff", padding: "18px 28px", borderRadius: 18, boxShadow: "0 0 0 18px #1f1f1f, 0 4px 8px rgba(255,255,255,0.10), 0 12px 32px rgba(255,255,255,0.18)", left: "1597px" }}>
          <div style={{ width: 48, height: 48, background: "#FF385C", borderRadius: 10 }} />
          <span
            contentEditable
            suppressContentEditableWarning
            style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#222", outline: "none" }}
          >
            /accent
          </span>
        </div>

        {/* ── Mid-left — toggle pill ────────────────────────────── */}
        <div style={{ position: "absolute", top: "699px", left: "51px", width: 144, height: 76, background: "#FF385C", borderRadius: 999, display: "flex", alignItems: "center", padding: 6, boxShadow: "0 0 0 18px #1f1f1f" }}>
          <div style={{ marginLeft: "auto", width: 64, height: 64, background: "#fff", borderRadius: 999, boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }} />
        </div>

        {/* ── Mid-left — radio dot ──────────────────────────────── */}
        <div style={{ position: "absolute", top: "699px", left: "260px", width: 76, height: 76, borderRadius: 999, border: "4px solid #FF385C", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 18px #1f1f1f" }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "#222" }} />
        </div>

        {/* ── Mid-right — bigger ListingCard ────────────────────── */}
        <div className="left-[1600px] right-[-500px] top-[440px]" style={{ position: "absolute", background: "#fff", borderRadius: 22, overflow: "hidden", boxShadow: "0 0 0 18px #1f1f1f, 0 8px 16px rgba(255,255,255,0.12), 0 24px 56px rgba(255,255,255,0.20)" }}>
          <div style={{ height: 240, background: "#dddddd", position: "relative" }}>
            <div style={{ position: "absolute", top: 20, right: 20 }}>
              <Heart size={36} strokeWidth={2} color="#fff" fill="rgba(0,0,0,0.35)" />
            </div>
          </div>
          <div style={{ padding: 26 }}>
            <p
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em", outline: "none" }}
            >
              Cinque Terre, Italy
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              style={{ fontFamily: FONT_SANS, fontSize: 20, color: "#717171", margin: "8px 0 0", outline: "none" }}
            >
              $248 night
            </p>
          </div>
        </div>

        {/* ── Bottom-left — big Reserve button ──────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 140,
            background: "#FF385C",
            padding: "26px 56px",
            borderRadius: 14,
            color: "#fff",
            fontFamily: FONT_SANS,
            fontSize: 32,
            fontWeight: 600,
            boxShadow: "0 0 0 18px #1f1f1f, 0 6px 12px rgba(255,56,92,0.25), 0 16px 32px rgba(0,0,0,0.15)",
          }}
          contentEditable
          suppressContentEditableWarning
        >
          Reserve
        </div>

        {/* ── Bottom-mid — checkbox filled ──────────────────────── */}
        <div style={{ position: "absolute", left: "1411px", width: 84, height: 84, borderRadius: 14, background: "#FF385C", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 18px #1f1f1f, 0 4px 8px rgba(0,0,0,0.12)", top: "734px" }}>
          <Check size={50} strokeWidth={2.5} color="#fff" />
        </div>

        {/* ── Bottom — icon row ────────────────────────────────── */}
        <div style={{ position: "absolute", left: "502px", display: "flex", gap: 18, background: "#fff", padding: 26, borderRadius: 20, boxShadow: "0 0 0 18px #1f1f1f, 0 4px 8px rgba(255,255,255,0.10), 0 12px 32px rgba(255,255,255,0.18)", top: "844px" }}>
          {[Heart, Search, Star, MapPin].map((Icon, i) => (
            <div key={i} style={{ width: 76, height: 76, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
              <Icon size={38} strokeWidth={1.75} color="#222" />
            </div>
          ))}
        </div>

        {/* ── Bottom-right — coral slider with handle clipped ───── */}
        <div style={{ position: "absolute", bottom: 90, right: -160, width: 1100, height: 60, borderRadius: 999, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", boxShadow: "0 0 0 18px #1f1f1f" }}>
          <div style={{ width: "62%", height: "100%", background: "#FF385C", borderRadius: 999, position: "relative" }}>
            <div style={{ position: "absolute", right: -24, top: "50%", transform: "translateY(-50%)", width: 64, height: 64, background: "#fff", borderRadius: 999, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }} />
          </div>
        </div>

        {/* ── Mid-bottom — Superhost gold pill (bigger) ─────────── */}
        <div
          style={{
            position: "absolute",
            top: "796px",
            right: "780px",
            background: "#fef7e0",
            color: "#7d5a00",
            padding: "14px 28px",
            borderRadius: 12,
            fontFamily: FONT_SANS,
            fontSize: 24,
            fontWeight: 600,
            boxShadow: "0 0 0 18px #1f1f1f, 0 4px 8px rgba(255,255,255,0.10), 0 12px 32px rgba(255,255,255,0.18)",
          }}
          contentEditable
          suppressContentEditableWarning
        >
          Superhost
        </div>

        {/* ── Mid-bottom — coral Heart filled ───────────────────── */}
        <div style={{ position: "absolute", left: "139px", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "#fff", borderRadius: 16, border: "18px solid #1f1f1f", top: "480px" }}>
          <Heart size={72} strokeWidth={2} color="#FF385C" fill="#FF385C" />
        </div>
      </div>
      <div style={{ width: "100%", height: 2, background: "#555" }} />
      <div className="gap-11 whitespace-normal [clip:auto] h-[525px] py-[90px] flex-row justify-start items-center w-[2023px]"
        style={{ flexShrink: 0, padding: 72, display: "flex", borderRight: `1px solid ${DARK.hairline}` }}
      >
        <div className="my-0 flex flex-col gap-[32px] w-[880px]">
          <p
          style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: DARK.inkQuiet,
          margin: 0,
          }}
                                      >
                                        Workspace · 01
                                      </p>
          <h1 className="mb-0 w-[857px]"
            style={{ fontSize: 76, fontWeight: 600, letterSpacing: "-0.035em", color: DARK.ink, margin: "20px 0 28px", lineHeight: 0.96 }}
          >Welcome to the Havn Design Library!</h1>
          <div className="pt-[32px] w-[479px] flex flex-row"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 32, borderTop: `1px solid ${DARK.hairline}` }}
          >
            {[
              { label: "Canvases", value: "13" },
              { label: "Components", value: "11" },
              { label: "Tokens", value: "84" },
              { label: "Owner", value: "Design" },
            ].map((m) => (
              <div className="w-full" key={m.label}>
                <p
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: DARK.inkQuiet,
                    margin: 0,
                  }}
                >
                  {m.label}
                </p>
                <p
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    color: DARK.ink,
                    margin: "8px 0 0",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[768px]">
          <p className="w-full"
            style={{ fontSize: 17, lineHeight: 1.55, margin: 0 }}
          >In this workspace you'll find the design system behind Havn — a tutorial project built to teach the Tempo workflow. Color and typography tokens, primitives like buttons and inputs, composed components, and larger flow canvases that show those parts assembled into real screens.</p>
          <p
            style={{ fontSize: 17, color: DARK.inkSoft, lineHeight: 1.55, margin: "16px 0 0" }}
          >Whether you're new to Tempo, exploring design-system patterns, or just curious how the pieces fit together — feel free to poke around, edit anything, and follow the canvases in order or jump wherever looks interesting.</p>
        </div>
      </div>

      {/* Right — giant placeholder for SVG */}
    </div>
  ),
  name: "00 · Cover",
  layout: { x: 0, y: 0, width: 1920, height: 1551 , intrinsicSizing: "root-element" },
};

/* ── Index — workspace map ────────────────────────────────────────── */

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

export const Index: TempoStoryboard = {
  render: () => (
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
          {[
            {
              num: "00", name: "Cover & Index", slug: "00-cover",
              blurb: "Workspace map and the visual conventions used across every canvas.",
              previewBg: "#fff",
              preview: (
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
              ),
            },
            {
              num: "01", name: "Template", slug: "01-template",
              blurb: "Page templates — HomePage, SearchPage, ListingDetail, Trips, Messages, Wishlists.",
              previewBg: "#fff",
              preview: (
                <div style={{ padding: 24, width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ height: 10, background: "#222", borderRadius: 2, width: "45%" }} />
                  <div style={{ height: 6, background: "#ddd", borderRadius: 2, width: "75%" }} />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1, height: 80, background: "#f7f7f7", borderRadius: 6 }} />
                    <div style={{ flex: 1, height: 80, background: "#f7f7f7", borderRadius: 6 }} />
                    <div style={{ flex: 1, height: 80, background: "#f7f7f7", borderRadius: 6 }} />
                  </div>
                </div>
              ),
            },
          ].map((c) => (
            <div key={c.slug}>
              <IndexCard num={c.num} name={c.name} slug={c.slug} blurb={c.blurb} preview={c.preview} previewBg={c.previewBg} />
            </div>
          ))}
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
          {[
            {
              num: "02", name: "Typography", slug: "02-typography",
              blurb: "SF Pro · six steps, three weights.",
              previewBg: "#fff",
              preview: (
                <p style={{ fontFamily: FONT_SANS, fontSize: 120, fontWeight: 600, letterSpacing: "-0.04em", color: "#222", margin: 0, lineHeight: 1 }}>
                  Aa
                </p>
              ),
            },
            {
              num: "03", name: "Colors", slug: "03-colors",
              blurb: "Surfaces, text, and the one coral accent.",
              previewBg: "#fff",
              preview: (
                <div style={{ display: "flex", gap: 10, padding: 24 }}>
                  {["#222222", "#717171", "#f7f7f7", "#FF385C", "#fef7e0"].map((c) => (
                    <div key={c} style={{ width: 38, height: 60, background: c, borderRadius: 6, border: c === "#f7f7f7" || c === "#fef7e0" ? "1px solid #ebebeb" : "none" }} />
                  ))}
                </div>
              ),
            },
            {
              num: "04", name: "Elevation", slug: "04-elevation",
              blurb: "Three soft shadows — card, hover, modal.",
              previewBg: "#f7f7f7",
              preview: (
                <div style={{ width: 110, height: 110, background: "#fff", borderRadius: 12, boxShadow: "0 6px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.12)" }} />
              ),
            },
            {
              num: "05", name: "Grid", slug: "05-grid",
              blurb: "Spacing and radius — the 4-pixel rhythm everything snaps to.",
              previewBg: "#fff",
              preview: (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: 4, padding: 24, width: "100%", height: "100%" }}>
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} style={{ background: "#f7f7f7", borderRadius: 2 }} />
                  ))}
                </div>
              ),
            },
            {
              num: "06", name: "Icons & Imagery", slug: "06-icons",
              blurb: "lucide-react glyphs at 16/20/24, plus aspect ratios and overlays for photography.",
              previewBg: "#fff",
              preview: (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
                  <Heart size={48} strokeWidth={1.75} color="#222" />
                  <div style={{ width: 64, height: 64, background: "#ddd", borderRadius: 8 }} />
                </div>
              ),
            },
          ].map((c) => (
            <div key={c.slug}>
              <IndexCard num={c.num} name={c.name} slug={c.slug} blurb={c.blurb} preview={c.preview} previewBg={c.previewBg} />
            </div>
          ))}
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
          {[
            {
              num: "07", name: "Avatars & Identity", slug: "07-avatars",
              blurb: "Sizes, fallbacks, host-pair, guest stacks.",
              previewBg: "#fff",
              preview: (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {[
                    { bg: "#FF385C", fg: "#fff", initial: "L" },
                    { bg: "#222", fg: "#fff", initial: "M" },
                    { bg: "#f7f7f7", fg: "#222", initial: "S" },
                  ].map((a, i) => (
                    <div key={a.initial} style={{ width: 64, height: 64, borderRadius: 999, background: a.bg, color: a.fg, border: "3px solid #fff", marginLeft: i === 0 ? 0 : -18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_SANS, fontWeight: 600, fontSize: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                      {a.initial}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              num: "08", name: "Badges & Status", slug: "08-badges",
              blurb: "Status pills across listings and trips.",
              previewBg: "#fff",
              preview: (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                  <span style={{ background: "#e8f5e9", color: "#1b5e20", padding: "6px 12px", borderRadius: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500 }}>Confirmed</span>
                  <span style={{ background: "#fff3e0", color: "#e65100", padding: "6px 12px", borderRadius: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500 }}>Check-in today</span>
                </div>
              ),
            },
            {
              num: "09", name: "Buttons", slug: "09-buttons",
              blurb: "Every variant, size and state, then buttons in situ.",
              previewBg: "#fff",
              preview: (
                <div style={{ background: "#FF385C", color: "#fff", padding: "14px 30px", borderRadius: 8, fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}>
                  Reserve
                </div>
              ),
            },
            {
              num: "10", name: "Components", slug: "10-components",
              blurb: "Navbar, SearchBar, FilterChip, Cards — the composed pieces of the app.",
              previewBg: "#f7f7f7",
              preview: (
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
              ),
            },
            {
              num: "11", name: "Inputs & Forms", slug: "11-inputs-forms",
              blurb: "Input anatomy, states, and composed forms.",
              previewBg: "#fff",
              preview: (
                <div style={{ width: "70%", height: 44, borderRadius: 8, border: "2px solid #222", boxShadow: "0 0 0 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONT_SANS, fontSize: 14, color: "#222" }}>
                  Lisbon, Portugal
                </div>
              ),
            },
            {
              num: "12", name: "Modals & Dialogues", slug: "12-modals-and-dialogues",
              blurb: "Sheets, dialogs, confirmation flows — what floats above the page.",
              previewBg: "rgba(0,0,0,0.5)",
              preview: (
                <div style={{ width: 160, height: 100, background: "#fff", borderRadius: 12, boxShadow: "0 24px 60px rgba(0,0,0,0.5)", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ height: 8, background: "#222", borderRadius: 2, width: "70%" }} />
                  <div style={{ height: 6, background: "#ddd", borderRadius: 2, width: "85%" }} />
                  <div style={{ height: 6, background: "#ddd", borderRadius: 2, width: "55%" }} />
                  <div style={{ alignSelf: "flex-end", marginTop: "auto", background: "#FF385C", width: 60, height: 18, borderRadius: 4 }} />
                </div>
              ),
            },
          ].map((c) => (
            <div key={c.slug}>
              <IndexCard num={c.num} name={c.name} slug={c.slug} blurb={c.blurb} preview={c.preview} previewBg={c.previewBg} />
            </div>
          ))}
        </div>
      </div>
    </DarkSheet>
    </div>
  ),
  name: "01 · Index",
  layout: { x: 2041, y: 0, width: 1280, height: 2276, intrinsicSizing: "root-element" },
};

/* ── Legend — visual conventions ──────────────────────────────────── */

function LegendRow({
  stage,
  title,
  description,
  possibilities,
  graphic,
  first,
}: {
  stage: string;
  title: string;
  description: string;
  possibilities: string[];
  graphic: ReactNode;
  first?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "44px 0",
        borderTop: first ? "none" : `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 320, flexShrink: 0, paddingTop: 8 }}>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF385C", margin: 0 }}>
          {stage}
        </p>
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: "10px 0 0",
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          {title}
        </h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: DARK.inkQuiet, margin: "12px 0 0", lineHeight: 1.55 }}>
          {description}
        </p>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {possibilities.map((p) => (
            <p key={p} style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: DARK.inkQuiet, margin: 0, lineHeight: 1.5 }}>
              · {p}
            </p>
          ))}
        </div>
      </div>
      <div className="h-max flex flex-row justify-start items-end"
        style={{ flex: 1, minWidth: 0, border: "1px solid #ebebeb", borderRadius: 8, padding: 32, background: "#f7f7f7" }}
      >
        {graphic}
      </div>
    </div>
  );
}

export const Legend: TempoStoryboard = {
  render: () => (
    <div className="w-[1280px]">
    <DarkSheet
      index="02"
      title="Legend"
      caption="Every canvas has the same three parts. A cover at the top, labeled sections in the middle, an in-situ example at the end. The examples below are pulled from the Typography canvas."
    >
      <div className="pt-[24px]">
        <LegendRow
          first
          stage="Beginning"
          title="A title spread."
          description="Sets up the canvas. Title, caption, optional meta row."
          possibilities={[
            "Workspace number",
            "Chapter title",
            "One-sentence caption",
            "Meta row (counts, owner)",
          ]}
          graphic={
            <div className="h-[155px] w-[576px]" style={{ maxWidth: 600, overflow: "hidden", borderRadius: 8 }}>
              <div className="h-max" style={{ transform: "scale(0.45)", transformOrigin: "top left", width: 1280 }}>
                <TitleSpread
                  eyebrow="Workspace · 02"
                  title={<>Typography.</>}
                  caption="One sans family across the whole product. Semibold for headings, medium for actions, regular for body."
                  meta={[{ label: "Family", value: "SF Pro" }, { label: "Sizes", value: "6" }, { label: "Weights", value: "3" }]}
                />
              </div>
            </div>
          }
        />

        <LegendRow
          stage="Middle"
          title="Labeled sections."
          description="The body. Each section has a title on the left and the content it's teaching on the right."
          possibilities={[
            "A token ramp or scale",
            "A variant or state showcase",
            "An anatomy diagram",
            "A code or CSS spec",
          ]}
          graphic={
            <div className="justify-start items-center" style={{ width: "100%", display: "flex", gap: 32 }}>
              <div style={{ width: 180, flexShrink: 0 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 16, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
                  Text ramp
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: "#717171", margin: "8px 0 0", lineHeight: 1.5 }}>
                  Strongest at the top, faintest at the bottom.
                </p>
              </div>
              <div style={{ flex: 1, background: "#fff", border: "1px solid #ebebeb", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: 0, lineHeight: 1.1 }}>
                  Heading · 32
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 16, color: "#222", margin: 0, lineHeight: 1.5 }}>
                  Body · 16. The default text size.
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: 0 }}>
                  Caption · 14. Metadata and hints.
                </p>
              </div>
            </div>
          }
        />

        <LegendRow
          stage="End"
          title="An in situ."
          description="The last section. Shows the system used on a real surface from the app."
          possibilities={[
            "A real ListingCard or BookingCard",
            "A page-level composition",
            "A before / after",
            "A small interaction demo",
          ]}
          graphic={
            <div style={{ background: "#fff", padding: 28, borderRadius: 8, maxWidth: 500, border: "1px solid #ebebeb" }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#717171", margin: 0 }}>
                Guest favourite · Italy
              </p>
              <h1 style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#222", margin: "10px 0 6px", lineHeight: 1.15 }}>
                Coastal stone cottage with sea views
              </h1>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "0 0 14px" }}>
                Hosted by Lucia R. · Superhost · Cinque Terre, Italy
              </p>
              <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#222", margin: 0, lineHeight: 1.5 }}>
                A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water.
              </p>
            </div>
          }
        />
      </div>

    </DarkSheet>
    </div>
  ),
  name: "02 · Legend",
  layout: { x: 3321, y: 1, width: 1280, height: 1137, intrinsicSizing: "root-element" },
};

/* ── 03 · Anatomy ────────────────────────────────────────────────── */
