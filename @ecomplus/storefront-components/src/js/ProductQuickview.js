import {
  i19close,
  i19seeMoreInfo
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import { Portal } from '@linusborg/vue-simple-portal'
import TheProduct from '../TheProduct.vue'
import ABackdrop from '../ABackdrop.vue'

export default {
  name: 'ProductQuickView',

  components: {
    Portal,
    TheProduct,
    ABackdrop
  },

  props: {
    productId: String,
    product: Object,
    portalId: {
      type: String,
      default: 'quickview'
    }
  },

  data () {
    return {
      productName: '',
      productLink: '',
      isVisible: false
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19seeMoreInfo: () => i18n(i19seeMoreInfo)
  },

  methods: {
    setProduct ({ name, slug }) {
      this.productName = name
      this.productLink = `/${slug}`
    },

    hide () {
      this.isVisible = false
      setTimeout(() => {
        if (!this.isVisible) {
          this.$destroy()
        }
      }, 450)
    }
  },

  created () {
    let portal = document.getElementById(this.portalId)
    if (!portal) {
      portal = document.createElement('div')
      portal.setAttribute('id', this.portalId)
      document.body.appendChild(portal)
    } else {
      portal.innerHTML = ''
    }
    if (this.product) {
      this.setProduct(this.product)
    }
    this.isVisible = true
  }
}
