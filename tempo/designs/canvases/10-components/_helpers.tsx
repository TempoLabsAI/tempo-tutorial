import {
  FONT_SANS,
  DARK,
} from '@/design-system/canvas-chrome';

/* ── Section helper — label-left / content-right ─────────────────── */

export function ComponentSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[52px] py-[44px] mb-[24px]"
      style={{ display: "flex", gap: 56, alignItems: "flex-start", padding: "32px 0", borderTop: `1px solid ${DARK.hairline}` }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
        <h3
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 16,
            fontWeight: 600,
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            outline: "none",
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
