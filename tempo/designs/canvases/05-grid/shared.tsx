import { HavnMark, FONT_SANS, DARK } from '@/design-system/canvas-chrome';

/* ── Tokens ──────────────────────────────────────────────────────── */
export const SPACING = [
  { name: "xs", token: "1", px: 4, use: "Hairline gaps inside dense rows. Almost invisible — used when two glyphs need a breath." },
  { name: "sm", token: "2", px: 8, use: "Inside badges and small chips. The tightest readable gap between icon and label." },
  { name: "md", token: "3", px: 12, use: "Between buttons in a row. Around icons in dense rows. The everyday small step." },
  { name: "lg", token: "4", px: 16, use: "Card content padding. Between ListingCards in a grid. The most-used step in the system." },
  { name: "xl", token: "5", px: 20, use: "Inside input groups. Less common — sits between the everyday lg and the looser 2xl." },
  { name: "2xl", token: "6", px: 24, use: "Between sections inside a card. Modal padding. The 'comfortable' default." },
  { name: "3xl", token: "8", px: 32, use: "Between full sections on a page. The breathing room between the hero and the grid." },
  { name: "4xl", token: "10", px: 40, use: "Page padding on small layouts. Inside the cover canvas's wide hero." },
  { name: "5xl", token: "14", px: 56, use: "Page padding on the canvas itself. The largest step — only used as a page-level gutter." },
];

/* ── PageShell — dark canvas with HavnMark, H1, intro ─────────────── */
export function PageShell({
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
        style={{
          fontFamily: FONT_SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: 0,
          lineHeight: 1.05,
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
export function Section({
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
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
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
