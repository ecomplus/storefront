import { i19close } from '@ecomplus/i18n'
import { i18n } from '@ecomplus/utils'

export default {
  name: 'AAlert',

  props: {
    canShow: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'warning'
    }
  },

  data () {
    return {
      count: 1
    }
  },

  computed: {
    i19close: () => i18n(i19close)
  },

  watch: {
    canShow (canShow) {
      if (canShow) {
        this.count++
      }
    }
  }
}
