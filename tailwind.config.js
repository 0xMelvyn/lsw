/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'article': ['article', 'sans-serif'],
        'LovelyValentine': ['Lovely Valentine', 'sans-serif'],
        'dense': ['dense', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}
