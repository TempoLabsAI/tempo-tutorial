import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/design-system/layout/Navbar";

/**
 * Canvas chrome — shared scaffolding used by canvas storyboards.
 *
 * Two themes:
 *   • Light  — Foundations canvas (existing). Sheet/Swatch/Row defined inline there.
 *   • Dark   — UI3-style canvases (this file). DarkSheet / DarkRow / DarkSwatch /
 *              Eyebrow / MonoText, plus the dark TitleSpread cover.
 *
 * Type stack matches Tempo: SF Pro for UI, SF Mono / JetBrains Mono for code.
 */

export const FONT_SANS =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';
export const FONT_MONO =
  '"SF Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const DARK = {
  paper: "#0f0f0e",
  paperRaised: "#171716",
  paperSunken: "#0a0a0a",
  hairline: "rgba(255,255,255,0.08)",
  hairlineStrong: "rgba(255,255,255,0.14)",
  ink: "#ffffff",
  inkSoft: "rgba(255,255,255,0.72)",
  inkQuiet: "rgba(255,255,255,0.5)",
  inkFaint: "rgba(255,255,255,0.32)",
};

/* ── Frame — page render with router + navbar (and optional Route match) ── */
export function Frame({
  route,
  path,
  children,
}: {
  /** The URL to seed the in-memory router with. */
  route: string;
  /**
   * If the page uses `useParams`/`useSearchParams`, pass the matching path
   * pattern (e.g. "/listing/:id"). The page renders inside <Routes>.
   * For pages that don't need params, omit and the page renders directly.
   */
  path?: string;
  children: React.ReactNode;
}) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <div style={{ background: "#ffffff", minHeight: "100%" }}>
        <Navbar />
        {path ? (
          <Routes>
            <Route path={path} element={children as React.ReactElement} />
          </Routes>
        ) : (
          children
        )}
      </div>
    </MemoryRouter>
  );
}

/* ── TitleSpread — chapter cover ────────────────────────────────────── */
export function TitleSpread({
  eyebrow,
  title,
  caption,
  meta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  caption: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <div className="h-[339px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", fontFamily: FONT_SANS }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            margin: 0,
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: DARK.ink,
            margin: "16px 0 24px",
            lineHeight: 0.98,
            fontFamily: FONT_SANS,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.55,
            maxWidth: 520,
            margin: 0,
          }}
        >
          {caption}
        </p>
      </div>
      {meta && meta.length > 0 && (
        <></>
      )}
    </div>
  );
}

/* ── Annotation — note that sits between frames ─────────────────────── */
export function Annotation({
  step,
  title,
  body,
  arrow = "right",
}: {
  step: string;
  title: string;
  body: string;
  arrow?: "right" | "down" | "none";
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px dashed #d0d0d0",
        padding: 24,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#717171",
          margin: 0,
        }}
      >
        {step}
      </p>
      <p
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#222",
          margin: "8px 0 6px",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: 12.5,
          color: "#717171",
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {body}
      </p>
      {arrow !== "none" && (
        <p
          style={{
            fontSize: 24,
            color: "#222",
            margin: "16px 0 0",
            lineHeight: 1,
          }}
        >
          {arrow === "right" ? "→" : "↓"}
        </p>
      )}
    </div>
  );
}

/* ── Dark theme — UI3-style sheets ─────────────────────────────────── */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <></>
  );
}

export function MonoText({
  children,
  color = DARK.inkSoft,
  size = 11,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <span className="h-[15px] text-center w-max flex flex-row" style={{ fontFamily: FONT_MONO, fontSize: size, color, letterSpacing: "0" }}>
      {children}
    </span>
  );
}

/* HavnMark — small "havn" wordmark pinned to the top-right of a storyboard.
   Parent must have position: relative for it to anchor correctly. */
export function HavnMark() {
  return (
    <p
      style={{
        position: "absolute",
        top: 32,
        right: 40,
        fontFamily: FONT_MONO,
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "lowercase",
        color: DARK.inkQuiet,
        margin: 0,
      }}
    >
      havn
    </p>
  );
}

/* CanvasCover — standard cover storyboard layout: eyebrow → image placeholder → grouped title + description.
   Used as the 00 · Cover for every dark canvas. */
export function CanvasCover({
  workspace,
  slug,
  title,
  description,
}: {
  workspace: string;
  slug: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="w-[1406px] flex flex-col gap-[44px] h-[351px]"
      style={{ background: DARK.paper, color: DARK.ink, fontFamily: FONT_SANS, padding: 72, position: "relative" }}
    >
      <HavnMark />
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
        {workspace}
      </p>
      <div className="flex flex-col gap-[12px]">
        <h1
          className="max-w-[700px] text-[72px]"
          style={{ fontWeight: 600, letterSpacing: "-0.03em", color: DARK.ink, margin: 0, lineHeight: 1 }}
        >
          {title}
        </h1>
        <p
          className="max-w-[560px]"
          style={{
            fontSize: 16,
            color: DARK.inkSoft,
            lineHeight: 1.55,
            margin: 0,
          }}
        >The composed pieces, ordered by which appears first when looking from the top to the bottom of the page. Cards, search and filter chips, the navbar — each one assembled from primitives and used across the app.</p>
      </div>
    </div>
  );
}

export function DarkSheet({
  index,
  title,
  caption,
  children,
}: {
  index?: string;
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[1086px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: 48, fontFamily: FONT_SANS }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 8,
        }}
      >
        {index && <Eyebrow>{index}</Eyebrow>}
        <Eyebrow>{title}</Eyebrow>
      </div>
      <h2 className="text-4xl mb-[24px]"
        style={{ fontWeight: 600, letterSpacing: "-0.02em", color: DARK.ink, margin: "12px 0 0" }}
      >
        {title}
      </h2>
      {caption && (
        <></>
      )}
      {children}
    </div>
  );
}

export function DarkRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "20px 0",
        borderBottom: `1px solid ${DARK.hairline}`,
      }}
    >
      <Eyebrow>{label}</Eyebrow>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

export function DarkSwatch({
  name,
  value,
  note,
}: {
  name: string;
  value: string;
  note?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: value,
          height: 100,
          borderRadius: 10,
          border: `1px solid ${DARK.hairline}`,
        }}
      />
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: DARK.ink,
            margin: 0,
            letterSpacing: "-0.005em",
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: DARK.inkQuiet,
            margin: "3px 0 0",
          }}
        >
          {value}
        </p>
        {note && (
          <p style={{ fontSize: 12, color: DARK.inkFaint, margin: "4px 0 0", lineHeight: 1.4 }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/* DarkPanel — a raised card surface inside a DarkSheet (like UI3's "specimen"). */
export function DarkPanel({
  children,
  padding = 24,
}: {
  children: React.ReactNode;
  padding?: number;
}) {
  return (
    <div className="border-0"
      style={{ border: `1px solid ${DARK.hairline}`, borderRadius: 12, padding }}
    >
      {children}
    </div>
  );
}
