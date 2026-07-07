import {
  HavnMark,
  FONT_SANS,
  DARK,
} from '@/design-system/canvas-chrome';

export function SizePage({
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
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily: FONT_SANS,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: 0,
          lineHeight: 1.05,
          outline: "none",
        }}
      >
        {title}
      </h1>
      <p className="mb-[52px] pb-[32px]"
        style={{ fontFamily: FONT_SANS, fontSize: 15, color: DARK.inkQuiet, margin: "16px 0 24px", lineHeight: 1.6, maxWidth: 540 }}
      >
        {intro}
      </p>
      {children}
    </div>
  );
}
