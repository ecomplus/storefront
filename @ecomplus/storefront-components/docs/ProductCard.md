# ProductCard

Component that includes the product with image, title and allows editing of the size in the image and inclusion of the sale text.

## Features

- Supports E-Com Plus product object;
- Choose image size;
- Product sale text;

## Props

### product

Product image. It should be an url of the product.

 ```js
product: Object,
```

### product-id

Product Identification.

```js
productId: String,
```

### is-small:

Sets the image size.

```js
isSmall: {
  type: Bollean
  default: false
},
```

### heading-tag

Defines the size of the product title.

```js
headingTag: {
  type: String
  default: 'h3'
},
```

### buy-text

Text that will be shown for the sale of the product

```js
buyText: {
  type: String
  default: null
},
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
