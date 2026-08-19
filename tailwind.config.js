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
        primary: "#D1D0D0",
        secondary: "#988686",
        accent: "#D71920",
        taupe: "#988686",
        platinum: "#D1D0D0",
        espresso: "#5C4E4E",
        crimson: {
          DEFAULT: "#D71920",
          hover: "#B51218",
          dark: "#8F1014",
          subtle: "#FEF2F2",
          border: "rgba(215, 25, 32, 0.2)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], // Switch display to Inter for hyper-minimalism
      }
    },
  },
  plugins: [],
}
