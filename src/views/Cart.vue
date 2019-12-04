<template>
  <div id="cart">
    <ec-cart
      @shippingService="selectShippingService"
      :amount="amount"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
