const scrollbarHide = require("tailwind-scrollbar-hide");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        LightYellow: "#f6d876",
        White2: "#fffbf2",
        darkgreen: "#05ab54",
        dark: "#000000", 
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
    },
  },
  plugins: [scrollbarHide],
};
