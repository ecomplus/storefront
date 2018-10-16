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

  // find item by ID and remove from cart
  removeCartItem (state, { id }) {
    state.body.items.forEach((item, index, items) => {
      if (item._id === id) {
        // found
        items.splice(index, 1)
        return false
      }
    })
  }
}

const getters = {
  cart: state => state.body
}

const actions = {
  // load cart body object
  loadCart ({ commit, state, dispatch }, payload) {
    let promises = []
    let id = payload.id
    let update = body => {
      commit('editCart', { body })
      promises.push(dispatch('fixCartItems'))
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
        promises.push(new Promise((resolve, reject) => {
          reject(new Error('Can\'t access HTML5 localStorage'))
        }))
      }
    }

    if (!promises.length) {
      // cart already loaded
      // force resolve
      promises.push(new Promise(resolve => { resolve() }))
    }
    return promises
  },

  // handle products data and update cart items
  fixCartItems ({ commit, state, dispatch, rootGetters }) {
    let promises = []
    state.body.items.forEach((item) => {
      let id = item.product_id
      let product = rootGetters.productById(id)
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
        promise = dispatch('initProduct', { id }, { root: true }).then(body => {
          // product data goes out of date
          // shedule removal
          setTimeout(() => {
            commit('removeProduct', { id: body._id }, { root: true })
          }, 30000)
        })
      }

      promise
        .then(product => {
          // valid product
          commit('fixCartItem', { id: item._id, product })
        })
        .catch(() => {
          // probably product not found
          // remove from cart
          commit('removeCartItem', { id: item._id })
        })
      promises.push(promise)
    })
    return promises
  },

  // treat and fix specific cart item
  fixCartItem ({ commit }, payload) {
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
