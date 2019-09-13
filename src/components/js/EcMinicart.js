import { _config, formatMoney } from '@ecomplus/utils'
import EcomCart from '@ecomplus/shopping-cart'
import dictionary from './../../lib/dictionary'
import EcCartItem from './../EcCartItem.vue'
import { SlideXRightTransition, SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'EcMinicart',

  components: {
    EcCartItem,
    SlideXRightTransition,
    SlideYUpTransition
  },

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
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

  data () {
    return {
      ecomCart: new EcomCart(this.storeId)
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
      EcomCart.on('addItem', ({ data }) => {
        this.show()
        this.ecomCart.data = data
      })
    }
  },

  mounted () {
    document.querySelector('body').appendChild(this.$refs.sidebar.$el)
  }
}
