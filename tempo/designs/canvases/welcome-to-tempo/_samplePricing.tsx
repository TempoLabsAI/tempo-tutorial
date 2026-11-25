import type { CSSProperties } from "react";

// The small design the Share lesson's team is talking about: a pricing page
// with three plan cards, in a warm editorial style that is plainly not
// Tempo's own UI. Maya asks for the middle card to stand out, and the review
// step shows it before and after. `lifted` is the "after": the middle plan
// raised, tagged, and given the dark button.
//
// It is drawn at three times its shown size and scaled down, with every size
// and colour set inline. Text this small would otherwise be bumped up by the
// browser's minimum font size, and the look must not depend on which utility
// classes the host has compiled.

const INK = "#1c1a17";
const BASE_W = 696;
const BASE_H = 540;

const PLANS = [
  { name: "Basic", price: "$22" },
  { name: "Business", price: "$40" },
  { name: "Enterprise", price: "$64" },
];

function PlanCard({
  name,
  price,
  featured,
}: {
  name: string;
  price: string;
  featured: boolean;
}) {
  const card: CSSProperties = {
    position: "relative",
    display: "flex",
    flex: "1 1 0",
    flexDirection: "column",
    minWidth: 0,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    padding: "24px 21px",
    boxShadow: featured
      ? "0 24px 54px rgba(40,30,20,0.18), 0 0 0 3px rgba(40,30,20,0.06)"
      : "0 0 0 3px rgba(40,30,20,0.06)",
    marginTop: featured ? -18 : 0,
    marginBottom: featured ? -12 : 0,
  };
  return (
    <div style={card}>
      {featured ? (
        <span
          style={{
            position: "absolute",
            top: -18,
            right: 15,
            whiteSpace: "nowrap",
            borderRadius: 999,
            backgroundColor: INK,
            color: "#ffffff",
            padding: "0 15px",
            fontSize: 15,
            fontWeight: 500,
            lineHeight: "33px",
          }}
        >
          Most popular
        </span>
      ) : null}
      <span
        style={{
          whiteSpace: "nowrap",
          color: INK,
          fontSize: 20,
          fontWeight: 600,
          lineHeight: "27px",
        }}
      >
        {name}
      </span>
      <span
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "baseline",
          gap: 9,
          color: INK,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 600,
            lineHeight: "54px",
            letterSpacing: "-0.03em",
          }}
        >
          {price}
        </span>
        <span
          style={{
            whiteSpace: "nowrap",
            fontSize: 16,
            lineHeight: "21px",
            opacity: 0.55,
          }}
        >
          / month
        </span>
      </span>
      <span
        style={{
          marginTop: 18,
          display: "flex",
          height: 39,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9,
          backgroundColor: featured ? INK : "#EDEBE6",
          color: featured ? "#ffffff" : INK,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        Get started
      </span>
      <span
        style={{
          marginTop: 24,
          borderTop: "3px solid rgba(28,26,23,0.1)",
          paddingTop: 18,
          color: "rgba(28,26,23,0.7)",
          fontSize: 13,
          fontWeight: 600,
          lineHeight: "18px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Features
      </span>
      <span
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[90, 114, 78].map((width) => (
          <span
            key={width}
            style={{ display: "flex", alignItems: "center", gap: 9 }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: 999,
                border: "3px solid rgba(28,26,23,0.45)",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                display: "block",
                width,
                height: 7,
                borderRadius: 999,
                backgroundColor: "rgba(28,26,23,0.15)",
              }}
            />
          </span>
        ))}
      </span>
    </div>
  );
}

export function SamplePricing({
  lifted = false,
  width = 232,
}: {
  lifted?: boolean;
  /** Shown width in px. The height follows. */
  width?: number;
}) {
  const scale = width / BASE_W;
  return (
    <div
      style={{
        width,
        height: BASE_H * scale,
        overflow: "hidden",
        borderRadius: 18 * scale,
      }}
    >
      <div
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: "#EFEDE8",
          padding: "48px 36px 42px",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          textAlign: "left",
        }}
      >
        <span
          style={{
            textAlign: "center",
            color: INK,
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 35,
            lineHeight: "42px",
            letterSpacing: "-0.01em",
          }}
        >
          Simple &amp; <em>transparent</em> pricing
          <br />
          for all business sizes
        </span>
        <div
          style={{
            marginTop: 54,
            display: "flex",
            width: "100%",
            flex: "1 1 0",
            minHeight: 0,
            flexDirection: "row",
            alignItems: "stretch",
            gap: 15,
          }}
        >
          {PLANS.map((plan, index) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              featured={lifted && index === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
