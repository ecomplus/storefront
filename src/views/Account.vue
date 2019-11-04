<template>
  <div id="account">
    <ec-account
      @login="login"
      @logout="resetCustomer"
      :customer.sync="customer"
    />
  </div>
</template>

<script src="./js/Account.js"></script>
