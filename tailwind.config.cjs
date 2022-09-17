/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFA400',
          light: '#ffd549',
          dark: '#c67500',
        },
        secondary: {
          DEFAULT: '#b8b8d1',
          light: '#eaeaff',
          dark: '#8888a0',
        },
      },
      fontFamily: {
        sans: ['Dosis', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
