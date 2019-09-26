<template>
  <div id="checkout">
    <ec-checkout
      @login="login"
      :customerEmail.sync="customerEmail"
    />
  </div>
</template>

<script src="./js/Checkout.js"></script>
