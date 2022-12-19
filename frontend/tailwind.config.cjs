/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,md,mdx,svelte,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFA400',
          light: '#ffd549',
          dark: '#c67500',
        },
        secondary: {
          DEFAULT: '#bfe3e8',
          light: '#f2ffff',
          dark: '#8eb1b6',
        },
      },
      fontFamily: {
        sans: ['Dosis', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
