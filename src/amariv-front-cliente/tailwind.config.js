/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#53735B",
        "secondary-green": "#CADDA8",
        "light-green": "#E8F4EB",
        "dark-green": "#004646",
        "input-color": "#FBFFF3"
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}

