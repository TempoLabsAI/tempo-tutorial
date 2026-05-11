import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/design-system/layout/Navbar";

/**
 * Canvas chrome — shared scaffolding used by canvas storyboards.
 *
 * Wraps page renders in a router and navbar so they render at full fidelity.
 * No fake browser/phone bezels — frames are clean. Mobile is just a narrow
 * storyboard layout.
 */

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
    <div
      style={{
        background: "#0f0f0e",
        color: "#ffffff",
        height: "100%",
        padding: 56,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* radial accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -120,
          bottom: -120,
          width: 420,
          height: 420,
          background:
            "radial-gradient(closest-side, rgba(255,56,92,0.55), rgba(255,56,92,0))",
          filter: "blur(20px)",
        }}
      />
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
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "16px 0 24px",
            lineHeight: 0.98,
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
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(meta.length, 4)}, 1fr)`,
            gap: 32,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {meta.map((m) => (
            <div key={m.label}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#fff",
                  margin: "6px 0 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
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
          color: "#FF385C",
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
            color: "#FF385C",
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
