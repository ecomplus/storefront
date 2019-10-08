import EcomCart from '@ecomplus/shopping-cart'
import ecomClient from '@ecomplus/client'

const cart = new EcomCart()

const fetchProduct = _id => {
  return ecomClient.store({
    url: `/products/${_id}.json`,
    axiosConfig: {
      timeout: 30000
    }
  })
}

const state = {
  amount: {
    freight: 0,
    discount: 0,
    total: 0
  },
  discount: {
    coupon: {
      name: '',
      value: 0
    }
  },
  shipping: {}
}

const getters = {
  amount: ({ amount }) => amount,

  totalValue: ({ amount }) => amount.total,

  shippingZipCode: ({ shipping }) => {
    if (shipping.shipping_line) {
      return shipping.shipping_line.to.zip
    } else {
      return ''
    }
  }
}

const mutations = {
  updateAmount (state) {
    const { freight, discount } = state.amount
    state.amount.total = cart.data.subtotal + freight - discount
  },

  setDiscount (state, discountValue) {
    state.amount.discount = discountValue
  },

  selectShippingService (state, shippingService) {
    state.shipping = shippingService
    const { amount } = state
    amount.total -= amount.freight
    amount.freight = shippingService.shipping_line.total_price
    amount.total += amount.freight
  }
}

const actions = {
  fetchCartItems ({ commit }, { removeOnError }) {
    const promises = []
    cart.data.items.forEach(item => {
      const { _id, quantity } = item
      const promise = new Promise(resolve => {
        fetchProduct(item.product_id)
          .then(({ data }) => {
            Object.assign(item, data, {
              quantity: 0,
              body_html: null,
              body_text: null
            })
            cart.increaseItemQnt(_id, quantity, false)
          })
          .catch(err => {
            console.error(err)
            const status = err.response && err.response.status
            if (removeOnError || (status >= 400 && status < 500)) {
              cart.removeItem(_id, false)
            }
            // TODO: Notify error
          })
          .finally(resolve)
      })
      promises.push(promise)
    })
    return Promise.all(promises).then(() => {
      cart.save()
      commit('updateAmount')
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
