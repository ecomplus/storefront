<template>
  <el-row :gutter="20">
    <el-col :span="4">
      {{ shop.name }}
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
