const path = require('path')
const emptyScss = path.resolve(__dirname, '__fixtures__/empty.scss')

module.exports = {
  externals: {
    // imported from CDN
    vue: 'Vue',
    jquery: '$',
    'popper.js': 'Popper'
  },
  resolve: {
    alias: {
      // components SCSS directly imported to styles.scss
      './scss/APicture.scss': emptyScss,
      './scss/APrices.scss': emptyScss,
      './scss/ProductCard.scss': emptyScss,
      './scss/TheProduct.scss': emptyScss
    }
  }
}
