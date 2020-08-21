import { Portal } from '@linusborg/vue-simple-portal'

export default {
  name: 'ProductQuickView',

  components: {
    Portal
  },

  props: {
    product: Object
  },

  data () {
    return {
      isVisible: false,
      product: {}
    }
  },

  computed: {
    productBody: {
      get () {
        return this.product
      },
      set (body) {
        this.product = Object.assign({}, body)
      }
    }
  },

  methods: {
    loadProduct (body) {
      this.productBody = body
    }
  },

  created () {
    // const portal = document.createElement('div')
    // portal.setAttribute('id', 'portal-quickview')
  }
}
