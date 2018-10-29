<template>
  <el-form ref="form" :model="form" :rules="rules" class="_account-form __form-sm">
    <el-form-item :label="$t('account.fullName')" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('account.email')" prop="email">
      <el-input v-if="isCustomerLogged" :value="form.email" :disabled="true"></el-input>
      <el-input v-else v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item v-if="!short" :label="$t('account.nickname')" prop="nickname">
      <el-input v-model="form.nickname" class="__input-sm"></el-input>
    </el-form-item>

    <el-form-item v-if="!short" :label="$t('account.gender')">
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

    <el-form-item v-if="!short" :label="$t('account.birth')" prop="birth">
      <el-date-picker
        v-if="$country === 'br'"
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
      <el-input v-model="form.phone" type="tel" v-mask="phoneMask" class="__input-sm"></el-input>
    </el-form-item>
    <el-form-item v-if="!short" :label="$t('account.cellphone')" prop="cellphone">
      <el-input v-model="form.cellphone" type="tel" v-mask="phoneMask" class="__input-sm"></el-input>
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
        v-mask="$country !== 'br' ? '9{5,19}' : '99.999.999/9999-99'"
        type="tel"
        class="__input-sm">
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('account.personalDoc')" prop="doc" v-show="form.type !== 'j'">
      <el-input
        v-model="form.doc"
        v-mask="$country !== 'br' ? '9{5,19}' : '999.999.999-99'"
        type="tel"
        class="__input-sm">
      </el-input>
    </el-form-item>

    <el-form-item size="large">
      <el-button type="primary" @click="submitForm">
        <a-icon icon="check" class="__icon-mr"></a-icon>
        {{ buttonText || $t('general.save') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addRule, checkMask } from '@/lib/utils'
import isValidCpf from '@brazilian-utils/is-valid-cpf'
import isValidCnpj from '@brazilian-utils/is-valid-cnpj'

export default {
  name: 'RegistrationForm',

  props: [
    'short',
    'buttonText',
    'skipNotify'
  ],

  data () {
    // setup form validation rules
    let rules = {}
    // handle required form fields
    ;[ 'name', 'email', 'phone', 'doc' ].forEach((label) => {
      addRule(label, { required: true, message: this.$t('validate.required') }, rules)
    })
    // handle marked inputs validation
    ;[ 'phone', 'cellphone', 'doc' ].forEach((label) => {
      addRule(label, { validator: checkMask(this.$t('validate.mask')), trigger: 'blur' }, rules)
    })
    // handle min fields length
    ;[ 'name', 'nickname' ].forEach((label) => {
      addRule(label, { min: 3, message: this.$t('validate.minLength'), trigger: 'blur' }, rules)
    })

    return {
      form: {
        // declare form empty
        // further preset with computed values
      },
      rules,
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
    'isCustomerLogged',
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

    setupFormData () {
      // update data with computed
      let body = this.customer
      let phones = this.customerPhones
      this.form = {
        email: body.main_email,
        name: this.customerName,
        nickname: body.display_name || '',
        gender: body.gender,
        phone: phones[0],
        // optional last phone number
        cellphone: phones.length > 1 ? phones[phones.length - 1] : '',
        birth: this.customerBirth,
        // default is physical
        type: body.registry_type || 'p',
        doc: this.customer.doc_number
      }
    },

    submitForm () {
      this.$refs.form.validate((valid) => {
        let data = this.form
        let notify
        // check customer document number
        if (this.$country === 'br') {
          if (data.type !== 'j') {
            // personal registry
            if (!isValidCpf(data.doc)) {
              // invalid personal document number
              notify = this.$t('account.personalDoc')
              valid = false
            }
          } else if (!isValidCnpj(data.doc)) {
            // invalid business document
            notify = this.$t('account.businessDoc')
            valid = false
          }
        }
        if (notify) {
          // complete notification message
          notify += this.$t('validate.isInvalid')
        }

        if (valid) {
          // valid form data
          // update customer
          let body = {
            ...this.parseCustomerName(data.name),
            display_name: data.nickname.trim(),
            main_email: data.email,
            gender: data.gender,
            ...this.parseCustomerBirth(data.birth),
            ...this.parseCustomerPhones([ data.phone, data.cellphone ]),
            registry_type: data.type,
            doc_number: data.doc.replace(/[\D]/g, '')
          }
          if (body.display_name === '') {
            // set nickname with customer first name
            body.display_name = body.name.given_name
          }

          // update customer and notify confirmation
          this.editCustomer(body).then(() => {
            if (!this.skipNotify) {
              this.$message({
                showClose: true,
                message: this.$t('general.success'),
                type: 'success'
              })
            }
          })
        } else {
          // show notification
          this.$message({
            showClose: true,
            message: (notify || this.$t('validate.invalidForm')),
            type: 'warning'
          })
          return false
        }
      })
    }
  },

  created () {
    // setup form on component ready
    this.setupFormData()
  },

  watch: {
    isCustomerLogged () {
      // login or logout done
      // update form data
      this.setupFormData()
    }
  }
}
</script>
