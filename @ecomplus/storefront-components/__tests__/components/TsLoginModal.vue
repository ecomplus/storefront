<template>
  <div class="container p-4">
    <login-modal/>
  </div>
</template>

<script>
  import LoginModal from '@ecomplus/storefront-components/src/LoginModal.vue'

  export default {
    name: 'TsLoginModal',

    components: {
      LoginModal
    }
  }
</script>
