/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EC1C24",
        },
        secondary: {
          DEFAULT: "#F24536",
        },
      },
    },
  },
  plugins: [],
};

