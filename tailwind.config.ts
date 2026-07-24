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
          /* Core — dark neutral backbone (herbal/medical identity, no coffee-brown) */
          brown: "#0F3024", // deep forest ink — headings, dark blocks
          coffee: "#164A32", // hover state for dark blocks
          cream: "#FAF6F0", // linen cream — backgrounds
          gold: "#C8A876", // Saudi gold — premium accents
          coral: "#E3998B", // legacy — kept for back-compat
          ink: "#1A0F0A", // text on light bg
          muted: "#7A6A5E", // secondary text
          border: "#E6D8C8", // warm hairline border
          white: "#FFFFFF",
          /* Apothecary — clinical trust layer, the primary CTA color:
             green reads as "safe medical treatment" for a pain-relief oil */
          apothecary: "#1E5B3F", // pharmacy green — CTAs, SFDA, halal, guarantees
          apothecaryDark: "#164A32", // hover state for green CTAs
          sage: "#E8F2EC", // soft sage — clinical section backgrounds
          deepSage: "#B7D6C2", // hairline border for clinical cards
          /* Rust — sampled from the real product bottle label, ties every
             price/urgency accent visually to the physical product shipped */
          rust: "#A6432E",
          rustDark: "#8A3624",
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
