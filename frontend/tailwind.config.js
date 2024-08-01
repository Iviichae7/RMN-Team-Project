/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '20': '10rem',
        'custom': '100px',
      },
    },
  },
  plugins: [],
}

