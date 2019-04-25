<template>
  <div class="ecom-user">
    <div class="btn-group">
      <slot
        name="button"
        v-bind:logged="isLogged"
        v-bind:name="name"
        v-bind:toggle="toggle">
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
          {{ dictionary('my_account') }}
        </h6>
        <span class="dropdown-item-text">
          {{ greetings }}
        </span>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a
          class="ecom-user__logout dropdown-item text-danger"
          href="javascript:;"
          @click="logout">
          {{ dictionary('logout') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./EcomUser.js"></script>
<!-- <style lang="scss" src="./EcomUser.scss"></style> -->
