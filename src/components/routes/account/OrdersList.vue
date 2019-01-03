<template>
  <div class="_orders __container-sm">
    <transition name="fade">
      <div v-if="$route.params.number" key="specific-order">
        <el-button
          type="info"
          size="mini"
          class="_order-list-back"
          @click="() => showList()">
          <a-icon icon="angle-left" class="__icon-mr"></a-icon>
          {{ $t('session.orders') }}
        </el-button>
        <order-info></order-info>
      </div>

      <div v-else-if="!rows.length" key="orders-empty" class="_orders-empty">
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
              <el-button
                type="info"
                size="mini"
                class="_order-list-edit"
                @click="() => showOrder(scope.row.number)">
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
          :current-page="page + 1"
          @current-change="updatePage">
        </el-pagination>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { formatMoney, formatDate } from '@/lib/utils'
import OrderInfo from '@/components/routes/order/OrderInfo'

export default {
  name: 'OrdersList',

  components: {
    OrderInfo
  },

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
      'loadCustomerOrders',
      'saveOrder'
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
      let orderNumber = this.$route.params.number
      if (!orderNumber) {
        // list orders
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
      } else {
        // find order by number
        let order = this.customer.orders.find(({ number }) => number === orderNumber)
        if (order) {
          // handle order specified
          this.saveOrder(order)
        } else {
          // back to list
          this.showList()
        }
      }
    },

    showOrder (number) {
      // redirect to specified order info
      this.$router.push({ name: 'orders', params: { number } })
    },

    showList () {
      // redirect back to orders list
      this.$router.push({ name: 'orders' })
    }
  },

  created () {
    this.loadData()
  },

  watch: {
    '$route.params.number' () {
      this.loadData()
    }
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
._order-list-back {
  margin-bottom: $--card-padding;
}
</style>
