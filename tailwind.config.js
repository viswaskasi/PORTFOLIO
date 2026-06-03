/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        primary: "#ffffff", // white
        secondary: "#a3a3a3", // gray-400
        accent: "#171717", // neutral-900 for dark glass
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], // Switch display to Inter for hyper-minimalism
      }
    },
  },
  plugins: [],
}
