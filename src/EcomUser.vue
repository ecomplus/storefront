<template>
  <div class="ecom-user">
    <div class="btn-group">
      <slot
        name="button"
        :isLogged="isLogged"
        :displayName="name"
        :toggleMenu="toggle">
        <button
          type="button"
          class="ecom-user__button btn btn-lg btn-light dropdown-toggle"
          @click="toggle"
          :title="dictionary('my_account')">
          <span class="ecom-user__button-icon">
            <i class="fas fa-user"></i>
          </span>
        </button>
      </slot>

      <div
        class="ecom-user__menu dropdown-menu"
        :class="{ 'show': showMenu, 'dropdown-menu-right': menuRightAlignment }">
        <h6 class="dropdown-header">
          {{ greetings }}
        </h6>
        <a class="dropdown-item" :href="ordersUrl">
          {{ dictionary('my_orders') }}
        </a>
        <a class="dropdown-item" :href="accountUrl">
          {{ dictionary('my_account') }}
        </a>
        <a
          class="ecom-user__logout dropdown-item text-danger"
          href="javascript:;"
          @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          {{ dictionary('logout') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./EcomUser.js"></script>
<!-- <style lang="scss" src="./EcomUser.scss"></style> -->
