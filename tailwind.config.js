/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#5757AD",
        primary: "#000091",
        grayBorder: "#ddd",
      },
      lineHeight: {
        15: "3rem",
      },
      boxShadow: {
        custom:
          "0 -2px 0 0 var(--border-default-grey), inset 0 -1px 0 0 var(--border-default-grey)",
      },
    },
  },
  plugins: [],
};
