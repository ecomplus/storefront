<template>
  <div class="_cart">
    <transition name="fade">
      <div key="cart-loading" v-if="!loaded" class="_cart-loading"></div>

      <div key="cart-empty" v-else-if="!cart.items.length" class="_cart-empty">
        <h1 class="_cart-title">
          {{ $t('cart.title') }}
          <small>{{ $t('cart.empty') }}</small>
        </h1>
        <div class="_cart-continue-shopping __box">
          {{ $t('cart.continueShopping') }}.
          <a href="/">{{ $t('cart.chooseProducts') }}</a>
        </div>
      </div>

      <div key="cart-list" v-else class="_cart-with-items">
        <h1 class="_cart-title">
          {{ $t('cart.title') }}
          <small v-if="cart.items.length === 1">
            {{ $t('cart.oneItem') }}
          </small>
          <small v-else>
            {{ cart.items.length + ' ' + $t('cart.items') }}
          </small>
        </h1>

        <div class="_cart-content">
          <el-row>
            <el-col :md="17" :sm="16" :xs="24" class="_items">
              <div class="_item" v-for="item in cart.items" :key="item._id">
                <el-row>
                  <el-col :md="4" :sm="6" :xs="8" class="_item-image" v-if="item.picture">
                    <a :href="'/' + item._product.slug">
                      <img v-if="item.picture.normal" :src="item.picture.normal.url" />
                      <img v-else-if="Object.keys(item.picture).length"
                        :src="item.picture[Object.keys(item.picture)[0]].url" />
                    </a>
                  </el-col>
                  <el-col :md="20" :sm="18" :xs="16" class="_item-info">
                    <el-row type="flex" align="middle" justify="space-between">
                      <div class="_item-control">
                        <div class="_item-quantity">
                          <el-input-number
                            size="small"
                            :value="item.quantity"
                            :min="item.min_quantity"
                            :max="item.max_quantity"
                            @change="qnt => { itemQnt({ item, qnt }) }">
                          </el-input-number>
                        </div>
                        <div class="_item-remove">
                          <a href="javascript:;" @click="() => { removeCartItem({ item }) }">
                            {{ $t('cart.removeItem') }}
                          </a>
                        </div>
                      </div>
                      <div class="_item-price">
                        <small>{{ $t('cart.price') }}</small>
                        {{ formatMoney(item.price, item.currency_id) }}
                      </div>
                      <div class="_item-total">
                        <small>{{ $t('cart.total') }}</small>
                        {{ formatMoney((item.price * item.quantity), item.currency_id) }}
                      </div>
                    </el-row>
                    <div class="_item-gift" v-if="item._product.gift_wraps.length === 1">
                      <el-checkbox :checked="(item.gift_wrap && item.gift_wrap.label)">
                        <a-icon icon="gift"></a-icon>
                        {{ $t('cart.giftWrap') }}
                      </el-checkbox>
                    </div>
                    <div class="_item-gift" v-else-if="item._product.gift_wraps.length">
                      <el-checkbox
                        v-for="gift in item._product.gift_wraps"
                        :checked="(item.gift_wrap && item.gift_wrap.label === gift.label)"
                        :true-label="gift.label"
                        :key="gift.label">
                        <a-icon icon="gift"></a-icon>
                        {{ $t('cart.giftWrap') + ' - ' + gift.label }}
                      </el-checkbox>
                    </div>
                    <h4 class="_item-title">
                      <small class="_item-sku">{{ item.sku }}</small>
                      <a :href="'/' + item._product.slug">{{ item.name }}</a>
                    </h4>
                  </el-col>
                </el-row>
              </div>
            </el-col>

            <el-col :md="7" :sm="8" :xs="24" class="_cart-info" v-sticky="{ zIndex: 99, stickyTop: 20 }">
              <div class="__box">
                <div class="_cart-values">
                  <el-row>
                    <el-col :span="12" class="_cart-subtotal">
                      <small>{{ $t('cart.subtotal') }}</small>
                      {{ formatMoney(cart.subtotal) }}
                    </el-col>
                    <el-col :span="12" class="_cart-freigth">
                      <small>{{ $t('cart.freight') }}</small>
                      {{ checkoutShipping ?
                        formatMoney(checkout.amount.freight) : $t('general.toCalculate') }}
                    </el-col>
                  </el-row>

                  <div class="_cart-shipping">
                    <small class="_cart-shipping-label">
                      {{ $t('cart.calculateFreight') }}
                    </small>
                    <el-input
                      size="small"
                      v-model="shippingZip"
                      v-mask="$country === 'br' ? '99999-999' : ''"
                      v-on-key-enter="() => { setCheckoutZip(shippingZip) }"
                      class="_cart-shipping-zip"
                      maxlength="30">
                      <el-button slot="append" @click="setCheckoutZip(shippingZip)">
                        <a-icon icon="truck"></a-icon>
                      </el-button>
                    </el-input>
                    <shipping-services/>
                  </div>
                </div>

                <div class="_cart-total">
                  <small>{{ $t('cart.total') }}</small>
                  {{ formatMoney(checkout.amount.total) }}
                </div>
                <el-button type="success" class="_cart-buy __btn-block" @click="goToCheckout">
                  <a-icon icon="check" class="_buy-icon"></a-icon>
                  {{ $t('cart.close') }}
                </el-button>
                <discount-coupon/>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { formatMoney } from '@/lib/utils'
