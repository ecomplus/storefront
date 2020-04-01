<template>
  <div class="demo">
    <div style="max-width: 290px">
      <button class="btn btn-primary" type="button" @click="isVisible = true">
        Click here to search for products
      </button>
      <InstantSearch :term.sync="term" :is-visible.sync="isVisible" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DemoInstantSearch',

    data() {
      return {
        term: '',
        isVisible: false
      }
    },
  }
</script>