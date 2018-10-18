<template>
  <div class="_topbar">
    <el-row type="flex" align="middle">
      <el-col :sm="14" :xs="17" class="_store">
        <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" class="_logo" />
        <h2 v-else class="_title">
          {{ shop.name }}
        </h2>
      </el-col>

      <el-col :sm="10" :xs="7">
        <el-row type="flex" align="middle" justify="end">
          <router-link :to="{ name: 'cart' }">
            <a-icon icon="shopping-bag" class="_cart-icon"></a-icon>
          </router-link>

          <div class="_user">
            <el-popover ref="popuser" width="180" placement="bottom-end" trigger="click">
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
                  <div>
                    <router-link :to="{ name: 'account' }">
                      <el-button size="mini" class="_user-account">
                        {{ $t('session.account') }}
                      </el-button>
                    </router-link>
                  </div>
                  <div>
                    <router-link :to="{ name: 'orders' }">
                      <el-button size="mini" class="_user-orders">
                        {{ $t('session.orders') }}
                      </el-button>
                    </router-link>
                  </div>
                  <a href="javascript:;" @click="logout" class="_user-logout">
                    {{ $t('session.isNotYou') + '? ' + $t('session.logout') }}
                  </a>
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
  margin-left: 20px;
  text-align: right;
  position: relative;
  width: auto;
  background: $--fill-base;
}
._user-popover {
  text-align: center;
}
._user-popover button {
  display: block;
  width: 100%;
}
._user-logged button {
  margin-bottom: 10px;
}
._user-logout {
  display: block;
  color: $--color-danger;
  font-size: $--font-size-small;
}
._cart-icon,
._user-icon {
  font-size: 30px;
  -webkit-transition: $--color-transition-base;
  transition: $--color-transition-base;
  cursor: pointer;
}
._cart-icon {
  color: $--color-primary-light-5;
}
._cart-icon:hover {
  color: $--color-primary-light-3;
}
._user-icon {
  color: $--color-text-placeholder;
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
