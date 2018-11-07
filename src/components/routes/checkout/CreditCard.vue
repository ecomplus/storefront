<template>
  <el-form ref="form" :model="form" :rules="rules" class="_creditcard __form-sm">
    <el-form-item :label="$t('card.number')" prop="number">
      <el-input
        type="tel"
        v-model="form.number"
        v-mask="cardMask"
        v-on-keyup="getBrand"></el-input>
    </el-form-item>
    <div class="_creditcard-icons">
      <i v-for="brand in brands" :class="[ brand, { active: activeBrand === brand }]"></i>
    </div>

    <el-form-item :label="$t('card.name')" prop="name">
      <el-input v-model="form.name" ref="name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('card.validate')" prop="validate">
      <el-input
        type="tel"
        v-model="form.validate"
        v-mask="'99 / 99'"
        placeholder="02 / 22"
        class="__input-sm"></el-input>
    </el-form-item>

    <el-form-item :label="$t('card.securityCode')" prop="cvv">
      <el-input
        type="tel"
        v-model="form.cvv"
        v-mask="'9{3,4}'"
        placeholder="123"
        class="__input-sm">
        <template slot="append">
          <el-popover
            placement="top"
            width="180"
            trigger="click">
            <el-button slot="reference">
              <a-icon icon="question-circle"></a-icon>
            </el-button>
            <div class="_creditcard-cvv-help" v-if="activeBrand === ''">
              {{ $t('card.cvvHelp') }}
            </div>
            <div class="_creditcard-cvv-help" v-else-if="activeBrand === 'american-express'">
              <p>{{ $t('card.cvvHelpAmex') }}</p>
              <div class="_creditcard-cvv-imgs"><div class="amex"></div></div>
            </div>
            <div class="_creditcard-cvv-help" v-else>
              <p>{{ $t('card.cvvHelpNonAmex') }}</p>
              <div class="_creditcard-cvv-imgs"><div class="non-amex"></div></div>
            </div>
          </el-popover>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item v-if="!skipHolderDoc" :label="$t('card.holderDoc')" prop="doc">
      <el-input
        v-model="form.doc"
        v-mask="$country !== 'br' ? '9{5,19}' : brDocMask"
        type="tel"
        class="__input-sm">
      </el-input>
    </el-form-item>

    <el-form-item size="mini">
      <el-checkbox v-model="sameAddress" class="_creditcard-same-address">
        {{ $t('card.sameAddress') }}
      </el-checkbox>
    </el-form-item>
    <el-collapse-transition>
      <address-form
        key="address-form"
        ref="address"
        v-if="!sameAddress"
        @submit-form="(data) => { submitForm(data) }"
        :noButton="true"
        :noRecipient="true"/>
    </el-collapse-transition>

    <el-form-item size="large">
      <el-button
        type="success"
        @click="() => { submitForm() }"
        class="_creditcard-pay __btn-block">
        <a-icon icon="lock" class="__icon-mr"></a-icon>
        {{ $t('card.checkout') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import AddressForm from '@/components/routes/account/AddressForm'
import cardValidator from 'card-validator'
import isValidCpf from '@brazilian-utils/is-valid-cpf'
import isValidCnpj from '@brazilian-utils/is-valid-cnpj'
import { addRule, checkMask } from '@/lib/utils'

export default {
  name: 'CreditCard',

  components: {
    AddressForm
  },

  props: [
    'checkHolder',
    'holderDoc',
    'skipHolderDoc'
  ],

  data () {
    // setup form validation rules
    let rules = {}
    // handle required form fields
    ;[ 'number', 'name', 'validate', 'cvv', 'doc' ].forEach((label) => {
      addRule(label, { required: true, message: this.$t('validate.required') }, rules)
    })
    // min field length for holder name
    addRule('name', { min: 3, message: this.$t('card.fullNameAlert'), trigger: 'blur' }, rules)
    if (!this.skipHolderDoc) {
      // validate document number mask
      addRule('doc', { validator: checkMask(this.$t('validate.mask')), trigger: 'blur' }, rules)
    }

    // mark if card number is trusted validated
    addRule('number', {
      validator: (rule, value, cb) => {
        if (this.validatedNumber) {
          // card number confirmed as valid
          cb()
        }
      }
    }, rules)

    // check date format and expiration
    addRule('validate', {
      validator: (rule, value, cb) => {
        if (cardValidator.expirationDate(value).isValid) {
          // date valid and not expired
          cb()
        } else {
          let [ month, year ]  = value.split(' / ')
          if (!cardValidator.expirationMonth(month).isValid) {
            cb(new Error(this.$t('card.invalidMonth')))
          } else if (!cardValidator.expirationYear(year).isValid) {
            cb(new Error(this.$t('card.invalidYear')))
          } else {
            // month past on current year
            cb(new Error(this.$t('card.monthPast')))
          }
        }
      },
      trigger: 'blur'
    }, rules)

    // validate CVV or CID code
    addRule('cvv', {
      validator: (rule, value, cb) => {
        // need card brand to validate CVV
        if (this.activeBrand !== '') {
          if (this.activeBrand !== 'american-express') {
            if (cardValidator.cvv(value).isValid) {
              // valid 3 digits CVV
              cb()
            } else {
              cb(new Error(this.$t('card.cvvInvalidNonAmex')))
            }
          } else if (cardValidator.cvv(value, 4).isValid) {
            // valid Amex CID with 4 digits
            cb()
          } else {
            cb(new Error(this.$t('card.cvvInvalidAmex')))
          }
        } else if (value.replace(/\D/g, '').length < 3) {
          // code always invalid for any card brand
          cb(new Error(this.$t('card.cvvInvalid')))
        }
      },
      trigger: 'blur'
    }, rules)

    return {
      brands: [
        'visa',
        'mastercard',
        'american-express',
        'elo',
        'diners-club',
        'hiper',
        'hipercard'
      ],
      activeBrand: '',
      validatedNumber: false,
      form: {
        number: '',
        name: '',
        validate: '',
        cvv: '',
        doc: ''
      },
      rules,
      sameAddress: true,

      cardMask: {
        mask: [
          // array of cc number formats
          // https://baymard.com/checkout-usability/credit-card-patterns
          // Most common format and non Amex
          'G9{3} 9{4} 9{4} 9{4}',
          // American Express
          '3A9{2} 9{6} 9{5}',
          // Dinners
          '3D9{2} 9{6} 9{4}',
          // general matching from 12 to 19 digits
          '9{4} 9{4} 9{4}[ 9{1,4}][ 9{1,3}]'
        ],
        definitions: {
          'G': { validator: '[124-9]' },
          '3': { validator: '[3]' },
          'A': { validator: '[47]' },
          'D': { validator: '[0689]' }
        }
      },

      brDocMask: [
        // personal doc
        '999.999.999-99',
        // business doc
        '99.999.999/9999-99'
      ]
    }
  },

  methods: {
    getBrand () {
      // preset invalid
      this.validatedNumber = false
      // get card brand from number
      let valid = cardValidator.number(this.form.number.replace(/\D/g, ''))
      if (valid.isPotentiallyValid && valid.card) {
        let brand = valid.card.type
        if (this.activeBrand !== brand) {
          // brand changed
          this.activeBrand = brand
          if (this.form.cvv !== '') {
            // must revalidate CVV
            this.$refs.form.validateField('cvv')
          }
        }
        if (valid.isValid) {
          this.validatedNumber = true
        }
      } else {
        // unset last active brand
        this.activeBrand = ''
      }
    },

    submitForm (address) {
      if (!this.sameAddress && (!address || !address.zip)) {
        // submit address form first and wait for address data
        this.$refs.address.submitForm()
      } else {
        this.$refs.form.validate((valid) => {
          let notify
          if (valid) {
            // validated from form rules
            let data = this.form
            // check document number
            if (data.doc.length !== 18) {
              if (!isValidCnpj(data.doc)) {
                // invalid business document
                notify = this.$t('account.businessDoc')
              }
            } else if (!isValidCpf(data.doc)) {
              // invalid personal document number
              notify = this.$t('account.personalDoc')
            }

            if (!notify) {
              // check credit card number
              let valid = cardValidator.number(data.number)
              if (valid.isValid) {
                // handle submit
                this.$emit('submit-form', data)
                return
              } else if (valid.isPotentiallyValid) {
                // not sure
              } else {
                // invalid card number
                notify = this.$t('card.number')
              }
            }
          }

          if (notify) {
            // complete notification message
            notify += this.$t('validate.isInvalid')
          }
          // show notification
          this.$message({
            showClose: true,
            message: notify || this.$t('card.invalidForm'),
            type: 'warning'
          })
        })
      }
    }
  },

  mounted () {
    if (this.holderDoc && !this.skipHolderDoc) {
      // preset holder document number
      let data = this.form
      if (this.checkHolder) {
        this.$refs.name.handleChange = () => {
          // compare first name
          let name = data.name.replace(/(\s.*)/, '')
          if (name.localeCompare(this.checkHolder, 'en', { sensitivity: 'base' }) === 0) {
            // holder name matched
            data.doc = this.holderDoc
          } else if (data.doc = this.holderDoc) {
            // reset doc field
            data.doc = ''
          }
        }
      } else {
        data.doc = this.holderDoc
      }
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._creditcard {
  max-width: 550px;
}
._creditcard-icons {
  margin: -$--card-padding * .25 auto $--card-padding auto;
  text-align: center;
}
._creditcard-icons i {
  width: 40px;
  height: 25px;
  background-image: url('../../../../static/payments.png');
  background-repeat: no-repeat;
  display: inline-block;
  margin: 3px 3px 0 0;
  transition: $--fade-linear-transition;
  opacity: .4;
}
._creditcard-icons i.active {
  opacity: 1;
}
._creditcard-icons .visa {
  background-position: 0 0;
}
._creditcard-icons .mastercard {
  background-position: 0 -50px;
}
._creditcard-icons .hipercard {
  background-position: 0 -125px;
}
._creditcard-icons .hiper {
  background-position: 0 -150px;
}
._creditcard-icons .elo {
  background-position: 0 -175px;
}
._creditcard-icons .diners-club {
  background-position: 0 -200px;
}
._creditcard-icons .american-express {
  background-position: 0 -375px;
}
._creditcard-cvv-help {
  text-align: left;
}
._creditcard-cvv-imgs div {
  width: 150px;
  height: 93px;
  background-image: url('../../../../static/cvv.png');
  background-repeat: no-repeat;
  display: block;
  margin: 0 auto;
}
._creditcard-cvv-imgs .non-amex {
  background-position: 0 0;
}
._creditcard-cvv-imgs .amex {
  background-position: 0 -93px;
}
._creditcard-same-address {
  white-space: normal;
}
</style>
