<template>
  <div class="container p-4">
    <div class="row">
      <div class="col col-lg-6">
        <component v-if="dynamicComponent" :is="dynamicComponent" v-bind="{product}"></component>
      </div>
    </div>
  </div>
</template>

<script>
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "../../@ecomplus/storefront-twbs/scss/styles.scss";
import product from "../../@ecomplus/storefront-components/__tests__/data/product";

export default {
  name: "DocProductCard",
  data() {
    return {
      product
    };
  },
  mounted() {
    import("../../@ecomplus/storefront-components/src/ProductCard").then(
      module => {
        this.dynamicComponent = module.default;
      }
    );
  }
};
</script>