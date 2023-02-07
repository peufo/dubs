/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,md,mdx,svelte,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFA400',
          light: '#FFD549',
          dark: '#8A5200',
        },
        secondary: {
          DEFAULT: '#527B7F',
          light: '#80aaae',
          dark: '#264f53',
        },
      },
      fontFamily: {
        sans: ['Dosis', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
