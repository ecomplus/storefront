<template>
  <div class="_topbar">
    <div class="_topbar-info hidden-xs-only">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <div class="_user">
            <el-tag type="info">Olá visitante</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
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
    <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" class="_logo" />
    <h1 v-else class="_title">
      {{ shop.name }}
    </h1>
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

._topbar-info {
  float: right;
  text-align: right;
  line-height: 1;
  font-size: 14px;
  margin-top: 5px;
  width: 450px;
  max-width: 70%;
}
._info-email {
  color: $--color-text-secondary;
}
._info-secure {
  height: 30px;
  font-size: 16px;
  color: $--color-success;
}
._info-secure > i {
  margin-left: 5px;
  font-size: 20px;
}
</style>
