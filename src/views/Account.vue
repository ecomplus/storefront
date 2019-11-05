<template>
  <div id="account">
    <ec-account
      :ecomPassport="ecomPassport"
      :customer.sync="customer"
      @login="login"
      @logout="resetAccount"
    />
  </div>
</template>

<script src="./js/Account.js"></script>
