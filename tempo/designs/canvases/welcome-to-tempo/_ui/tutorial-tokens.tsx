/**
 * The design-system tokens the tutorial lessons render with, carried by the
 * template itself so the lessons look the same in any canvas host.
 *
 * The lessons were designed on Tempo's own canvas, where
 * @tempo-modules/tempo-design-system's theme.css (dark) defines these raw
 * tokens and the lesson roots' `THEME_BRIDGE` points Tailwind's `--color-*`
 * at them. A user's repo has none of that (and may define its own,
 * different values), so the dark values are declared here, scoped to the
 * lesson roots only: an element that directly holds this style tag. Nothing
 * outside a lesson is affected. Values are resolved from theme.css (dark).
 */
const TOKENS = `
  /* Text renders as in the app and on the design canvas: antialiased, with
     the app's line height and font features, whatever the host's body sets. */
  :has(> style[data-tutorial-tokens]) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-wrap: break-word;
    line-height: 1.5;
    font-feature-settings: "calt", "rlig";
  }
  /* The app's base layer: borders default to the text color (even in hosts
     that restore Tailwind v3's gray default) and scrollbars are hidden. */
  @layer base {
    :has(> style[data-tutorial-tokens]),
    :has(> style[data-tutorial-tokens]) *,
    :has(> style[data-tutorial-tokens]) ::before,
    :has(> style[data-tutorial-tokens]) ::after {
      border-color: currentColor;
    }
    :has(> style[data-tutorial-tokens]),
    :has(> style[data-tutorial-tokens]) * {
      scrollbar-width: none;
    }
    :has(> style[data-tutorial-tokens])::-webkit-scrollbar,
    :has(> style[data-tutorial-tokens]) *::-webkit-scrollbar {
      display: none;
    }
  }
  [data-theme="dark"]:has(> style[data-tutorial-tokens]) {
    --base-accent: #d4d4d4;
    --base-accent-subtle: color-mix(in srgb, #d4d4d4 16%, #0e0e0e);
    --base-accent-subtle-hover: color-mix(in srgb, #d4d4d4 24%, #0e0e0e);
    --on-base-accent: #0e0e0e;
    --border-primary: #3a3a3a;
    --border-secondary: #232323;
    --chat-agent-border: #232323;
    --chat-bubble-assistant: transparent;
    --chat-bubble-user: #232323;
    --chat-input-bg: #191919;
    --chat-input-border: #232323;
    --chat-plan-accent: #ff898c;
    --chat-plan-bg: color-mix(in srgb, #ff898c 8%, #0e0e0e);
    --chat-plan-border: color-mix(in srgb, #ff898c 25%, transparent);
    --chat-question-accent: #b46cf8;
    --chat-question-bg: color-mix(in srgb, #b46cf8 5%, #0e0e0e);
    --chat-question-border: color-mix(in srgb, #b46cf8 20%, transparent);
    --chat-tool-result-bg: #040404;
    --chat-tool-result-border: #232323;
    --critical: #f46363;
    --critical-subtle: rgba(208, 16, 16, 0.2);
    --critical-subtle-hover: color-mix(in srgb, #d01010 30%, transparent);
    --focus: #9aa3b5;
    --icons-primary: #f5f5f5;
    --icons-secondary: #bababa;
    --icons-tertiary: #787878;
    --info: #0958d9;
    --info-subtle: rgba(64, 150, 255, 0.2);
    --info-subtle-hover: color-mix(in srgb, #4096ff 30%, transparent);
    --input-border: transparent;
    --input-surface: #232323;
    --kiwi: #75d9a6;
    --lavender: #cd9dfa;
    --lavender-subtle: rgba(104, 8, 195, 0.2);
    --lavender-subtle-hover: color-mix(in srgb, #002c8c 30%, transparent);
    --menu-divider: #3a3a3a;
    --nav-inactive-hover: #191919;
    --lavender-200: #f2e6fd;
    --on-critical: #ffffff;
    --on-error-subtle: #f99a9a;
    --on-info: #ffffff;
    --on-info-subtle: #91caff;
    --on-lavender: #1c1523;
    --on-lavender-subtle: #f2e6fd;
    --on-success: #060e03;
    --on-success-subtle: #9df26a;
    --on-warning: #312801;
    --scrim: rgba(0, 0, 0, 0.5);
    --selection: #67cffd;
    --selection-subtle: color-mix(in srgb, #67cffd 20%, transparent);
    --success: #78e33d;
    --success-subtle: rgba(120, 227, 61, 0.2);
    --success-subtle-hover: color-mix(in srgb, #78e33d 30%, transparent);
    --surface: #0e0e0e;
    --surface-ask-question: #191919;
    --surface-awaiting-response: color-mix(in srgb, #f9d338 10%, transparent);
    --surface-blueberry: color-mix(in srgb, #67cffd 20%, transparent);
    --surface-blueberry-flipped: #67cffd;
    --surface-blueberry-hover: color-mix(in srgb, #67cffd 30%, transparent);
    --surface-container: #191919;
    --surface-container-high: #232323;
    --surface-container-highest: #3a3a3a;
    --surface-container-low: #0e0e0e;
    --surface-container-lowest: #080808;
    --surface-dim: #040404;
    --surface-issue-card: #191919;
    --surface-kiwi: color-mix(in srgb, #00bf6a 20%, transparent);
    --surface-kiwi-flipped: #75d9a6;
    --surface-kiwi-hover: color-mix(in srgb, #00bf6a 30%, transparent);
    --surface-lavender: color-mix(in srgb, #6808c3 40%, transparent);
    --surface-lavender-flipped: #cd9dfa;
    --surface-lavender-hover: color-mix(in srgb, #6808c3 50%, transparent);
    --surface-menu: #232323;
    --surface-menu-hover: #3a3a3a;
    --surface-mustard: color-mix(in srgb, #ffd55f 20%, transparent);
    --surface-mustard-flipped: #ffd55f;
    --surface-mustard-hover: color-mix(in srgb, #ffd55f 30%, transparent);
    --surface-salmon: color-mix(in srgb, #ffa7a9 20%, transparent);
    --surface-salmon-flipped: #ffc4c5;
    --surface-salmon-hover: color-mix(in srgb, #ffa7a9 30%, transparent);
    --surface-sidebar-base: #121212;
    --surface-topshell: #0e0e0e;
    --text-awaiting-response: #f9d338;
    --text-blueberry: #67cffd;
    --text-blueberry-flipped: #002332;
    --text-kiwi: #75d9a6;
    --text-kiwi-flipped: #032615;
    --text-lavender: #cd9dfa;
    --text-lavender-flipped: #1c1523;
    --text-mustard: #ffd55f;
    --text-mustard-flipped: #33280b;
    --text-primary: #f5f5f5;
    --text-salmon: #ffa7a9;
    --text-salmon-flipped: #331616;
    --text-secondary: #bababa;
    --text-tertiary: #787878;
    --warning: #f9d338;
    --warning-subtle: rgba(249, 211, 56, 0.2);
    --warning-subtle-hover: color-mix(in srgb, #f9d338 30%, transparent);
    --blueberry-200: #e5f7fe;
    --blueberry-300: #cceffe;
    --blueberry-400: #99dffe;
    --blueberry-700: #02affc;
    --blueberry-900: #016997;
    --kiwi-400: #a5e6c4;
    --kiwi-700: #00bf6a;
    --lavender-300: #e6cefc;
    --lavender-400: #cd9dfa;
    --lavender-500: #b46cf8;
    --lavender-700: #820af4;
    --lavender-800: #6808c3;
    --lavender-990: #1c1523;
    --lavender-800-a20: rgba(104, 8, 195, 0.2);
    --mustard-400: #ffeaaf;
    --salmon-400: #ffc4c5;
    --salmon-700: #ff6c6f;
    --border-width-thin: 0.5px;
    --button-disabled-surface: #3a3a3a;
    --button-disabled-text: #787878;
    --comment-pin-shadow: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45));
    --shadow-popover: 1px 2px 4px 0px rgba(0, 0, 0, 0.17), 4px 7px 10px 0px rgba(0, 0, 0, 0.12), 9px 16px 14px 0px rgba(0, 0, 0, 0.07), 16px 28px 18px 0px rgba(0, 0, 0, 0.03);
    --surface-sidebar-item-hover: #232323;
    --white: #ffffff;
    --icons-muted: #787878;
    --leading-body: 16px;
    --leading-caption: 13px;
    --leading-micro: 11px;
    --leading-label: 14px;
    --text-body: 13px;
    --text-caption: 10px;
    --text-micro: 9px;
    --text-label: 11px;
    --tree-item-px: 8px;
    --tree-item-py-comfortable: 5px;
    --tree-icon-size: 16px;
    --tree-label-size: 13px;
    --tree-label-line-height: 18px;
    --tree-item-gap: 8px;
    --tree-meta-gap: 6px;
    --tree-chevron-size: 13px;
    --tree-item-hover-bg: #191919;
    --easing-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
    --color-background: #040404;
    --color-foreground: #f5f5f5;
    --font-sans: "SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "InterVariable", "Inter", "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --tree-item-py: 6px;
    --tree-item-py-dense: 4px;
    --tree-item-indent: 12px;
    --tree-item-gap-y: 4px;
    --tree-group-gap: 12px;
    --tree-children-gap: 4px;
    --tree-item-width: 247px;
    --tree-item-active-bg: #3a3a3a;
    --tree-header-font-size: 11px;
    --tree-header-font-weight: 600;
    --tree-item-font-size: 13px;
    --tree-item-font-weight: 400;
    --tree-icon-offset: -8px;
    --default-font-family: "SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "InterVariable", "Inter", "Segoe UI", sans-serif;
    --default-mono-font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    /* Unset in the design system: a host value must not leak in. */
    --md-container-high: initial;
    --md-font-mono: initial;
  }
  /* Some hosts style bare headings and images globally, and unlayered rules
     beat Tailwind's layered utilities. Inside a lesson, hand those
     properties back to the lesson's own classes. */
  :has(> style[data-tutorial-tokens]) :is(h1, h2, h3, h4, h5, h6) {
    color: revert-layer;
    font-family: revert-layer;
    font-weight: revert-layer;
    letter-spacing: revert-layer;
    line-height: revert-layer;
  }
  :has(> style[data-tutorial-tokens]) img {
    display: revert-layer;
    max-width: revert-layer;
  }
  /* The design system's dark lavender accent pair (button-accent-lavender). */
  [data-theme="dark"]:has(> style[data-tutorial-tokens]) .button-accent-lavender {
    --accent: var(--lavender-400);
    --on-accent: var(--lavender-990);
    --accent-subtle: var(--lavender-800-a20);
    --accent-subtle-hover: color-mix(in srgb, var(--lavender-800) 30%, transparent);
    --color-accent: var(--lavender-400);
    --color-on-accent: var(--lavender-990);
    --color-accent-subtle: var(--lavender-800-a20);
    --color-accent-subtle-hover: color-mix(in srgb, var(--lavender-800) 30%, transparent);
  }
`;

export function TutorialTokens() {
  return <style data-tutorial-tokens="">{TOKENS}</style>;
}
