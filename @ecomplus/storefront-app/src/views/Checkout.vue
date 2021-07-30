<template>
  <div id="checkout">
    <div class="row">
      <div class="col order-lg-last">
        <ec-checkout
          :is-guest-checkout="isGuestCheckout"
          :can-recommend-items="!isLpCheckout"
          :can-hide-summary="isLpCheckout"
          :amount="amount"
          :checkout-step.sync="checkoutStep"
          @login="login"
          :customer.sync="customer"
          @address-selected="selectAddress"
          :shipping-zip-code="shippingZipCode"
          :shipping-service.sync="shippingService"
          :payment-gateway.sync="paymentGateway"
          :discount-coupon.sync="discountCoupon"
          :notes.sync="notes"
          @set-discount-rule="setDiscountRule"
          @checkout="checkout"
        />
      </div>
      <div
        v-if="isLpCheckout"
        class="col-lg-4"
      >
        <div ref="product"></div>
      </div>
    </div>
    <div v-if="isLpCheckout">
      <div ref="description"></div>
    </div>
  </div>
</template>

<script src="./js/Checkout.js"></script>
