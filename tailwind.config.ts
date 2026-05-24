import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#3D2817",
          coffee: "#5A3825",
          cream: "#FAF6F0",
          gold: "#C8A876",
          coral: "#E3998B",
          ink: "#211915",
          muted: "#7A6A5E",
          border: "#E6D8C8",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        arabic: ["Tajawal", "sans-serif"],
        sans: ["Inter", "Tajawal", "sans-serif"],
      },
      lineHeight: {
        arabic: "1.75",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
