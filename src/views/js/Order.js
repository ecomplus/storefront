import { mapGetters } from 'vuex'
import EcOrder from './../../components/EcOrder.vue'

export default {
  name: 'order',

  components: {
    EcOrder
  },

  computed: {
    ...mapGetters([
      'orders'
    ]),

    number () {
      const numberStr = this.$route.params.number
      return /^[0-9]+$/.test(numberStr) && parseInt(numberStr, 10)
    },

    order () {
      const order = this.orders.find(({ _id, number }) => {
        return this.number === number || this.$route.params.number === _id
      })
      if (!order) {
        const { number } = this
        if (number) {
          return {
            _id: this.$route.params.id,
            number
          }
        } else {
          return { _id: this.$route.params.number }
        }
      }
      return order
    }
  }
}
