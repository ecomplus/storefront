<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="_account-form">
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RegistrationForm',
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
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._account-form {
  max-width: 700px;
  margin: 30px auto 0 auto;
}
</style>
