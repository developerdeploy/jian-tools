/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60-30-10 Rule Design Tokens
        // 60% Canvas / Base
        canvas: {
          DEFAULT: "var(--canvas-bg)",
          deep: "#040507",
          surface: "var(--canvas-surface)",
          card: "var(--canvas-card)",
          border: "var(--border-subtle)",
          borderHighlight: "var(--border-highlight)",
        },
        // 30% Structural Steel / Text / Framing
        steel: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // 10% Accent / Focal Points / CTAs
        precision: {
          blue: "#0066FF",
          blueHover: "#0052CC",
          cyan: "#00E5FF",
          gold: "#D4AF37",
          amber: "#F59E0B",
        }
      },
      fontFamily: {
        sans: ["'Roboto'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Roboto Condensed'", "'Roboto'", "sans-serif"],
        mono: ["'Roboto'", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
