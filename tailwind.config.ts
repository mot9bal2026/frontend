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
          /* Core — coffee identity */
          brown: "#3D2817", // espresso — primary backbone
          coffee: "#5A3825", // mid-roast — hover states
          cream: "#FAF6F0", // linen cream — backgrounds
          gold: "#C8A876", // Saudi gold — premium accents
          coral: "#E3998B", // legacy — kept for back-compat
          ink: "#1A0F0A", // text on light bg
          muted: "#7A6A5E", // secondary text
          border: "#E6D8C8", // warm hairline border
          white: "#FFFFFF",
          /* Apothecary — clinical trust layer */
          apothecary: "#1E5B3F", // pharmacy green — SFDA, halal, guarantees
          sage: "#E8F2EC", // soft sage — clinical section backgrounds
          deepSage: "#B7D6C2", // hairline border for clinical cards
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
