<template>
  <div class="_account">
    <div v-if="customer._id" class="_account-logged">
      <h1 class="_account-title">
        {{ $t('session.hi') + ' ' + customer.display_name }}
        <small>
          {{ $t('session.isNotYou') + '?' }}
          <a href="javascript:;" @click="logout" class="_account-logout">
            {{ $t('session.logout') }}
          </a>
        </small>
      </h1>

      <el-tabs class="_account-tabs">
        <el-tab-pane :label="$t('account.registration')"></el-tab-pane>
        <el-tab-pane :label="$t('account.addresses')"></el-tab-pane>
        <el-tab-pane :label="$t('account.orders')"></el-tab-pane>
      </el-tabs>

      <router-view></router-view>
    </div>

    <div v-else class="_account-unlogged">
      <h1 class="_account-title">
        {{ $t('session.account') }}
        <small>{{ $t('account.unloggedMsg') }}</small>
      </h1>
      <el-button type="primary" @click="login" class="_account-login">
        {{ $t('session.identify') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'MyAccount',

  computed: mapGetters([
    'customer'
  ]),

  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapMutations([
      'logout'
    ])
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';

._account-logout {
  color: $--color-danger;
}
._account-tabs {
  margin-bottom: 30px;
}
</style>
