import type { CSSProperties, ReactNode } from "react";
import { Check, ChevronRight, Lock, Truck } from "lucide-react";

/**
 * A mock "generated" checkout design — the UI Tempo would produce from the
 * PRD spec in `DocsHero` (one-screen checkout, express pay above the fold,
 * autofilled address, inline validation, delivery estimate before payment).
 *
 * UI-only prototype with inline mock data (canvas mock-harness per the canvas
 * guide §5.1). Light theme so it reads as a real shipped checkout sitting on
 * the dark canvas, not as Tempo's own chrome.
 *
 * Buttons use the same glossy, tactile recipe as the Generate strip's hero
 * buttons (vertical gradient + inset top highlight + a 1px ring + a soft
 * coloured drop shadow) so this reads as a real, hand-polished product —
 * not a flat AI mock.
 */
const INK = "#1b1f29";
const MUTE = "#6b7280";
const LINE = "#e7e9ee";
const FIELD = "#f5f6f8";
const ACCENT = "#5b5bd6"; // iris — the generated app's single brand accent
const OK = "#16a34a";

/* Glossy button recipe (hue 286 ≈ iris) — the "sexy" tactile DS button. */
const BTN_IRIS: CSSProperties = {
  color: "#fff",
  background: "linear-gradient(180deg, oklch(60% 0.17 286) 0%, oklch(48% 0.19 287) 100%)",
  boxShadow:
    "0 1px 0 oklch(100% 0 0 / 0.35) inset, 0 0 0 1px oklch(44% 0.19 287 / 0.85), 0 10px 20px -8px oklch(52% 0.2 287 / 0.7), 0 2px 4px oklch(40% 0.16 287 / 0.4)",
};
/* Apple-Pay style — deep, glossy black. */
const BTN_BLACK: CSSProperties = {
  color: "#fff",
  background: "linear-gradient(180deg, oklch(30% 0 0) 0%, oklch(11% 0 0) 100%)",
  boxShadow:
    "0 1px 0 oklch(100% 0 0 / 0.18) inset, 0 0 0 1px oklch(0% 0 0 / 0.92), 0 8px 18px -8px oklch(0% 0 0 / 0.6)",
};
/* Link — dark indigo, distinct from pure black but still in the iris family. */
const BTN_LINK: CSSProperties = {
  color: "#fff",
  background: "linear-gradient(180deg, oklch(30% 0.06 287) 0%, oklch(16% 0.05 287) 100%)",
  boxShadow:
    "0 1px 0 oklch(100% 0 0 / 0.16) inset, 0 0 0 1px oklch(52% 0.13 287 / 0.5), 0 8px 18px -8px oklch(30% 0.1 287 / 0.6)",
};

/** The Apple logo glyph (white), for the express-pay button. */
function AppleGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden>
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
    </svg>
  );
}

/** The Link wordmark — a rounded green badge, the way Stripe Link renders. */
function LinkMark() {
  return (
    <span
      className="inline-flex items-center rounded-[4px] px-1 py-px text-[8.5px] font-bold leading-none"
      style={{ background: "#00d66f", color: "#0a2540", letterSpacing: "-0.02em" }}
    >
      link
    </span>
  );
}

/** A filled, validated form field. Trailing defaults to a green check; pass a
 *  brand mark (e.g. the card type) to override it. */
function Field({ label, value, trailing }: { label: string; value: string; trailing?: ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[9px] font-medium" style={{ color: MUTE }}>
        {label}
      </div>
      <div
        className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[10px] font-medium"
        style={{ background: FIELD, color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}
      >
        <span className="truncate">{value}</span>
        {trailing ?? <Check className="size-2.5 shrink-0" style={{ color: OK }} strokeWidth={3} />}
      </div>
    </div>
  );
}

export function CheckoutDesignMock() {
  return (
    <div className="w-full px-3 py-3 text-left" style={{ background: "#ffffff", color: INK }}>
      {/* title */}
      <div className="mb-2.5 flex items-center justify-between">
        <h4 className="text-[13px] font-semibold leading-none" style={{ color: INK }}>Checkout</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-medium" style={{ color: MUTE }}>
          <Lock className="size-2.5" /> Secure
        </span>
      </div>

      {/* express pay — above the fold, glossy + tactile */}
      <div className="grid grid-cols-2 gap-2 mb-[12px]">
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-[10px] py-2 text-[11px] font-semibold"
          style={BTN_BLACK}
        >
          <AppleGlyph /> Pay
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-[10px] py-2 text-[10px] font-semibold"
          style={BTN_LINK}
        >
          Pay with <LinkMark />
        </button>
      </div>

      {/* divider — gradient hairlines fading toward the label */}

      {/* autofilled, inline-validated fields */}
      <div className="flex flex-col gap-2">
        <Field label="Contact" value="kevin@havn.co" />
        <Field label="Shipping address" value="412 Bryant St, San Francisco" />
        <Field
          label="Card"
          value="•••• 4242"
          trailing={
            <span
              className="shrink-0 rounded-[4px] px-1 py-px text-[8px] font-bold italic leading-none tracking-tight"
              style={{ background: "#1434cb", color: "#fff" }}
            >
              VISA
            </span>
          }
        />
      </div>

      {/* delivery — a selected shipping method, shown before payment */}
      <div
        className="mt-2.5 flex items-center gap-2.5 rounded-xl px-2.5 py-2"
        style={{ background: "#fff", boxShadow: `inset 0 0 0 1.5px ${ACCENT}3d` }}
      >
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `${ACCENT}14`, color: ACCENT }}
        >
          <Truck className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: INK }}>
            Standard delivery
            <span className="text-[9px] font-semibold" style={{ color: OK }}>Free</span>
          </div>
          <div className="text-[9px]" style={{ color: MUTE }}>Arrives Tue, Jun 17</div>
        </div>
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full" style={{ background: ACCENT }}>
          <Check className="size-2.5 text-white" strokeWidth={3} />
        </span>
      </div>

      {/* order summary */}
      <div className="mt-3 flex flex-col gap-1 text-[9.5px]" style={{ color: MUTE }}>
        <div className="flex justify-between"><span>Subtotal</span><span style={{ color: INK }}>$124.00</span></div>
        <div className="flex justify-between"><span>Shipping</span><span style={{ color: OK }}>Free</span></div>
        <div className="mt-1.5 flex items-baseline justify-between border-t pt-2 text-[11px] font-semibold" style={{ borderColor: LINE, color: INK }}>
          <span>Total</span>
          <span className="text-[13px]">$124.00</span>
        </div>
      </div>

      {/* pay CTA — glossy iris, the brand action */}
      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-semibold"
        style={BTN_IRIS}
      >
        Pay $124.00 <ChevronRight className="size-3" />
      </button>
    </div>
  );
}
