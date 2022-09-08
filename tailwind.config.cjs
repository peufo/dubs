/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: colors.indigo[400],
          light: colors.indigo[100],
          DEFAULT: colors.indigo[100],
        },
      },
      fontFamily: {
        sans: ['Comic Neue', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
