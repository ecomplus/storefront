<template>
  <div class="__box">
    <div class="_summary-items">
      <div class="_summary-item" v-for="item in items" :key="item._id">
        <el-row type="flex" align="middle" justify="end" v-if="item.quantity">
          <el-col :span="18" class="_summary-item-info">
            <div class="_summary-item-title">
              <a v-if="item._product" :href="'/' + item._product.slug" target="_blank">
                {{ item.name }}
              </a>
              <span v-else>
                {{ item.name }}
              </span>
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
        {{ formatMoney(subtotal) }}
      </el-col>
      <el-col :md="12" :sm="24" :xs="12" class="_summary-freigth">
        <small>{{ $t('cart.freight') }}</small>
        {{ formatMoney(amount.freight) }}
      </el-col>
    </el-row>

    <el-row v-if="amount.discount">
      <el-col :md="12" :sm="24" :xs="12" class="_summary-discount">
        <small>{{ $t('cart.discount') }}</small>
        {{ formatMoney(amount.discount) }}
      </el-col>
      <el-col :md="12" :sm="24" :xs="12" class="_summary-total">
        <small>{{ $t('cart.total') }}</small>
        {{ formatMoney(amount.total) }}
      </el-col>
    </el-row>
    <div v-else class="_summary-total">
      <small>{{ $t('cart.total') }}</small>
      {{ formatMoney(amount.total) }}
    </div>
  </div>
</template>

<script>
import { formatMoney } from '@/lib/utils'

export default {
  name: 'ItemsSummary',

  props: [
    'items',
    'subtotal',
    'amount'
  ],

  methods: {
    formatMoney (value) {
      return formatMoney(value, this.$currency, this.$lang)
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

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
