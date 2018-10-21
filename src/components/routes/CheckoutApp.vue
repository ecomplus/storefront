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
        <div class="_checkout-steps">
          <div class="_checkout-identification">
            <el-steps :active="activeStep" align-center>
              <el-step :title="$t('checkout.identification')"></el-step>
              <el-step :title="$t('checkout.shipping')"></el-step>
              <el-step :title="$t('checkout.payment')"></el-step>
              <el-step :title="$t('checkout.confirmation')">
                <template slot="icon">
                  <a-icon icon="check-circle" class="_confirmation-icon"></a-icon>
                </template>
              </el-step>
            </el-steps>

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

._checkout-steps {
  border-radius: $--border-radius-base;
  padding: 0 $--card-padding * 1.5;
  border: $--border-base;
}
@media (max-width: 575px) {
  ._checkout-steps {
    padding: 0 $--card-padding;
  }
}
._checkout-steps > div {
  padding: $--card-padding 0;
  border-bottom: $--border-base;
}
._checkout-steps > div:last-child {
  border-bottom: none;
}
._checkout-steps > div h2 {
  text-align: center;
}
._confirmation-icon {
  color: lighten($--color-success, 25%);
}
</style>
