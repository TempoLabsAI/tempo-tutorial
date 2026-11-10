// Verbatim copy of @tempo-modules/tempo-design-system
// components/composites/cursor-mascot.tsx (react only), so the vendored
// tutorial canvas renders without the private design-system package.
import { useId } from "react";

interface CursorMascotProps {
  /** If true, Shippy floats in space with animated fire trail. */
  animated?: boolean;
}

function CursorMascot({ animated = false }: CursorMascotProps) {
  const uid = useId();
  const filterId = `filter_shippy_${uid}`;
  const gradientId = `gradient_shippy_${uid}`;
  const bodyClass = `shippy-body-${uid}`;
  const fireClass = `shippy-fire-${uid}`;

  return (
    <svg
      style={{ pointerEvents: "none" }}
      width="94"
      height="153"
      viewBox="0 0 94 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {animated && (
        <style>{`
          @keyframes shippy-float-${uid} {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-4px) rotate(0.5deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            75% { transform: translateY(4px) rotate(-0.5deg); }
          }
          @keyframes fire-flicker-${uid} {
            0%, 100% { opacity: 0.9; transform: scaleY(1) scaleX(1); }
            15% { opacity: 1; transform: scaleY(1.15) scaleX(0.9); }
            30% { opacity: 0.7; transform: scaleY(0.85) scaleX(1.1); }
            50% { opacity: 1; transform: scaleY(1.1) scaleX(0.95); }
            65% { opacity: 0.8; transform: scaleY(0.9) scaleX(1.05); }
            80% { opacity: 1; transform: scaleY(1.2) scaleX(0.88); }
          }
          .${CSS.escape(bodyClass)} { animation: shippy-float-${uid} 3s ease-in-out infinite; transform-origin: 47px 50px; }
          .${CSS.escape(fireClass)} { animation: fire-flicker-${uid} 0.4s ease-in-out infinite; transform-origin: 46px 57px; }
        `}</style>
      )}
      <defs>
        <filter
          id={filterId}
          x="37.5609"
          y="52.557"
          width="17.886"
          height="99.886"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.22149"
            result="effect1_foregroundBlur_shippy"
          />
        </filter>
        <linearGradient
          id={gradientId}
          x1="46.5039"
          y1="57"
          x2="46.5039"
          y2="148"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5F5F5" />
          <stop offset="1" stopColor="#F5F5F5" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g className={animated ? bodyClass : undefined}>
        {/* Fire trail */}
        <g
          className={animated ? fireClass : undefined}
          filter={`url(#${filterId})`}
        >
          <path
            d="M42.0039 60.6057L43.4102 57H47.7695L51.0039 60.6057L46.082 148L42.0039 60.6057Z"
            fill={`url(#${gradientId})`}
          />
        </g>
        {/* Cursor body */}
        <path
          d="M44.4952 22.288C44.9591 21.2639 47.2137 21.1732 47.7206 22.1582L71.5714 68.5082C72.2387 69.8049 70.8387 71.2313 69.2965 70.826L47.3918 64.0713C46.9964 63.9674 46.5698 63.9846 46.1795 64.1201L25.7485 72.5794C24.2262 73.1081 22.7677 71.7968 23.3785 70.4486L44.4952 22.288Z"
          fill="#E8E8E8"
        />
        {/* Eyes */}
        <circle
          cx="51.7151"
          cy="43.0377"
          r="1.37947"
          transform="rotate(-2.30573 51.7151 43.0377)"
          fill="#3A3A3A"
        />
        <circle
          cx="41.3792"
          cy="43.4537"
          r="1.37947"
          transform="rotate(-2.30573 41.3792 43.4537)"
          fill="#3A3A3A"
        />
        {/* Smile */}
        <path
          d="M44.2461 46.0996C45.32 48.0473 48.1565 47.9331 49.0703 45.9054"
          stroke="#3A3A3A"
          strokeWidth="1.88315"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export { CursorMascot, type CursorMascotProps };
