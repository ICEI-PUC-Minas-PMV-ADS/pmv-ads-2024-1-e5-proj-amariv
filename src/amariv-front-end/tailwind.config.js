/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    /*
    screens: {
      'sm': '640px',
      // => @media (min-width: 670px) { ... }

      'md': '738px',
      // => @media (min-width: 768px) { ... }

      'lg': '994px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1250px',
      // => @media (min-width: 1280px) { ... }
    },
    */
    extend: {
      colors: {
        'amariv': '#F4FAF6',
        "primary-backgroud": "#53735B",
        "primary-green": "#53735B",
        "secondary-green": "#CADDA8",
        "light-green": "#E8F4EB",
        "dark-green": "#004646",
        "input-color": "#FBFFF3",
        "light-backgroud": "#F4FAF6"
      }
    },
  },
  plugins: [],
}

