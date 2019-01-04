<template>
  <div class="_order-steps">
    <el-steps
      direction="vertical"
      finish-status="success"
      :process-status="order.status === 'cancelled' ? 'error' : 'wait'"
      :active="1 + !!payment + !!confirmation + !!prepared + !!shipped + !!delivered">
      <el-step
        :title="$t('checkout.orderCreated')"
        :description="formatDate(order.created_at)"></el-step>
      <el-step
        :title="$t('order.paymentRealized')"
        :description="formatDate(payment)"></el-step>
      <el-step
        :title="$t('order.paymentConfirmed')"
        :description="formatDate(confirmation)"></el-step>
      <el-step
        :title="$t('order.fulfillmentStatus.ready_for_shipping')"
        :description="formatDate(prepared)"></el-step>
      <el-step
        :title="$t('order.fulfillmentStatus.shipped')"
        :description="formatDate(shipped)"></el-step>
      <el-step
        :title="$t('order.fulfillmentStatus.delivered')"
        :description="formatDate(delivered)"></el-step>
    </el-steps>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate } from '@/lib/utils'

export default {
  name: 'OrderSteps',

  computed: {
    ...mapGetters([
      'order',
      'orderFinancialStatus',
      'orderFulfillmentStatus',
      'orderPaymentDate',
      'orderConfirmationDate',
      'orderFulfillmentDate'
    ])
  },

  data () {
    return {
      payment: null,
      confirmation: null,
      prepared: null,
      shipped: null,
      delivered: null
    }
  },

  methods: {
    formatDate (dateString) {
      return typeof dateString === 'string' ? formatDate(dateString, this.$country) : null
    }
  },

  created () {
    // check current status and setup dates
    if (this.orderFinancialStatus !== 'pending') {
      this.payment = this.orderPaymentDate || true
    }
    if (this.orderFinancialStatus === 'paid') {
      this.confirmation = this.orderConfirmationDate || true
      this.prepared = this.orderFulfillmentDate('ready_for_shipping')
    }
    switch (this.orderFulfillmentStatus) {
      case 'shipped':
      case 'delivered':
        this.shipped = this.orderFulfillmentDate('shipped') || true
        if (!this.prepared) {
          this.prepared = this.orderFulfillmentDate('ready_for_shipping') || true
        }
        if (this.orderFulfillmentStatus === 'delivered') {
          this.delivered = this.orderFulfillmentDate('delivered') || true
        }
        break
    }
  }
}
</script>

<style lang="scss">
._order-steps {
  height: 450px;
}
</style>
