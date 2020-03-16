# ProductCard

Component that includes the product with image, title and allows editing of the size in the image and inclusion of the sale text.

## Features

- Supports E-Com Plus product object;
- Choose image size;
- Product sale text;

## Props

### product

The product (item) data following [E-Com Plus Product Model](https://developers.e-com.plus/docs/api/#/store/products/product-object).

 ```js
product: Object,
```

### product-id

Product object ID (`_id`) to use only if `product` is not set, in this case product will be fetched by ID.

```js
productId: String,
```

### is-small

Sets the image size.

```js
isSmall: {
  type: Bollean,
  default: false
},
```

### heading-tag

Heading tag for product name.

```js
headingTag: {
  type: String,
  default: 'h3'
},
```

### buy-text

Text that will be shown for the sale of the product

```js
buyText: String,
```

### can-add-to-cart

To inform if the product is in the 'shopping cart'

```js
canAddToCart: {
  type: Boolean,
  default: true
},
```

### is-loaded

```js
isLoaded: {
  type: Boolean,
  default: false
},
```

## Slots

### rating

### unavailable

### out-of-stock
