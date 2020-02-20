module.exports = {
  externals: {
    vue: 'Vue',
    jquery: '$',
    'popper.js': 'Popper'
  },
  resolve: {
    alias: {
      /* Uncomment to use customized product card Vue component
      '@ecomplus/widget-product-card/src/components/EcProductCard.vue$':
        require('path').resolve(__dirname, 'template/js/components/ProductCard.vue')
      */
    }
  }
}
