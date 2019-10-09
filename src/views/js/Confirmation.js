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
      return this.orders.find(({ _id }) => this.$route.params.id === _id)
    }
  }
}
