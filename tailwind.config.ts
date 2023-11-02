import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'app-primary': '#e0fdf8', // creamy blue
        'app-secondary': '#79c4f2', // dark blue
        'app-tertiary': '#5b7327', // dirty green
        'app-color-4': '#5b9ed9', // blue
        'app-color-5': '#84b6e3', //
        'app-color-6': '#3286cf', //
      },
    },
  },
  plugins: [],
}
export default config
