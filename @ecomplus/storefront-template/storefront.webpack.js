const path = require('path')
const emptyScss = path.resolve(__dirname, '__fixtures__/empty.scss')

module.exports = ({ devMode }) => {
  const customConfig = {
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

  if (!devMode) {
    customConfig.externals = {
      // imported from CDN
      vue: 'Vue',
      jquery: '$',
      'popper.js': 'Popper'
    }
  } else {
    // dev server improves
    const { alias } = customConfig.resolve
    alias.jquery$ = 'jquery/dist/jquery.slim'
    if (process.env.MONOREPO_SERVER) {
      alias['@ecomplus/storefront-twbs$'] = path.resolve(__dirname, '../storefront-twbs/src/')
    }
  }

  return customConfig
}
