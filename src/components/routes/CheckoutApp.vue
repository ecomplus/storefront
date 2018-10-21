<template>
  <div class="_checkout">
    <h1 class="_cart-title">
      {{ $t('checkout.title') }}
      <small>
        <router-link :to="{ name: 'cart' }">
          <a-icon icon="angle-left"></a-icon>
          {{ $t('checkout.back') }}
        </router-link>
      </small>
    </h1>

    <el-row :gutter="20">
      <el-col :md="17" :sm="16" :xs="24" class="_checkout-steps">
        <registration-form :short="true" :buttonText="$t('checkout.goToShipping')"/>
      </el-col>
      <el-col :md="7" :sm="8" :xs="24" class="_summary" v-sticky="{ zIndex: 99, stickyTop: 20 }">
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RegistrationForm from '@/components/routes/account/RegistrationForm'

export default {
  name: 'CheckoutApp',

  components: {
    RegistrationForm
  },

  computed: mapGetters([
    'cart',
    'customer',
    'checkout',
    'formatMoney'
  ]),

  methods: {
    ...mapActions([
      'login'
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
