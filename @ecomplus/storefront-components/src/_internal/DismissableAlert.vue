<template>
  <transition enter-active-class="animated fadeInDown fast">
    <div v-if="canShow">
      <div
        class="alert alert-dismissible fade show"
        :class="`alert-${variant}`"
        role="alert"
        v-once
      >
        <slot/>
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          :aria-label="i19close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { i19close } from '@ecomplus/i18n'
  import { i18n } from '@ecomplus/utils'

  export default {
    name: 'DismissableAlert',

    props: {
      canShow: {
        type: Boolean,
        default: true
      },
      variant: {
        type: String,
        default: 'warning'
      }
    },

    computed: {
      i19close: () => i18n(i19close)
    }
  }
</script>
