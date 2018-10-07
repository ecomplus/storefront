<template>
  <div class="_cart">
    <div v-if="!cart.items.length" class="_cart-empty">
      <h1 class="_cart-title">
        {{ $t('cart.title') }}
        <small>{{ $t('cart.empty') }}</small>
      </h1>
      <div class="_cart-continue-shopping">
        {{ $t('cart.continueShopping') }}.
        <a href="/">{{ $t('cart.chooseProducts') }}</a>
      </div>
    </div>

    <div v-else class="_cart-with-items">
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
          <el-col :span="18" class="_items">
            <div class="_item" v-for="item in cart.items">
              <el-row>
                <el-col :span="4" class="_item-image">
                  <img v-if="item.picture && item.picture.normal" :src="item.picture.normal.url" />
                </el-col>
                <el-col :span="20" class="_item-info">
                  <el-row type="flex" align="middle" justify="space-between">
                    <div class="_item-values">
                      <span class="_item-quantity">
                        <el-input-number
                          size="small"
                          :value="item.quantity"
                          :min="item.min_quantity"
                          :max="item.max_quantity">
                        </el-input-number>
                      </span>
                      <span class="_item-remove">
                        <el-button type="danger" size="small">
                          <a-icon icon="times"></a-icon>
                        </el-button>
                      </span>
                      <span class="_item-price">
                        {{ item.currency_symbol + ' ' + item.price }}
                      </span>
                    </div>
                    <div class="_item-total">
                      {{ item.currency_symbol + ' ' + (item.price * item.quantity) }}
                    </div>
                  </el-row>
                  <div class="_item-gift">
                    <el-checkbox>
                      <a-icon icon="gift"></a-icon>
                      {{ $t('cart.giftWrap') }}
                    </el-checkbox>
                  </div>
                  <h4 class="_item-title">
                    <small class="_item-sku">{{ item.sku }}</small>
                    {{ item.name }}
                  </h4>
                </el-col>
              </el-row>
            </div>
          </el-col>

          <el-col :span="6" class="_cart-info">
            <div class="_cart-values">
              <el-row>
                <el-col :span="12" class="_cart-subtotal">
                  <small>Subtotal</small>
                  R$ 500,00
                </el-col>
                <el-col :span="12" class="_cart-freigth">
                  <small>Frete</small>
                  R$ 70,00
                </el-col>
              </el-row>

              <el-popover ref="popzip" trigger="click" width="240">
                <div class="_cart-zip-popover">
                  <el-input placeholder="CEP" class="_cart-zip" size="small">
                    <el-button slot="append">Calcular</el-button>
                  </el-input>
                </div>
              </el-popover>
              <div class="_cart-zip-trigger">
                <a href="javascript:;" v-popover:popzip>
                  Calcular frete
                  <a-icon icon="truck"></a-icon>
                </a>
              </div>

              <el-popover ref="popcoupon" trigger="click" width="300">
                <div class="_cart-coupon-popover">
                  <el-input placeholder="Código do cupom" class="_cart-coupon" size="small">
                    <el-button slot="append">Adicionar</el-button>
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
                  Adicionar cupom de desconto
                </a>
              </div>
            </div>

            <div class="_cart-total">
              <small>Total</small>
              R$ 570,00
            </div>
            <el-button type="success" class="_cart-buy">
              <a-icon icon="check" class="_buy-icon"></a-icon>
              {{ $t('cart.close') }}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShoppingCart',

  computed: mapGetters([
    'cart'
  ]),

  methods: {
    ...mapGetters([
      'productById'
    ]),
    ...mapActions([
      'initProduct',
      'loadCart'
    ])
  },

  created () {
    // load cart data
    this.loadCart({ id: this.$route.params.id })
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
._item-values > * {
  display: inline-block;
}
._item-price {
  color: $--color-text-secondary;
  margin-left: 20px;
}
._item-total {
  color: $--color-text-primary;
  text-align: right;
  margin: -4px 0 0 10px;
}
._item-price,
._item-total,
._cart-buy {
  font-size: $--font-size-large;
}
._item-remove {
  margin-left: 10px;
}
._item-gift {
  margin-top: 10px;
}
._item-sku {
  color: $--color-text-secondary;
  font-size: 12px;
  display: block;
  margin-bottom: 2px;
}
._cart-info {
  text-align: right;
  font-size: $--font-size-large;
}
._cart-info > * {
  padding: $--card-padding;
}
._cart-info small {
  display: block;
  color: $--color-text-secondary;
}
._cart-values {
  background: $--border-color-extra-light;
  border-radius: $--border-radius-base;
}
._cart-total {
  font-weight: 600;
}
._cart-buy {
  width: 100%;
  font-weight: 600;
}
._buy-icon {
  margin-right: 10px;
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
  padding: $--card-padding;
  background: $--border-color-extra-light;
}
</style>
