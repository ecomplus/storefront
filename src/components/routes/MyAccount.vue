<template>
  <div class="_account">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyAccount',
  computed: mapGetters([
    'customer'
  ]),
  methods: {
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
