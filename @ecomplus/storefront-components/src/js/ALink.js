export default {
  name: 'ALink',

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
