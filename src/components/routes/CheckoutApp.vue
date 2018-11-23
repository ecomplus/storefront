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
            <span v-if="activeStep === 1 || !buyerReady">
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
                  <el-tabs type="border-card" shadow="never" @tab-click="changePayment">
                    <el-tab-pane
                      v-for="(gateway, index) in paymentGateways"
                      :key="index + gateway.label"
                      :data-index="index">
                      <span slot="label">
                        <a-icon v-if="gateway.payment_method.code === 'credit_card'"
                          icon="credit-card" class="__icon-mr"></a-icon>
                        <a-icon v-else-if="gateway.payment_method.code === 'banking_billet'"
                          icon="barcode" class="__icon-mr"></a-icon>
                        {{ gateway.label }}
                      </span>
                      <p class="_invoice-payment-text" v-if="gateway.text">
                        {{ gateway.text }}
                      </p>

                      <credit-card
                        v-if="gateway.payment_method.code === 'credit_card'"
                        :skipHolderDoc="gateway.skip_holder_info"
                        :checkHolder="checkCustomerName"
                        :installmentOptions="gateway.installment_options"
                        :jsClient="gateway.js_client"
                        @submit-form="data => { doCheckout(data) }"/>
                      <span v-else>
                        <el-button type="success" @click="() => { doCheckout() }" class="_invoice-pay">
                          {{ gateway.payment_method.code === 'banking_billet' ?
                            $t('checkout.bankingBillet') : $t('card.checkout') }}
                        </el-button>
                      </span>

                      <img v-if="gateway.icon" :src="gateway.icon" class="_invoice-payment-icon"/>
                    </el-tab-pane>
                  </el-tabs>
                </div>
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
import { formatMoney, updateTitle } from '@/lib/utils'
import RegistrationForm from '@/components/routes/account/RegistrationForm'
import AddressList from '@/components/routes/account/AddressList'
import ShippingServices from '@/components/routes/cart/ShippingServices'
import DiscountCoupon from '@/components/routes/cart/DiscountCoupon'
import CreditCard from '@/components/routes/checkout/CreditCard'

export default {
  name: 'CheckoutApp',

  components: {
    RegistrationForm,
    AddressList,
    ShippingServices,
    DiscountCoupon,
    CreditCard
  },

  data () {
    return {
      shippingZip: null,
      cartLoading: true,
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
      'paymentGateways',
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
      'setCheckoutZip',
      'handleCheckout',
      'initPaymentGateways',
      'login'
    ]),
    ...mapMutations([
      'logout',
      'selectPaymentGateway'
    ]),
    formatMoney,

    updateStep () {
      // update current checkout step
      if (this.buyerReady) {
        if (this.customerAddress && (!this.shippingZip || this.customerAddress.zip === this.shippingZip)) {
          // ready for payment
          this.activeStep = 2

          // update checkout shipping address
          this.checkoutLoading = true
          this.setCheckoutZip(this.customerAddress.zip).then(() => {
            // load payment methods
            this.initPaymentGateways().catch(err => {
              // alert
            }).then(() => {
              this.selectPaymentGateway()
              this.checkoutLoading = false
            })
          })
        } else {
          // shipping
          this.activeStep = 1
        }
      } else {
        // identify
        this.activeStep = 0
      }
    },

    changePayment ({ $el }) {
      this.selectPaymentGateway(parseInt($el.dataset.index, 10))
    },

    doCheckout (paymentData) {
      this.handleCheckout(paymentData).then(({ transaction }) => {
        // payment confirmation modal
        if (transaction.payment_link || transaction.banking_billet) {
          let payText, payLink, payCode
          if (transaction.banking_billet) {
            payText = this.$t('checkout.printBillet')
            payCode = transaction.banking_billet.code
          } else {
            payText = this.$t('checkout.redirectToPayment')
          }
          if (transaction.banking_billet && transaction.banking_billet.link) {
            payLink = transaction.banking_billet.link
          } else {
            payLink = transaction.payment_link
          }

          // modal HTML content
          let payHtml = '<p>' + this.$t('checkout.doPaymentText') + '</p>'
          if (payCode) {
            // highlight ticket code
            payHtml += '<br>' + this.$t('checkout.ticketCode') + ':' +
                       '<br><strong>' + payCode + '</strong>'
          }
          this.$alert(payHtml, this.$t('checkout.orderCreated'), {
            dangerouslyUseHTMLString: true,
            showClose: false,
            confirmButtonText: payText,
            callback: action => {
              // redirect to payment
              window.open(payLink, '_blank')
            }
          })
        } else {
          this.$message({
            type: 'success',
            message: this.$t('checkout.orderCreated')
          })
        }
      })

      .catch(e => {
        // show notification
        this.$message({
          showClose: true,
          message: this.$t('checkout.orderCreated'),
          type: 'danger'
        })
      })
    }
  },

  created () {
    // reload cart data
    this.loadCart({ id: this.$route.params.id }).finally(() => {
      this.cartLoading = false
      if (!this.cart.items.length) {
        // empty cart
        // back to shopping cart
        this.$router.push({ name: 'cart' })
      }
    })

    // setup current zip code
    if (this.checkoutZip !== '') {
      this.shippingZip = this.checkoutZip
    }
    // update header title
    updateTitle(this.$t('checkout.title'), this.shopName)
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
._invoice-payment-text {
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
}
._invoice-payment-icon {
  margin: 0 auto;
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
</style>
