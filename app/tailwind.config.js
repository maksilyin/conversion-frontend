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
        'orange-main': '#EC9322',
        'gray-dark': '#3B4559',
        'black': {
          '300': '#47474f',
          DEFAULT: '#333333',
        },
        'grey-light': '#F5F5FA',
        'main': {
          '100': '#3C8FD5',
          '500': '#007BFF',
          '700': '#0056b3'
        },
        'green': {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d',
          '950': '#052e16',
        },
      },
      boxShadow: {
        'bottom': '0px 4px 6px rgba(0, 0, 0, 0.1)',
        'bottom-lg': '0px 10px 15px rgba(0, 0, 0, 0.15)',
        'ring': '0 0 40px',
        'ring-5': '0 0 5px',
        'ring-10': '0 0 10px',
      },
    },
    screens: {
      'xs': '490px',
      'sm': '640px',
      'md': '768px',
      'lg': '1090px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

