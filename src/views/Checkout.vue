<template>
  <div id="checkout">
    <ec-checkout
      :amount="amount"
      :checkoutStep.sync="checkoutStep"
      @login="login"
      :customer.sync="customer"
      @addressSelected="selectAddress"
      :shippingZipCode="shippingZipCode"
      :shippingService.sync="shippingService"
      :paymentGateway.sync="paymentGateway"
      :discountCoupon.sync="discountCoupon"
      @setDiscountRule="setDiscountRule"
      @checkout="checkout"
    />
  </div>
</template>

<script src="./js/Checkout.js"></script>
