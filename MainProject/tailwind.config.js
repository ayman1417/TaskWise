/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#094B4B",
        secondary: "#F69C0C",
        // tertiary: "#E6E6E6", ziad
        tertiary: "#F6F6F6",
        Gradient: "#042525",
        card: "#0B5B5B",
        sideBarHover: "#094545",
        logoColor: '#ffb548',
        projectBackGround: '#D7EDED',
        rightBar: '#FFBC00',
        sideBarColor: '#76A3AF'
      },
    },
    fontFamily: {
      title: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
  ],
};
