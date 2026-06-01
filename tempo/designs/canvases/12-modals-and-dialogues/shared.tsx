import { FONT_SANS, DARK } from '@/design-system/canvas-chrome';

/* ── Section helper — label-left / content-right ─────────────────── */

export function ModalSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "32px 0",
        borderTop: `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
        <h3
          style={{
            fontFamily: FONT_SANS,
            fontSize: 16,
            fontWeight: 600,
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 13,
              color: DARK.inkQuiet,
              margin: "10px 0 0",
              lineHeight: 1.55,
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

/* ── Scrim — the dimmed overlay behind every modal ───────────────── */

export function Scrim({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "bottom";
}) {
  return (
    <div
      style={{
        background: "#f7f7f7",
        border: "1px solid #ebebeb",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          padding: align === "bottom" ? "40px 24px 0" : 24,
          borderRadius: 8,
          display: "flex",
          alignItems: align === "bottom" ? "flex-end" : "center",
          justifyContent: "center",
          minHeight: 420,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Modal shells ─────────────────────────────────────────────────── */

export function ModalCard({
  children,
  maxWidth = 440,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        width: "100%",
        maxWidth,
        padding: 28,
        fontFamily: FONT_SANS,
      }}
    >
      {children}
    </div>
  );
}
