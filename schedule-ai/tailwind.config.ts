import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#daeafe",
          200: "#bad9fd",
          300: "#90c2fc",
          400: "#64a4f8",
          500: "#3c84f2",
          600: "#2868d4",
          700: "#2353ad",
          800: "#1f468c",
          900: "#1f3b72",
          950: "#14264b",
        },
        slate: {
          950: "#0f172a",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
