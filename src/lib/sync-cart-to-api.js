import ecomPassport from '@ecomplus/passport-client'
import ecomClient from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'

let resolveCartId
const fetchingCartId = new Promise(resolve => (resolveCartId = resolve))

const fetchCart = _id => ecomClient.store({
  url: `/carts/${_id || ecomCart.data._id}.json`
}).then(({ data }) => {
  Object.assign(ecomCart.data, data)
  ecomCart.save()
  resolveCartId(data._id)
  return data
})

const prepareCartItem = item => {
  const fixedItem = {}
  ;[
    '_id',
    'product_id',
    'variation_id',
    'sku',
    'name',
    'picture',
    'customizations',
    'gift_wrap',
    'quantity',
    'min_quantity',
    'max_quantity',
    'currency_id',
    'currency_symbol',
    'price',
    'final_price',
    'flags'
  ].forEach(itemField => {
    if (item[itemField] !== undefined) {
      fixedItem[itemField] = item[itemField]
    }
  })
  if (fixedItem.picture) {
    delete fixedItem.picture._id
  }
  return fixedItem
}

const prepareCart = cart => {
  const { subtotal } = cart
  let url, method
  if (cart.created_at) {
    url = `/carts/${cart._id}.json`
    method = 'PATCH'
  } else {
    url = '/carts.json'
    method = 'POST'
  }
  return {
    url,
    method,
    cleanedData: {
      subtotal,
      items: cart.items.map(item => prepareCartItem(item))
    }
  }
}

const upsertCart = () => {
  if (ecomPassport.checkAuthorization() && ecomCart.data.items.length) {
    const { url, method, cleanedData } = prepareCart(ecomCart.data)
    return ecomPassport.requestApi(url, method, cleanedData)
      .then(({ data }) => fetchCart(data._id))
  } else {
    return Promise.resolve()
  }
}

export { fetchCart, fetchingCartId, upsertCart }
