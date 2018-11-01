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
            <span v-if="activeStep === 1 || !customerEmail">
              {{ $t('checkout.shipping') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 1">
              {{ $t('checkout.shipping') }}
            </a>
          </template>
        </el-step>
        <el-step>
          <template slot="title">
            <span v-if="activeStep === 2 || !customerAddress">
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
          {{ $t('checkout.shippingAddress') }}
        </h2>
        <address-list :buttonText="$t('checkout.goToPayment')" :zip="shippingZip"/>
      </div>

      <div class="_checkout-payment" v-else-if="activeStep === 2">
        <transition name="fade">
          <div key="checkout-loading" v-if="cartLoading || checkoutLoading" class="_checkout-loading"></div>

          <el-row key="checkout-payment" v-else id="payment">
            <el-col :md="17" :sm="16" :xs="24">
              <el-card shadow="never" class="_invoice">
                <el-row class="_invoice-shipping">
                  <el-col :span="11" class="_invoice-address hidden-sm-and-down">
                    <p class="_invoice-address-title">
                      {{ $t('checkout.shippingAddress') }}
                    </p>
                    <div>{{ customerAddress.name }}</div>
                    <div v-if="customerAddress.line_address">
                      {{ customerAddress.line_address }}
                    </div>
                    <div v-else-if="customerAddress.street">
                      {{ customerAddress.street + ', ' +
                        (customerAddress.number || $t('customerAddress.noNumber')) }}
                      <span v-if="customerAddress.complement">
                        - {{ customerAddress.complement }}
                      </span>
                    </div>
                    <div v-if="customerAddress.borough">
                      {{ customerAddress.borough }}
                    </div>
                    <div v-if="customerAddress.city">
                      {{ customerAddress.city + ' / ' +
                        (customerAddress.province_code || customerAddress.province) }}
                    </div>
                    <p>{{ $t('address.zip') + ' ' + customerAddress.zip }}</p>
                    <a href="javascript:;" @click="activeStep = 1" class="_invoice-address-change">
                      <a-icon icon="edit"></a-icon>
                      {{ $t('checkout.changeAddress') }}
                    </a>
                  </el-col>

                  <el-col :md="13" :span="24">
                    <p class="_invoice-shipping-title">
                      {{ $t('checkout.shippingMethods') }}
                    </p>
                    <shipping-services/>
                  </el-col>
                </el-row>

                <div class="_invoice-coupon">
                  <h5 class="_invoice-coupon-title">
                    <a-icon icon="ticket-alt" class="__icon-mr"></a-icon>
                    {{ $t('checkout.haveCoupon') }}
                  </h5>
                  <discount-coupon/>
                </div>

                <div class="_invoice-payment">
                  <h2 class="_invoice-payment-title">
                    {{ $t('checkout.paymentMethods') }}
                  </h2>
                </div>
              </el-card>
            </el-col>

            <el-col :md="7" :sm="8" :xs="24" class="_summary" v-sticky="{ zIndex: 99, stickyTop: 20 }">
              <div class="__box">
                <el-row>
                  <el-col :md="12" :sm="24" :xs="12" class="_summary-subtotal">
                    <small>{{ $t('cart.subtotal') }}</small>
                    {{ formatMoney(cart.subtotal) }}
                  </el-col>
                  <el-col :md="12" :sm="24" :xs="12" class="_summary-freigth">
                    <small>{{ $t('cart.freight') }}</small>
                    {{ formatMoney(checkout.amount.freight) }}
                  </el-col>
                </el-row>

                <el-row v-if="checkout.amount.discunt">
                  <el-col :md="12" :sm="24" :xs="12" class="_summary-discount">
                    <small>{{ $t('cart.discount') }}</small>
                    {{ formatMoney(checkout.amount.discunt) }}
                  </el-col>
                  <el-col :md="12" :sm="24" :xs="12" class="_summary-total">
                    <small>{{ $t('cart.total') }}</small>
                    {{ formatMoney(checkout.amount.total) }}
                  </el-col>
                </el-row>
                <div v-else class="_summary-total">
                  <small>{{ $t('cart.total') }}</small>
                  {{ formatMoney(checkout.amount.total) }}
                </div>
              </div>
            </el-col>
          </el-row>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { formatMoney } from '@/lib/utils'
import RegistrationForm from '@/components/routes/account/RegistrationForm'
import AddressList from '@/components/routes/account/AddressList'
import ShippingServices from '@/components/routes/cart/ShippingServices'
import DiscountCoupon from '@/components/routes/cart/DiscountCoupon'

export default {
  name: 'CheckoutApp',

  components: {
    RegistrationForm,
    AddressList,
    ShippingServices,
    DiscountCoupon
  },

  data () {
    return {
      shippingZip: null,
      cartLoading: true,
      checkoutLoading: false,
      activeStep: 0
    }
  },

  computed: mapGetters([
    'cart',
    'checkout',
    'checkoutZip',
    'customerUpdate',
    'customerEmail',
    'customerAddress',
    'isCustomerLogged'
  ]),

  methods: {
    ...mapActions([
      'loadCart',
      'setCheckoutZip',
      'initPaymentGateways',
      'login'
    ]),
    ...mapMutations([
      'logout'
    ]),
    formatMoney,

    updateStep () {
      // update current checkout step
      if (this.customerEmail) {
        if (this.customerAddress && (!this.shippingZip || this.customerAddress.zip === this.shippingZip)) {
          // ready for payment
          this.activeStep = 2

          // update checkout shipping address
          this.setCheckoutZip(this.customerAddress.zip).then(() => {
            // load payment methods
            this.initPaymentGateways().catch(err => {
              // alert
            }).then(() => this.checkoutLoading = false)
          })
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
    // reload cart data
    this.loadCart({ id: this.$route.params.id }).finally(() => {
      this.cartLoading = false
    })
    // setup current zip code
    if (this.checkoutZip !== '') {
      this.shippingZip = this.checkoutZip
    }
  },

  mounted () {
    this.$nextTick(() => {
      // starts going to correct checkout step
      this.updateStep()
    })
  },

  watch: {
    customerEmail () {
      // customer logged or unlogged
      this.updateStep()
    },

    customerUpdate () {
      // check if shipping address has changed
      if (this.customerAddress && this.customerAddress.zip !== this.shippingZip) {
        this.shippingZip = this.customerAddress.zip
      }
      // handle customer body object edited
      this.updateStep()
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';

._checkout-content {
  padding-top: $--card-padding * .5;
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
._checkout-payment {
  margin-top: $--card-padding * 1.3;
}
._invoice {
  margin-right: $--card-padding;
}
@media (max-width: 767px) {
  ._invoice {
    margin-right: 0;
    margin-bottom: $--card-padding;
  }
}
._invoice-address {
  padding-right: $--card-padding;
}
._invoice-address-title,
._invoice-shipping-title {
  font-weight: 600;
}
._invoice-shipping-title {
  text-align: right;
}
._invoice-address-change {
  margin-top: .5rem;
}
._invoice-coupon {
  padding: $--card-padding 0;
  margin-bottom: $--card-padding;
  border-bottom: $--border-base;
}
._invoice-coupon-title {
  display: inline-block;
  margin-right: .25rem;
}
._invoice-payment ._invoice-payment-title {
  margin-top: $--card-padding;
  text-align: left;
}
._summary-subtotal,
._summary-freigth {
  margin-bottom: $--card-padding * .6;
}
._summary-total {
  font-weight: 600;
}
._summary-total,
._summary-total small {
  color: $--color-text-primary;
}
</style>
