/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      heading: ["Palladio", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        "ycp-primary": "#001C44",
        "ycp-orange": "#FF5F54",
        black: "#1A1A1A",
        // blue: '#0078F8',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
