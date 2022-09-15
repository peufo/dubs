/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a9b3ce',
          light: '#dbe5ff',
          dark: '#7a839d',
        },
        secondary: {
          DEFAULT: '#efbe22',
          light: '#fff05b',
          dark: '#b88e00',
        },
      },
      fontFamily: {
        sans: ['Dosis', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
