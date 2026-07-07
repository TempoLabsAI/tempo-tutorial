import { FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

/* ── UI3-style section helpers ───────────────────────────────────── */

export function AvatarSection({
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
      <div className="px-11 py-8"
        style={{ flex: 1, minHeight: 320, border: "1px solid #ebebeb", borderRadius: 8, padding: "24px 44px", background: "#f7f7f7" }}
      >
        {children}
      </div>
    </div>
  );
}

export function AvatarRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "16px 0",
      }}
    >
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#888",
          margin: 0,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}
