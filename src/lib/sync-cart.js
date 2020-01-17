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

const prepareCartItem = item => ({
  _id: item._id,
  product_id: item.product_id,
  sku: item.sku,
  name: item.name,
  quantity: item.quantity,
  price: item.price
})

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
      throw new Error('Customer not authorized to save new cart')
    }
  })
}
