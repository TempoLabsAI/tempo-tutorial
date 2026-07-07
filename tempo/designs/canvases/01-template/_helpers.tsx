import type { LucideIcon } from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import {
  FONT_SANS,
  FONT_MONO,
  DARK,
} from '@/design-system/canvas-chrome';

/* ── Skeleton helpers (Loading row + page-level state) ────────────── */

export function SkBlock({
  width,
  height,
  radius = 8,
}: {
  width?: number | string;
  height: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: width ?? "100%",
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #ebebeb 0%, #f3f3f3 50%, #ebebeb 100%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div style={{ background: "#fff", padding: 48, borderRadius: 16, textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 999, background: "#f7f7f7", marginBottom: 16 }}>
        <Icon size={24} strokeWidth={1.75} color="#222" />
      </div>
      <p style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>{title}</p>
      <p style={{ fontFamily: FONT_SANS, fontSize: 13.5, color: "#717171", margin: "8px 0 20px", lineHeight: 1.55 }}>{body}</p>
      <Button variant="ink">{cta}</Button>
    </div>
  );
}

export function SkBookingCard() {
  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, display: "flex", gap: 14, alignItems: "center" }}>
      <SkBlock width={72} height={72} radius={10} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <SkBlock height={14} width="50%" />
        <SkBlock height={12} width="35%" />
        <SkBlock height={12} width="25%" />
      </div>
      <SkBlock width={88} height={28} radius={999} />
    </div>
  );
}

/* ── Page groups — each a vertical column of states (UI3 templates style) ── */

export function SectionBlock({
  index,
  title,
  subtext,
  marginTop = 0,
  children,
}: {
  index: string;
  title: string;
  subtext: string;
  marginTop?: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 56, alignItems: "flex-start", marginTop: 56 }}>
      <div style={{ width: 280, flexShrink: 0, paddingTop: 4 }}>
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
          {index}
        </p>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 17,
            fontWeight: 600,
            color: DARK.ink,
            margin: "6px 0 6px",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13,
            color: DARK.inkQuiet,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {subtext}
        </p>
      </div>
      <div
        style={{
          width: 720,
          height: 440,
          borderRadius: 10,
          border: `1px solid ${DARK.hairline}`,
          overflow: "hidden",
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1440 }}>
          <div style={{ marginTop }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const groupShell: React.CSSProperties = {
  background: DARK.paper,
  color: DARK.ink,
  padding: 56,
  fontFamily: FONT_SANS,
};

export function GroupHeader({ index, title, subtext }: { index: string; title: string; subtext: string }) {
  return (
    <>
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
        {index}
      </p>
      <h2
        style={{
          fontFamily: FONT_SANS,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: DARK.ink,
          margin: "10px 0 10px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 14,
          color: DARK.inkQuiet,
          margin: 0,
          lineHeight: 1.55,
          maxWidth: 540,
        }}
      >
        {subtext}
      </p>
      <div style={{ height: 1, background: DARK.hairline, margin: "32px 0 0" }} />
    </>
  );
}
