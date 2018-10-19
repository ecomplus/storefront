<template>
  <div class="_checkout">
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ShoppingCart',

  data () {
    return {
      loaded: false
    }
  },

  computed: mapGetters([
    'cart',
    'checkout',
    'formatMoney'
  ]),

  methods: {
    ...mapActions([
      'loadCart'
    ]),
    ...mapMutations([
      'setCartItemQnt',
      'removeCartItem'
    ])
  },

  created () {
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
}
._item-total {
  color: $--color-text-primary;
  text-align: right;
  margin-left: 10px;
}
._item-price,
._item-total,
._cart-buy {
  font-size: $--font-size-large;
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
