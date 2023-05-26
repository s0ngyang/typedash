/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'grey-8008': '#333a45',
        'lightgrey-8008': '#939eae',
      },
    },
    plugins: [],
  },
};
