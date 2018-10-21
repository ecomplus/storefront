<template>
  <div class="_addresses">
    <el-form ref="form" :model="form" :rules="rules" class="_account-form">
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addRule, checkMask } from '@/lib/utils'

export default {
  name: 'AddressList',

  data () {
    // setup form validation rules
    let rules = {}
    // handle required form fields
    ;[ 'zip', 'province_code', 'city', 'borough', 'street', 'number' ].forEach((label) => {
      addRule(label, { required: true, message: this.$t('validate.required') }, rules)
    })
    // handle marked inputs validation
    ;[ 'zip' ].forEach((label) => {
      addRule(label, { validator: checkMask, trigger: 'blur' }, rules)
    })
    // handle type number validation
    ;[ 'number' ].forEach((label) => {
      addRule(label, { type: 'number', message: this.$t('validate.number'), trigger: 'blur' }, rules)
    })

    return {
      newAddress: false,
      form: {
      },
      rules: rules
    }
  },

  computed: mapGetters([
    'customer'
  ]),

  created () {
    if (!this.customer.addresses.length) {
      // start creating the first address
      this.newAddress = true
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
