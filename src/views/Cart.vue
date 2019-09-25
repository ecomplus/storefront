<template>
  <div id="cart">
    <ec-cart
      @serviceSelected="selectShippingService"
      :totalValue="totalValue"
    />
  </div>
</template>

<script src="./js/Cart.js"></script>
