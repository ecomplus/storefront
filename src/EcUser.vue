<template>
  <div class="ec-user">
    <slot name="button">
      <button
        type="button"
        id="ec-user-popover"
        class="btn btn-lg btn-light"
        :title="dictionary('my_account')"
      >
        <i class="fas fa-user"></i>
      </button>
    </slot>
    <b-popover
      target="ec-user-popover"
      triggers="click blur"
      :placement="popoverPlacement"
    >
      <template slot="title">
        {{ greetings }}
      </template>
      <template v-if="isLogged">
      </template>
      <template v-else>
      </template>
    </b-popover>
  </div>
</template>

<script src="./EcUser.js"></script>
<style lang="scss" src="./EcUser.scss"></style>
