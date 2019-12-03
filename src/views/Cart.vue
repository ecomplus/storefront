<template>
  <div id="cart">
    <ec-cart
      @shippingService="selectShippingService"
      :amount.sync="localAmount"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
