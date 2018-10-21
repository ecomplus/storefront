<template>
  <div class="_addresses">
    {{ $t('account.addresses') }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddressList',

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
</style>
