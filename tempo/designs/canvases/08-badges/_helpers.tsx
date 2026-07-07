import { Eyebrow, FONT_SANS, FONT_MONO, DARK } from '@/design-system/canvas-chrome';

export { Eyebrow };

export function BadgeSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="gap-20 pt-[100px]"
      style={{ display: "flex", gap: 56, alignItems: "flex-start", padding: "44px 0", borderTop: `1px solid ${DARK.hairline}` }}
    >
      <div className="w-[334px]" style={{ flexShrink: 0, paddingTop: 8 }}>
        <h2 className="text-xl"
          style={{ fontFamily: FONT_SANS, fontWeight: 600, letterSpacing: "-0.015em", color: DARK.ink, margin: 0 }}
        >
          {title}
        </h2>
        <p className="text-xs w-[272px]"
          style={{ fontFamily: FONT_SANS, color: DARK.inkQuiet, margin: "12px 0 0" }}
        >
          {description}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start"
        style={{ flex: 1, minHeight: 320, border: "1px solid #ebebeb", borderRadius: 8, padding: "24px 44px", background: "#f7f7f7" }}
      >
        {children}
      </div>
    </div>
  );
}

export function BadgeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "center", padding: "16px 0" }}
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
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}
