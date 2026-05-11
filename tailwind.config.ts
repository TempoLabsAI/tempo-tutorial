import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./tempo/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bone: "var(--bone)",
        paper: "var(--paper)",
        "paper-warm": "var(--paper-warm)",
        "paper-dark": "var(--paper-dark)",
        "paper-deep": "var(--paper-deep)",
        // Ink
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-quiet": "var(--ink-quiet)",
        // Lines
        rule: "var(--rule)",
        // Brand
        terracotta: "var(--terracotta)",
        "terracotta-light": "var(--terracotta-light)",
        "terracotta-dark": "var(--terracotta-dark)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-press": "var(--accent-press)",
        "accent-soft": "var(--accent-soft)",
        // Greys (legacy)
        moss: "var(--moss)",
        "moss-light": "var(--moss-light)",
        "moss-dark": "var(--moss-dark)",
        oxblood: "var(--oxblood)",
        patina: "var(--patina)",
        gold: "var(--gold)",
        stone: "var(--stone)",
        "stone-light": "var(--stone-light)",
        "stone-soft": "var(--stone-soft)",
      },
      fontFamily: {
        // Single sans family — Geist as the system font
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["Geist", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
        serif: ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        // Friendly Airbnb-style scale — clean & readable
        "display-xl":  ["clamp(2.5rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(2rem, 4vw, 3rem)",      { lineHeight: "1.1",  letterSpacing: "-0.018em" }],
        "display-md":  ["clamp(1.625rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm":  ["clamp(1.25rem, 2vw, 1.5rem)",   { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        plate: "12px",
        "4xl": "32px",
        "5xl": "40px",
      },
      boxShadow: {
        plate: "var(--shadow-card)",
        lift:  "var(--shadow-card-hover)",
        press: "var(--shadow-modal)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        modal: "var(--shadow-modal)",
        pill:  "var(--shadow-pill)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s var(--ease-out) forwards",
        "rise":    "revealUp 0.45s var(--ease-out) forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        revealUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
