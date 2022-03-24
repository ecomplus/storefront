<template>
  <div id="account">
    <the-account
      :ecom-passport="ecomPassport"
      :customer.sync="customer"
      :current-tab.sync="currentTab"
      @login="login"
      @logout="resetAccount"
    >
      <template #account-form>
        <account-form :customer.sync="customer"/>
      </template>
      <template #account-addresses>
        <account-addresses :customer.sync="customer"/>
      </template>
      <template #account-points>
        <account-points :customer.sync="customer"/>
      </template>
      <template #orders-list>
        <ec-orders-list
          :ecom-passport="ecomPassport"
          @click:order="viewOrder"
        />
      </template>
      <template #recurrent-orders-list>
        <ec-orders-list
          :ecom-passport="ecomPassport"
          @click:order="viewOrder"
          :orders-list-filter="'transactions.type=recurrence'"
        />
      </template>
    </the-account>
  </div>
</template>

<script src="./js/Account.js"></script>
