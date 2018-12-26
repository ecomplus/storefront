<template>
  <div class="_orders __container-sm">
    <transition name="fade">
      <div v-if="!rows.length" key="orders-empty" class="_orders-empty">
      </div>

      <el-table v-else key="orders-list" class="_orders-list" :data="rows">
        <el-table-column prop="number" label="Number"></el-table-column>
        <el-table-column prop="amount.total" label="Valor"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
      </el-table>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OrdersList',

  computed: mapGetters([
    'customer'
  ]),

  data () {
    return {
      page: 0,
      rows: []
    }
  },

  methods: mapActions([
    'loadOrders'
  ]),

  created () {
    let size = 10
    let from = this.page * size
    // load orders info with pagination
    this.loadOrders({ from, size }).finally(() => {
      setTimeout(() => {
        this.rows = this.customer.orders.slice(from, from + size)
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
</style>
