<template>
  <div class="container p-4">
    <div class="row">
      <div class="col col-lg-6">
        <component
          v-if="dynamicComponent"
          :is="dynamicComponent"
          v-bind="{
            product,
            isSmall: true,
            headingTag: 'h4',
            buyText:'Buy now!',
            canAddToCart: false,
           }"
          @buy="({ product }) => addToCart(product)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "../../@ecomplus/storefront-twbs/scss/styles.scss";
import product from "../../@ecomplus/storefront-components/__tests__/data/product";

export default {
  name: "DocProductCardComplete",
  data() {
    return {
      dynamicComponent: null,
      product
    };
  },
  mounted() {
    import("../../@ecomplus/storefront-components/src/ProductCard").then(
      module => {
        this.dynamicComponent = module.default;
      }
    );
  },
  methods: {
    addToCart(product) {
      alert(`Success to add ${product.name}`)
    }
  },
};
</script>