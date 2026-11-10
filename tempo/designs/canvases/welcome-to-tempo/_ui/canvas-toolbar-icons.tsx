// Verbatim copies of the @tempo-modules/tempo-design-system canvas toolbar
// icons (components/primitives/canvas-toolbar-icons.tsx + frame-icon-paths.tsx)
// the tutorial lessons render, so the template needs no design-system package.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function CursorSelectIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#cursor-select-clip)">
        <path
          d="M6.2063 6.25221C7.19981 5.18231 14.6728 7.80321 14.6667 8.76011C14.6597 9.8452 11.7482 10.179 10.9413 10.4054C10.456 10.5416 10.326 10.6811 10.2141 11.19C9.70736 13.4946 9.45293 14.6409 8.87305 14.6665C7.94873 14.7073 5.23672 7.29635 6.2063 6.25221Z"
          stroke="currentColor"
        />
        <path
          d="M1.33331 6.13325L1.33331 8.53325M8.53331 1.33325L6.13331 1.33325M4.99998 13.3333H5.66665M13.3333 4.99992V5.66659M1.42227 3.13257C1.52535 2.64764 1.69889 2.28317 1.99106 1.991C2.27509 1.70698 2.62744 1.53506 3.09236 1.43099M13.2444 3.13257C13.1413 2.64764 12.9677 2.28317 12.6756 1.991C12.3975 1.71298 12.0541 1.54238 11.6036 1.43769M3.09236 13.2355C2.62744 13.1314 2.27509 12.9595 1.99106 12.6755C1.70416 12.3886 1.53164 12.032 1.42791 11.56"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="cursor-select-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TextIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 14H6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 2C8.5 1.72386 8.27614 1.5 8 1.5C7.72386 1.5 7.5 1.72386 7.5 2H8H8.5ZM7.5 14C7.5 14.2761 7.72386 14.5 8 14.5C8.27614 14.5 8.5 14.2761 8.5 14H8H7.5ZM8 2H7.5V14H8H8.5V2H8Z"
        fill="currentColor"
      />
      <path
        d="M12.6666 4C12.6666 3.58128 12.6666 3.37191 12.6129 3.18845C12.5012 2.80684 12.2044 2.4781 11.8361 2.32817C11.659 2.25609 11.459 2.23565 11.0589 2.19477C10.113 2.09812 8.9249 2 7.99998 2C7.07506 2 5.88696 2.09812 4.94105 2.19477C4.54098 2.23565 4.34094 2.25609 4.16388 2.32817C3.79561 2.4781 3.49875 2.80684 3.38703 3.18845C3.33331 3.37191 3.33331 3.58128 3.33331 4"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaintBrushIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.59393 13.9152L2 14L2.08485 13.4061C2.21391 12.5027 2.27844 12.051 2.47888 11.6501C2.67933 11.2492 3.00198 10.9265 3.64727 10.2812L11.3218 2.60673C11.6041 2.32436 11.7453 2.18317 11.8976 2.1077C12.1874 1.9641 12.5276 1.9641 12.8174 2.1077C12.9697 2.18317 13.1109 2.32436 13.3933 2.60673C13.6756 2.8891 13.8168 3.03029 13.8923 3.18259C14.0359 3.47237 14.0359 3.81259 13.8923 4.10237C13.8168 4.25468 13.6756 4.39586 13.3933 4.67823L5.71878 12.3527C5.07348 12.998 4.75083 13.3207 4.34994 13.5211C3.94905 13.7216 3.49733 13.7861 2.59393 13.9152Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 9.99992L6 11.9999M5.66667 8.33325L7.66667 10.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlowConnectionIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#flow-clip)">
        <path
          d="M1.66669 3.66659C1.66669 2.56664 1.66669 2.01667 2.0084 1.67496C2.3501 1.33325 2.90008 1.33325 4.00002 1.33325C5.09996 1.33325 5.64994 1.33325 5.99164 1.67496C6.33335 2.01667 6.33335 2.56664 6.33335 3.66659C6.33335 4.76653 6.33335 5.3165 5.99164 5.65821C5.64994 5.99992 5.09996 5.99992 4.00002 5.99992C2.90008 5.99992 2.3501 5.99992 2.0084 5.65821C1.66669 5.3165 1.66669 4.76653 1.66669 3.66659Z"
          stroke="currentColor"
        />
        <path
          d="M2.43788 10.4378C3.17426 9.70144 3.54245 9.33325 3.99998 9.33325C4.45751 9.33325 4.8257 9.70144 5.56208 10.4378C6.29846 11.1742 6.66665 11.5424 6.66665 11.9999C6.66665 12.4574 6.29846 12.8256 5.56208 13.562C4.8257 14.2984 4.45751 14.6666 3.99998 14.6666C3.54245 14.6666 3.17426 14.2984 2.43788 13.562C1.7015 12.8256 1.33331 12.4574 1.33331 11.9999C1.33331 11.5424 1.7015 11.1742 2.43788 10.4378Z"
          stroke="currentColor"
        />
        <path
          d="M4 6V9.33333M6.66667 12H10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 12.0001C10 10.9001 10 10.3502 10.3417 10.0085C10.6834 9.66675 11.2334 9.66675 12.3333 9.66675C13.4333 9.66675 13.9832 9.66675 14.325 10.0085C14.6667 10.3502 14.6667 10.9001 14.6667 12.0001C14.6667 13.1 14.6667 13.65 14.325 13.9917C13.9832 14.3334 13.4333 14.3334 12.3333 14.3334C11.2334 14.3334 10.6834 14.3334 10.3417 13.9917C10 13.65 10 13.1 10 12.0001Z"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id="flow-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function FrameIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <FrameIconPaths />
    </svg>
  );
}

function ColumnIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="5" height="12" rx="2" stroke="currentColor" />
      <rect x="9" y="6" width="5" height="8" rx="2" stroke="currentColor" />
    </svg>
  );
}

function RowIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="12" height="5" rx="2" stroke="currentColor" />
      <rect x="2" y="9" width="8" height="5" rx="2" stroke="currentColor" />
    </svg>
  );
}

function GridIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" />
      <rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" />
      <rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" />
      <rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" />
    </svg>
  );
}

function RectIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="12" height="12" stroke="currentColor" />
    </svg>
  );
}

function FrameIconPaths() {
  return (
    <>
      <path
        d="M8 2V8M8 32V26M26 2V8M26 32V26M32 8L26 8M2 8L8 8M32 26H26M2 26H8M26 8L8 8M26 8V26M8 8V26M8 26L26 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12C8 9.79086 6.20914 8 4 8H2M4 8C6.20914 8 8 6.20914 8 4M8 2V4M14 8H12C9.79086 8 8 6.20914 8 4M8 14V12C8 9.79086 9.79086 8 12 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 12C26 9.79086 24.2091 8 22 8H20M22 8C24.2091 8 26 6.20914 26 4M26 2V4M32 8H30C27.7909 8 26 6.20914 26 4M26 14V12C26 9.79086 27.7909 8 30 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 30C26 27.7909 24.2091 26 22 26H20M22 26C24.2091 26 26 24.2091 26 22M26 20V22M32 26H30C27.7909 26 26 24.2091 26 22M26 32V30C26 27.7909 27.7909 26 30 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 30C8 27.7909 6.20914 26 4 26H2M4 26C6.20914 26 8 24.2091 8 22M8 20V22M14 26H12C9.79086 26 8 24.2091 8 22M8 32V30C8 27.7909 9.79086 26 12 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

export {
  ColumnIcon,
  CursorSelectIcon,
  FlowConnectionIcon,
  FrameIcon,
  GridIcon,
  PaintBrushIcon,
  RectIcon,
  RowIcon,
  TextIcon,
};
