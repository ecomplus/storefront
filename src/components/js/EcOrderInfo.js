import { i18n } from '@ecomplus/utils'
import { store } from '@ecomplus/client'

export default {
  name: 'EcOrderInfo',

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    order: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      updateInterval: null
    }
  },

  computed: {
    dictionary () {
      return {
        ...this.mergeDictionary
      }
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    }
  },

  created () {
    const update = () => {
      store({ url: `/orders/${this.order._id}.json` })
    }
    this.updateInterval = setInterval(update, 9000)
    setTimeout(update, 3000)
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
