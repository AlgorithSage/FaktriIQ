import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        industrial: {
          ink: "#0F172A",          // Primary text, nav chrome, buttons
          slate: "#1E293B",        // Header bars, sidebars, secondary panels
          surface: "#FFFFFF",      // Default page background
          subtle: "#F8FAFC",       // Secondary background for card separation
          border: "#E2E8F0",       // Hairline borders, dividers
          muted: "#64748B",        // Metadata, disabled, quiet text
          accent: "#CA8A04",       // Brand gold — links, active states, focus
          "accent-light": "#FEF9C3", // Pale yellow wash for highlighted cards/hover
          "accent-mid": "#FDE68A",   // Badges, tags, progress bars
          flag: "#DC2626",         // Compliance gap flags, critical alerts
          verify: "#16A34A",       // Compliant / success status
          warn: "#D97706",         // Medium-confidence / advisory states
        }
      },
      fontFamily: {
        primary: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      }
    },
  },
  plugins: [tailwindcssAnimate],
}
