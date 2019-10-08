<template>
  <div id="checkout">
    <ec-checkout
      :checkoutStep.sync="checkoutStep"
      @login="login"
      :customer.sync="customer"
      @addressSelected="selectAddress"
      :shippingZipCode="shippingZipCode"
      @shippingService="selectShippingService"
      :amount="amount"
      @checkout="checkout"
    />
  </div>
</template>

<script src="./js/Checkout.js"></script>
