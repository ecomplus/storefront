<template>
  <el-form ref="form" :model="form" :rules="rules" class="_credit-card __form-sm">
    <el-form-item :label="$t('card.number')" prop="number">
      <el-input v-model="form.number" v-mask="cardMask"></el-input>
    </el-form-item>

    <el-form-item :label="$t('card.validate')" prop="validate">
      <el-input
        v-model="form.validate"
        v-mask="'99 / 99'"
        placeholder="02 / 22"
        class="__input-sm"></el-input>
    </el-form-item>

    <el-form-item :label="$t('card.name')" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('card.securityCode')" prop="cvv">
      <el-input v-model="form.cvv" v-mask="'9{3,4}'" placeholder="123"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CreditCard',

  data () {
    // setup form validation rules
    let rules = {}

    return {
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
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._credit-card {
  max-width: 550px;
}
</style>
