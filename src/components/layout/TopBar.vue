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
                <p>Olá <b>visitante</b></p>
                <el-button size="mini" type="primary" @click="">
                  Identifique-se
                </el-button>
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
import { mapGetters } from 'vuex'

export default {
  name: 'TopBar',
  computed: mapGetters([
    'shop'
  ])
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
  text-align: right;
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
