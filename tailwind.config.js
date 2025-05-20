/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.{ts,tsx,js,jsx,html}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Primary blues
        primary: {
          DEFAULT: "#07102E",
          light: "#101C43",
          lighter: "#2859FE",
          dark: "#050D28",
          darkest: "#030714",
        },
        // Secondary green
        secondary: {
          DEFAULT: "#00D36C",
          light: "#30D158",
          dark: "#00B556",
          darker: "#0E964B",
        },
        // Accents
        accent: {
          orange: "#FFA411",
          yellow: "#F8D512",
          red: "#F65457",
          darkRed: "#D22024",
          gray: "#585959",
          black: "#000002",
        },
        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#CAD1E6",
        },
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-premium": "linear-gradient(135deg, #093DCE 0%, #07102E 100%)",
        "gradient-pro":
          "linear-gradient(135deg, #00D36C 0%, #01B662 18%, #036F4C 44%, #053B3B 65%, #061C31 81%, #07102E 90%)",
        "gradient-lite": "linear-gradient(135deg, #173998 0%, #07102E 90%)",
        "gradient-free": "linear-gradient(135deg, #0E477A 0%, #07102E 90%)",
        "gradient-delete": "linear-gradient(to right, #00D36C, #00964D)",
        "gradient-upgrade": "linear-gradient(to right, #2859FE, #093DCE)",
        "gradient-configure": "linear-gradient(to right, #F65457, #D22024)",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
