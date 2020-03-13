<template>
  <component
    :is="isRouter ? 'router-link' : 'a'"
    :href="isRouter ? null : href"
    :to="isRouter ? (to || href) : null"
  >
    <slot/>
  </component>
</template>

<script>
  export default {
    name: 'VLink',

    props: {
      href: {
        type: String,
        default: ''
      },
      to: [String, Object]
    },

    computed: {
      isRouter () {
        return this.$router && !this.href.startsWith('http')
      }
    }
  }
</script>
