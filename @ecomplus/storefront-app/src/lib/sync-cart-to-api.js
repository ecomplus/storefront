import ecomPassport from '@ecomplus/passport-client'
import ecomClient from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'

let resolveCartId
const fetchingCartId = new Promise(resolve => (resolveCartId = resolve))

const fetchCart = _id => ecomClient.store({
  url: `/carts/${_id || ecomCart.data._id}.json`
}).then(({ data }) => {
  const isCartOwner = Array.isArray(data.customers) &&
    data.customers.includes(ecomPassport.getCustomer()._id)
  for (const field in data) {
    if (data[field] && field !== 'items' && field !== 'subtotal') {
      switch (field) {
        case 'items':
        case 'subtotal':
          continue
        case '_id':
        case 'customers':
        case 'created_at':
        case 'updated_at':
          if (!isCartOwner) {
            continue
          }
      }
      ecomCart.data[field] = data[field]
    }
  }
  data.items.forEach(item => {
    const currentItem = ecomCart.data.items.find(({ _id }) => _id === item._id)
    if (!currentItem) {
      ecomCart.addItem(item)
    } else if (currentItem.quantity < item.quantity) {
      ecomCart.increaseItemQnt(item._id, item.quantity - currentItem.quantity)
    }
  })
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
  const { subtotal, completed, orders, flags } = cart
  const customerId = ecomPassport.getCustomer()._id
  let url, method
  if (cart.created_at && Array.isArray(cart.customers) && cart.customers.includes(customerId)) {
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
      completed,
      orders,
      flags: flags ? flags.slice(0, 10) : [],
      items: cart.items.map(item => prepareCartItem(item))
    }
  }
}

let queueTimer
const queueUpdateCart = tryRequestApi => new Promise(resolve => {
  if (!queueTimer) {
    queueTimer = setTimeout(() => {
      queueTimer = null
      tryRequestApi()
        .then(() => resolveCartId(ecomCart.data._id))
        .finally(resolve)
    }, 3000)
  }
})

const upsertCart = () => {
  if (ecomPassport.checkAuthorization() && ecomCart.data.items.length) {
    const { url, method, cleanedData } = prepareCart(ecomCart.data)
    const tryRequestApi = () => {
      return ecomPassport.requestApi(url, method, cleanedData)
        .catch(console.error)
    }
    return method === 'POST'
      ? tryRequestApi()
        .then(({ data }) => {
          fetchCart(data._id)
          setTimeout(() => {
            ecomPassport.requestApi(`/carts/${data._id}.json`, 'PATCH', {
              permalink: `https://${window.location.host}${window.location.pathname}#/cart/${data._id}`
            }).catch(console.error)
          }, 300)
        })
      : queueUpdateCart(tryRequestApi)
  } else {
    return Promise.resolve()
  }
}

export { fetchCart, fetchingCartId, upsertCart }
