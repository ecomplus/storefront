<template>
  <div class="_topbar">
    <el-row type="flex" align="middle">
      <el-col :span="14" :xs="19" class="_store">
        <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" class="_logo" />
        <h2 v-else class="_title">
          {{ shop.name }}
        </h2>
      </el-col>
      <el-col :span="10" :xs="5">
        <el-row type="flex" align="middle" justify="end">
          <div class="_user">
            <el-popover ref="popuser" placement="top-end" trigger="click">
              <div class="_user-popover">
                <p>
                  <span class="_user-hi">
                    {{ $t('session.hi') }}
                  </span>
                  <b class="_user-name">
                    {{ customer.display_name || $t('session.visitor') }}
                  </b>
                </p>
                <span v-if="customer._id" class="_user-logged">
                  <el-button size="mini" type="info" class="_user-account">
                    {{ $t('session.account') }}
                  </el-button>
                  <el-button size="mini" type="danger" @click="logout" class="_user-logout">
                    {{ $t('session.logout') }}
                  </el-button>
                </span>
                <span v-else class="_user-visitor">
                  <el-button size="mini" type="primary" @click="login" class="_user-login">
                    {{ $t('session.identify') }}
                  </el-button>
                </span>
              </div>
            </el-popover>
            <a-icon icon="user-circle" v-popover:popuser class="_user-icon"></a-icon>
          </div>
          <div class="_topbar-info hidden-xs-only">
            <el-tag type="success" class="_info-secure">
              {{ $t('info.secure') }}
              <a-icon icon="lock" class="_secure-icon"></a-icon>
            </el-tag>
            <div class="_info-email">
              {{ shop.contact_email }}
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'TopBar',
  computed: mapGetters([
    'shop',
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

._store {
  padding-right: 10px;
}
._logo {
  max-height: 70px;
}
._title {
  white-space: nowrap;
}
._user {
  text-align: right;
  position: relative;
  width: auto;
  background: $--fill-base;
}
._user-popover {
  text-align: center;
  min-width: 180px;
}
._user-icon {
  font-size: 30px;
  color: $--color-text-placeholder;
  transition: .1s;
  cursor: pointer;
}
._user-icon:hover {
  color: $--color-text-secondary;
}
._topbar-info {
  padding-left: 40px;
  text-align: right;
  line-height: 1;
  width: auto;
}
._info-email {
  font-size: $--font-size-small;
  color: $--color-text-secondary;
}
._info-secure {
  font-size: $--font-size-base;
  margin-bottom: 8px;
  color: $--color-success;
}
._secure-icon {
  margin-left: 5px;
}
</style>
