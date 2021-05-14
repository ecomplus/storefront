import {
  name as getName,
  price as getPrice
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import ecomClient from '@ecomplus/client'
import baseModulesRequestData from './../../lib/base-modules-request-data'

const fixMoneyValue = num => Math.round(num * 100) / 100

const fetchProduct = _id => {
  return ecomClient.store({
    url: `/products/${_id}.json`,
    axiosConfig: {
      timeout: 30000
    }
  })
}

const validateCartItem = (item, data) => new Promise((resolve, reject) => {
  const { _id, quantity } = item
  if (item.variation_id) {
    let variation
    if (data.variations) {
      variation = data.variations.find(({ _id }) => _id === item.variation_id)
      if (!variation) {
        variation = data.variations.find(({ sku }) => sku === item.sku)
        item.variation_id = variation._id
      }
    }
    if (!variation) {
      ecomCart.removeItem(_id)
    } else {
      const product = data
      data = variation
      for (const field in product) {
        if (product[field] && !variation[field]) {
          variation[field] = product[field]
        }
      }
    }
  }
  const price = getPrice(data)
  delete data.customizations
  delete data.variations
  delete data.body_html
  delete data.body_text
  delete data.inventory_records
  delete data.price_change_records
  if (item.picture && Object.keys(item.picture).length) {
    delete data.pictures
  }
  Object.assign(item, data, {
    _id,
    price,
    min_quantity: typeof data.min_quantity === 'number' ? data.min_quantity : 1,
    max_quantity: data.quantity
  })
  item.quantity = data.quantity >= item.min_quantity
    ? Math.min(data.quantity, quantity)
    : 0
  if (item.quantity > 0 && item.kit_product) {
    return validateCartItemKit(item)
      .then(payload => {
        data.quantity -= item.quantity
        resolve(payload)
      })
      .catch(reject)
  }
  data.quantity -= item.quantity
  resolve(item)
})

const validateCartItemKit = item => {
  const kitProductId = item.kit_product._id
  delete item.kit_product.price
  return fetchProduct(kitProductId).then(({ data }) => {
    if (data.available && data.kit_composition) {
      let packQuantity = 0
      let isFixedQuantity = true
      let kitItem
      data.kit_composition.forEach(currentKitItem => {
        if (currentKitItem.quantity) {
          packQuantity += currentKitItem.quantity
        } else if (isFixedQuantity) {
          isFixedQuantity = false
        }
        if (currentKitItem._id === item.product_id) {
          kitItem = currentKitItem
        }
      })
      if (!isFixedQuantity) {
        packQuantity = data.min_quantity
      }
      if (kitItem && (kitItem.quantity === undefined || item.quantity % kitItem.quantity === 0)) {
        let kitTotalQuantity = 0
        ecomCart.data.items.forEach(item => {
          if (item.kit_product && item.kit_product._id === kitProductId) {
            kitTotalQuantity += item.quantity
          }
        })
        const minPacks = kitItem.quantity
          ? item.quantity / kitItem.quantity
          : 1
        if (kitTotalQuantity && kitTotalQuantity % (minPacks * packQuantity) === 0) {
          item.kit_product = {
            ...item.kit_product,
            _id: data._id,
            name: getName(data),
            price: getPrice(data),
            pack_quantity: packQuantity
          }
          if (data.slug) {
            item.slug = data.slug
          }
        } else {
          delete item.kit_product
        }
      }
    }
    return item
  })
}

const prepareTransaction = ({ customer, transaction }) => {
  const { name } = customer
  const fullname = `${name.given_name} ` +
    (name.middle_name ? `${name.middle_name} ${name.family_name}` : name.family_name)
  const fillTransaction = transaction => {
    const buyer = {
      email: customer.main_email,
      birth_date: {
        day: 1,
        month: 1,
        year: 1950
      },
      fullname
    }
    ;[
      'inscription_number',
      'inscription_type',
      'doc_number',
      'doc_country',
      'registry_type',
      'gender'
    ].forEach(prop => {
      const value = customer[prop]
      if (value) {
        buyer[prop] = value
      }
    })
    if (customer.phones.length) {
      buyer.phone = customer.phones[0]
    }
    if (customer.birth_date) {
      Object.assign(buyer.birth_date, customer.birth_date)
    }
    Object.assign(transaction, { buyer })
    if (!transaction.billing_address) {
      transaction.billing_address = customer.addresses.find(addr => addr.default)
    }
  }
  if (Array.isArray(transaction)) {
    transaction.forEach(fillTransaction)
  } else {
    fillTransaction(transaction)
  }
  return transaction
}

const { sessionStorage } = window
const couponStorageKey = 'st_discount_coupon'
const persistDiscountCoupon = couponCode => {
  if (sessionStorage) {
    sessionStorage.setItem(couponStorageKey, couponCode)
  }
}

let checkoutPromise

const state = {
  cart: ecomCart.data,
  shippingService: {},
  discountCoupon: (sessionStorage && sessionStorage.getItem(couponStorageKey)) || '',
  discountRule: {},
  paymentGateway: {},
  notes: ''
}

const getters = {
  amount: ({ cart, shippingService, discountRule, paymentGateway }) => {
    const amount = {
      subtotal: fixMoneyValue(cart.subtotal),
      freight: shippingService.shipping_line
        ? fixMoneyValue(shippingService.shipping_line.total_price)
        : 0,
      discount: 0
    }
    amount.total = amount.subtotal + amount.freight
    const addDiscount = discountValue => {
      discountValue = fixMoneyValue(discountValue)
      amount.discount += discountValue
      amount.total -= discountValue
    }
    if (discountRule.extra_discount) {
      addDiscount(discountRule.extra_discount.value)
    }
    if (paymentGateway.discount) {
      const maxDiscount = amount[paymentGateway.discount.apply_at || 'total']
      if (maxDiscount > 0) {
        const { type, value } = paymentGateway.discount
        let discountValue
        if (type === 'percentage') {
          discountValue = maxDiscount * value / 100
        } else {
          discountValue = value <= maxDiscount ? value : maxDiscount
        }
        addDiscount(discountValue)
      }
    }
    amount.total = amount.total > 0 ? fixMoneyValue(amount.total) : 0
    return amount
  },

  discountCoupon: ({ discountCoupon }) => discountCoupon,

  discountRule: ({ discountRule }) => discountRule.app_id ? discountRule : undefined,

  shippingZipCode: ({ shippingService }) => {
    if (shippingService.shipping_line) {
      return shippingService.shipping_line.to.zip
    } else {
      return ''
    }
  },

  shippingService: ({ shippingService }) => shippingService.app_id ? shippingService : undefined,

  paymentGateway: ({ paymentGateway }) => paymentGateway.app_id ? paymentGateway : undefined,

  notes: ({ notes }) => notes
}

const mutations = {
  selectShippingService (state, shippingService) {
    state.shippingService = shippingService || {}
  },

  selectPaymentGateway (state, paymentGateway) {
    state.paymentGateway = paymentGateway || {}
  },

  setDiscountCoupon (state, discountCoupon) {
    if (discountCoupon && state.discountRule.app_id) {
      persistDiscountCoupon(discountCoupon)
    }
    state.discountCoupon = discountCoupon || ''
  },

  setDiscountRule (state, discountRule) {
    if (state.discountCoupon && discountRule.app_id) {
      persistDiscountCoupon(state.discountCoupon)
    }
    state.discountRule = discountRule || {}
  },

  setNotes (state, notes) {
    state.notes = notes
  },

  resetCart (state) {
    if (sessionStorage) {
      sessionStorage.removeItem(couponStorageKey)
    }
    ecomCart.reset()
    state.cart = ecomCart.data
  }
}

const actions = {
  fetchCartItems ({ commit }, { removeOnError, items }) {
    const promises = []
    const itemsByProduct = (Array.isArray(items) && items.length ? items : ecomCart.data.items)
      .reduce((itemsByProduct, item) => {
        const group = itemsByProduct.find(({ _id }) => _id === item.product_id)
        if (group) {
          group.items.push(item)
        } else {
          itemsByProduct.push({
            _id: item.product_id,
            items: [item]
          })
        }
        return itemsByProduct
      }, [])
    itemsByProduct.forEach(({ _id, items }) => {
      const promise = new Promise(resolve => {
        fetchProduct(_id)
          .then(({ data }) => Promise.all(
            items.map(item => {
              return validateCartItem(item, data)
                .then(item => {
                  if (item.quantity > 0) {
                    ecomCart.fixItem(item, false)
                  } else if (removeOnError) {
                    ecomCart.removeItem(item._id, false)
                  } else {
                    ecomCart.save()
                  }
                })
                .catch(err => {
                  console.error(err)
                  const status = err.response && err.response.status
                  if (removeOnError || (status >= 400 && status < 500)) {
                    ecomCart.removeItem(item._id, false)
                  }
                })
            })
          ))
          .finally(resolve)
      })
      promises.push(promise)
    })
    return Promise.all(promises).then(() => {
      ecomCart.save()
    })
  },

  sendCheckout ({ getters }, payload) {
    const customer = { ...payload.customer }
    for (const prop in customer) {
      if (
        Object.prototype.hasOwnProperty.call(customer, prop) &&
        (customer[prop] === null || customer[prop] === '')
      ) {
        delete customer[prop]
      }
    }
    const checkoutBody = {
      ...baseModulesRequestData,
      items: ecomCart.data.items,
      shipping: {
        ...getters.shippingService,
        to: customer.addresses.find(addr => addr.default)
      },
      transaction: prepareTransaction(payload),
      customer,
      notes: getters.notes
    }
    if (getters.discountRule) {
      checkoutBody.discount = {
        ...getters.discountRule,
        discount_coupon: getters.discountCoupon
      }
    }
    if (!checkoutPromise) {
      checkoutPromise = ecomClient.modules({
        url: '/@checkout.json',
        method: 'post',
        data: checkoutBody
      }).then(({ data }) => {
        setTimeout(() => {
          checkoutPromise = null
        }, 2000)
        const { order, transaction } = data
        if (transaction.redirect_to_payment && transaction.payment_link) {
          window.location = transaction.payment_link
        } else {
          order.transactions = order.transactions || []
          order.transactions.push(transaction)
        }
        return {
          status: 'open',
          ...order
        }
      }).catch(err => {
        checkoutPromise = null
        console.error(err)
        throw err
      })
    }
    return checkoutPromise
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
