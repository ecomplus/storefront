<template>
  <div id="cart">
    <the-cart
      :amount="amount"
      :discount-coupon.sync="discountCoupon"
      :modules-payload="baseModulesRequestData"
      @select-shipping="selectShippingService"
      @set-discount-rule="setDiscountRule"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
