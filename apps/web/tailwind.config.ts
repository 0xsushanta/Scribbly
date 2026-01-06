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
          50: "#eff6ff",
          100: "#DBEAFE", // Lightest - Light blue
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60A5FA", // Sky blue
          500: "#3B82F6", // Blue - Primary
          600: "#2563EB", // Dark blue
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
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
