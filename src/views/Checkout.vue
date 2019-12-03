<template>
  <div id="checkout">
    <ec-checkout
      :checkoutStep.sync="checkoutStep"
      @login="login"
      :customer.sync="customer"
      @addressSelected="selectAddress"
      :shippingZipCode="shippingZipCode"
      :shippingService.sync="shippingService"
      :paymentGateway.sync="paymentGateway"
      :amount.sync="localAmount"
      @checkout="checkout"
    />
  </div>
</template>

<script src="./js/Checkout.js"></script>
