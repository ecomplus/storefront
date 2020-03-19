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
      href: String,
      to: [String, Object]
    },

    computed: {
      isRouter () {
        if (this.$router) {
          return !this.href ? true
            : Boolean(this.$router.options.routes.find(({ path }) => path === this.href))
        }
        return false
      }
    }
  }
</script>
