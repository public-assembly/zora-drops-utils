/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
  content: [
    './.{html,js,ts,jsx,tsx}',
    './**/*.{html,js,ts,jsx,tsx}',
    './../../examples/**/*.{js,ts,jsx,tsx}',
    './../../packages/**/*.{js,ts,jsx,tsx}',
  ],
}
