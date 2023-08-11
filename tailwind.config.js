/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    fontFamily: {
      logo: ['Lilita One'],
      primary: ['Mont Regular'],
      header: ['Mont Bold'],
      semiBold: ['Mont Semi Bold'],

      light: ['Mont Light'],
    },

    extend: {},
  },
  plugins: [],
  important: true,
};
