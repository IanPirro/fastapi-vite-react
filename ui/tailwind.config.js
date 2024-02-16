/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: '#C9EAB5',
        secondary: '#B3C8EA',
        tertiary: '#EAB3C8',
        quaternary: '#FFFDCF',
        darkest: '#0D1808',
        icon: '#4A4A4A',
        'icon-purple': '#C3B3EA',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
