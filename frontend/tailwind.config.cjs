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
          DEFAULT: '#9FD4DF',
          light: '#C7FFFF',
          dark: '#527B7F',
        },
      },
      fontFamily: {
        sans: ['Dosis', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
