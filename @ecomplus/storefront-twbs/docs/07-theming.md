# Theming

### Styles
We're including almost all Bootstrap 4.4 styles and components, just a few components aren't included by default as you can see at scss/styles.scss.

### Theming
You may use Sass to create a custom theme, you just have to import your own variables before @ecomplus/storefront-twbs/scss/styles:

```scss
@import "variables";
@import "node_modules/@ecomplus/storefront-twbs/scss/styles";
```

Take a look on [Bootstrap 4 variables](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) to see available Sass variables.