<template>
  <el-form ref="form" :model="form" :rules="rules" class="_account-form" label-width="140px">
    <el-form-item :label="$t('account.fullName')" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.email')">
      <el-input :value="customer.main_email" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.nickname')" prop="nickname">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item size="large">
      <el-button type="primary" @click="submitForm">Create</el-button>
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
        name: this.$store.getters.customerName,
        nickname: this.$store.getters.customer.display_name
      },
      rules: {
        name: [
          { required: true, message: this.$t('validate.required') }
        ],
        nickname: [
          { required: true, message: this.$t('validate.required') }
        ]
      }
    }
  },
  computed: mapGetters([
    'customer'
  ]),
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._account-form {
  max-width: 700px;
  margin: 0 auto;
}
</style>
