import { Heart, Search, Star, MapPin, Check, ArrowRight, ArrowDown, Eye, Send } from 'lucide-react';
import { FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

export function CoverBoard() {
  return (
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
            style={{ fontFamily: FONT_SANS, fontSize: 216, fontWeight: 600, letterSpacing: "-0.045em", color: DARK.ink, margin: 0, lineHeight: 0.94, pointerEvents: "auto" }}
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
              style={{
                fontFamily: FONT_MONO,
                fontSize: 28,
                fontWeight: 500,
                color: DARK.inkSoft,
                margin: 0,
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
            style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 600, color: "#222" }}
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
            style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#222" }}
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
              style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}
            >
              Cinque Terre, Italy
            </p>
            <p
              style={{ fontFamily: FONT_SANS, fontSize: 20, color: "#717171", margin: "8px 0 0" }}
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
        >
          Superhost
        </div>

        {/* ── Mid-bottom — coral Heart filled ───────────────────── */}
        <div style={{ position: "absolute", left: "139px", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "#fff", borderRadius: 16, border: "18px solid #1f1f1f", top: "480px" }}>
          <Heart size={72} strokeWidth={2} color="#FF385C" fill="#FF385C" />
        </div>
      </div>
      <div style={{ width: "100%", height: 2, background: "#555" }} />
      <div className="gap-11 whitespace-normal [clip:auto] h-[448px] py-[90px] flex-row justify-start items-center"
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
  );
}
