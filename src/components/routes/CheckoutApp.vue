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
      <el-col :md="17" :sm="24" :xs="24">
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
              <small>
                <a v-if="!isCustomerLogged" href="javascript:;" @click="login" class="_checkout-login">
                  {{ $t('session.haveAccount') }}?
                </a>
                <a v-else href="javascript:;" @click="logout" class="_checkout-logout">
                  {{ $t('session.isNotYou') + '? ' + $t('session.logout') }}
                </a>
              </small>
            </h2>
            <registration-form :short="true" :buttonText="$t('checkout.goToCheckout')"/>
          </div>
        </div>
      </el-col>
      <el-col :md="7" :sm="24" :xs="24" class="_summary" v-sticky="{ zIndex: 99, stickyTop: 20 }">
        <el-card shadow="never">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
    ]),
    ...mapMutations([
      'logout'
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
  padding: ($--card-padding * .5) ($--card-padding * 1.5) 0 ($--card-padding * 1.5);
}
@media (max-width: 992px) {
  ._checkout-content {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: $--card-padding;
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
._checkout-logout {
  color: $--color-danger;
}
</style>
