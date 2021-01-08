module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '1/2': '50%'
      }
    },
  },
  variants: {
    extend: {
        width: ['responsive', 'focus'],
        margin: ['last']
    },
    lineClamp: ['responsive'],
  },
  plugins: [
      require('@neojp/tailwindcss-line-clamp-utilities'),
      require('tailwindcss-scroll-snap')
  ]
}
