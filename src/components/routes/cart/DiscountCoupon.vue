<template>
  <div class="_coupon">
    <el-popover ref="popcoupon" trigger="click" width="300">
      <div class="_coupon-popover">
        <el-input :placeholder="$t('cart.discountCoupon')" class="_coupon-input" size="small">
          <el-button slot="append">{{ $t('general.add') }}</el-button>
        </el-input>
      </div>
    </el-popover>
    <div class="_coupon-trigger">
      <a href="javascript:;" v-popover:popcoupon>
        {{ $t('cart.addDiscountCoupon') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscountCoupon'
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._coupon {
  display: inline-block;
}
._coupon-trigger {
  font-size: $--font-size-base;
}
</style>
