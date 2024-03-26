/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainTextColor: "#0f3d36",
        altTextColor: "#30d4b1",
        mainBgColor: "#30d4b1",
        altBgColor: "#0f3d36",
        anotherAltBgColor: "#292929"
      },
      fontFamily: {
        "google-sans": ["google-sans", " Verdana", "Geneva", "Tahoma", "sans-serif"]
      }
    },
  },
  plugins: [],
}