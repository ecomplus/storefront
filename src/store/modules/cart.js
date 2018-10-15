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
  editCart (state, payload) {
    state.body = {
      ...state.body,
      ...payload.body
    }
  },

  // remove item from cart
  removeCartItem (state, payload) {
    state.body.items.splice(payload.index, 1)
  }
}

const getters = {
  cart: state => state.body
}

const actions = {
  // load cart body object
  loadCart ({ commit, state, dispatch }, payload) {
    let id = payload.id
    let update = body => {
      commit('editCart', { body })
      dispatch('fixCartItems')
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
      }
    }
  },

  // handle products data and update cart items
  fixCartItems ({ commit, state, dispatch }) {
    state.body.items.forEach((item, index) => {
      dispatch('initProduct', { id: item.product_id }, { root: true })
        .then(() => {
          // success, valid product
          console.log(item.product_id)
        })
        .catch(() => {
          // product not found
          // remove from cart
          commit('removeCartItem', { index })
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
