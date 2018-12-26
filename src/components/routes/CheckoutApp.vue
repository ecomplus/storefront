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
            <span v-if="activeStep === 0 || activeStep >= 3">
              {{ $t('checkout.identification') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 0">
              {{ $t('checkout.identification') }}
            </a>
          </template>
        </el-step>
        <el-step>
          <template slot="title">
            <span v-if="activeStep === 1 || activeStep >= 3 || !buyerReady">
              {{ $t('checkout.shipping') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 1">
              {{ $t('checkout.shipping') }}
            </a>
          </template>
        </el-step>
        <el-step>
          <template slot="title">
            <span v-if="activeStep === 2 || activeStep >= 3 || !customerAddress">
              {{ $t('checkout.payment') }}
            </span>
            <a v-else href="javascript:;" @click="activeStep = 2">
              {{ $t('checkout.payment') }}
            </a>
          </template>
        </el-step>
        <el-step>
          <template slot="icon">
            <a-icon icon="check-circle" class="_confirmation-icon"></a-icon>
          </template>
          <template slot="title">
            <span v-if="activeStep < 3">
              {{ $t('checkout.confirmation') }}
            </span>
            <strong v-else class="_confirmation-text">
              {{ $t('checkout.confirmation') }}
            </strong>
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

      <div class="_checkout-payment" v-else-if="activeStep >= 2">
        <transition name="fade">
          <div
            key="checkout-loading"
            v-if="cartLoading || checkoutLoading"
            class="_checkout-loading __loading">
            <a-icon class="__loading-icon" icon="circle-notch" spin></a-icon>
            <div>{{ $t('checkout.loadingGateways') }}</div>
          </div>

          <el-row key="checkout-payment" v-else id="payment">
            <el-col :md="17" :sm="16" :xs="24">
              <el-card shadow="never" class="_invoice" v-if="activeStep === 2">
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
                  <el-tabs
                    v-if="paymentGateways.length"
                    type="border-card"
                    shadow="never"
                    @tab-click="changePayment">
                    <el-tab-pane
                      v-for="(gateway, index) in paymentGateways"
                      :key="index + gateway.label"
                      :data-index="index">

                      <span slot="label">
                        <el-tag
                          type="success"
                          size="mini"
                          v-if="gateway.discount && gateway.discount.value > 0"
                          class="__icon-mr">
                          <span v-if="gateway.discount.type === 'percentage'">
                            -{{ gateway.discount.value }}%
                          </span>
                          <span v-else>
                            -{{ formatMoney(gateway.discount.value) }}
                          </span>
                        </el-tag>
                        <a-icon v-else-if="gateway.payment_method.code === 'credit_card'"
                          icon="credit-card" class="__icon-mr"></a-icon>
                        <a-icon v-else-if="gateway.payment_method.code === 'banking_billet'"
                          icon="barcode" class="__icon-mr"></a-icon>
                        {{ gateway.label }}
                      </span>

                      <p class="_invoice-payment-text" v-if="gateway.text">
                        <span v-html="gateway.text"></span>
                      </p>
                      <p
                        class="_invoice-payment-discount"
                        v-if="gateway.discount && gateway.discount.value > 0">
                        <span v-if="gateway.discount.type === 'percentage'">
                          {{ gateway.discount.value }}%
                        </span>
                        <span v-else>
                          {{ formatMoney(gateway.discount.value) }}
                        </span>
                        {{ $t('checkout.ofDiscount') }}
                        <span v-if="gateway.discount.apply_at === 'freight'">
                          {{ $t('checkout.onFreight') }}
                        </span>
                      </p>

                      <credit-card
                        v-if="gateway.payment_method.code === 'credit_card'"
                        :skipHolderDoc="gateway.skip_holder_info"
                        :checkHolder="checkCustomerName"
                        :installmentOptions="gateway.installment_options"
                        :jsClient="gateway.js_client"
                        :stampImg="gateway.icon"
                        @submit-form="data => { doCheckout(data) }"/>
                      <span v-else>
                        <p class="_invoice-payment-value">
                          {{ $t('cart.total') }}:
                          <strong>{{ formatMoney(checkout.amount.total) }}</strong>
                        </p>
                        <el-button type="success" @click="() => { doCheckout() }" class="_invoice-pay">
                          <a-icon icon="check" class="__icon-mr"></a-icon>
                          {{ gateway.payment_method.code === 'banking_billet' ?
                            $t('checkout.bankingBillet') : $t('card.checkout') }}
                        </el-button>
                        <img v-if="gateway.icon" :src="gateway.icon" class="_invoice-payment-icon"/>
                      </span>
                    </el-tab-pane>
                  </el-tabs>

                  <div v-else class="_invoice-payment-empty">
                    {{ $t('checkout.paymentEmpty') }}
                  </div>
                </div>
              </el-card>

              <el-card shadow="never" class="_confirmation" v-else>
                <h1 id="confirmation">
                  <a-icon icon="check" class="__icon-mr"></a-icon>
                  {{ $t('checkout.orderCreated') }}
                </h1>
                <order-info></order-info>
              </el-card>
            </el-col>

            <el-col :md="7" :sm="8" :xs="24" class="_summary" v-sticky="{ zIndex: 99, stickyTop: 20 }">
              <div class="__box">
                <div class="_summary-items">
                  <div class="_summary-item" v-for="item in cart.items" :key="item._id">
                    <el-row type="flex" align="middle" justify="end">
                      <el-col :span="18" class="_summary-item-info">
                        <div class="_summary-item-title">
                          <a :href="'/' + item._product.slug" target="_blank">
                            {{ item.name }}
                          </a>
                        </div>
                        <div class="_summary-item-price">
                          {{ formatMoney(item.final_price, item.currency_id) }}
                        </div>
                      </el-col>
                      <el-col :span="6" class="_summary-item-image" v-if="item.picture">
                        <el-badge :value="item.quantity" type="primary">
                          <img v-if="item.picture.normal" :src="item.picture.normal.url" />
                          <img v-else-if="Object.keys(item.picture).length"
                            :src="item.picture[Object.keys(item.picture)[0]].url" />
                        </el-badge>
                      </el-col>
                    </el-row>
                  </div>
                </div>

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

                <el-row v-if="checkout.amount.discount">
                  <el-col :md="12" :sm="24" :xs="12" class="_summary-discount">
                    <small>{{ $t('cart.discount') }}</small>
                    {{ formatMoney(checkout.amount.discount) }}
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
import { formatMoney, updateTitle } from '@/lib/utils'
import RegistrationForm from '@/components/routes/account/RegistrationForm'
import AddressList from '@/components/routes/account/AddressList'
import ShippingServices from '@/components/routes/cart/ShippingServices'
import DiscountCoupon from '@/components/routes/cart/DiscountCoupon'
import CreditCard from '@/components/routes/checkout/CreditCard'
import OrderInfo from '@/components/routes/account/OrderInfo'

export default {
  name: 'CheckoutApp',

  components: {
    RegistrationForm,
    AddressList,
    ShippingServices,
    DiscountCoupon,
    CreditCard,
    OrderInfo
  },

  data () {
    return {
      shippingZip: null,
      cartLoading: true,
      cartReloadTimer: null,
      checkoutLoading: false,
      activeStep: 0
    }
  },

  computed: {
    ...mapGetters([
      'cart',
      'customer',
      'checkout',
      'checkoutZip',
      'customerUpdate',
      'customerEmail',
      'customerAddress',
      'customerPhones',
      'isCustomerLogged',
      'shippingAvailable',
      'paymentGateways',
      'orderFinancialStatus',
      'shopName'
    ]),

    checkCustomerName () {
      // use to consider or not if using current buyer info as payer info
      if (this.customer.registry_type === 'p') {
        let { name } = this.customer
        if (name) {
          return name.given_name
        }
      }
      // accept any
      return null
    },

    buyerReady () {
      // check if there is all needed buyer info
      return (this.customerEmail && this.checkCustomerName && this.customerPhones.length)
    }
  },

  methods: {
    ...mapActions([
      'loadCart',
      'clearCart',
      'setCheckoutZip',
      'handleCheckout',
      'initPaymentGateways',
      'fixCheckoutDiscount',
      'login'
    ]),
    ...mapMutations([
      'logout',
      'selectPaymentGateway'
    ]),

    formatMoney (value) {
      return formatMoney(value, this.$currency, this.$lang)
    },

    updateStep () {
      // update current checkout step
      if (this.buyerReady) {
        if (this.customerAddress && this.shippingZip) {
          // ready for payment
          this.activeStep = 2
          // update shipping and payment methods
          this.prepareCheckout()
        } else {
          // shipping
          this.activeStep = 1
        }
      } else {
        // identify
        this.activeStep = 0
      }
    },

    prepareCheckout () {
      if (!this.cartLoading) {
        this.checkoutLoading = true
        // update checkout shipping address and methods
        this.setCheckoutZip(this.shippingZip)

        .then(() => {
          if (this.shippingAvailable) {
            // load payment methods
            return this.initPaymentGateways().then(() => {
              this.changePayment()
              this.checkoutLoading = false
            })
          } else {
            // no shipping methods
            this.$message({
              showClose: true,
              message: this.$t('shipping.empty'),
              type: 'warning'
            })
            // back to select shipping address
            this.activeStep = 1
          }
        })

        .catch(err => {
          console.error(err)
          // alert error and reload current page
          alert(this.$t('general.error'))
          setTimeout(() => location.reload(), 1000)
        })
      }
    },

    handleCustomer () {
      // treat customer logged/unlogged or edited events
      // check if shipping address has changed
      if (this.customerAddress && this.customerAddress.zip !== this.shippingZip) {
        this.shippingZip = this.customerAddress.zip
      }
      // update current checkout step with new customer info
      this.updateStep()
    },

    changePayment (payload) {
      let index = 0
      if (payload) {
        switch (typeof payload) {
          case 'object':
            // element clicked
            let { $el } = payload
            if ($el) {
              index = parseInt($el.dataset.index, 10)
            }
            break
          case 'number':
            index = payload
        }
      }
      this.selectPaymentGateway(index)
      // update checkout values after payment method changed
      this.fixCheckoutDiscount()
    },

    doCheckout (paymentData) {
      this.handleCheckout(paymentData).then(({ transaction }) => {
        if (transaction.status && transaction.status.current === 'unauthorized') {
          // invalid credit card probably
          this.$message({
            showClose: true,
            message: this.$t('checkout.unauthorized'),
            type: 'warning'
          })
        } else {
          // payment done
          // show confirmation tab
          this.activeStep = 4
          // update header title
          updateTitle('✓ ' + this.$t('checkout.orderCreated'), this.shopName)
        }
      })

      .catch(err => {
        // unknown checkout error
        console.log(err)
        // show notification
        this.$message({
          showClose: true,
          message: this.$t('checkout.orderError'),
          type: 'danger'
        })
      })
    }
  },

  created () {
    let loadCart = () => {
      // reload cart data
      this.loadCart({ id: this.$route.params.id }).finally(() => {
        this.cartLoading = false
        if (!this.cart.items.length) {
          // empty cart
          // back to shopping cart
          this.$router.push({ name: 'cart' })
        } else {
          // check if customer already logged and goes to correct checkout step
          this.handleCustomer()
        }
      })
    }
    loadCart()
    // reload on each 30 minutes
    this.cartReloadTimer = setInterval(loadCart, 1800 * 1000)

    // setup current zip code
    if (this.checkoutZip !== '') {
      this.shippingZip = this.checkoutZip
    }
    // update header title
    updateTitle(this.$t('checkout.title'), this.shopName)
  },

  watch: {
    customerEmail () {
      this.handleCustomer()
    },

    customerUpdate () {
      this.handleCustomer()
    },

    orderFinancialStatus (current) {
      setTimeout(() => {
        if (this.activeStep >= 3) {
          // on confirmation tab
          // check if payment was updated to refused
          switch (current) {
            case 'unauthorized':
            case 'voided':
              // alert order cancelled
              this.$alert(this.$t('checkout.paymentRefused'), this.$t('checkout.orderCancelled'), {
                type: 'warning',
                confirmButtonText: this.$t('checkout.backToPayment'),
                callback: action => {
                  // back to payment
                  this.activeStep = 2
                }
              })
              // reset header title
              updateTitle(this.$t('checkout.title'), this.shopName)
              break
          }
        }
      }, 200)
    }
  },

  beforeRouteLeave (to, from, next) {
    // unset chosen payment method before redirect
    this.changePayment(-1)
    // unset cart reload interval function
    clearInterval(this.cartReloadTimer)
    // clear cart if checkout was already done
    if (this.activeStep >= 3) {
      // unset current shopping cart before routing
      this.clearCart().finally(next)
    } else {
      // proceed router navigation
      next()
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
._confirmation-text {
  color: lighten($--color-success, 15%);
}
._checkout-logout {
  color: $--color-danger;
}
._checkout-payment {
  margin-top: $--card-padding * 1.3;
}
._invoice,
._confirmation {
  margin-right: $--card-padding;
}
@media (max-width: 767px) {
  ._invoice,
  ._confirmation {
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
._invoice-payment-text {
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
}
._invoice-payment-icon {
  display: block;
  margin: $--card-padding * .75 auto;
}
._invoice-payment-discount {
  color: $--color-success;
  font-size: $--font-size-large;
}
._invoice-payment-value {
  color: $--color-text-primary;
}
._invoice-pay {
  padding: $--card-padding $--card-padding * 2;
  font-size: $--font-size-large;
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
._summary-items {
  margin-bottom: $--card-padding;
}
._summary-item {
  padding: $--card-padding * .5 0;
  border-bottom: 1px dashed $--border-color-light;
  font-size: $--font-size-base;
}
._summary-item:first-child {
  padding-top: 0;
}
._summary-item:last-child {
  border-bottom: 2px $--border-style-base $--border-color-lighter;
}
._summary-item-image {
  padding-left: $--card-padding * .5;
}
._summary-item-image img {
  border-radius: $--border-radius-small;
  border: $--border-base;
}
._summary-item-title {
  margin-bottom: .25rem;
}
._summary-item-price {
  display: inline-block;
  color: $--color-text-secondary;
}
._confirmation h1 {
  color: $--color-success;
  margin-top: 0;
}
</style>
