# ProductCard

Component that includes the product with image, title and allows editing of the size in the image and inclusion of the sale text.

## Most common usage scenario
![product-card](https://e-com-docs.s3.amazonaws.com/product-card.png)


## Features

- Supports E-Com Plus product object;
- Choose image size;
- Product sale text;

## Props:

- ## productId:
  Product Identification
```js
productId:{
type: String
default: null
},
```

- ## product:
 Product image. It should be an url of the product
 ```js
product:{
type: Object
default: null
},
```
 - ## isSmall:
  Sets the image size
  ```js
isSmall:{
type: Bollean
default: false
},
```
- ## headingTag :
Defines the size of the product title.
```js
headingTag:{
type: String
default: 'h3'
},
```
- ## buyText:
Text that will be shown for the sale of the product
```js
buyText:{
type: String
default: null
},
```
- ## canAddToCart:
To inform if the product is in the 'shopping cart'
 ```js
 canAddToCart: {
      type: Boolean,
      default: true
    },
```
- ## isLoaded:
 ```js
 isLoaded: {
      type: Boolean,
      default: false
    },
```

### Slot

+ rating
+ unavailable
+ out-of-stock