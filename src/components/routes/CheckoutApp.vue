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
      <el-col :md="17" :sm="16" :xs="24">
        <div class="_checkout-content">
          <el-steps :active="activeStep" align-center class="_checkout-steps">
            <el-step :title="$t('checkout.identification')"></el-step>
            <el-step :title="$t('checkout.shipping')"></el-step>
            <el-step :title="$t('checkout.payment')"></el-step>
            <el-step :title="$t('checkout.confirmation')">
              <template slot="icon">
                <a-icon icon="check-circle" class="_confirmation-icon"></a-icon>
              </template>
            </el-step>
          </el-steps>

          <div class="_checkout-identification">
            <h2 id="identification">
              {{ $t('account.registration') }}
              <small v-if="!isCustomerLogged">
                <a href="javascript:;" @click="login">{{ $t('session.haveAccount') }}?</a>
              </small>
            </h2>
            <registration-form :short="true" :buttonText="$t('checkout.goToCheckout')"/>
          </div>
        </div>
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

  data () {
    return {
      activeStep: 0
    }
  },

  computed: mapGetters([
    'customerEmail',
    'isCustomerLogged'
  ]),

  methods: {
    ...mapActions([
      'login'
    ])
  },

  watch: {
    customerEmail () {
      console.log(1)
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';

._checkout-content {
  border-radius: $--border-radius-base;
  padding: $--card-padding $--card-padding * 1.5;
  border: $--border-base;
}
@media (max-width: 575px) {
  ._checkout-content {
    padding-right: $--card-padding;
    padding-left: $--card-padding;
  }
}
._checkout-content h2 {
  text-align: center;
}
._checkout-steps {
  padding-bottom: $--card-padding * .25;
}
._confirmation-icon {
  color: lighten($--color-success, 25%);
}
</style>
