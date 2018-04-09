<template>
  <div class="_topbar">
    <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" class="_logo" />
    <h1 v-else class="_title">
      {{ shop.name }}
    </h1>
    <div class="_topbar-info">
      <div class="_info-mail">
        {{ shop.contact_email }}
      </div>
      <div class="_info-secure">
        <i class="el-icon-success"></i> {{ $t('info.secure') }}
      </div>
    </div>
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
