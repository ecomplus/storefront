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
          <h5>
            {{ $t('order.number') }}:
            <span class="_order-number">#{{ order.number }}</span>
          </h5>
          <div :class="'_order-status _order-status-' + order.status">
            {{ $t('order.' + order.status) }}
          </div>

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

          <el-row class="_order-fulfillment">
            <el-col :md="12" :span="24" class="_order-payment">
              <div :class="'_financial-status _financial-status-' + orderFinancialStatus">
                {{ $t('order.financialStatus.' + orderFinancialStatus) }}
              </div>
              <div v-for="transaction in order.transactions">
                <p class="_order-payment-value">
                  {{ transaction.payment_method.name || order.payment_method_label }}:
                  <strong v-if="transaction.installments && transaction.installments.value">
                    {{ transaction.installments.number }}x
                    {{ $t('general.of') }}
                    {{ formatMoney(transaction.installments.value) }}
                  </strong>
                  <strong v-else>
                    1x {{ $t('general.of') }}
                    {{ formatMoney(transaction.amount || order.amount.total) }}
                  </strong>
                </p>

                <span v-if="transaction.intermediator">
                  <div
                    class="_order-transaction-code"
                    v-if="transaction.intermediator.transaction_code">
                    {{ $t('order.transactionCode') }}:
                    {{ transaction.intermediator.transaction_code }}
                  </div>
                  <div
                    class="_order-transaction-reference"
                    v-if="transaction.intermediator.transaction_reference">
                    {{ $t('order.transactionReference') }}:
                    {{ transaction.intermediator.transaction_reference }}
                  </div>
                </span>
              </div>
            </el-col>

            <el-col :md="12" :span="24" class="_order-shipping">
              <div
                v-if="orderFulfillmentStatus"
                :class="'_fulfillment-status _fulfillment-status-' + orderFulfillmentStatus">
                {{ $t('order.fulfillmentStatus.' + orderFulfillmentStatus) }}
              </div>
              <div
                v-for="shipping in order.shipping_lines"
                v-if="shippingDeliveryPending(shipping)"
                class="_order-shipping-info">
                <div
                  v-if="!shipping.status && orderFinancialStatus !== 'paid'"
                  class="_order-shipping-deadline">
                  {{ $t('order.willReceive').replace('$', shippingServiceTime(shipping)) }}
                  <span v-if="shippingServiceWorkingDays(shipping)">
                    {{ $t('shipping.workingDays') }}
                  </span>
                  <span v-else>
                    {{ $t('shipping.days') }}
                  </span>
                  <span v-if="shipping.posting_deadline && shipping.posting_deadline.after_approval">
                    {{ $t('order.afterApproval') }}
                  </span>
                </div>

                <div
                  v-else-if="orderFinancialStatus === 'paid' &&
                    Date.now() > shippingDeliveryDate(shipping).getTime()"
                  class="_order-delivery-estimate">
                  {{ $t('order.deliveryEstimate') }}:
                  {{ formatDate(shippingDeliveryDate(shipping).toISOString()) }}
                </div>

                <div v-else>
                  <div v-if="shipping.posting_deadline">
                    {{ $t('order.postingDeadline') }}:
                    {{ shipping.posting_deadline.days }}
                    <span v-if="shipping.posting_deadline.working_days">
                      {{ $t('shipping.workingDays') }}
                    </span>
                    <span v-else>
                      {{ $t('shipping.days') }}
                    </span>
                    <span v-if="orderFinancialStatus !== 'paid' && shipping.posting_deadline.after_approval">
                      {{ $t('order.afterApproval') }}
                    </span>
                  </div>
                  <div v-if="shipping.delivery_time">
                    {{ $t('order.deliveryTime') }}:
                    {{ shipping.delivery_time.days }}
                    <span v-if="shipping.delivery_time.working_days">
                      {{ $t('shipping.workingDays') }}
                    </span>
                    <span v-else>
                      {{ $t('shipping.days') }}
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { formatMoney, formatDate } from '@/lib/utils'

export default {
  name: 'OrderInfo',

  data () {
    return {
      orderUpdateTimer: null
    }
  },

  computed: {
    ...mapGetters([
      'order',
      'orderTransaction',
      'orderFinancialStatus',
      'orderFulfillmentStatus',
      'shippingServiceWorkingDays',
      'shippingServiceTime',
      'shippingDeliveryPending',
      'shippingDeliveryDate'
    ]),
    ...mapState([
      'loading'
    ])
  },

  methods: {
    ...mapActions([
      'updateOrder'
    ]),

    formatMoney (value) {
      return formatMoney(value, this.$currency, this.$lang)
    },

    formatDate (dateString) {
      return formatDate(dateString, this.$country)
    },

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
        // no order
        // back to shopping cart
        this.$router.push({ name: 'cart' })
      }
    }, 800)
    // update order data on each 8 seconds
    this.orderUpdateTimer = setInterval(this.updateOrder, 8 * 1000)
  },

  beforeDestroy () {
    // unset order update interval function
    clearInterval(this.orderUpdateTimer)
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._order-info h5 {
  color: $--color-text-secondary;
}
._order-number {
  color: $--color-text-primary;
}
._order-status {
  font-size: $--font-size-large;
  margin-bottom: $--card-padding;
}
._financial-status,
._fulfillment-status {
  font-size: $--font-size-large;
  margin-bottom: $--card-padding * .5;
}
._order-status-open,
._financial-status-pending,
._financial-status-under_analysis {
  color: $--color-warning;
}
._order-status-closed,
._financial-status-paid {
  color: $--color-success;
}
._order-status-cancelled,
._financial-status-unauthorized,
._financial-status-in_dispute,
._financial-status-voided {
  color: $--color-danger;
}
._order-fulfillment {
  margin-top: $--card-padding;
  border-top: $--border-base;
  padding-top: $--card-padding;
}
._order-transaction-code,
._order-transaction-reference {
  margin-top: .25rem;
  font-size: $--font-size-small;
  color: $--color-text-secondary;
}
</style>
