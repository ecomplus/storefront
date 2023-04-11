<template>
  <div id="checkout">
    <div class="row">
      <div
        v-if="isLpCheckout"
        class="col-lg-4"
        :class="cart.items.length ? null : 'offset-lg-4'"
      >
        <div ref="product"></div>
      </div>
      <div
        v-if="!isLpCheckout || cart.items.length"
        class="col"
      >
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
          :skip-shipping-apps="skipShippingApps"
          :payment-gateway.sync="paymentGateway"
          :discount-coupon.sync="discountCoupon"
          :notes.sync="notes"
          @set-discount-rule="setDiscountRule"
          @checkout="checkout"
        />
      </div>
    </div>
    <div v-if="isLpCheckout">
      <div ref="description"></div>
    </div>
  </div>
</template>

<script src="./js/Checkout.js"></script>
