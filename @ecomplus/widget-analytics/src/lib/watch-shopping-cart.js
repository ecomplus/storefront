import watchShoppingCart from '@ecomplus/widget-tag-manager/src/lib/watch-shopping-cart'

export default gtag => {
  watchShoppingCart({
    push: ({ event, ecommerce }) => {
      if (ecommerce && (event === 'eec.add' || event === 'eec.remove')) {
        const data = ecommerce[event.slice(4)]
        if (data && data.products) {
          gtag('event', event === 'eec.add' ? 'add_to_cart' : 'remove_from_cart', {
            items: data.products
          })
        }
      }
    }
  })
}
