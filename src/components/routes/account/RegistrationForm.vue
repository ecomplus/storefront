<template>
  <el-form ref="form" :model="form" :rules="rules" class="_account-form">
    <el-form-item :label="$t('account.fullName')" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.email')">
      <el-input :value="customer.main_email" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.nickname')" prop="nickname">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item :label="$t('account.gender')">
      <el-radio-group v-model="form.gender">
        <el-radio border label="f">
          {{ $t('account.female') }}
        </el-radio>
        <el-radio border label="m">
          {{ $t('account.male') }}
        </el-radio>
        <el-radio border label="x">
          {{ $t('account.genderX') }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item :label="$t('account.birth')" prop="birth">
      <el-date-picker
        v-if="$lang === 'pt_br'"
        type="date"
        v-model="form.birth"
        placeholder="31/02/1994"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-date-picker
        v-else
        type="date"
        v-model="form.birth"
        placeholder="1994-02-31">
      </el-date-picker>
    </el-form-item>

    <el-form-item :label="$t('account.contactPhone')" prop="phone">
      <el-input v-model="form.phone" type="tel"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.cellphone')">
      <el-input v-model="form.cellphone" type="tel"></el-input>
    </el-form-item>

    <el-form-item :label="$t('account.registrationType')">
      <el-radio-group v-model="form.type">
        <el-radio border label="p">
          {{ $t('account.physical') }}
        </el-radio>
        <el-radio border label="j">
          {{ $t('account.juridical') }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('account.juridicalDoc')" prop="doc" v-if="form.type === 'j'">
      <el-input v-model="form.doc"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.physicalDoc')" prop="doc" v-else>
      <el-input v-model="form.doc"></el-input>
    </el-form-item>

    <el-form-item size="large">
      <el-button type="primary" @click="submitForm">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RegistrationForm',

  data () {
    // handle required form fields
    let rules = {}
    let required = [ 'name', 'nickname', 'phone', 'birth' ]
    for (let i = 0; i < required.length; i++) {
      let label = required[i]
      rules[label] = { required: true, message: this.$t('validate.required') }
    }
    return {
      form: {
        // declare form empty
        // further preset with computed values
      },
      rules: rules
    }
  },

  computed: mapGetters([
    'customerName',
    'customer'
  ]),

  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  created () {
    // update data with computed
    let body = this.customer
    this.form = {
      name: this.customerName,
      nickname: body.display_name,
      gender: body.gender,
      birth: null,
      // default is physical
      type: (body.registry_type || 'p')
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
