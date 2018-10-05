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
      <el-input v-model="form.phone" type="tel" v-mask="phoneMask"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.cellphone')" prop="cellphone">
      <el-input v-model="form.cellphone" type="tel" v-mask="phoneMask"></el-input>
    </el-form-item>

    <el-form-item :label="$t('account.registrationType')">
      <el-radio-group v-model="form.type">
        <el-radio border label="p">
          {{ $t('account.personalRegistry') }}
        </el-radio>
        <el-radio border label="j">
          {{ $t('account.businessRegistry') }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('account.businessDoc')" prop="doc" v-show="form.type === 'j'">
      <el-input
        v-model="form.doc"
        v-mask="$lang !== 'pt_br' ? '9{5,19}' : '99.999.999/9999-99'"
        type="tel">
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('account.personalDoc')" prop="doc" v-show="form.type !== 'j'">
      <el-input
        v-model="form.doc"
        v-mask="$lang !== 'pt_br' ? '9{5,19}' : '999.999.999-99'"
        type="tel">
      </el-input>
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

  data () {
    // setup form validation rules
    let rules = {}
    let addRule = (label, rule) => {
      if (!rules.hasOwnProperty(label)) {
        // preset array
        rules[label] = []
      }
      rules[label].push(rule)
    }
    // custom validation for masked inputs
    let checkMask = (rule, value, cb) => {
      if (value.indexOf('_') === -1) {
        // mask matched
        cb()
      } else {
        cb(new Error(this.$t('validate.mask')))
      }
    }
    // handle required form fields
    ;[ 'name', 'nickname', 'phone', 'birth', 'doc' ].forEach((label) => {
      addRule(label, { required: true, message: this.$t('validate.required') })
    })
    // handle marked inputs validation
    ;[ 'phone', 'cellphone', 'doc' ].forEach((label) => {
      addRule(label, { validator: checkMask, trigger: 'blur' })
    })
    // handle min fields length
    ;[ 'name', 'nickname' ].forEach((label) => {
      addRule(label, { min: 3, message: this.$t('validate.minLength'), trigger: 'blur' })
    })
    return {
      form: {
        // declare form empty
        // further preset with computed values
      },
      rules: rules,
      phoneMask: [
        // array of phone number formats
        '(99) 9999-9999',
        '(99) 9 9999-9999',
        // generic for international phone numbers
        '+99[9] 99999[9{1,10}]'
      ]
    }
  },

  computed: mapGetters([
    'customer',
    'customerName',
    'parseCustomerName',
    'customerBirth',
    'parseCustomerBirth',
    'customerPhones',
    'parseCustomerPhones'
  ]),

  methods: {
    ...mapActions([
      'editCustomer'
    ]),
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // valid form data
          let data = this.form
          // update customer
          this.editCustomer({
            ...this.parseCustomerName(data.name),
            display_name: data.nickname,
            gender: data.gender,
            ...this.parseCustomerBirth(data.birth),
            ...this.parseCustomerPhones([ data.phone, data.cellphone ]),
            registry_type: data.type,
            doc_number: data.doc.replace(/[\D]/g, '')
          })
        } else {
          return false
        }
      })
    }
  },

  created () {
    // update data with computed
    let body = this.customer
    let phones = this.customerPhones
    this.form = {
      name: this.customerName,
      nickname: body.display_name,
      gender: body.gender,
      phone: phones[0],
      // optional last phone number
      cellphone: phones.length > 1 ? phones[phones.length - 1] : '',
      birth: this.customerBirth,
      // default is physical
      type: body.registry_type,
      doc: this.customer.doc_number
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._account-form {
  max-width: 710px;
  margin: 0 auto;
}
</style>
