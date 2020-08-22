import {
  i19close,
  i19selectVariation
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
    product: Object
  },

  data () {
    return {
      isVisible: false,
      portalId: 'quickview'
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19selectVariation: () => i18n(i19selectVariation)
  },

  methods: {
    hide () {
      this.isVisible = false
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
    this.isVisible = true
  }
}
