<template>
  <div class="_checkout">
    <el-row :gutter="20">
      <el-col :md="17" :sm="16" :xs="24" class="_checkout-steps">
      </el-col>
      <el-col :md="7" :sm="8" :xs="24" class="_summary" v-sticky="{ zIndex: 99, stickyTop: 20 }">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CheckoutApp',

  computed: mapGetters([
    'cart',
    'checkout',
    'formatMoney'
  ]),

  methods: {
    ...mapActions([
      'loadCart'
    ]),
    ...mapMutations([
      'setCartItemQnt',
      'removeCartItem'
    ])
  },

  created () {
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
