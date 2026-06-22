import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        primary: "#D4AF37",
        "primary-hover": "#e6c456",
        secondary: "#A3A3A3",
        "glass-dark": "rgba(17, 17, 17, 0.7)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-syne)"],
      },
    },
  },
  plugins: [],
};
export default config;
