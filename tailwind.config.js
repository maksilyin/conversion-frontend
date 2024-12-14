/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          thumb: {
            borderRadius: '0.5rem',
          },
        },
      },
      transitionProperty: {
        'max-height': 'max-height'
      },
      colors: {
        'blue-dark': '#0C65AF',
        'blue-dark-100': '#2c69d2',
        'blue-dark-900': '#012356',
        'blue-light-50': '#eaf0ff4d',
        'blue-light-100': '#EAF0FF',
        'orange-dark': '#FF764C',
        'orange-dark-600': '#FF5D2B',
        'gray-dark': '#3B4559',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

