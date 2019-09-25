import { mapMutations, mapActions } from 'vuex'
import EcCheckout from './../../components/EcCheckout.vue'

export default {
  name: 'checkout',

  components: {
    EcCheckout
  },

  data () {
    return {
      updateInterval: null
    }
  },

  methods: {
    ...mapMutations([
      'triggerLoading',
      'selectShippingService'
    ]),

    ...mapActions([
      'fetchCartItems'
    ])
  },

  created () {
    this.triggerLoading(true)
    const update = () => this.fetchCartItems({ removeOnError: true })
    update().then(() => this.triggerLoading(false))
    this.updateInterval = setInterval(update, 600000)
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
