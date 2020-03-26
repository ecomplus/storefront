# ProductCard

Component that includes the product with image, title and allows editing of the size in the image and inclusion of the sale text.The [ProductCard] is a unique and specific page for each item that explains its most relevant benefits.


## Features

- Supports E-Com Plus product object;
- Product sale text;
- Change pictures: Possible to show 2 item pictures;
- Component size variation to render using less space;

## Exemples


Basic exemple:

```vue
<ProductCard :product="product" />
```
<DocProductCard />

Complete exemple:

```vue
<ProductCard
  :product.sync="product"
  :is-small="true"
  heading-tag="h4"
  buy-text="Buy now!"
  :can-add-to-cart="false"
  :is-loaded.sync="isProductLoaded"
  @buy="({ product }) => addToCart(product)"
/>
```
<DocProductCardComplete />


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

Changes component style. Reduces the vertical size in a way that renders the component using less space. Ideal to use on a pop up screen for example.

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

Text to use on the purchase button. It comes by default for the word `buy` (respecting the language of the page of whoever is accessing it). It can be changed for example to "Add to shopping cart", as you prefer.
```js
buyText: String,
```

### can-add-to-cart

Allows the `product` to be added to the cart. If `false`, it is necessary to handle the next event.

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

Place to insert the product evaluation medium. It must be done through an external widget.

```vue
<slot
  name="rating"
>
```

### unavailable

Show if the product is unavailable for purchase. By default it uses the `badge-warning`.

```vue
<slot
  name="unavailable"
 >
```

### out-of-stock


If it is identified that the product has no balance for sale, the `out-of-stock` is activated so that it is not available for sale. The shopkeeper can also activate manually. By default, the `badge-dark` is used.

```vue
<slot
  name="out-of-stock"
>
```
