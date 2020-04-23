<template>
  <div id="account">
    <the-account
      :ecom-passport="ecomPassport"
      :customer.sync="customer"
      :is-orders-list.sync="isOrdersList"
      @login="login"
      @logout="resetAccount"
    >
      <template #account-form>
        <ec-account-form :customer.sync="customer"/>
      </template>
      <template #account-addresses>
        <ec-addresses :customer.sync="customer"/>
      </template>
      <template #orders-list>
        <ec-orders-list
          :ecom-passport="ecomPassport"
          @click:order="viewOrder"
        />
      </template>
    </the-account>
  </div>
</template>

<script src="./js/Account.js"></script>
