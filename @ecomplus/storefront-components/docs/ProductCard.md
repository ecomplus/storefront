# ProductCard

Card with resumed product information including picture(s), title, prices, discount percentage, buy button and space for rating stars. Should be used on shelves and grids, links to the product details page.

<DemoProductCard/>

## Features

- Supports [Store API product](https://developers.e-com.plus/docs/api/#/store/products/) and [Search API item](https://developers.e-com.plus/docs/api/#/search/items/) objects;
- Handle fetch and retry if item data is not sent or out of date;
- When item is available, handle buy adding to global [shopping cart](https://github.com/ecomplus/shopping-cart) instance by default;
- Switch pictures on hover when item has at least 2 pictures;
- Calculate discount percentage and shows on stamp;
- Small size variation for floating display cases;

## Examples

#### Basic (minor required) example

```vue
<ProductCard :product-id="productId"/>
```

#### With previously loaded item data

```vue
<ProductCard
  :product="product"
  :is-loaded="true"
/>
```

#### All props/events

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

Text to use on the purchase button. It defaults to the word "Buy" respecting store default language, can be changed to "Add to shopping cart" for example.

```js
buyText: String,
```

### can-add-to-cart

Allows the `product` to be added to the cart. If false, will be necessary to manually handle the `@buy` event.

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

### default

Shown while product data is being fetched (hydrated), usually can contain the pre-rendered element or a loading spinner.

```vue
<ProductCard :product-id="productId">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</ProductCard>
```

### buy

Place to customize buy button.

```vue
<ProductCard :product-id="productId">
  <template #buy>
    <button
      type="button"
      class="product-card__custom-buy"
    >
      <img src="my-custom-buy-button-image.png"/>
    </button>
  </template>
</ProductCard>
```

### discount-tag

Place to customize discount badge when product has offer price.

```vue
<ProductCard :product-id="productId">
  <template #discount-tag="{ discount }">
    <span
      v-if="discount > 0"
      class="badge badge-success"
    >
      -<b>{{ discount }}</b>%
    </span>
  </template>
</ProductCard>
```

### rating

Place to insert the product average rating. Usually it should be done through an external widget.

```vue
<ProductCard
  :product="product"
  :is-loaded="true"
>
  <template #rating>
    <span>{{ avarageRating }}/5</span>
  </template>
</ProductCard>
```

### prices

Place to overwrite default `APrices` component.

```vue
<ProductCard
  :product="product"
  :is-loaded="true"
>
  <template #prices>
    <span class="product-card__custom-price">
      {{ formatMoney(product.price) }}
    </span>
  </template>
</ProductCard>
```

### unavailable

Place to customize badge shown if the product is marked unavailable for purchase.

```vue
<ProductCard :product-id="productId">
  <template #unavailable>
    <span class="badge badge-warning">
      Product unavailable :/
    </span>
  </template>
</ProductCard>
```

### out-of-stock

Place to customize badge shown if the product stock quantity is zero or less than minimum.

```vue
<ProductCard :product-id="productId">
  <template #out-of-stock>
    <span class="badge badge-dark">
      Product out of stock :(
    </span>
  </template>
</ProductCard>
```

### body

Place to overwrite top part (almost entire) of card with product pictures and title.

### footer

Place to add custom content on card bottom.
