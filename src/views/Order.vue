<template>
  <div id="account">
    <ec-account
      @login="login"
      @logout="resetCustomer"
      :customer.sync="customer"
      :ecomPassport="ecomPassport"
    />
  </div>
</template>
<script src="./js/Order.js"></script>
