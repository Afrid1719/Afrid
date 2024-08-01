import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        "app-primary": "#071f35", // denim blue
        "app-secondary": "#79c4f2", // dark blue
        "app-tertiary": "#5b7327", // dirty green
        "app-color-4": "#5b9ed9", // blue
        "app-color-5": "#84b6e3", //
        "app-color-6": "#3286cf", //
      },
    },
  },
  plugins: [],
};
export default config;
