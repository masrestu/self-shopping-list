/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundSize: {
        '25': '50%',
      },
      colors: {
        'sayur': 'rgb(178, 231, 170)',
      }
    },
  },
  plugins: [],
}