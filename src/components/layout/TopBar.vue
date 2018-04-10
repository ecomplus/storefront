<template>
  <div class="_topbar">
    <el-row type="flex" align="middle">
      <el-col :span="14" :xs="21" class="_store">
        <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" class="_logo" />
        <h1 v-else class="_title">
          {{ shop.name }}
        </h1>
      </el-col>
      <el-col :span="5" class="_user">
        <el-tag type="info">Olá visitante</el-tag>
      </el-col>
      <el-col :span="5" class="_topbar-info hidden-xs-only">
        <div class="_info-secure">
          {{ $t('info.secure') }}
          <i class="el-icon-success"></i>
        </div>
        <div class="_info-email">
          {{ shop.contact_email }}
        </div>
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

._logo {
  max-height: 70px;
}
._user {
  text-align: right;
}
._topbar-info {
  text-align: right;
  line-height: 1;
  max-width: 70%;
}
._info-email {
  color: $--color-text-secondary;
}
._info-secure {
  font-size: 16px;
  margin-bottom: 10px;
  color: $--color-success;
}
._info-secure > i {
  margin-left: 5px;
}
</style>
