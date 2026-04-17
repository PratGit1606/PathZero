/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cabinet Grotesk'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        bg: "#080C10",
        surface: "#0F1620",
        border: "#1C2A3A",
        muted: "#2A3B4D",
        dim: "#4A6070",
        text: "#E8F0F6",
        "text-secondary": "#8AA5B8",
        accent: "#00E5A0",
        "accent-dim": "#00A370",
        "accent-glow": "rgba(0,229,160,0.15)",
        gold: "#F5C842",
        "gold-dim": "#B8941E",
        warn: "#FF6B35",
        blue: "#3B8BEB",
        "blue-dim": "#1A5FAD",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,229,160,0.12), transparent)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        pulse2: "pulse2 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse2: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
