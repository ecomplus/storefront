import ecomCart from '@ecomplus/shopping-cart'

ecomCart.data.items.forEach(({ _id, flags }) => {
  if (Array.isArray(flags) && flags.includes('__tmp')) {
    ecomCart.removeItem(_id)
  }
})
