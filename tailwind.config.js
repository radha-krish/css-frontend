/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
],
}
