/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {darkPrimary:'#5757AD',
        primary:'#000091',
        grayBorder :'#ddd'},
      lineHeight: {
          '15': '3rem',
      }
    },
  },
  plugins: [],
}

