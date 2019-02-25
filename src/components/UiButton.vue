<template>
  <button :class="[ 'btn', color, size, { active } ]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    color: String,
    size: String,
    active: Boolean
  }
}
</script>
