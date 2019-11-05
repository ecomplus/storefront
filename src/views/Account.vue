<template>
  <div id="account">
    <ec-account
      :ecomPassport="ecomPassport"
      :customer.sync="customer"
      :showOrders.sync="showOrders"
      @login="login"
      @logout="resetAccount"
      @viewOrder="viewOrder"
    />
  </div>
</template>

<script src="./js/Account.js"></script>
