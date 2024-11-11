import type { Config } from "tailwindcss";
import daisyui from "daisyui"; // Import daisyUI

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
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [daisyui],
} satisfies Config;
