<template>
  <div class="_order-confirmation">
    <transition name="fade">
      <div key="order-loading" v-if="!order.status" class="_order-loading"></div>

      <div key="order-loaded" v-else class="_order-loaded">
        <h1 class="_order-title">
          {{ $t('checkout.orderCreated') }}
          <small>#{{ order.number }}</small>
        </h1>

        <el-card shadow="never" class="_order-info">
          <div v-if="orderTransaction.banking_billet" class="_order-billet">
            <p>{{ $t('checkout.doPaymentText') }}</p>
            <p>
              {{ $t('checkout.ticketCode') }}:
              <br><strong>{{ orderTransaction.banking_billet.code }}</strong>
            </p>
            <el-button
              v-if="orderTransaction.banking_billet.link"
              type="primary"
              @click="() => link(orderTransaction.banking_billet.link)">
              {{ $t('checkout.printBillet') }}
            </el-button>
          </div>

          <div v-else-if="orderTransaction.payment_link" class="_order-redirect">
            <p>{{ $t('checkout.doPaymentText') }}</p>
            <el-button
              type="success"
              @click="() => link(orderTransaction.payment_link)">
              {{ $t('checkout.redirectToPayment') }}
            </el-button>
          </div>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueClipboard from 'vue-clipboard2'

export default {
  name: 'OrderConfirmation',

  computed: mapGetters([
    'order',
    'orderTransaction'
  ]),

  methods: {
    ...mapActions([
      'loadOrder'
    ]),

    link (url) {
      window.open(url, '_blank')
    }
  },

  mounted () {
    let { order } = this
    setTimeout(() => {
      if (!order.number) {
        // try to load order info
        this.loadOrder().finally(() => {
          if (!order.number) {
            // no order
            // back to shopping cart
            this.$router.push({ name: 'cart' })
          }
        })
      }
    }, 800)
  }
}
</script>

<style lang="scss">
</style>
