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

    <div class="_checkout-content">
      <el-steps :active="activeStep" align-center class="_checkout-steps">
        <el-step>
          <template slot="title">
            <span v-if="activeStep === 0">
              {{ $t('checkout.identification') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 0">
              {{ $t('checkout.identification') }}
            </a>
          </template>
        </el-step>
        <el-step>
          <template slot="title">
            <span v-if="activeStep <= 1">
              {{ $t('checkout.shipping') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 1">
              {{ $t('checkout.shipping') }}
            </a>
          </template>
        </el-step>
        <el-step>
          <template slot="title">
            <span v-if="activeStep <= 2">
              {{ $t('checkout.payment') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 2">
              {{ $t('checkout.payment') }}
            </a>
          </template>
        </el-step>
        <el-step :title="$t('checkout.confirmation')">
          <template slot="icon">
            <a-icon icon="check-circle" class="_confirmation-icon"></a-icon>
          </template>
        </el-step>
      </el-steps>

      <div class="_checkout-identification" v-if="activeStep === 0">
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
        <registration-form
          :short="true"
          :buttonText="$t('checkout.goToCheckout')"
          :skipNotify="true"/>
      </div>

      <div class="_checkout-shipping" v-else-if="activeStep === 1">
        <h2 id="shipping">
          {{ $t('checkout.shipping') }}
        </h2>
        <address-list/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import RegistrationForm from '@/components/routes/account/RegistrationForm'
import AddressList from '@/components/routes/account/AddressList'

export default {
  name: 'CheckoutApp',

  components: {
    RegistrationForm,
    AddressList
  },

  data () {
    return {
      activeStep: 0
    }
  },

  computed: mapGetters([
    'customerUpdate',
    'customerEmail',
    'customerAddressId',
    'isCustomerLogged'
  ]),

  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapMutations([
      'logout'
    ]),

    updateStep () {
      // update current checkout step
      if (this.customerEmail) {
        if (this.customerAddressId) {
          // payment
          this.activeStep = 2
        } else {
          // shipping
          this.activeStep = 1
        }
      } else {
        // identify
        this.activeStep = 0
      }
    }
  },

  created () {
    this.updateStep()
  },

  watch: {
    customerUpdate () {
      this.updateStep()
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
