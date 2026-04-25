/** @type {import('tailwindcss').Config} */
export default {
  // ─── Dark Mode Strategy ──────────────────────────────────────────────────
  // "class" strategy: dark mode is toggled by adding/removing the "dark" class
  // on the <html> element, giving full programmatic control via React context.
  // This is preferred over "media" for portfolios that want a manual toggle.
  darkMode: "class",

  // ─── Content Paths ───────────────────────────────────────────────────────
  // Tailwind scans these files at build time to tree-shake unused utility
  // classes. Include every file that may contain Tailwind class names.
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    // Explicitly include common sub-directories in case glob resolution
    // behaves differently across operating systems or CI environments.
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "./src/hooks/**/*.{js,jsx}",
    "./src/context/**/*.{js,jsx}",
    "./src/utils/**/*.{js,jsx}",
    "./src/data/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      // ─── Brand Color Palette ───────────────────────────────────────────
      // Semantic naming keeps component code readable and makes global palette
      // changes a one-line edit here rather than a find-and-replace across files.
      colors: {
        // Primary accent — used for CTAs, highlights, active states, links.
        // A vibrant cyan/teal that reads well on both dark and light backgrounds.
        primary: {
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4", // ← default brand accent
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },

        // Secondary accent — used for gradients, hover states, decorative elements.
        // A purple/violet that pairs well with the primary cyan.
        secondary: {
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7", // ← default secondary accent
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },

        // Dark-theme surface colors — layered backgrounds for depth.
        dark: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b", // ← card / elevated surface
          900: "#0f172a", // ← page background
          950: "#020617", // ← deepest background layer
        },

        // Light-theme surface colors — subtle grays for cards and sections.
        light: {
          50:  "#ffffff",
          100: "#f9fafb", // ← page background
          200: "#f3f4f6", // ← section alternate background
          300: "#e5e7eb", // ← card / elevated surface
          400: "#d1d5db",
          500: "#9ca3af",
          600: "#6b7280",
          700: "#4b5563",
          800: "#374151",
          900: "#1f2937",
          950: "#111827",
        },
      },

      // ─── Typography ────────────────────────────────────────────────────
      fontFamily: {
        // Primary display font — used for headings and hero text.
        // Falls back to system sans-serif stack if Google Fonts are unavailable.
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        // Monospace font — used for code snippets, terminal-style elements,
        // and the animated typing component.
        mono: [
          "Fira Code",
          "JetBrains Mono",
          "Cascadia Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        // Display / heading accent — for hero titles if a display font is loaded.
        display: [
          "Plus Jakarta Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      fontSize: {
        // Extra small utility for badges and labels
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        // Fluid hero heading — overridden via responsive classes in components
        "7xl":  ["4.5rem",  { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "8xl":  ["6rem",    { lineHeight: "1",    letterSpacing: "-0.025em" }],
        "9xl":  ["8rem",    { lineHeight: "1",    letterSpacing: "-0.03em" }],
      },

      // ─── Spacing & Sizing ──────────────────────────────────────────────
      // Extend the default spacing scale with a few project-specific values.
      spacing: {
        "4.5":  "1.125rem",
        "5.5":  "1.375rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
        "68":   "17rem",
        "76":   "19rem",
        "84":   "21rem",
        "88":   "22rem",
        "92":   "23rem",
        "100":  "25rem",
        "112":  "28rem",
        "120":  "30rem",
        "128":  "32rem",
        "144":  "36rem",
      },

      // ─── Border Radius ─────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── Box Shadow ────────────────────────────────────────────────────
      // Custom shadows complement the dark/light theme layers and card elevations.
      boxShadow: {
        // Subtle glow effects using the primary brand color
        "glow-sm":  "0 0 10px  rgba(6, 182, 212, 0.25)",
        "glow-md":  "0 0 20px  rgba(6, 182, 212, 0.35)",
        "glow-lg":  "0 0 40px  rgba(6, 182, 212, 0.40)",
        "glow-xl":  "0 0 80px  rgba(6, 182, 212, 0.45)",
        // Secondary (purple) glow
        "glow-purple-sm": "0 0 10px  rgba(168, 85, 247, 0.25)",
        "glow-purple-md": "0 0 20px  rgba(168, 85, 247, 0.35)",
        "glow-purple-lg": "0 0 40px  rgba(168, 85, 247, 0.40)",
        // Dark card shadow — provides depth on dark backgrounds
        "card-dark": "0 4px 24px rgba(0, 0, 0, 0.40)",
        // Light card shadow — used in light mode
        "card-light": "0 4px 24px rgba(0, 0, 0, 0.08)",
        // Inner highlight for glassmorphism-style components
        "inner-light": "inset 0 1px 0 rgba(255, 255, 255, 0.10)",
      },

      // ─── Background Gradients (via backgroundImage) ────────────────────
      backgroundImage: {
        // Hero section gradient — dark mode
        "hero-dark":
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(6, 182, 212, 0.15) 0%, transparent 60%), " +
          "radial-gradient(ellipse 60% 60% at 80% 120%, rgba(168, 85, 247, 0.10) 0%, transparent 60%)",
        // Hero section gradient — light mode
        "hero-light":
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(6, 182, 212, 0.10) 0%, transparent 60%), " +
          "radial-gradient(ellipse 60% 60% at 80% 120%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
        // Gradient used for skill bars, progress indicators
        "skill-bar":
          "linear-gradient(90deg, rgba(6, 182, 212, 1) 0%, rgba(168, 85, 247, 1) 100%)",
        // Gradient text utility (pair with bg-clip-text text-transparent)
        "gradient-text":
          "linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #06b6d4 100%)",
        // Subtle grid pattern for section backgrounds
        "grid-pattern":
          "linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), " +
          "linear-gradient(to right, rgba(6, 182, 212, 0.03) 1px, transparent 1px)",
      },

      // ─── Background Size ───────────────────────────────────────────────
      backgroundSize: {
        "grid": "40px 40px",
      },

      // ─── Animations ────────────────────────────────────────────────────
      // Framer Motion handles the majority of transitions, but these CSS-native
      // animations are used for continuous effects (gradient shifts, pulses)
      // that would be wasteful to drive via JS.
      keyframes: {
        // Smooth infinite gradient animation for hero text
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        // Floating / bobbing effect for decorative elements
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        // Subtle pulse ring for call-to-action buttons or avatar borders
        "pulse-ring": {
          "0%":   { transform: "scale(1)",    opacity: "1" },
          "100%": { transform: "scale(1.4)",  opacity: "0" },
        },
        // Typewriter cursor blink (backup for react-type-animation)
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        // Shimmer effect for loading skeletons or card hover states
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        // Slide in from bottom — used for scroll-reveal fallback
        "slide-up": {
          "0%":   { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        // Fade in — generic entrance
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Rotate 360° — used for loading spinners
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        // Bounce dot — for animated ellipsis loaders
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "scale(0)", opacity: "0.5" },
          "40%":           { transform: "scale(1)", opacity: "1" },
        },
      },

      animation: {
        "gradient-shift": "gradient-shift 4s ease infinite",
        "float":          "float 6s ease-in-out infinite",
        "float-slow":     "float 9s ease-in-out infinite",
        "float-fast":     "float 4s ease-in-out infinite",
        "pulse-ring":     "pulse-ring 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite",
        "blink":          "blink 1s step-end infinite",
        "shimmer":        "shimmer 2.5s linear infinite",
        "slide-up":       "slide-up 0.5s ease forwards",
        "fade-in":        "fade-in 0.4s ease forwards",
        "spin-slow":      "spin-slow 8s linear infinite",
        "bounce-dot":     "bounce-dot 1.4s ease-in-out infinite",
      },

      // ─── Transition Timing ─────────────────────────────────────────────
      transitionTimingFunction: {
        // Smooth spring-like easing for interactive UI elements
        "spring":     "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        // Snappy ease-out for menus, drawers, dropdowns
        "out-expo":   "cubic-bezier(0.19, 1, 0.22, 1)",
        // Standard ease-in-out with slightly more emphasis on deceleration
        "in-out-soft":"cubic-bezier(0.45, 0, 0.55, 1)",
      },

      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },

      // ─── Z-Index Scale ─────────────────────────────────────────────────
      // Explicit z-index values prevent z-fighting between layered components
      // (navbar, modals, tooltips, overlays, particles).
      zIndex: {
        "1":    "1",
        "2":    "2",
        "60":   "60",  // Sticky nav
        "70":   "70",  // Mobile menu overlay
        "80":   "80",  // Modals / drawers
        "90":   "90",  // Toasts / notifications
        "100":  "100", // Top-level overlays
      },
    },
  },

  plugins: [],
};