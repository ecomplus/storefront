import { mapGetters } from 'vuex'
import EcOrderInfo from './../../components/EcOrderInfo.vue'

export default {
  name: 'confirmation',

  components: {
    EcOrderInfo
  },

  computed: {
    ...mapGetters([
      'orders'
    ]),

    order () {
      const _id = this.$route.params.id
      return this.orders.find(order => _id === order._id) || { _id }
    }
  }
}
