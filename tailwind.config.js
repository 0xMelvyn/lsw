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
        'chewi': ['Chewi', 'sans-serif'],
      },
      colors: {
        'custom-pink': '#FFE5E7',
        'custom-purple': '#D9D5F4',
      },
    },
  },
  variants: {},
  plugins: [],
}
