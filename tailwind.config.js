/** @type {import('tailwindcss').Config} */


// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-purple': '#faf5ff',
        'dark-purple': '#770ef7',
        'dark-blue': '#1b1834',
        'gray-blue': '#242145',
        'light-gray-blue': '#3b3670',
        'button':'#7360DF',
        'button-hover':'#33186B',
        'background-gray':'#F5F7F8'
      },
      backgroundImage: {
        'custom-gradient': `radial-gradient(39.56% 48.29% at 20% 115.78%, #110f1f 0%, rgba(36, 33, 69, 0) 100%),
                      radial-gradient(54.23% 74.52% at 69.72% -10.08%, #110f1f 0%, rgba(36, 33, 69, 0) 100%),
                      radial-gradient(21.67% 31.7% at 39.72% 107.79%, rgba(74, 51, 209, 0.8) 0%, rgba(74, 51, 209, 0) 100%),
                      radial-gradient(40.08% 51.33% at 85.83% 24.14%, rgba(74, 51, 209, 0.8) 0%, rgba(74, 51, 209, 0) 100%),
                      #110f1f`
      },
    },
  },
  plugins: [],

  variants: {
    extend: {},
  },
  plugins: [],
};
