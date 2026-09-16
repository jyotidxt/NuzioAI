import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        card: "#181818",
        primary: {
          DEFAULT: "#7C5CFF",
          hover: "#6A49FF",
          light: "rgba(124, 92, 255, 0.15)",
        },
        accent: {
          DEFAULT: "#35E6B5",
          hover: "#2BD2A4",
          light: "rgba(53, 230, 181, 0.15)",
        },
        "text-primary": "#FFFFFF",
        "text-secondary": "#9CA3AF",
      },
      borderColor: {
        DEFAULT: "rgba(255, 255, 255, 0.08)",
        custom: "rgba(255, 255, 255, 0.08)",
      },
      borderRadius: {
        "24": "24px",
        card: "24px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
