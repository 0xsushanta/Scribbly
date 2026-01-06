import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        hand: ["Kalam", "cursive"],
      },

      colors: {
        paper: "#f8fafc", // Slate 50
        ink: "#0f172a",   // Slate 900

        brand: {
          50: "#fff8f5",
          100: "#FEEAC9", // Lightest - Peachy cream
          200: "#ffe0c7",
          300: "#FFCDC9", // Light pink/coral
          400: "#ffbeb8",
          500: "#FDACAC", // Medium pink
          600: "#fd9595",
          700: "#FD7979", // Darkest pink/coral
          800: "#fd5c5c",
          900: "#fd3f3f",
        },

        accent: {
          200: "#a5f3fc",
          400: "#22d3ee",
          500: "#06b6d4", // Cyan pop
          600: "#0891b2",
        },
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },

  plugins: [],
};

export default config;
