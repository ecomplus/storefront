import { i19paymentError, i19paymentErrorMsg } from '@ecomplus/i18n'
import { i18n } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { upsertCart } from './../../lib/sync-cart-to-api'
import EcCheckout from './../../components/EcCheckout.vue'

export default {
  name: 'checkout',

  components: {
    EcCheckout
  },

  data () {
    return {
      updateInterval: null,
      ecomPassport: null,
      checkoutStep: 0
    }
  },

  computed: {
    ...mapGetters([
      'amount',
      'shippingService',
      'shippingZipCode',
      'selectedAddress'
    ]),

    checkoutMode () {
      const { mode } = this.$route.params
      return mode ? mode.toLowerCase() : null
    },

    isLpCheckout () {
      return this.checkoutMode === 'lp'
    },

    isGuestCheckout () {
      return this.isLpCheckout || this.checkoutMode === 'guest'
    },

    customer: {
      get () {
        return this.$store.getters.customer
      },
      set (customer) {
        this.setCustomer(customer)
        if (customer._id) {
          const { ecomPassport } = this
          if (ecomPassport && ecomPassport.checkAuthorization()) {
            this.saveCustomer({ ecomPassport })
          }
        }
      }
    },

    discountCoupon: {
      get () {
        return this.$store.getters.discountCoupon
      },
      set (couponCode) {
        this.setDiscountCoupon(couponCode)
      }
    },

    shippingService: {
      get () {
        return this.$store.getters.shippingService
      },
      set (service) {
        this.selectShippingService(service)
      }
    },

    paymentGateway: {
      get () {
        return this.$store.getters.paymentGateway
      },
      set (gateway) {
        this.selectPaymentGateway(gateway)
      }
    },

    notes: {
      get () {
        return this.$store.getters.notes
      },
      set (notes) {
        this.setNotes(notes)
      }
    }
  },

  methods: {
    ...mapMutations([
      'triggerLoading',
      'setFluidPage',
      'setDiscountCoupon',
      'setDiscountRule',
      'setNotes',
      'selectShippingService',
      'selectPaymentGateway',
      'setCustomer',
      'selectAddress',
      'addOrder'
    ]),

    ...mapActions([
      'fetchCartItems',
      'fetchCustomer',
      'saveCustomer',
      'sendCheckout'
    ]),

    login (ecomPassport) {
      this.ecomPassport = ecomPassport
      this.triggerLoading(true)
      this.fetchCustomer({ ecomPassport })
        .finally(() => this.triggerLoading(false))
    },

    checkout (transaction) {
      const { customer } = this
      this.triggerLoading(true)
      this.sendCheckout({ customer, transaction })
        .then(order => {
          this.addOrder(order)
          this.$router.push({
            name: 'confirmation',
            params: {
              id: order._id,
              number: order.number
            }
          })
        })
        .catch(() => {
          this.$toast({
            title: i18n(i19paymentError),
            body: i18n(i19paymentErrorMsg),
            variant: 'danger'
          })
        })
        .finally(() => this.triggerLoading(false))
    }
  },

  watch: {
    checkoutStep (stepNumber, lastStep) {
      if (stepNumber && !lastStep) {
        this.setFluidPage(true)
      }
    }
  },

  created () {
    if (!this.isLpCheckout) {
      const update = items => this.fetchCartItems({ removeOnError: true, items })
      const fetchAddedItem = ({ item }) => {
        update([item])
      }
      ecomCart.on('addItem', fetchAddedItem)
      const checkCart = ({ data }) => {
        if (!data.items.length) {
          this.$router.push({
            name: 'cart'
          })
        }
      }
      this.updateInterval = setInterval(update, 600000)
      this.triggerLoading(true)
      update()
        .then(() => {
          if (!ecomCart.data.flags) {
            ecomCart.data.flags = []
          }
          if (ecomCart.data.flags.indexOf('open-checkout') === -1) {
            ecomCart.data.flags.push('open-checkout')
          }
          const tryUpsertCart = () => {
            if (ecomPassport.checkAuthorization()) {
              upsertCart()
            } else {
              ecomPassport.once('login', tryUpsertCart)
            }
          }
          setTimeout(tryUpsertCart, 300)
        })
        .finally(() => {
          this.triggerLoading(false)
          checkCart(ecomCart)
          ecomCart.on('change', checkCart)
        })
      this.$once('hook:beforeDestroy', () => {
        ecomCart.off('addItem', fetchAddedItem)
        ecomCart.off('change', checkCart)
      })
    }
  },

  mounted () {
    if (this.isLpCheckout) {
      const productId = this.$route.params.product
      if (productId) {
        this.triggerLoading(true)
        const fetchProduct = (isRetry = false) => {
          store({
            url: `/products/${productId}.json`,
            axiosConfig: {
              timeout: 6000
            }
          })
            .then(({ data }) => {
              ecomCart.clear()
              let canAddToCart = false
              const selectFields = ['variations', 'customizations', 'kit_composition']
              for (let i = 0; i < selectFields.length; i++) {
                const selectOptions = data[selectFields[i]]
                if (selectOptions && selectOptions.length) {
                  canAddToCart = true
                  break
                }
              }
              if (!canAddToCart) {
                ecomCart.addProduct(data)
              }
              return import('#components/TheProduct.vue').then(productView => {
                this.setFluidPage(true)
                new Vue({
                  render: h => h(productView.default, {
                    props: {
                      product: data,
                      headingTag: 'h3',
                      galleryColClassName: 'col-12 order-last mt-3',
                      canAddToCart,
                      hasBuyButton: canAddToCart,
                      isQuickview: true
                    }
                  })
                }).$mount(this.$refs.product)
              })
            })
            .catch(err => {
              console.error(err)
              if (!isRetry) {
                setTimeout(() => fetchProduct(true), 800)
              }
            })
            .finally(() => this.triggerLoading(false))
        }
        fetchProduct()
      }
    }
  },

  destroyed () {
    this.selectPaymentGateway(null)
    this.setFluidPage(false)
    clearInterval(this.updateInterval)
  }
}
