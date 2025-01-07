/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      "white": "#cccccc",
      "black": "#111111",
      "baseM-50": "#0d0d0d",
      "baseM-100": "#161616",
      "baseM-200": "#1e1e1e",
      "baseM-300": "#202020",
      "baseM-400": "#262626",
      "text-main": "#dcdcdc",
      "text-sub": "#626263",
      "red-100": "#ee4444",
      "blue-100": "#2563ea",
      "green-100": "#44aa44",
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

