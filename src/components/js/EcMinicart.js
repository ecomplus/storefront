import { _config, formatMoney } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'
import { SlideXRightTransition, SlideYUpTransition } from 'vue2-transitions'
import EcomCart from '@ecomplus/shopping-cart'

export default {
  name: 'EcMinicart',

  components: {
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
    formatMoney
  },

  mounted () {
    document.querySelector('body').appendChild(this.$refs.sidebar.$el)
  }
}
