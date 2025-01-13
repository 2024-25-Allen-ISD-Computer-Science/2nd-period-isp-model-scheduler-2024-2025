/** @type {import("tailwindcss").Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      "baseM-50": "#0d0d0d",
      "baseM-100": "#161616",
      "baseM-200": "#1a1a1c",
      "baseM-300": "#202020",
      "baseM-400": "#262626",
      "textM-main": "#dcdcdc",
      "textM-sub": "#626263",
      current: 'currentColor',
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      black: colors.black,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

