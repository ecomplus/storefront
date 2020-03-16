# ProductCard

Component that includes the product with image, title and allows editing of the size in the image and inclusion of the sale text.

## Features

- Supports E-Com Plus product object;
- Choose image size;
- Product sale text;

## Props

### product

The product (item) data following [E-Com Plus Product Model](https://developers.e-com.plus/docs/api/#/store/products/product-object).  

> May be used with `.sync` modifier.

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

Wheter the `product` data is loaded up to date from APIs. If true, it'll prevent default fetch to GET product data.

> May be used with `.sync` modifier.

```js
isLoaded: {
  type: Boolean,
  default: false
},
```

## Slots

### discount-tag

Place to customize discount badge when product has offer price.

```vue
<slot
  name="discount-tag"
  v-bind="{ discount }"
>
```

### rating

### unavailable

### out-of-stock

## Events

### buy

Emitted when buy button is clicked.

```js
this.$emit('buy', { product })
```

### update:product

Emitted once item data is fetched from API.

> Triggers `.sync` modifier for [`product`](#product).

```js
this.$emit('update:product', data)
```

### update:is-loaded

Emitted once item data is fetched from API.

> Triggers `.sync` modifier for [`is-loaded`](#is-loaded).

```js
this.$emit('update:is-loaded', true)
```
