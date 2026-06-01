import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/design-system/layout/Navbar";

/**
 * Canvas chrome — shared scaffolding used by canvas storyboards.
 *
 * `Frame` renders a real app page inside an in-memory router; the dark-theme
 * helpers (`TitleSpread`, `CanvasCover`, `DarkSheet`, `Eyebrow`, `MonoText`,
 * `HavnMark`) provide the showcase layout the design-system canvases are
 * built from.
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
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 48, flexWrap: "wrap" }}>
          {meta.map((m) => (
            <div key={m.label}>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  margin: 0,
                }}
              >
                {m.label}
              </p>
              <p style={{ fontSize: 14, color: DARK.ink, margin: "4px 0 0" }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Dark theme — UI3-style sheets ─────────────────────────────────── */

/* Eyebrow — small uppercase mono label that sits above a section title. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: DARK.inkQuiet,
      }}
    >
      {children}
    </span>
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

/* CanvasCover — standard cover storyboard layout: workspace eyebrow → grouped
   title + description. Used as the 00 · Cover for every dark canvas. */
export function CanvasCover({
  workspace,
  title,
  description,
}: {
  workspace: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="w-[1280px] flex flex-col gap-[44px]"
      style={{
        background: DARK.paper,
        color: DARK.ink,
        fontFamily: FONT_SANS,
        padding: 72,
        position: "relative",
      }}
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
        >
          {description}
        </p>
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
      {index && (
        <div style={{ marginBottom: 8 }}>
          <Eyebrow>{index}</Eyebrow>
        </div>
      )}
      <h2 className="text-4xl mb-[24px]"
        style={{ fontWeight: 600, letterSpacing: "-0.02em", color: DARK.ink, margin: "12px 0 0" }}
      >
        {title}
      </h2>
      {caption && (
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 14,
            color: DARK.inkQuiet,
            lineHeight: 1.55,
            maxWidth: 600,
            margin: "16px 0 0",
          }}
        >
          {caption}
        </p>
      )}
      {children}
    </div>
  );
}
