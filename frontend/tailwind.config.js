/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
            200: "#d9ddee",
            500: "#9492db",
            600: "#7164c0",
        },
        gray: {
            200: "#eeeeef",
            200: "#e6e9ed",
            600: "#95989c"
        }
      }
    },
  },
  plugins: [],
}
