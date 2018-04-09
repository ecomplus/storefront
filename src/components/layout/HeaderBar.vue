<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" />
      <h1 v-else>
        {{ shop.name }}
      </h1>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderBar',
  computed: mapGetters([
    'shop'
  ])
}
</script>
