import ecomPassport from '@ecomplus/passport-client'
import ecomClient from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'

let resolveCreatedCart

export const hasCartCreated = new Promise(resolve => (resolveCreatedCart = resolve))

const fetchCart = (_id) => {
  return ecomClient.store({
    url: `/carts/${_id || ecomCart.data._id}.json`
  })
}

const prepareCartItem = item => {
  const { _id, product_id, sku, name, quantity, price } = item
  return {
    _id,
    product_id,
    sku,
    name,
    quantity,
    price
  }
}

const prepareCart = cart => {
  const { subtotal, created_at } = cart
  const url = created_at ? `/carts/${cart._id}.json` : '/carts.json'
  const method = created_at ? 'PATCH' : 'POST'
  const items = []
  for (const item of cart.items) {
    items.push(prepareCartItem(item))
  }
  const cleanedData = { subtotal, items }
  return { url, method, cleanedData }
}

const updateLocalCart = data => {
  Object.assign(ecomCart.data, data)
  ecomCart.save()
}

export const sendCart = () => {
  return new Promise(resolve => {
    if (ecomPassport.checkAuthorization()) {
      const { url, method, cleanedData } = prepareCart(ecomCart.data)
      ecomPassport
        .requestApi(url, method, cleanedData)
        .then(({ data }) => fetchCart(data._id))
        .then(({ data }) => {
          updateLocalCart(data)
          resolveCreatedCart(data._id)
          resolve(data)
        })
    } else {
      throw 'Customer not authorized to save new cart'
    }
  })
}
