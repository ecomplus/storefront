<template>
  <div class="_account">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyAccount',
  data() {
    return {
      form: {
      },
      rules: {
      }
    }
  },
  computed: mapGetters([
    'customer'
  ]),
  methods: {
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