import DiscountCoupon from '@/components/routes/cart/DiscountCoupon'
import ShippingServices from '@/components/routes/cart/ShippingServices'

export default {
  name: 'ShoppingCart',

  components: {
    DiscountCoupon,
    ShippingServices
  },

  data () {
    return {
      loaded: false,
      shippingZip: '',
      saveCartTimeout: null
    }
  },

  computed: mapGetters([
    'cart',
    'checkout',
    'checkoutShipping',
    'checkoutZip',
    'customer'
  ]),

  methods: {
    ...mapMutations([
      'setCheckoutZip'
    ]),
    ...mapActions([
      'loadCart',
      'saveCart',
      'setCartItemQnt',
      'removeCartItem',
      'login'
    ]),
    formatMoney,

    itemQnt (payload) {
      // handle item quantity changes
      this.setCartItemQnt(payload)
      // delay cart saving to prevent doing this multiple at the 'same time'
      if (this.saveCartTimeout) {
        clearTimeout(this.saveCartTimeout)
      }
      this.saveCartTimeout = setTimeout(() => {
        // update stored cart body
        this.saveCart()
      }, 2000)
    },

    goToCheckout () {
      // start login flow if customer no customer info
      if (!this.customer.main_email) {
        this.login()
      }
      // redirect to checkout
      this.$router.push({ name: 'checkout' })
    }
  },

  created () {
    // load cart data
    this.loadCart({ id: this.$route.params.id }).finally(() => {
      this.loaded = true
    })
    // preset zip from checkout state
    this.shippingZip = this.checkoutZip
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';

._item {
  padding: $--card-padding 0;
  border-top: 1px dashed $--border-color-light;
  margin-right: $--card-padding;
}
._item:not(:last-child) {
  border-bottom: none;
}
._item-image {
  padding-right: $--card-padding;
}
._item-image img {
  border-radius: $--border-radius-small;
  border: $--border-base;
}
._item-price {
  color: $--color-text-secondary;
  text-align: right;
}
._item-total {
  color: $--color-text-primary;
  text-align: right;
  margin-left: 10px;
}
._item-price,
._item-total {
  font-size: $--font-size-large;
}
._item-price small,
._item-total small {
  display: block;
  opacity: .7;
}
._item-control {
  margin-right: 10px;
}
._item-remove {
  margin-top: 5px;
  width: 100%;
  text-align: center;
  text-transform: lowercase;
}
._item-remove > a {
  color: $--color-danger;
}
._item-gift {
  margin-top: 10px;
}
._item-title {
  margin-top: $--card-padding;
}
._item-sku {
  color: $--color-text-secondary;
  font-size: 70%;
  display: block;
  margin-bottom: 2px;
}
._item-title a {
  color: inherit;
}
@media (max-width: 575px) {
  ._item-info > div {
    display: block;
  }
  ._item-remove,
  ._item-quantity {
    width: auto;
    display: inline-block;
    margin-bottom: $--card-padding;
  }
  ._item-quantity {
    margin-right: 10px;
  }
  ._item-price,
  ._item-total {
    display: inline-block;
    width: 45%;
  }
}
@media (min-width: 992px) {
  ._item-total {
    margin-right: $--card-padding;
  }
}
._cart-values {
  padding-bottom: $--card-padding;
  margin-bottom: $--card-padding;
  border-bottom: $--border-base;
}
._cart-shipping {
  margin-top: $--card-padding * .5;
}
._cart-shipping-zip {
  width: 100%;
  max-width: 170px;
  margin-bottom: $--card-padding * .5;
}
._cart-shipping-label {
  margin-bottom: .35rem;
}
._cart-total {
  font-weight: 600;
}
._cart-buy {
  margin: $--card-padding * .5 0;
}
._buy-icon {
  margin-right: 10px;
  color: $--color-success-light;
}
._cart-continue-shopping {
  text-align: center;
}
</style>
