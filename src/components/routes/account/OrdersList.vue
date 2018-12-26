<template>
  <div class="_orders __container-sm">
    <transition name="fade">
      <div v-if="!rows.length " key="orders-empty" class="_orders-empty">
        <span v-if="loaded"></span>
      </div>

      <el-table v-else
        key="orders-list"
        class="_orders-list"
        :data="rows"
        :show-header="false"
        stripe border>
        <el-table-column>
          <template slot-scope="scope">
            {{ formatDate(scope.row.created_at) }}
            <br>
            <el-button type="info" size="mini" class="_order-list-edit">
              <a-icon icon="angle-right" class="__icon-mr"></a-icon>
              {{ $t('order.see') + ' #' + scope.row.number }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            {{ formatMoney(scope.row.amount.total) }}
            <div :class="'_order-list-status _order-list-status-' + scope.row.status">
              {{ $t('order.' + scope.row.status) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { formatMoney, formatDate, updateTitle } from '@/lib/utils'

export default {
  name: 'OrdersList',

  computed: mapGetters([
    'customer'
  ]),

  data () {
    return {
      loaded: false,
      page: 1,
      rows: []
    }
  },

  methods: {
    ...mapActions([
      'loadCustomerOrders'
    ]),

    formatMoney (value) {
      return formatMoney(value, this.$currency, this.$lang)
    },

    formatDate (dateString) {
      return formatDate(dateString, this.$country)
    }
  },

  created () {
    let orders = this.customer.orders
    let size = 10
    // start at the end of the list
    let from = orders.length - this.page * size
    // load orders info with pagination
    this.loadCustomerOrders({ from, size }).finally(() => {
      setTimeout(() => {
        this.rows = orders.slice(from, from + size)
        // sort orders by number desc
        .concat().sort((a, b) => !a.number || a.number < b.number)
        this.loaded = true
      }, 200)
    })
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._orders-list {
  width: 100%;
}
._order-list-status {
  font-weight: 600;
}
._order-list-status-open {
  color: $--color-warning;
}
._order-list-status-closed {
  color: $--color-success;
}
._order-list-status-cancelled {
  color: $--color-danger;
}
</style>
