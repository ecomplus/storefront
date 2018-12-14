<template>
  <div class="_order">
    <transition name="fade">
      <div key="order-loading" v-if="!order.status" class="_order-loading">
        <div v-if="!loading" class="__loading">
          <a-icon class="__loading-icon" icon="circle-notch" spin></a-icon>
          <div>{{ $t('general.loading') }}</div>
        </div>
      </div>

      <div key="order-loaded" v-else class="_order-loaded">
        <div class="_order-info">
          <h4>
            {{ $t('order.number') }}:
            <span class="_order-number">#{{ order.number }}</span>
          </h4>

          <div v-if="orderTransaction.banking_billet" class="_order-billet">
            <p>{{ $t('order.doPaymentText') }}</p>
            <p>
              {{ $t('order.ticketCode') }}:
              <br><strong>{{ orderTransaction.banking_billet.code }}</strong>
            </p>
            <el-button
              @click="() => toClipboard(orderTransaction.banking_billet.code)">
              <a-icon icon="copy" class="__icon-mr"></a-icon>
              {{ $t('order.copyCode') }}
            </el-button>
            <el-button
              v-if="orderTransaction.banking_billet.link"
              type="primary"
              @click="() => link(orderTransaction.banking_billet.link)">
              <a-icon icon="print" class="__icon-mr"></a-icon>
              {{ $t('order.printBillet') }}
            </el-button>
          </div>

          <div v-else-if="orderTransaction.payment_link" class="_order-redirect">
            <p>{{ $t('order.doPaymentText') }}</p>
            <el-button
              type="success"
              @click="() => link(orderTransaction.payment_link)">
              {{ $t('order.redirectToPayment') }}
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'OrderInfo',

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
      this.$copyText(text).then(() => {
        this.$message({
          message: this.$t('order.codeCopied'),
          type: 'success',
          duration: 1500
        })
      }, err => {
        // cannot handle copy
        console.error(err)
        this.$message({
          showClose: true,
          message: this.$t('order.copyError'),
          type: 'warning'
        })
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
