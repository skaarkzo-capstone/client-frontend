import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        ibarra: ["var(--font-ibarra)", "serif"],
      },
    },
    letterSpacing: {
      wide: ".025em",
      wider: ".15em",
      widest: ".3em",
    },
  },
  plugins: [],
} satisfies Config;
