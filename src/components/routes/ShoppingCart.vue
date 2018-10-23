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
                      {{ checkout.freight_calculed ?
                        formatMoney(checkout.freight) : $t('general.toCalculate') }}
                    </el-col>
                  </el-row>

                  <el-popover ref="popzip" trigger="click" width="240">
                    <div class="_cart-zip-popover">
                      <el-input placeholder="CEP" class="_cart-zip" size="small">
                        <el-button slot="append">{{ $t('general.calculate') }}</el-button>
                      </el-input>
                    </div>
                  </el-popover>
                  <div class="_cart-zip-trigger">
                    <a href="javascript:;" v-popover:popzip>
                      {{ $t('cart.calculateFreight') }}
                      <a-icon icon="truck"></a-icon>
                    </a>
                  </div>

                  <el-popover ref="popcoupon" trigger="click" width="300">
                    <div class="_cart-coupon-popover">
                      <el-input placeholder="Código do cupom" class="_cart-coupon" size="small">
                        <el-button slot="append">{{ $t('general.add') }}</el-button>
                      </el-input>
                    </div>
                  </el-popover>
                  <div class="_cart-coupon-trigger">
                    <!--
                    <small>Desconto:</small> <b>R$ 50,00</b>
                    <el-tooltip content="Cupom de desconto" placement="top">
                      <a href="javascript:;" v-popover:popcoupon>
                        <a-icon icon="ticket-alt"></a-icon>
                      </a>
                    </el-tooltip>
                    -->
                    <a href="javascript:;" v-popover:popcoupon>
                      {{ $t('cart.addDiscountCoupon') }}
                    </a>
                  </div>
                </div>

                <div class="_cart-total">
                  <small>{{ $t('cart.total') }}</small>
                  {{ formatMoney(checkout.total) }}
                </div>
                <el-button type="success" class="_cart-buy __btn-block" @click="goToCheckout">
                  <a-icon icon="check" class="_buy-icon"></a-icon>
                  {{ $t('cart.close') }}
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { formatMoney } from '@/lib/utils'

export default {
  name: 'ShoppingCart',

  data () {
    return {
      loaded: false,
      saveCartTimeout: null
    }
  },

  computed: mapGetters([
    'cart',
    'checkout',
    'customer'
  ]),

  methods: {
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
._cart-info {
  text-align: right;
  font-size: $--font-size-large;
}
._cart-info small {
  display: block;
  color: $--color-text-secondary;
}
._cart-values {
  padding-bottom: $--card-padding;
  margin-bottom: $--card-padding;
  border-bottom: $--border-base;
}
._cart-total {
  font-weight: 600;
  margin-bottom: $--card-padding * .5;
}
._buy-icon {
  margin-right: 10px;
  color: $--color-success-light;
}
._cart-zip-trigger,
._cart-coupon-trigger {
  font-size: 85%;
}
._cart-coupon-trigger small {
  display: inline-block;
}
._cart-zip-trigger {
  margin: 10px 0 5px 0;
}
._cart-continue-shopping {
  font-size: $--font-size-large;
  text-align: center;
}
</style>
