/**
 * Inline SVG replacements for the icon packages the tutorial lessons use.
 *
 * lucide geometry is copied from lucide-react v0.525.0 (ISC license) and the
 * Share icon from @hugeicons/core-free-icons, so the vendored tutorial canvas
 * stays fully self-contained — the default `tempo/` canvas host does NOT ship
 * lucide-react or hugeicons, and this template must render in any repo.
 */
import type { CSSProperties, SVGProps } from "react";
import { cn } from "./cn";

type IconNode = [string, Record<string, string | number>][];

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}

function createIcon(name: string, node: IconNode) {
  function Icon({ size = 24, className, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide", `lucide-${name}`, className)}
        aria-hidden="true"
        {...props}
      >
        {node.map(([Tag, attrs], i) => {
          const Element = Tag as "path";
          return <Element key={i} {...(attrs as object)} />;
        })}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

// ── lucide-react ────────────────────────────────────────────────────────────
export const ArrowUp = createIcon("arrow-up", [
  ["path", { d: "m5 12 7-7 7 7" }],
  ["path", { d: "M12 19V5" }],
]);
export const ArrowUpRight = createIcon("arrow-up-right", [
  ["path", { d: "M7 7h10v10" }],
  ["path", { d: "M7 17 17 7" }],
]);
export const Check = createIcon("check", [["path", { d: "M20 6 9 17l-5-5" }]]);
export const ChevronDown = createIcon("chevron-down", [
  ["path", { d: "m6 9 6 6 6-6" }],
]);
export const Circle = createIcon("circle", [
  ["circle", { cx: "12", cy: "12", r: "10" }],
]);
export const CircleCheck = createIcon("circle-check", [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m9 12 2 2 4-4" }],
]);
export const CircleDot = createIcon("circle-dot", [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "12", r: "1" }],
]);
/** lucide's `Code2` is an alias of `CodeXml`. */
export const Code2 = createIcon("code-xml", [
  ["path", { d: "m18 16 4-4-4-4" }],
  ["path", { d: "m6 8-4 4 4 4" }],
  ["path", { d: "m14.5 4-5 16" }],
]);
export const Ellipsis = createIcon("ellipsis", [
  ["circle", { cx: "12", cy: "12", r: "1" }],
  ["circle", { cx: "19", cy: "12", r: "1" }],
  ["circle", { cx: "5", cy: "12", r: "1" }],
]);
export const FileText = createIcon("file-text", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
  ["path", { d: "M10 9H8" }],
  ["path", { d: "M16 13H8" }],
  ["path", { d: "M16 17H8" }],
]);
export const Frame = createIcon("frame", [
  ["line", { x1: "22", x2: "2", y1: "6", y2: "6" }],
  ["line", { x1: "22", x2: "2", y1: "18", y2: "18" }],
  ["line", { x1: "6", x2: "6", y1: "2", y2: "22" }],
  ["line", { x1: "18", x2: "18", y1: "2", y2: "22" }],
]);
export const GitBranch = createIcon("git-branch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15" }],
  ["circle", { cx: "18", cy: "6", r: "3" }],
  ["circle", { cx: "6", cy: "18", r: "3" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9" }],
]);
export const Minus = createIcon("minus", [["path", { d: "M5 12h14" }]]);
export const MousePointer2 = createIcon("mouse-pointer-2", [
  [
    "path",
    {
      d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
    },
  ],
]);
export const Paperclip = createIcon("paperclip", [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
    },
  ],
]);
export const Plus = createIcon("plus", [
  ["path", { d: "M5 12h14" }],
  ["path", { d: "M12 5v14" }],
]);
export const RotateCcw = createIcon("rotate-ccw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }],
]);
export const SmilePlus = createIcon("smile-plus", [
  ["path", { d: "M22 11v1a10 10 0 1 1-9-10" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }],
  ["path", { d: "M16 5h6" }],
  ["path", { d: "M19 2v6" }],
]);
export const Sparkles = createIcon("sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
    },
  ],
  ["path", { d: "M20 3v4" }],
  ["path", { d: "M22 5h-4" }],
  ["path", { d: "M4 17v2" }],
  ["path", { d: "M5 18H3" }],
]);
export const Square = createIcon("square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
]);
export const Type = createIcon("type", [
  ["path", { d: "M12 4v16" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" }],
  ["path", { d: "M9 20h6" }],
]);
export const X = createIcon("x", [
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }],
]);

// ── @hugeicons/react ────────────────────────────────────────────────────────
type HugeIcon = [string, Record<string, string | number>][];

/** `Share01Icon` from @hugeicons/core-free-icons. */
export const Share01Icon: HugeIcon = [
  [
    "path",
    {
      d: "M9.39584 4.5H8.35417C5.40789 4.5 3.93475 4.5 3.01946 5.37868C2.10417 6.25736 2.10417 7.67157 2.10417 10.5V14.5C2.10417 17.3284 2.10417 18.7426 3.01946 19.6213C3.93475 20.5 5.40789 20.5 8.35417 20.5H12.5608C15.5071 20.5 16.9802 20.5 17.8955 19.6213C18.4885 19.052 18.6973 18.2579 18.7708 17",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
  ],
  [
    "path",
    {
      d: "M16.1667 7V3.85355C16.1667 3.65829 16.3316 3.5 16.535 3.5C16.6326 3.5 16.7263 3.53725 16.7954 3.60355L21.5275 8.14645C21.7634 8.37282 21.8958 8.67986 21.8958 9C21.8958 9.32014 21.7634 9.62718 21.5275 9.85355L16.7954 14.3964C16.7263 14.4628 16.6326 14.5 16.535 14.5C16.3316 14.5 16.1667 14.3417 16.1667 14.1464V11H13.1157C8.875 11 7.3125 14.5 7.3125 14.5V12C7.3125 9.23858 9.64435 7 12.5208 7H16.1667Z",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
  ],
];

/** Same markup `HugeiconsIcon` renders for a stroke icon at strokeWidth 1.5. */
export function HugeiconsIcon({
  icon,
  size = 24,
  className,
}: {
  icon: HugeIcon;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      className={className}
    >
      {icon.map(([Tag, attrs], i) => {
        const Element = Tag as "path";
        return (
          <Element
            key={i}
            stroke="currentColor"
            strokeWidth={1.5}
            {...(attrs as object)}
          />
        );
      })}
    </svg>
  );
}
