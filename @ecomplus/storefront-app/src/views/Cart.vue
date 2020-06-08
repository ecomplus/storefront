<template>
  <div id="cart">
    <the-cart
      :amount="amount"
      :discount-coupon.sync="discountCoupon"
      :base-modules-request-data="baseModulesRequestData"
      @shipping-service="selectShippingService"
      @set-discount-rule="setDiscountRule"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
