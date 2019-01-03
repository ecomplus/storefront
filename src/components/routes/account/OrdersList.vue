<template>
  <div class="_orders __container-sm">
    <transition name="fade">
      <div v-if="!rows.length" key="orders-empty" class="_orders-empty">
        <span v-if="loaded"></span>
      </div>

      <div v-else key="orders-list" class="_orders-list">
        <el-table
          class="_orders-table"
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

        <el-pagination
          class="_orders-pagination"
          layout="prev, pager, next"
          :total="customer.orders.length"
          :page-size="pageSize"
          @current-change="updatePage">
        </el-pagination>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { formatMoney, formatDate } from '@/lib/utils'

export default {
  name: 'OrdersList',

  computed: mapGetters([
    'customer'
  ]),

  data () {
    return {
      loaded: false,
      page: 0,
      pageSize: 10,
      rows: []
    }
  },

  methods: {
    ...mapActions([
      'fixCustomerOrders',
      'loadCustomerOrders'
    ]),

    formatMoney (value) {
      return formatMoney(value, this.$currency, this.$lang)
    },

    formatDate (dateString) {
      return formatDate(dateString, this.$country)
    },

    updatePage (page) {
      this.page = page - 1
      this.loadData()
    },

    loadData () {
      // fix orders list first
      this.fixCustomerOrders().finally(() => {
        let size = this.pageSize
        let from = this.page * size
        // load orders info with pagination
        this.loadCustomerOrders({ from, size }).finally(() => {
          setTimeout(() => {
            this.rows = this.customer.orders.slice(from, from + size)
            this.loaded = true
          }, 200)
        })
      })
    }
  },

  created () {
    this.loadData()
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._orders-list {
  width: 100%;
}
._orders-table {
  width: 100%;
  margin-bottom: $--card-padding;
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
