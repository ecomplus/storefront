<template>
  <div id="account">
    <ec-account
      :ecomPassport="ecomPassport"
      :customer.sync="customer"
      @login="login"
      @logout="resetAccount"
      :showOrders.sync="showOrders"
    />
  </div>
</template>

<script src="./js/Account.js"></script>
