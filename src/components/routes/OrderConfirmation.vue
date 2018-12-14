<template>
  <div class="_order-confirmation">
    <transition name="fade">
      <div key="order-loading" v-if="!order.status" class="_order-loading">
        <div v-if="!loading" class="__loading">
          <a-icon class="__loading-icon" icon="circle-notch" spin></a-icon>
          <div>{{ $t('general.loading') }}</div>
        </div>
      </div>

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
              type="primary"
              @click="() => toClipboard(orderTransaction.banking_billet.code)">
              {{ $t('checkout.copyCode') }}
            </el-button>
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
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'OrderConfirmation',

  computed: {
    ...mapGetters([
      'order',
      'orderTransaction'
    ]),
    ...mapState([
      'loading'
    ])
  },

  methods: {
    ...mapActions([
      'loadOrder'
    ]),

    link (url) {
      window.open(url, '_blank')
    },

    toClipboard (text) {
      this.$copyText(text).then((e) => {
        alert('Copied')
        console.log(e)
      }, (e) => {
        alert('Can not copy')
        console.log(e)
      })
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
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
