<template>
  <div id="cart">
    <ec-cart
      @shippingService="selectShippingService"
      :totalValue="totalValue"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
