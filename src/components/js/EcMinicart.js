import { $ecomConfig, formatMoney } from '@ecomplus/utils'
import ecomCart from '@ecomplus/shopping-cart'
import dictionary from './../../lib/dictionary'
import EcCartItem from './../EcCartItem.vue'

export default {
  name: 'EcMinicart',

  components: {
    EcCartItem
  },

  props: {
    lang: {
      type: String,
      default: $ecomConfig.get('lang')
    },
    ecomCart: {
      type: Object,
      default: () => ecomCart
    },
    showCart: {
      type: Boolean,
      default: false
    },
    showOnItemAdded: {
      type: Boolean,
      default: true
    },
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    }
  },

  computed: {
    cart () {
      return this.ecomCart.data
    }
  },

  methods: {
    dictionary,
    formatMoney,

    show () {
      this.$emit('update:showCart', true)
    },

    hide () {
      this.$emit('update:showCart', false)
    }
  },

  created () {
    if (this.showOnItemAdded) {
      ecomCart.on('addItem', ({ data }) => {
        this.$set(this.ecomCart, 'data', data)
        this.show()
      })
    }
  },

  mounted () {
    document.querySelector('body').appendChild(this.$refs.sidebar)
  }
}
