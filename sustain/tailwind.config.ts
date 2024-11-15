import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
  daisyui: {
    themes: ["dark"],
  },
  plugins: [daisyui],
} satisfies Config;
