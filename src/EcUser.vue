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

      <div class="ec-user__popover">
        <template v-if="isLogged">
          <div class="list-group list-group-flush">
            <a
              :href="ordersUrl"
              class="list-group-item list-group-item-action"
            >
              {{ dictionary('my_orders') }}
            </a>
            <a
              :href="accountUrl"
              class="list-group-item list-group-item-action"
            >
              {{ dictionary('my_account') }}
            </a>
          </div>

          <button
            class="btn btn-block btn-danger ec-user__logout"
            type="button"
            @click="() => logout()"
          >
            <i class="fas fa-sign-out-alt"></i>
            {{ dictionary('logout') }}
          </button>
        </template>

        <template v-else>
          <button
            v-for="({ link, faIcon, providerName, provider }) in oauthProviders"
            type="button"
            class="btn btn-block ec-user__btn"
            :key="provider"
            :class="`ec-user__btn--${provider}`"
            @click="() => oauthPopup(link, provider)"
          >
            <span class="ec-user__btn__icon">
              <i class="fab" :class="faIcon"></i>
            </span>
            {{ dictionary('sign_in_with') + ' ' + providerName }}
          </button>

          <button
            type="button"
            class="btn btn-block btn-secondary ec-user__btn"
            key="email"
            @click="() => emailLogin(link, provider)"
          >
            <span class="ec-user__btn__icon">
              <i class="fas fa-envelope"></i>
            </span>
            {{  dictionary('sign_in_with') + ' ' + dictionary('email') }}
          </button>
        </template>
      </div>
    </b-popover>
  </div>
</template>

<script src="./EcUser.js"></script>
<style lang="scss" src="./EcUser.scss"></style>
