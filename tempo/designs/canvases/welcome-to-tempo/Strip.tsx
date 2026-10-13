import type { ReactNode } from "react";

type Accent = "kiwi" | "lavender" | "blueberry";

const ACCENT_VAR: Record<Accent, string> = {
  kiwi: "var(--kiwi-600)",
  lavender: "var(--lavender-600)",
  blueberry: "var(--blueberry-600)",
};

export interface StripGraphic {
  node: ReactNode;
  /** "media" = 287:140 svg frame, "image" = 16:10 cropped screenshot, "bare" = no frame. */
  kind?: string;
  caption?: string;
}

export interface StripProps {
  /** Two-digit step number, e.g. "01". */
  number: string;
  accent: Accent;
  title: string;
  /** Optional descriptive paragraph under the title. Omit for a bare section header. */
  intro?: ReactNode;
  /** Graphics stacked, large, down the body of the strip. */
  graphics: StripGraphic[];
  /** Override the strip's bottom padding (Tailwind class). Defaults to "pb-14". */
  bottomPad?: string;
  /** Override the strip's fixed width in px. Defaults to 660. */
  width?: number;
}

/**
 * One tall, wide vertical strip: a compact header over a stack of large
 * product graphics. Pure composition of real design-system tokens — five
 * of these tile across the canvas to tell the Tempo story.
 */
export function Strip({ number, accent, title, intro, graphics, bottomPad = "pb-14", width = 660 }: StripProps) {
  const color = ACCENT_VAR[accent];
  return (
    <div className="flex flex-col overflow-hidden rounded-[16px] border border-border-primary bg-surface" style={{ width }}>

      {/* HEADER — when there's no intro the first subtitle lives in the first
          graphic, so tighten the header's bottom pad to the title→intro gap
          (gap-3.5) instead of the 30px that sits under an intro. */}
      <div className={`flex flex-col items-start gap-3.5 px-14 pt-14 ${intro ? "pb-[30px]" : "pb-3.5"}`}>
        <div className="flex items-center gap-3">
          <h2 className="leading-[1.08] tracking-normal text-text-primary text-[23px] h-[25px]">{title}</h2>
        </div>
        {intro ? (
          <p className="text-title-3 leading-relaxed text-text-secondary">{intro}</p>
        ) : null}
      </div>

      {/* GRAPHICS — stacked, large */}
      <div className={`flex flex-col px-14 gap-x-7 gap-y-[44px] ${bottomPad}`}>
        {graphics.map((g, i) => (
          <div key={i} className="flex flex-col gap-2.5">
            {g.kind === "bare" ? (
              g.node
            ) : (
              <div
                className={`w-full overflow-hidden rounded-2xl border border-border-primary bg-surface-container-lowest shadow-md ${
                  g.kind === "image" ? "aspect-[16/10]" : "aspect-[287/140]"
                }`}
              >
                {g.node}
              </div>
            )}
            {g.caption ? (
              <></>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
