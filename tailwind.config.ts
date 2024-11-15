import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        "app-primary": "#071f35",
        "app-secondary": "#79c4f2",
        "app-tertiary": "#749433",
        "app-tertiary-dark": "#38451c",
        "app-color-4": "#5b9ed9",
        "app-color-5": "#84b6e3",
        "app-color-6": "#3286cf"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
export default config;
