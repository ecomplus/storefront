<template>
  <div id="account">
    <ec-account
      :ecomPassport="ecomPassport"
      :customer.sync="customer"
      :showOrders.sync="showOrders"
      @login="login"
      @logout="resetAccount"
      @click:order="viewOrder"
    />
  </div>
</template>

<script src="./js/Account.js"></script>
