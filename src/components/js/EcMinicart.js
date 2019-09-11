import { _config } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'
import { SlideXLeftTransition } from 'vue2-transitions'

export default {
  name: 'EcMinicart',

  components: {
    SlideXLeftTransition
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
    }
  },

  data () {
    return {
    }
  },

  methods: {
    dictionary
  }
}
