import { _config, formatMoney } from '@ecomplus/utils'
import dictionary from '@ecomplus/widget-minicart/src/lib/dictionary'
import EcomCart from '@ecomplus/shopping-cart'
import EcCartItem from '@ecomplus/widget-minicart/src/components/EcCartItem.vue'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'EcCart',

  components: {
    EcCartItem,
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
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
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

  created () {
    if (this.showOnItemAdded) {
      EcomCart.on('addItem', ({ data }) => {
        this.$set(this.ecomCart, 'data', data)
        this.show()
      })
    }
  }
}
