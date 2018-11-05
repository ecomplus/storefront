<template>
  <el-form ref="form" :model="form" :rules="rules" class="_creditcard __form-sm">
    <el-form-item :label="$t('card.number')" prop="number">
      <el-input v-model="form.number" v-mask="cardMask" v-on-keyup="getBrand"></el-input>
    </el-form-item>
    <div class="_creditcard-icons">
      <i v-for="brand in brands" :class="[ brand, { active: activeBrand === brand }]"></i>
    </div>

    <el-form-item :label="$t('card.name')" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('card.validate')" prop="validate">
      <el-input
        v-model="form.validate"
        v-mask="'99 / 99'"
        placeholder="02 / 22"
        class="__input-sm"></el-input>
    </el-form-item>

    <el-form-item :label="$t('card.securityCode')" prop="cvv">
      <el-input v-model="form.cvv" v-mask="'9{3,4}'" placeholder="123" class="__input-sm">
        <template slot="append">
          <el-popover
            placement="top"
            width="200"
            trigger="click">
            <el-button slot="reference">
              <a-icon icon="question-circle"></a-icon>
            </el-button>
            <div class="_creditcard-cvv-help">
              <p>{{ $t('card.cvvHelp') }}</p>
              <img src="../../../../static/cvv.png"/>
            </div>
          </el-popover>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import cardValidator from 'card-validator'

export default {
  name: 'CreditCard',

  data () {
    // setup form validation rules
    let rules = {}

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
      form: {
        number: '',
        name: '',
        validate: ''
      },
      rules,
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
      }
    }
  },

  methods: {
    getBrand () {
      // get card brand from number
      let valid = cardValidator.number(this.form.number.replace(/\D/g, ''))
      if (valid.isPotentiallyValid && valid.card) {
        this.activeBrand = valid.card.type
      } else {
        // unset last active brand
        this.activeBrand = ''
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
  margin: -$--card-padding * .75 auto $--card-padding * .75 auto;
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
</style>
