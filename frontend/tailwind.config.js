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
    },
  },
  plugins: [],
}
