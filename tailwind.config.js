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
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

