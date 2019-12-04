<template>
  <div id="cart">
    <ec-cart
      :amount="amount"
      @shippingService="selectShippingService"
      :discountCoupon.sync="discountCoupon"
      @setDiscountRule="setDiscountRule"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
