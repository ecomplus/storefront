import { DEFAULT_CURRENCY, DEFAULT_LANG } from '@/lib/constants'

const module = 'cart'
// initial state
// https://developers.e-com.plus/docs/api/#/store/carts
const state = {
  body: {
    _id: null,
    items: []
  }
}

const mutations = {
  // reset cart body object
  editCart (state, { body }) {
    state.body = {
      ...state.body,
      ...body
    }
  },

  // find item by ID and remove or edit
  fixCartItem (state, { id, product, remove }) {
    state.body.items.forEach((item, index, items) => {
      if (item._id === id) {
        // found
        if (product) {
          if (item.variation_id) {
            // search product variation
            let variation
            if (product.variations) {
              variation = product.variations.find(variation => variation._id === item.variation_id)
            }
            if (!variation) {
              // variation not found
              // force to unavailable
              product.available = false
            } else {
              // merge variation body to product body
              Object.assign(product, variation)
              if (variation.picture && product.pictures) {
                let picture = product.pictures.find(picture => picture._id === variation.picture)
                if (picture) {
                  // set variation picture as first
                  product.pictures[0] = picture
                }
              }
            }
          }

          if (product.available) {
            // fix cart item data
            item.sku = product.sku
            if (!item.name) {
              item.name = product.name
            }
            if (!item.picture || !Object.keys(item.picture).length) {
              if (product.hasOwnProperty('pictures') && product.pictures.length) {
                // use first product picture
                item.picture = product.pictures[0]
                delete item.picture._id
                delete item.picture.tag
              }
            }

            // update prices and quantities
            if (!item.keep_item_price && product.hasOwnProperty('price')) {
              item.price = product.price
              item.currency_id = product.currency_id
              item.currency_symbol = product.currency_symbol
            }
            if (!item.keep_item_quantity) {
              if (product.hasOwnProperty('quantity')) {
                item.max_quantity = product.quantity
                if (item.quantity > item.max_quantity) {
                  // fix current in cart quantity to max value
                  item.quantity = item.max_quantity
                }
              }
              if (product.hasOwnProperty('min_quantity')) {
                item.min_quantity = product.min_quantity
                if (item.quantity < item.min_quantity) {
                  // fix quantity to min value
                  item.quantity = item.min_quantity
                }
              }
            }
          } else {
            // product unavailable to sell
            remove = true
          }
        }

        if (remove) {
          // remove cart item
          items.splice(index, 1)
        }
        // exit loop
        return false
      }
    })
  }
}

const getters = {
  cart: state => state.body,

  // auxiliary functions
  formatMoney: state => (price, currency = DEFAULT_CURRENCY, lang = DEFAULT_LANG) => {
    // format pt-BR, en-US
    lang = lang.replace('_', '-')
    var priceString
    try {
      priceString = price.toLocaleString(lang, { style: 'currency', currency: currency })
    } catch (e) {
      // fallback
      priceString = price
    }
    return priceString
  }
}

const actions = {
  // load cart body object
  loadCart ({ commit, state, dispatch }, payload) {
    let promise
    let id = payload.id
    let update = body => {
      commit('editCart', { body })
      promise = dispatch('fixCartItems')
    }
    // test with current state body
    let { items } = state.body

    if (id) {
      // try to get from Store API with cart ID
      dispatch('api', [ 'get', module, id ], { root: true }).then(update)
    } else if (!items.length) {
      // try to load JSON from client storage
      let db = window.localStorage
      if (db) {
        let json = db.getItem('cart')
        if (json) {
          let items
          try {
            let obj = JSON.parse(json)
            items = obj.items
          } catch (e) {
            console.error('Invalid stored cart JSON', e)
            return
          }

          if (Array.isArray(items)) {
            // save only items
            let body = {
              items: []
            }
            // generate base Object ID for cart items
            let objectId = ('1' + Date.now()).padEnd(24, '0')
            for (let i = 0; i < items.length; i++) {
              let item = items[i]
              if (typeof item === 'object' && item !== null && item.product_id && item.quantity) {
                body.items.push(Object.assign(item, {
                  _id: objectId.substring(0, 24 - i.toString().length) + i,
                  // force some properties for security
                  keep_item_quantity: false,
                  keep_item_price: false
                }))
              }
            }
            // update cart
            update(body)
          }
        }
      } else {
        promise = Promise().reject(new Error('Can\'t access HTML5 localStorage'))
      }
    }

    if (!promise) {
      // fallback for cart already loaded
      // force resolve
      promise = Promise.resolve()
    }
    return promise.then(() => {
      console.log('CART LOADED')
    })
  },

  // handle products data and update cart items
  fixCartItems ({ commit, state, dispatch, rootGetters }) {
    let promises = []
    state.body.items.forEach((item) => {
      let id = item.product_id
      // abstraction to get product data
      let Product = () => rootGetters.productById(id)
      let product = Product()
      let promise

      if (product.hasOwnProperty('_id')) {
        promise = new Promise((resolve, reject) => {
          if (product.sku) {
            // found
            resolve(product)
          } else {
            // should not goes here
            reject(new Error('Invalid product'))
          }
        })
      } else {
        // try to setup current product
        promise = dispatch('initProduct', { id }, { root: true }).then(() => {
          // product data goes out of date
          // shedule removal
          setTimeout(() => {
            commit('removeProduct', { id: Product()._id }, { root: true })
          }, 5 * 60000)
        })
      }

      promise
        .then(() => {
          // valid product
          commit('fixCartItem', { id: item._id, product: { ...Product() } })
        })
        .catch(() => {
          // probably product not found
          // remove from cart
          commit('fixCartItem', { id: item._id, remove: true })
        })
      promises.push(promise)
    })

    return Promise.all(promises).finally(() => {
      console.log('CART ITEMS')
    }).catch(e => {
      // ignore error
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
