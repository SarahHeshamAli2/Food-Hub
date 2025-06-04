/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        LightYellow: "#f6d876",
        White2: "#fffbf2",
        darkgreen: "#05ab54",
        dark: "#333333", // corrected to a valid hex
        primary: "var(--primary-color)",
        "primary-dark": "var(--primary-color-dark)",
        "primary-rgb": "rgb(var(--primary-color-rgb))",
      },
      fontFamily: {
        popins: ["Poppins", "sans-serif"],
        leagueGothic: ["League Gothic", "Sans-Serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
        animation: {
    'fade-in': 'fadeIn 0.3s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
    },
  },


  plugins: [require("tailwind-scrollbar-hide")],
}
